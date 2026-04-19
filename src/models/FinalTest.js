import mongoose from "mongoose";

const { Schema } = mongoose;

const finalTestQuestionSchema = new Schema({
  prompt: { type: String, required: true },
  options: { type: [String], required: true, validate: (v) => v.length >= 2 },
  correctAnswerIndex: { type: Number, required: true, min: 0 }
});

const finalTestSchema = new Schema(
  {
    semester: { type: Number, enum: [1, 2], required: true },
    academicYear: { type: String, required: true },
    title: { type: String, required: true },
    totalQuestions: { type: Number, default: 20 },
    pointsPerQuestion: { type: Number, default: 0.1 },
    timeLimit: { type: Number, default: 1200 },
    questions: { type: [finalTestQuestionSchema], required: true },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

finalTestSchema.index({ semester: 1, academicYear: 1 }, { unique: true });

export const FinalTest = mongoose.model("FinalTest", finalTestSchema);
