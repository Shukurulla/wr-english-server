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

// New open-access flow: return every active task as a virtual assignment.
// No TaskAssignment / group filtering; tests are visible to every student.
export async function getMyAssignments(user) {
  const tasks = await Task.find({ isActive: true })
    .sort({ semester: 1, order: 1, createdAt: 1 })
    .lean();

  const submissions = await Submission.find({
    studentId: user._id,
    taskId: { $in: tasks.map((t) => t._id) }
  }).lean();

  const subMap = {};
  submissions.forEach((s) => { subMap[s.taskId.toString()] = s; });

  const now = new Date();
  return tasks.map((t) => {
    const sub = subMap[t._id.toString()];
    return {
      // Keep the shape that the frontend expects (assignment-like)
      _id: t._id,
      taskId: {
        _id: t._id,
        title: t.title,
        type: t.type,
        semester: t.semester,
        order: t.order,
        topic: t.topic,
        maxScore: t.maxScore
      },
      semester: t.semester,
      opensAt: t.createdAt || now,
      dueAt: null,
      closesAt: null,
      isActive: true,
      virtual: true,
      submissionId: sub?._id || null,
      submissionStatus: sub?.status || null
    };
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
