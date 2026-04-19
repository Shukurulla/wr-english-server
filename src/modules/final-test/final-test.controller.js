import * as finalTestService from "./final-test.service.js";
import { ok, created } from "../../utils/response.js";
import { asyncHandler } from "../../utils/async-handler.js";

export const start = asyncHandler(async (req, res) => {
  const semester = req.query.semester || 1;
  const groupId = req.user.studentInfo?.groupId;
  const result = await finalTestService.startAttempt(req.user._id, Number(semester), groupId);
  return created(res, result);
});

export const submit = asyncHandler(async (req, res) => {
  const attempt = await finalTestService.submitAttempt(
    req.body.attemptId,
    req.body.answers,
    req.user._id
  );
  return ok(res, attempt);
});

export const myAttempt = asyncHandler(async (req, res) => {
  const attempt = await finalTestService.getMyAttempt(req.user._id, req.query.semester || 1);
  return ok(res, attempt);
});

export const forceSubmitExpired = asyncHandler(async (req, res) => {
  const attempt = await finalTestService.forceSubmitExpired(req.body.attemptId, req.user._id);
  return ok(res, attempt);
});

export const resetAttempt = asyncHandler(async (req, res) => {
  const result = await finalTestService.resetAttempt(req.params.id, req.user._id);
  return ok(res, result);
});

export const groupAttempts = asyncHandler(async (req, res) => {
  const data = await finalTestService.getGroupAttempts(req.params.groupId, req.query.semester || 1);
  return ok(res, data);
});

export const list = asyncHandler(async (req, res) => {
  const tests = await finalTestService.listFinalTests();
  return ok(res, tests);
});

export const create = asyncHandler(async (req, res) => {
  const test = await finalTestService.createFinalTest(req.body);
  return created(res, test);
});
