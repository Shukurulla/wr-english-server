import * as reportsService from "./reports.service.js";
import { ok } from "../../utils/response.js";
import { asyncHandler } from "../../utils/async-handler.js";

export const groupSummary = asyncHandler(async (req, res) => {
  const data = await reportsService.getGroupSummary(req.params.groupId, Number(req.query.semester || 1));
  return ok(res, data);
});

export const assignmentStats = asyncHandler(async (req, res) => {
  const data = await reportsService.getAssignmentStats(req.params.assignmentId);
  return ok(res, data);
});
