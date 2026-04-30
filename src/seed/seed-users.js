import "dotenv/config";
import mongoose from "mongoose";
import { config } from "../config/env.js";
import { User } from "../models/User.js";

const ADMINS = [
  { fullName: "Platform Admin", email: "admin@platform.uz", password: "admin12345" },
  { fullName: "Admin Two", email: "admin2@platform.uz", password: "admin12345" },
  { fullName: "Admin Three", email: "admin3@platform.uz", password: "admin12345" },
];

const TEACHERS = [
  { fullName: "Test Teacher", email: "teacher@platform.uz", password: "teacher12345", department: "English" },
  { fullName: "Musa Teacher", email: "musa@platform.uz", password: "teacher12345", department: "English" },
  { fullName: "Aigerim Teacher", email: "aigerim@platform.uz", password: "teacher12345", department: "English" },
  { fullName: "Dilnoza Teacher", email: "dilnoza@platform.uz", password: "teacher12345", department: "English" },
];

const STUDENTS = [
  { fullName: "Test Student", email: "student@platform.uz", password: "student12345", studentId: "STD-001" },
];

async function upsertUser({ role, fullName, email, password, ...extra }) {
  const exists = await User.findOne({ email });
  if (exists) return { email, status: "skipped" };

  const passwordHash = await User.hashPassword(password);
  const doc = { fullName, email, passwordHash, role };
  if (role === "teacher") doc.teacherInfo = { department: extra.department };
  if (role === "student") doc.studentInfo = { studentId: extra.studentId, course: 1, enrollmentYear: 2026 };

  await User.create(doc);
  return { email, status: "created", password };
}

async function seed() {
  await mongoose.connect(config.MONGO_URI);
  console.log("Connected to", config.MONGO_URI);

  const results = [];
  for (const a of ADMINS) results.push(await upsertUser({ role: "admin", ...a }));
  for (const t of TEACHERS) results.push(await upsertUser({ role: "teacher", ...t }));
  for (const s of STUDENTS) results.push(await upsertUser({ role: "student", ...s }));

  for (const r of results) {
    if (r.status === "created") {
      console.log(`Created: ${r.email} / ${r.password}`);
    } else {
      console.log(`Skipped (exists): ${r.email}`);
    }
  }

  await mongoose.disconnect();
  console.log("Done");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
