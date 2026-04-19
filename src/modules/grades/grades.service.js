import { Grade } from "../../models/Grade.js";
import { Task } from "../../models/Task.js";
import { TaskAssignment } from "../../models/TaskAssignment.js";
import { Group } from "../../models/Group.js";
import { FinalTestAttempt } from "../../models/FinalTestAttempt.js";
import { AuditLog } from "../../models/AuditLog.js";
import { ApiError } from "../../utils/api-error.js";
import { round1 } from "../../services/grader.service.js";

// KRITIK #1: o'qituvchi faqat o'z guruhi bilan ishlashi
async function assertTeacherOwnsGrade(gradeId, teacherId) {
  const grade = await Grade.findById(gradeId);
  if (!grade) throw ApiError.notFound("Grade not found");
  const assignment = await TaskAssignment.findById(grade.assignmentId);
  if (!assignment) throw ApiError.notFound("Assignment not found");
  const group = await Group.findById(assignment.groupId);
  if (!group || group.teacherId.toString() !== teacherId.toString()) {
    throw ApiError.forbidden("This group does not belong to you");
  }
  return grade;
}

async function assertTeacherOwnsGroup(groupId, teacherId) {
  const group = await Group.findById(groupId);
  if (!group || group.teacherId.toString() !== teacherId.toString()) {
    throw ApiError.forbidden("This group does not belong to you");
  }
  return group;
}

export async function getMyGrades(studentId, { semester }) {
  const pipeline = [
    { $match: { studentId, isFinalized: true } },
    {
      $lookup: {
        from: "taskassignments",
        localField: "assignmentId",
        foreignField: "_id",
        as: "assignment"
      }
    },
    { $unwind: "$assignment" },
    {
      $lookup: {
        from: "tasks",
        localField: "taskId",
        foreignField: "_id",
        as: "task"
      }
    },
    { $unwind: "$task" }
  ];

  if (semester) {
    pipeline.push({ $match: { "assignment.semester": Number(semester) } });
  }

  pipeline.push({
    $project: {
      assignmentId: 1,
      taskTitle: "$task.title",
      type: "$task.type",
      semester: "$assignment.semester",
      score: "$finalScore",
      maxScore: "$task.maxScore",
      isFinalized: 1,
      finalizedAt: 1,
      history: 1
    }
  });

  pipeline.push({ $sort: { "assignment.opensAt": 1 } });

  const items = await Grade.aggregate(pipeline);

  let readingScore = 0;
  let writingScore = 0;
  for (const item of items) {
    if (item.type === "reading") readingScore += item.score;
    else writingScore += item.score;
  }

  const finalTest = await FinalTestAttempt.findOne({ studentId, isFinalized: true }).lean();
  const finalTestScore = finalTest?.totalScore || 0;
  const totalScore = round1(readingScore + writingScore + finalTestScore);

  return {
    semester: semester || "all",
    readingScore: round1(readingScore),
    writingScore: round1(writingScore),
    finalTestScore: round1(finalTestScore),
    totalScore,
    maxScore: 20,
    passed: totalScore >= 12,
    items,
    finalTest: finalTest
      ? { score: finalTest.totalScore, correctCount: finalTest.correctCount }
      : null
  };
}

// KRITIK #1: guruh tekshiruvi
export async function getGroupGrades(groupId, semester, teacherId) {
  await assertTeacherOwnsGroup(groupId, teacherId);

  const assignments = await TaskAssignment.find({ groupId, semester }).lean();
  const assignmentIds = assignments.map((a) => a._id);

  const grades = await Grade.find({ assignmentId: { $in: assignmentIds } })
    .populate("studentId", "fullName email studentInfo")
    .populate("taskId", "title type")
    .sort({ studentId: 1 })
    .lean();

  return grades;
}

// KRITIK #1 + HIGH #5: guruh va score diapazoni tekshiruvi
export async function finalizeGrade(gradeId, { score, comment }, teacherId) {
  const grade = await assertTeacherOwnsGrade(gradeId, teacherId);

  if (score !== undefined && score !== null) {
    const task = await Task.findById(grade.taskId);
    if (task && (score < 0 || score > task.maxScore)) {
      throw ApiError.badRequest(`Score must be between 0 and ${task.maxScore}`);
    }
    grade.finalScore = score;
    grade.history.push({
      score,
      reason: comment || "teacher_finalize",
      by: teacherId,
      at: new Date()
    });
  }

  grade.isFinalized = true;
  grade.finalizedBy = teacherId;
  grade.finalizedAt = new Date();
  await grade.save();

  await AuditLog.create({
    actorId: teacherId,
    actorRole: "teacher",
    action: "grade.finalize",
    entityType: "grade",
    entityId: grade._id,
    metadata: { finalScore: grade.finalScore }
  });

  return grade;
}

// KRITIK #1 + HIGH #5: guruh va score diapazoni tekshiruvi
export async function overrideGrade(gradeId, { score, reason }, teacherId) {
  const grade = await assertTeacherOwnsGrade(gradeId, teacherId);

  const task = await Task.findById(grade.taskId);
  if (task && (score < 0 || score > task.maxScore)) {
    throw ApiError.badRequest(`Score must be between 0 and ${task.maxScore}`);
  }

  const oldScore = grade.finalScore;
  grade.finalScore = score;
  grade.history.push({ score, reason, by: teacherId, at: new Date() });
  await grade.save();

  await AuditLog.create({
    actorId: teacherId,
    actorRole: "teacher",
    action: "grade.override",
    entityType: "grade",
    entityId: grade._id,
    metadata: { oldScore, newScore: score, reason }
  });

  return grade;
}
