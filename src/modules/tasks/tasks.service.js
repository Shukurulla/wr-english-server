import { Task } from "../../models/Task.js";
import { ApiError } from "../../utils/api-error.js";

export async function listTasks({ type, semester, page, limit }) {
  const filter = { isActive: true };
  if (type) filter.type = type;
  if (semester) filter.semester = semester;

  const [data, total] = await Promise.all([
    Task.find(filter)
      .sort({ semester: 1, order: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Task.countDocuments(filter)
  ]);
  return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
}

export async function getTask(id) {
  const task = await Task.findById(id).lean();
  if (!task) throw ApiError.notFound("Task not found");
  return task;
}

export async function createTask(body, userId) {
  return Task.create({ ...body, createdBy: userId });
}

export async function updateTask(id, body) {
  const task = await Task.findByIdAndUpdate(id, body, { new: true, runValidators: true });
  if (!task) throw ApiError.notFound("Task not found");
  return task;
}

export async function deleteTask(id) {
  const task = await Task.findByIdAndUpdate(id, { isActive: false }, { new: true });
  if (!task) throw ApiError.notFound("Task not found");
  return task;
}
