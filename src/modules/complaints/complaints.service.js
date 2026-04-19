import { Complaint } from "../../models/Complaint.js";
import { Grade } from "../../models/Grade.js";
import { Task } from "../../models/Task.js";
import { Submission } from "../../models/Submission.js";
import { TaskAssignment } from "../../models/TaskAssignment.js";
import { AuditLog } from "../../models/AuditLog.js";
import { ApiError } from "../../utils/api-error.js";

export async function createComplaint({ submissionId, reason, studentId }) {
  const submission = await Submission.findById(submissionId);
  if (!submission) throw ApiError.notFound("Submission topilmadi");
  if (submission.studentId.toString() !== studentId.toString()) throw ApiError.forbidden();

  const grade = await Grade.findOne({ submissionId });
  if (!grade || !grade.isFinalized) {
    throw ApiError.unprocessable("Baho tasdiqlanmagan. Tasdiqlangandan keyin shikoyat berishingiz mumkin.");
  }

  const assignment = await TaskAssignment.findById(submission.assignmentId).populate("groupId");
  const teacherId = assignment?.groupId?.teacherId || assignment?.assignedBy;

  // KRITIK #3: race-safe — unique index xatosini 409 sifatida qaytarish
  try {
    return await Complaint.create({
      submissionId, studentId,
      assignmentId: submission.assignmentId,
      teacherId, reason, status: "open"
    });
  } catch (err) {
    if (err.code === 11000) throw ApiError.conflict("Bu topshiriq uchun allaqachon shikoyat berilgan");
    throw err;
  }
}

export async function getMyComplaints(studentId) {
  return Complaint.find({ studentId })
    .populate("submissionId", "type totalScore status")
    .sort({ createdAt: -1 })
    .lean();
}

export async function getTeacherComplaints(teacherId, status) {
  const filter = { teacherId };
  if (status) filter.status = status;
  return Complaint.find(filter)
    .populate("studentId", "fullName email")
    .populate("submissionId", "type totalScore")
    .sort({ createdAt: -1 })
    .lean();
}

// HIGH #6: newScore majburiy (decision !== "unchanged" bo'lsa) va diapazoni tekshiriladi
export async function resolveComplaint(complaintId, { decision, newScore, teacherComment }, teacherId) {
  const complaint = await Complaint.findById(complaintId);
  if (!complaint) throw ApiError.notFound("Shikoyat topilmadi");
  if (complaint.teacherId.toString() !== teacherId.toString()) throw ApiError.forbidden();
  if (complaint.status === "resolved" || complaint.status === "rejected") {
    throw ApiError.conflict("Shikoyat allaqachon hal qilingan");
  }

  if (decision !== "unchanged") {
    if (newScore === undefined || newScore === null) {
      throw ApiError.badRequest("Yangi ball kiritish majburiy (agar bahoni o'zgartirmoqchi bo'lsangiz)");
    }
    // Score diapazoni tekshirish
    const grade = await Grade.findOne({ submissionId: complaint.submissionId });
    if (grade) {
      const task = await Task.findById(grade.taskId);
      if (task && (newScore < 0 || newScore > task.maxScore)) {
        throw ApiError.badRequest(`Score must be between 0 and ${task.maxScore}`);
      }
    }
  }

  complaint.status = "resolved";
  complaint.resolution = {
    decision,
    newScore: decision !== "unchanged" ? newScore : undefined,
    teacherComment,
    resolvedAt: new Date()
  };
  await complaint.save();

  if (decision !== "unchanged" && newScore !== undefined) {
    const grade = await Grade.findOne({ submissionId: complaint.submissionId });
    if (grade) {
      const oldScore = grade.finalScore;
      grade.finalScore = newScore;
      grade.history.push({
        score: newScore,
        reason: `complaint_resolved: ${decision}`,
        by: teacherId,
        at: new Date()
      });
      await grade.save();

      await AuditLog.create({
        actorId: teacherId, actorRole: "teacher",
        action: "complaint.resolve",
        entityType: "complaint", entityId: complaint._id,
        metadata: { decision, oldScore, newScore, teacherComment }
      });
    }
  }

  return complaint;
}
