import mongoose from "mongoose";

const { Schema } = mongoose;

const complaintSchema = new Schema(
  {
    submissionId: { type: Schema.Types.ObjectId, ref: "Submission", required: true, unique: true },
    studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    assignmentId: { type: Schema.Types.ObjectId, ref: "TaskAssignment" },
    teacherId: { type: Schema.Types.ObjectId, ref: "User" },

    reason: { type: String, required: true, minlength: 20, maxlength: 1000 },
    status: {
      type: String,
      enum: ["open", "in_review", "resolved", "rejected"],
      default: "open"
    },

    resolution: {
      decision: { type: String, enum: ["increased", "decreased", "unchanged"] },
      newScore: Number,
      teacherComment: String,
      resolvedAt: Date
    }
  },
  { timestamps: true }
);

complaintSchema.index({ teacherId: 1, status: 1 });
complaintSchema.index({ studentId: 1 });

export const Complaint = mongoose.model("Complaint", complaintSchema);
