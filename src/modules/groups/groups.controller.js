import * as groupsService from "./groups.service.js";
import { ok, created, paginated } from "../../utils/response.js";
import { asyncHandler } from "../../utils/async-handler.js";

export const listPublic = asyncHandler(async (_req, res) => {
  const groups = await groupsService.listPublicGroups();
  return ok(res, groups);
});

export const list = asyncHandler(async (req, res) => {
  const result = await groupsService.listGroups(req.query, req.user);
  return paginated(res, result.data, result.meta);
});

export const create = asyncHandler(async (req, res) => {
  const group = await groupsService.createGroup(req.body);
  return created(res, group);
});

export const update = asyncHandler(async (req, res) => {
  const group = await groupsService.updateGroup(req.params.id, req.body);
  return ok(res, group);
});

export const getStudents = asyncHandler(async (req, res) => {
  const students = await groupsService.getGroupStudents(req.params.id);
  return ok(res, students);
});

export const addStudents = asyncHandler(async (req, res) => {
  const result = await groupsService.addStudentsToGroup(req.params.id, req.body.studentIds);
  return ok(res, result);
});
