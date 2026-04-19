import { Grade } from "../../models/Grade.js";
import { User } from "../../models/User.js";
import { TaskAssignment } from "../../models/TaskAssignment.js";
import { FinalTestAttempt } from "../../models/FinalTestAttempt.js";
import { Submission } from "../../models/Submission.js";
import { round1 } from "../../services/grader.service.js";

export async function getGroupSummary(groupId, semester) {
  const students = await User.find({
    "studentInfo.groupId": groupId,
    isActive: true,
    role: "student"
  })
    .select("fullName email studentInfo")
    .sort({ fullName: 1 })
    .lean();

  const assignments = await TaskAssignment.find({ groupId, semester }).lean();
  const assignmentIds = assignments.map((a) => a._id);
  const totalTasks = assignments.length;

  const results = [];

  for (const student of students) {
    const grades = await Grade.find({
      studentId: student._id,
      assignmentId: { $in: assignmentIds },
      isFinalized: true
    })
      .populate("taskId", "type")
      .lean();

    let readingScore = 0;
    let writingScore = 0;
    let submitted = 0;

    for (const g of grades) {
      submitted++;
      if (g.taskId?.type === "reading") readingScore += g.finalScore;
      else writingScore += g.finalScore;
    }

    const finalTest = await FinalTestAttempt.findOne({
      studentId: student._id,
      isFinalized: true
    }).lean();
    const finalTestScore = finalTest?.totalScore || 0;
    const totalScore = round1(readingScore + writingScore + finalTestScore);

    results.push({
      studentId: student._id,
      fullName: student.fullName,
      email: student.email,
      readingScore: round1(readingScore),
      writingScore: round1(writingScore),
      finalTestScore: round1(finalTestScore),
      totalScore,
      passed: totalScore >= 12,
      completionRate: totalTasks > 0 ? round1(submitted / totalTasks) : 0
    });
  }

  return { groupId, semester, totalTasks, students: results };
}

export async function getAssignmentStats(assignmentId) {
  const submissions = await Submission.find({ assignmentId }).lean();
  const grades = await Grade.find({ assignmentId, isFinalized: true }).lean();

  const scores = grades.map((g) => g.finalScore);
  const avgScore = scores.length > 0 ? round1(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

  return {
    assignmentId,
    totalSubmissions: submissions.length,
    gradedCount: grades.length,
    averageScore: avgScore,
    maxScore: scores.length > 0 ? Math.max(...scores) : 0,
    minScore: scores.length > 0 ? Math.min(...scores) : 0
  };
}
