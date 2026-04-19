import "dotenv/config";
import mongoose from "mongoose";
import { config } from "../config/env.js";
import { User } from "../models/User.js";

async function seed() {
  await mongoose.connect(config.MONGO_URI);
  console.log("Connected to", config.MONGO_URI);

  const adminExists = await User.findOne({ email: "admin@platform.uz" });
  if (!adminExists) {
    const passwordHash = await User.hashPassword("admin12345");
    await User.create({
      fullName: "Platform Admin",
      email: "admin@platform.uz",
      passwordHash,
      role: "admin"
    });
    console.log("Admin created: admin@platform.uz / admin12345");
  } else {
    console.log("Admin already exists");
  }

  const teacherExists = await User.findOne({ email: "teacher@platform.uz" });
  if (!teacherExists) {
    const passwordHash = await User.hashPassword("teacher12345");
    await User.create({
      fullName: "Test Teacher",
      email: "teacher@platform.uz",
      passwordHash,
      role: "teacher",
      teacherInfo: { department: "English" }
    });
    console.log("Teacher created: teacher@platform.uz / teacher12345");
  } else {
    console.log("Teacher already exists");
  }

  const studentExists = await User.findOne({ email: "student@platform.uz" });
  if (!studentExists) {
    const passwordHash = await User.hashPassword("student12345");
    await User.create({
      fullName: "Test Student",
      email: "student@platform.uz",
      passwordHash,
      role: "student",
      studentInfo: { studentId: "STD-001", course: 1, enrollmentYear: 2026 }
    });
    console.log("Student created: student@platform.uz / student12345");
  } else {
    console.log("Student already exists");
  }

  await mongoose.disconnect();
  console.log("Done");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
