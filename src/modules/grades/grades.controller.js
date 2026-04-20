import * as gradesService from "./grades.service.js";
import { ok } from "../../utils/response.js";
import { asyncHandler } from "../../utils/async-handler.js";

export const myGrades = asyncHandler(async (req, res) => {
  const data = await gradesService.getMyGrades(req.user._id, req.query);
  return ok(res, data);
});

export const groupGrades = asyncHandler(async (req, res) => {
  const data = await gradesService.getGroupGrades(req.params.groupId, req.query.semester, req.user._id);
  return ok(res, data);
});

export const finalize = asyncHandler(async (req, res) => {
  const grade = await gradesService.finalizeGrade(req.params.id, req.body, req.user._id, req.user.role);
  return ok(res, grade);
});

export const override = asyncHandler(async (req, res) => {
  const grade = await gradesService.overrideGrade(req.params.id, req.body, req.user._id, req.user.role);
  return ok(res, grade);
});
