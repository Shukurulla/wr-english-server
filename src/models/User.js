import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const studentInfoSchema = new Schema(
  {
    studentId: { type: String, trim: true },
    groupId: { type: Schema.Types.ObjectId, ref: "Group" },
    course: { type: Number, min: 1, max: 6 },
    enrollmentYear: Number,
    finalTestAttemptsAllowed: {
      type: Map,
      of: Number,
      default: () => new Map([["1", 1], ["2", 1]])
    }
  },
  { _id: false }
);

const teacherInfoSchema = new Schema(
  {
    department: String,
    groupIds: [{ type: Schema.Types.ObjectId, ref: "Group" }]
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["student", "teacher", "admin"], required: true },
    studentInfo: studentInfoSchema,
    teacherInfo: teacherInfoSchema,
    avatar: { type: String, default: null },
    isActive: { type: Boolean, default: true },
    mustChangePassword: { type: Boolean, default: false },
    lastLoginAt: Date
  },
  { timestamps: true }
);

userSchema.index({ "studentInfo.studentId": 1 }, { unique: true, sparse: true });
userSchema.index({ "studentInfo.groupId": 1 });
userSchema.index({ role: 1 });

userSchema.methods.verifyPassword = function (plain) {
  return bcrypt.compare(plain, this.passwordHash);
};

userSchema.statics.hashPassword = function (plain) {
  return bcrypt.hash(plain, 10);
};

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.passwordHash;
  return obj;
};

export const User = mongoose.model("User", userSchema);
