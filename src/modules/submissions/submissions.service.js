import { Submission } from "../../models/Submission.js";
import { TaskAssignment } from "../../models/TaskAssignment.js";
import { Task } from "../../models/Task.js";
import { Grade } from "../../models/Grade.js";
import { AuditLog } from "../../models/AuditLog.js";
import { ApiError } from "../../utils/api-error.js";
import { gradeReading, countWords, round1 } from "../../services/grader.service.js";
import { evaluateWriting } from "../../services/ai-evaluator.service.js";

// Race-safe grade yaratish (KRITIK #2)
async function upsertGrade({ submissionId, studentId, taskId, score, reason, finalized }) {
  return Grade.findOneAndUpdate(
    { submissionId },
    {
      $setOnInsert: { submissionId, studentId, taskId, initialScore: score },
      $set: { finalScore: score, isFinalized: finalized, ...(finalized ? { finalizedAt: new Date() } : {}) },
      $push: { history: { score, reason, at: new Date() } }
    },
    { upsert: true, new: true }
  );
}

export async function startSubmission({ taskId, assignmentId, studentId }) {
  // Accept either taskId (new flow) or assignmentId (legacy flow)
  let task;
  let resolvedAssignmentId = null;

  if (taskId) {
    task = await Task.findById(taskId);
    if (!task || !task.isActive) throw ApiError.notFound("Task not found");
  } else if (assignmentId) {
    // Legacy: if an assignmentId looks like a taskId, try Task lookup first
    task = await Task.findById(assignmentId);
    if (!task) {
      const assignment = await TaskAssignment.findById(assignmentId);
      if (!assignment || !assignment.isActive) throw ApiError.notFound("Task not found");
      task = await Task.findById(assignment.taskId);
      if (!task) throw ApiError.notFound("Task not found");
      resolvedAssignmentId = assignment._id;
    }
  } else {
    throw ApiError.badRequest("taskId is required");
  }

  const now = new Date();

  // Race-safe: one submission per (student, task)
  const existing = await Submission.findOne({ taskId: task._id, studentId });
  if (existing) {
    const err = ApiError.conflict("You have already started this task");
    err.details = { submission: existing, task };
    throw err;
  }

  try {
    const submission = await Submission.create({
      taskId: task._id,
      assignmentId: resolvedAssignmentId || undefined,
      studentId,
      type: task.type,
      status: "in_progress",
      writing: task.type === "writing" ? { startedAt: now } : undefined
    });
    return { submission, task };
  } catch (err) {
    if (err.code === 11000) throw ApiError.conflict("You have already started this task");
    throw err;
  }
}

export async function getSubmission(id, userId, userRole) {
  const sub = await Submission.findById(id).populate("taskId").lean();
  if (!sub) throw ApiError.notFound("Submission not found");

  if (userRole === "student" && sub.studentId.toString() !== userId.toString()) {
    throw ApiError.forbidden();
  }
  return sub;
}

export async function listSubmissions({ assignmentId, studentId, status, page, limit }) {
  const filter = {};
  if (assignmentId) filter.assignmentId = assignmentId;
  if (studentId) filter.studentId = studentId;
  if (status) filter.status = status;

  const [data, total] = await Promise.all([
    Submission.find(filter)
      .populate("studentId", "fullName email studentInfo")
      .populate("taskId", "title type semester order maxScore")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Submission.countDocuments(filter)
  ]);
  return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
}

export async function answerReading(submissionId, answers, studentId) {
  const submission = await Submission.findById(submissionId);
  if (!submission) throw ApiError.notFound("Submission not found");
  if (submission.studentId.toString() !== studentId.toString()) throw ApiError.forbidden();
  if (submission.type !== "reading") throw ApiError.badRequest("This is not a reading assignment");
  if (submission.status !== "in_progress") throw ApiError.conflict("Already submitted");

  const task = await Task.findById(submission.taskId);
  if (!task) throw ApiError.notFound("Task not found");

  submission.reading = { answers };
  const { totalScore, gradedAnswers } = gradeReading(submission, task);
  submission.reading.answers = gradedAnswers;
  submission.totalScore = totalScore;
  submission.status = "auto_graded";
  await submission.save();

  // KRITIK #2: upsert — dublikat grade yaratilmaydi
  await upsertGrade({
    submissionId: submission._id, studentId,
    taskId: submission.taskId,
    score: totalScore, reason: "auto_graded", finalized: true
  });

  return submission;
}

export async function submitWriting(submissionId, { text, meta }, studentId) {
  const submission = await Submission.findById(submissionId);
  if (!submission) throw ApiError.notFound("Submission not found");
  if (submission.studentId.toString() !== studentId.toString()) throw ApiError.forbidden();
  if (submission.type !== "writing") throw ApiError.badRequest("This is not a writing assignment");
  if (submission.status !== "in_progress") throw ApiError.conflict("Already submitted");

  const task = await Task.findById(submission.taskId);
  if (!task) throw ApiError.notFound("Task not found");

  const now = new Date();
  const startedAt = submission.writing.startedAt;
  const timeSpentSec = Math.floor((now - startedAt) / 1000);
  const timeLimit = task.writing.timeLimit || 1200;
  const maxAllowed = timeLimit + 60;

  if (timeSpentSec > maxAllowed) {
    throw ApiError.unprocessable("Time limit exceeded");
  }

  const wordCount = countWords(text);
  const isLate = timeSpentSec > timeLimit;

  // HIGH #4: so'z soni ogohlantirishi (blok emas, lekin metadata yoziladi)
  const wordCountWarning =
    wordCount < (task.writing.minWords || 0) ? "too_short" :
    wordCount > (task.writing.maxWords || Infinity) ? "too_long" : null;

  submission.writing.text = text;
  submission.writing.wordCount = wordCount;
  submission.writing.submittedAt = now;
  submission.writing.timeSpentSec = timeSpentSec;
  submission.writing.isLate = isLate;
  if (meta) {
    submission.writing.meta = { ...submission.writing.meta, ...meta };
  }
  if (wordCountWarning) {
    submission.writing.meta = { ...submission.writing.meta, wordCountWarning };
  }

  const aiResult = await evaluateWriting({ task, submission, wordCount });

  if (aiResult) {
    submission.writing.aiEvaluation = aiResult;
    submission.totalScore = aiResult.band;
    submission.status = "ai_graded";

    // KRITIK #2: upsert
    await upsertGrade({
      submissionId: submission._id, studentId,
      taskId: submission.taskId,
      score: aiResult.band, reason: "ai_initial", finalized: false
    });

    await AuditLog.create({
      actorId: studentId,
      action: "ai.evaluate.writing",
      entityType: "submission",
      entityId: submission._id,
      metadata: {
        model: aiResult.model, promptVersion: aiResult.promptVersion,
        tokensIn: aiResult.tokensIn, tokensOut: aiResult.tokensOut,
        band: aiResult.band, durationMs: aiResult.durationMs,
        isLate, wordCountWarning
      }
    });
  } else {
    // HIGH #7: AI fail — totalScore null, aniq status
    submission.status = "manual_review";
    submission.totalScore = null;
  }

  await submission.save();
  return submission;
}

export async function saveDraft(submissionId, text, studentId) {
  const submission = await Submission.findById(submissionId);
  if (!submission) throw ApiError.notFound("Submission not found");
  if (submission.studentId.toString() !== studentId.toString()) throw ApiError.forbidden();
  if (submission.status !== "in_progress") throw ApiError.conflict("Already submitted");

  submission.writing.text = text;
  submission.writing.wordCount = countWords(text);
  await submission.save();
  return { saved: true, wordCount: submission.writing.wordCount };
}

export async function restartSubmission(submissionId, studentId) {
  const existing = await Submission.findById(submissionId);
  if (!existing) throw ApiError.notFound("Submission not found");
  if (existing.studentId.toString() !== studentId.toString()) throw ApiError.forbidden();
  if (existing.status !== "in_progress") {
    throw ApiError.badRequest("You can only restart an active unfinished submission");
  }

  const task = await Task.findById(existing.taskId);
  if (!task || !task.isActive) throw ApiError.notFound("Task not found");

  const now = new Date();

  // Delete the old unfinished attempt
  await Submission.findByIdAndDelete(submissionId);

  const newSubmission = await Submission.create({
    taskId: task._id,
    studentId,
    type: task.type,
    status: "in_progress",
    writing: task.type === "writing" ? { startedAt: now } : undefined
  });

  return { submission: newSubmission, task };
}
