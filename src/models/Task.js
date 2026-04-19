import mongoose from "mongoose";

const { Schema } = mongoose;

const readingQuestionSchema = new Schema({
  questionType: {
    type: String,
    enum: ["multiple_choice", "true_false_not_given", "matching_headings"],
    required: true
  },
  prompt: { type: String, required: true },
  options: [String],
  correctAnswer: Schema.Types.Mixed,
  points: { type: Number, required: true }
});

const taskSchema = new Schema(
  {
    type: { type: String, enum: ["reading", "writing"], required: true },
    semester: { type: Number, enum: [1, 2], required: true },
    order: { type: Number, required: true },
    title: { type: String, required: true },
    topic: String,
    maxScore: { type: Number, required: true },

    reading: {
      passage: String,
      questions: [readingQuestionSchema]
    },

    writing: {
      instructions: String,
      minWords: Number,
      maxWords: Number,
      timeLimit: { type: Number, default: 1200 },
      rubric: {
        semester: Number,
        bands: [Number]
      },
      guidingQuestions: [String]
    },

    isActive: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

taskSchema.index({ type: 1, semester: 1, order: 1 }, { unique: true });
taskSchema.index({ topic: 1 });

export const Task = mongoose.model("Task", taskSchema);
