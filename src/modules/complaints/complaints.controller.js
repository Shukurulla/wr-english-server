import * as complaintsService from "./complaints.service.js";
import { ok, created } from "../../utils/response.js";
import { asyncHandler } from "../../utils/async-handler.js";

export const create = asyncHandler(async (req, res) => {
  const complaint = await complaintsService.createComplaint({
    ...req.body,
    studentId: req.user._id
  });
  return created(res, complaint);
});

export const myComplaints = asyncHandler(async (req, res) => {
  const data = await complaintsService.getMyComplaints(req.user._id);
  return ok(res, data);
});

export const teacherComplaints = asyncHandler(async (req, res) => {
  const data = await complaintsService.getTeacherComplaints(req.user._id, req.query.status, req.user.role);
  return ok(res, data);
});

export const resolve = asyncHandler(async (req, res) => {
  const complaint = await complaintsService.resolveComplaint(req.params.id, req.body, req.user._id, req.user.role);
  return ok(res, complaint);
});
