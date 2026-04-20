import mongoose from "mongoose";

const { Schema } = mongoose;

const gradeHistorySchema = new Schema(
  {
    score: Number,
    reason: String,
    by: { type: Schema.Types.ObjectId, ref: "User" },
    at: { type: Date, default: Date.now }
  },
  { _id: false }
);

const gradeSchema = new Schema(
  {
    submissionId: { type: Schema.Types.ObjectId, ref: "Submission", required: true, unique: true },
    studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    assignmentId: { type: Schema.Types.ObjectId, ref: "TaskAssignment" },
    taskId: { type: Schema.Types.ObjectId, ref: "Task", required: true },

    initialScore: { type: Number, required: true },
    finalScore: { type: Number, required: true },
    isFinalized: { type: Boolean, default: false },

    finalizedBy: { type: Schema.Types.ObjectId, ref: "User" },
    finalizedAt: Date,

    history: [gradeHistorySchema]
  },
  { timestamps: true }
);

gradeSchema.index({ studentId: 1, isFinalized: 1 });
gradeSchema.index({ assignmentId: 1 });

export const Grade = mongoose.model("Grade", gradeSchema);
