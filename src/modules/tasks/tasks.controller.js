import * as tasksService from "./tasks.service.js";
import { ok, created, paginated } from "../../utils/response.js";
import { asyncHandler } from "../../utils/async-handler.js";

export const list = asyncHandler(async (req, res) => {
  const result = await tasksService.listTasks(req.query);
  return paginated(res, result.data, result.meta);
});

export const get = asyncHandler(async (req, res) => {
  const task = await tasksService.getTask(req.params.id);
  return ok(res, task);
});

export const create = asyncHandler(async (req, res) => {
  const task = await tasksService.createTask(req.body, req.user._id);
  return created(res, task);
});

export const update = asyncHandler(async (req, res) => {
  const task = await tasksService.updateTask(req.params.id, req.body);
  return ok(res, task);
});

export const remove = asyncHandler(async (req, res) => {
  const task = await tasksService.deleteTask(req.params.id);
  return ok(res, task);
});
