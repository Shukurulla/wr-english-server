import { FinalTest } from "../../models/FinalTest.js";
import { FinalTestAttempt } from "../../models/FinalTestAttempt.js";
import { User } from "../../models/User.js";
import { ApiError } from "../../utils/api-error.js";
import { round1 } from "../../services/grader.service.js";
import crypto from "crypto";

async function getAttemptsAllowed(studentId, semester) {
  const student = await User.findById(studentId).select("studentInfo").lean();
  const map = student?.studentInfo?.finalTestAttemptsAllowed;
  if (!map) return 1;
  const v = map[String(semester)] ?? map.get?.(String(semester));
  return Number.isFinite(v) ? v : 1;
}

function seededShuffle(array, seed) {
  const shuffled = [...array];
  let hash = crypto.createHash("md5").update(seed).digest("hex");
  let index = 0;
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = parseInt(hash.substring(index, index + 8), 16) % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    index = (index + 8) % hash.length;
    if (index < 8) {
      hash = crypto.createHash("md5").update(hash + seed).digest("hex");
      index = 0;
    }
  }
  return shuffled;
}

export async function getCurrentTest(semester) {
  const test = await FinalTest.findOne({ semester, isActive: true }).lean();
  if (!test) throw ApiError.notFound("No active final test found");
  return test;
}

export async function startAttempt(studentId, semester, groupId) {
  const test = await getCurrentTest(semester);

  const allowed = await getAttemptsAllowed(studentId, semester);
  const existingCount = await FinalTestAttempt.countDocuments({
    studentId,
    finalTestId: test._id
  });

  if (existingCount >= allowed) {
    throw ApiError.conflict(
      allowed === 1
        ? "You have already taken this test"
        : "All allowed attempts have been used"
    );
  }

  const attemptNumber = existingCount + 1;
  const seed = studentId.toString() + test._id.toString() + ":" + attemptNumber;
  const shuffledQuestions = seededShuffle(test.questions, seed).map((q) => {
    const shuffledOptions = seededShuffle(
      q.options.map((opt, i) => ({ opt, origIndex: i })),
      seed + q._id.toString()
    );
    return {
      _id: q._id,
      prompt: q.prompt,
      options: shuffledOptions.map((o) => o.opt),
      _optionMap: shuffledOptions.map((o) => o.origIndex)
    };
  });

  let attempt;
  try {
    attempt = await FinalTestAttempt.create({
      finalTestId: test._id,
      studentId,
      groupId,
      attemptNumber,
      status: "in_progress",
      startedAt: new Date()
    });
  } catch (err) {
    if (err.code === 11000) throw ApiError.conflict("This attempt was already started");
    throw err;
  }

  const clientQuestions = shuffledQuestions.map((q) => ({
    _id: q._id,
    prompt: q.prompt,
    options: q.options
  }));

  return { attempt, questions: clientQuestions, timeLimit: test.timeLimit };
}

export async function submitAttempt(attemptId, answers, studentId) {
  const attempt = await FinalTestAttempt.findById(attemptId);
  if (!attempt) throw ApiError.notFound("Attempt not found");
  if (attempt.studentId.toString() !== studentId.toString()) throw ApiError.forbidden();
  if (attempt.status !== "in_progress") throw ApiError.conflict("Already submitted");

  const test = await FinalTest.findById(attempt.finalTestId);
  if (!test) throw ApiError.notFound("Final test not found");

  let correctCount = 0;
  const gradedAnswers = [];

  for (const answer of answers) {
    const question = test.questions.find(
      (q) => q._id.toString() === answer.questionId
    );
    if (!question) {
      gradedAnswers.push({ questionId: answer.questionId, selectedIndex: answer.selectedIndex, isCorrect: false });
      continue;
    }
    const isCorrect = answer.selectedIndex === question.correctAnswerIndex;
    if (isCorrect) correctCount++;
    gradedAnswers.push({ questionId: answer.questionId, selectedIndex: answer.selectedIndex, isCorrect });
  }

  const now = new Date();
  attempt.answers = gradedAnswers;
  attempt.correctCount = correctCount;
  attempt.totalScore = round1(correctCount * test.pointsPerQuestion);
  attempt.status = "graded";
  attempt.submittedAt = now;
  attempt.timeSpentSec = Math.floor((now - attempt.startedAt) / 1000);
  attempt.isFinalized = true;
  await attempt.save();

  return attempt;
}

export async function getMyAttempt(studentId, semester) {
  const test = await FinalTest.findOne({ semester, isActive: true }).lean();
  if (!test) return null;

  const attempts = await FinalTestAttempt.find({ studentId, finalTestId: test._id })
    .sort({ attemptNumber: -1 })
    .lean();
  const allowed = await getAttemptsAllowed(studentId, semester);
  const latest = attempts[0] || null;

  if (latest) {
    latest.timeLimit = test.timeLimit;
    latest.attemptsUsed = attempts.length;
    latest.attemptsAllowed = allowed;
    latest.canStartNewAttempt =
      latest.status !== "in_progress" && attempts.length < allowed;
  }
  return latest;
}

// Vaqti o'tgan in_progress attemptni avtomatik yakunlash
export async function forceSubmitExpired(attemptId, studentId) {
  const attempt = await FinalTestAttempt.findById(attemptId);
  if (!attempt) throw ApiError.notFound("Attempt not found");
  if (attempt.studentId.toString() !== studentId.toString()) throw ApiError.forbidden();
  if (attempt.status !== "in_progress") throw ApiError.conflict("Attempt already finished");

  const test = await FinalTest.findById(attempt.finalTestId);
  if (!test) throw ApiError.notFound("Test not found");

  const elapsed = Math.floor((Date.now() - new Date(attempt.startedAt).getTime()) / 1000);
  if (elapsed <= test.timeLimit) {
    throw ApiError.badRequest("Test time has not finished yet");
  }

  // Bo'sh javoblar bilan yakunlash — 0 ball
  attempt.answers = [];
  attempt.correctCount = 0;
  attempt.totalScore = 0;
  attempt.status = "graded";
  attempt.submittedAt = new Date();
  attempt.timeSpentSec = elapsed;
  attempt.isFinalized = true;
  await attempt.save();

  return attempt;
}

// Admin/teacher: bitta talabaga semester bo'yicha qo'shimcha urinish berish
export async function grantExtraAttempt(studentId, semester, by) {
  const student = await User.findById(studentId);
  if (!student || student.role !== "student") throw ApiError.notFound("Student not found");

  if (!student.studentInfo) student.studentInfo = {};
  if (!student.studentInfo.finalTestAttemptsAllowed) {
    student.studentInfo.finalTestAttemptsAllowed = new Map([["1", 1], ["2", 1]]);
  }

  const key = String(semester);
  const map = student.studentInfo.finalTestAttemptsAllowed;
  const current = (map.get ? map.get(key) : map[key]) ?? 1;
  const next = current + 1;
  if (map.set) map.set(key, next);
  else map[key] = next;

  student.markModified("studentInfo.finalTestAttemptsAllowed");
  await student.save();

  const { AuditLog } = await import("../../models/AuditLog.js");
  await AuditLog.create({
    actorId: by,
    actorRole: "teacher",
    action: "final_test.grant_attempt",
    entityType: "user",
    entityId: studentId,
    metadata: { semester: Number(semester), newAllowed: next }
  });

  return { studentId, semester: Number(semester), allowed: next };
}

// O'qituvchi/admin: talabaning attemptini reset qilish
export async function resetAttempt(attemptId, teacherId) {
  const attempt = await FinalTestAttempt.findById(attemptId);
  if (!attempt) throw ApiError.notFound("Attempt not found");

  await FinalTestAttempt.findByIdAndDelete(attemptId);

  const { AuditLog } = await import("../../models/AuditLog.js");
  await AuditLog.create({
    actorId: teacherId,
    actorRole: "teacher",
    action: "final_test.reset_attempt",
    entityType: "final_test_attempt",
    entityId: attemptId,
    metadata: { studentId: attempt.studentId, finalTestId: attempt.finalTestId }
  });

  return { deleted: true };
}

// O'qituvchi: o'z guruhidagi talabalarning attemptlarini ko'rish
export async function getGroupAttempts(groupId, semester) {
  const test = await FinalTest.findOne({ semester, isActive: true }).lean();
  if (!test) return [];
  return FinalTestAttempt.find({ finalTestId: test._id, groupId })
    .populate("studentId", "fullName email studentInfo")
    .sort({ createdAt: -1 })
    .lean();
}

export async function listFinalTests() {
  const tests = await FinalTest.find().sort({ semester: 1, createdAt: -1 }).lean();
  const testIds = tests.map((t) => t._id);
  const attemptStats = await FinalTestAttempt.aggregate([
    { $match: { finalTestId: { $in: testIds } } },
    { $group: {
      _id: "$finalTestId",
      totalAttempts: { $sum: 1 },
      gradedAttempts: { $sum: { $cond: [{ $eq: ["$status", "graded"] }, 1, 0] } },
      avgScore: { $avg: { $cond: [{ $eq: ["$status", "graded"] }, "$totalScore", null] } }
    }}
  ]);
  const statsMap = Object.fromEntries(attemptStats.map((s) => [s._id.toString(), s]));
  return tests.map((t) => {
    const stats = statsMap[t._id.toString()] || {};
    return {
      ...t,
      questionCount: t.questions?.length || 0,
      questions: undefined,
      stats: {
        totalAttempts: stats.totalAttempts || 0,
        gradedAttempts: stats.gradedAttempts || 0,
        avgScore: stats.avgScore != null ? Math.round(stats.avgScore * 10) / 10 : null
      }
    };
  });
}

export async function createFinalTest(body) {
  return FinalTest.create(body);
}
