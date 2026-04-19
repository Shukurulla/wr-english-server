import { TaskAssignment } from "../../models/TaskAssignment.js";
import { Task } from "../../models/Task.js";
import { Submission } from "../../models/Submission.js";
import { ApiError } from "../../utils/api-error.js";

export async function listAssignments({ groupId, status, page, limit }) {
  const filter = { isActive: true };
  if (groupId) filter.groupId = groupId;

  const now = new Date();
  if (status === "upcoming") filter.opensAt = { $gt: now };
  else if (status === "open") {
    filter.opensAt = { $lte: now };
    filter.closesAt = { $gte: now };
  } else if (status === "closed") filter.closesAt = { $lt: now };

  const [data, total] = await Promise.all([
    TaskAssignment.find(filter)
      .populate("taskId", "title type semester order topic maxScore")
      .sort({ opensAt: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    TaskAssignment.countDocuments(filter)
  ]);
  return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
}

export async function getMyAssignments(user) {
  const groupId = user.studentInfo?.groupId;
  if (!groupId) return [];

  const now = new Date();
  const assignments = await TaskAssignment.find({
    groupId,
    isActive: true,
    opensAt: { $lte: now }
  })
    .populate("taskId", "title type semester order topic maxScore")
    .sort({ dueAt: 1 })
    .lean();

  // Attach submission status if it exists
  const assignmentIds = assignments.map(a => a._id);
  const submissions = await Submission.find({ assignmentId: { $in: assignmentIds }, studentId: user._id }).lean();
  
  const submitMap = {};
  submissions.forEach(sub => submitMap[sub.assignmentId.toString()] = sub);

  return assignments.map(a => {
    const sub = submitMap[a._id.toString()];
    if (sub) {
       a.submissionStatus = sub.status;
    }
    return a;
  });
}

export async function createAssignment(body, userId) {
  const task = await Task.findById(body.taskId);
  if (!task) throw ApiError.notFound("Task not found");

  if (body.opensAt >= body.dueAt) {
    throw ApiError.badRequest("Opening date must be before deadline");
  }

  // HIGH #9: closesAt >= dueAt tekshiruvi
  const closesAt = body.closesAt || body.dueAt;
  if (body.closesAt && body.closesAt < body.dueAt) {
    throw ApiError.badRequest("Closing date must be after deadline");
  }

  return TaskAssignment.create({
    ...body,
    closesAt,
    semester: body.semester || task.semester,
    assignedBy: userId
  });
}

export async function bulkAssign({ groupId, semester, academicYear, items }, userId) {
  const results = { created: 0, errors: [] };

  for (let i = 0; i < items.length; i++) {
    try {
      const item = items[i];
      const task = await Task.findById(item.taskId);
      if (!task) {
        results.errors.push({ index: i, message: "Task not found" });
        continue;
      }

      const exists = await TaskAssignment.findOne({ taskId: item.taskId, groupId });
      if (exists) {
        results.errors.push({ index: i, message: "Already assigned" });
        continue;
      }

      await TaskAssignment.create({
        taskId: item.taskId,
        groupId,
        semester: semester || task.semester,
        academicYear: academicYear || new Date().getFullYear() + "-" + (new Date().getFullYear() + 1),
        opensAt: item.opensAt,
        dueAt: item.dueAt,
        closesAt: item.closesAt || item.dueAt,
        assignedBy: userId
      });
      results.created++;
    } catch (err) {
      results.errors.push({ index: i, message: err.message });
    }
  }
  return results;
}

export async function updateAssignment(id, body) {
  const assignment = await TaskAssignment.findById(id);
  if (!assignment) throw ApiError.notFound("Assignment not found");

  if (new Date() > assignment.closesAt && !body.closesAt) {
    throw ApiError.badRequest("Assignment already closed");
  }

  Object.assign(assignment, body);
  await assignment.save();
  return assignment;
}
