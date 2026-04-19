import { Group } from "../../models/Group.js";
import { User } from "../../models/User.js";
import { ApiError } from "../../utils/api-error.js";

export async function listGroups({ semester, academicYear, page, limit }, user) {
  const filter = {};
  if (semester) filter.semester = semester;
  if (academicYear) filter.academicYear = academicYear;
  if (user.role === "teacher") filter.teacherId = user._id;

  const [data, total] = await Promise.all([
    Group.find(filter)
      .populate("teacherId", "fullName email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Group.countDocuments(filter)
  ]);
  return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
}

export async function listPublicGroups() {
  return Group.find({ isActive: true })
    .select("name course semester academicYear")
    .sort({ name: 1 })
    .lean();
}

export async function createGroup(body) {
  return Group.create(body);
}

export async function updateGroup(id, body) {
  const group = await Group.findByIdAndUpdate(id, body, { new: true, runValidators: true });
  if (!group) throw ApiError.notFound("Group not found");
  return group;
}

export async function getGroupStudents(groupId) {
  return User.find({ "studentInfo.groupId": groupId, isActive: true })
    .select("-passwordHash")
    .sort({ fullName: 1 })
    .lean();
}

export async function addStudentsToGroup(groupId, studentIds) {
  const group = await Group.findById(groupId);
  if (!group) throw ApiError.notFound("Group not found");

  const result = await User.updateMany(
    { _id: { $in: studentIds }, role: "student" },
    { $set: { "studentInfo.groupId": groupId } }
  );

  group.studentCount = await User.countDocuments({
    "studentInfo.groupId": groupId,
    isActive: true
  });
  await group.save();

  return { modified: result.modifiedCount, studentCount: group.studentCount };
}
