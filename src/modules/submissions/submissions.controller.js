import * as submissionsService from "./submissions.service.js";
import { ok, created, paginated } from "../../utils/response.js";
import { asyncHandler } from "../../utils/async-handler.js";

export const start = asyncHandler(async (req, res) => {
  const result = await submissionsService.startSubmission({
    assignmentId: req.body.assignmentId,
    studentId: req.user._id
  });
  return created(res, result);
});

export const get = asyncHandler(async (req, res) => {
  const sub = await submissionsService.getSubmission(req.params.id, req.user._id, req.user.role);
  return ok(res, sub);
});

export const list = asyncHandler(async (req, res) => {
  const result = await submissionsService.listSubmissions(req.query);
  return paginated(res, result.data, result.meta);
});

export const answerReading = asyncHandler(async (req, res) => {
  const sub = await submissionsService.answerReading(
    req.params.id,
    req.body.answers,
    req.user._id
  );
  return ok(res, sub);
});

export const submitWriting = asyncHandler(async (req, res) => {
  const sub = await submissionsService.submitWriting(
    req.params.id,
    { text: req.body.text, meta: req.body.meta },
    req.user._id
  );
  return ok(res, sub);
});

export const saveDraft = asyncHandler(async (req, res) => {
  const result = await submissionsService.saveDraft(req.params.id, req.body.text, req.user._id);
  return ok(res, result);
});

export const restart = asyncHandler(async (req, res) => {
  const result = await submissionsService.restartSubmission(
    req.params.id, 
    req.user._id
  );
  return created(res, result);
});
