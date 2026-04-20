import mongoose from "mongoose";

const { Schema } = mongoose;

const readingAnswerSchema = new Schema({
  questionId: { type: Schema.Types.ObjectId, required: true },
  answer: Schema.Types.Mixed,
  isCorrect: Boolean,
  pointsAwarded: { type: Number, default: 0 }
});

const aiCriterionSchema = new Schema(
  {
    band: Number,
    comment: String
  },
  { _id: false }
);

const submissionSchema = new Schema(
  {
    assignmentId: { type: Schema.Types.ObjectId, ref: "TaskAssignment" },
    taskId: { type: Schema.Types.ObjectId, ref: "Task", required: true },
    studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["reading", "writing"], required: true },

    status: {
      type: String,
      enum: [
        "in_progress",
        "submitted",
        "auto_graded",
        "ai_graded",
        "manual_review",
        "regrade_requested",
        "finalized"
      ],
      default: "in_progress"
    },

    reading: {
      answers: [readingAnswerSchema]
    },

    writing: {
      text: String,
      wordCount: Number,
      startedAt: Date,
      submittedAt: Date,
      timeSpentSec: Number,
      isLate: { type: Boolean, default: false },
      meta: {
        pasteEvents: [{ at: Date, chars: Number }],
        totalPastedChars: { type: Number, default: 0 },
        typedChars: { type: Number, default: 0 },
        tabSwitches: [{ at: Date, durationMs: Number }]
      },
      aiEvaluation: {
        band: Number,
        criteria: {
          taskResponse: aiCriterionSchema,
          coherenceCohesion: aiCriterionSchema,
          lexicalResource: aiCriterionSchema,
          grammaticalRangeAccuracy: aiCriterionSchema
        },
        overallComment: String,
        model: String,
        promptVersion: String,
        tokensIn: Number,
        tokensOut: Number,
        evaluatedAt: Date
      }
    },

    totalScore: { type: Number, default: 0 }
  },
  { timestamps: true }
);

submissionSchema.index(
  { studentId: 1, taskId: 1 },
  { unique: true, partialFilterExpression: { taskId: { $exists: true } } }
);
submissionSchema.index({ assignmentId: 1, status: 1 });
submissionSchema.index({ taskId: 1, status: 1 });
submissionSchema.index({ studentId: 1, status: 1 });

export const Submission = mongoose.model("Submission", submissionSchema);
