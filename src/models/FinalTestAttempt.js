import mongoose from "mongoose";

const { Schema } = mongoose;

const attemptAnswerSchema = new Schema(
  {
    questionId: { type: Schema.Types.ObjectId, required: true },
    selectedIndex: { type: Number },
    isCorrect: Boolean
  },
  { _id: false }
);

const finalTestAttemptSchema = new Schema(
  {
    finalTestId: { type: Schema.Types.ObjectId, ref: "FinalTest", required: true },
    studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    groupId: { type: Schema.Types.ObjectId, ref: "Group" },

    attemptNumber: { type: Number, default: 1, min: 1 },

    status: {
      type: String,
      enum: ["in_progress", "submitted", "graded"],
      default: "in_progress"
    },
    startedAt: Date,
    submittedAt: Date,
    timeSpentSec: Number,

    answers: [attemptAnswerSchema],
    correctCount: { type: Number, default: 0 },
    totalScore: { type: Number, default: 0 },
    isFinalized: { type: Boolean, default: false }
  },
  { timestamps: true }
);

finalTestAttemptSchema.index(
  { studentId: 1, finalTestId: 1, attemptNumber: 1 },
  { unique: true }
);

export const FinalTestAttempt = mongoose.model("FinalTestAttempt", finalTestAttemptSchema);
