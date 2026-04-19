import mongoose from "mongoose";

const { Schema } = mongoose;

const groupSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    course: { type: Number, required: true, min: 1, max: 6 },
    semester: { type: Number, required: true, enum: [1, 2] },
    academicYear: { type: String, required: true },
    teacherId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    studentCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

groupSchema.index({ teacherId: 1 });
groupSchema.index({ semester: 1, academicYear: 1 });

export const Group = mongoose.model("Group", groupSchema);
