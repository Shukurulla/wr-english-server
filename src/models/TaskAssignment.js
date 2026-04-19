import mongoose from "mongoose";

const { Schema } = mongoose;

const taskAssignmentSchema = new Schema(
  {
    taskId: { type: Schema.Types.ObjectId, ref: "Task", required: true },
    groupId: { type: Schema.Types.ObjectId, ref: "Group", required: true },
    semester: { type: Number, enum: [1, 2], required: true },
    academicYear: { type: String, required: true },

    opensAt: { type: Date, required: true },
    dueAt: { type: Date, required: true },
    closesAt: { type: Date, required: true },

    assignedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

taskAssignmentSchema.index({ taskId: 1, groupId: 1 }, { unique: true });
taskAssignmentSchema.index({ groupId: 1, opensAt: 1 });
taskAssignmentSchema.index({ dueAt: 1 });

taskAssignmentSchema.virtual("status").get(function () {
  const now = new Date();
  if (now < this.opensAt) return "upcoming";
  if (now > this.closesAt) return "closed";
  return "open";
});

export const TaskAssignment = mongoose.model("TaskAssignment", taskAssignmentSchema);
