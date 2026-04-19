import * as assignmentsService from "./assignments.service.js";
import { ok, created, paginated } from "../../utils/response.js";
import { asyncHandler } from "../../utils/async-handler.js";

export const list = asyncHandler(async (req, res) => {
  const result = await assignmentsService.listAssignments(req.query);
  return paginated(res, result.data, result.meta);
});

export const my = asyncHandler(async (req, res) => {
  const data = await assignmentsService.getMyAssignments(req.user);
  return ok(res, data);
});

export const create = asyncHandler(async (req, res) => {
  const assignment = await assignmentsService.createAssignment(req.body, req.user._id);
  return created(res, assignment);
});

export const bulk = asyncHandler(async (req, res) => {
  const result = await assignmentsService.bulkAssign(req.body, req.user._id);
  return ok(res, result);
});

export const update = asyncHandler(async (req, res) => {
  const assignment = await assignmentsService.updateAssignment(req.params.id, req.body);
  return ok(res, assignment);
});
