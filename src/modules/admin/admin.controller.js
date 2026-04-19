import { AuditLog } from "../../models/AuditLog.js";
import { TaskAssignment } from "../../models/TaskAssignment.js";
import { ApiError } from "../../utils/api-error.js";
import { ok, paginated } from "../../utils/response.js";
import { asyncHandler } from "../../utils/async-handler.js";

export const getAuditLogs = asyncHandler(async (req, res) => {
  const { action, entityType, page = 1, limit = 50 } = req.query;
  const filter = {};
  if (action) filter.action = { $regex: action, $options: "i" };
  if (entityType) filter.entityType = entityType;

  const [data, total] = await Promise.all([
    AuditLog.find(filter)
      .populate("actorId", "fullName email role")
      .sort({ at: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean(),
    AuditLog.countDocuments(filter)
  ]);
  return paginated(res, data, {
    page: Number(page),
    limit: Number(limit),
    total,
    totalPages: Math.ceil(total / Number(limit))
  });
});

export const reopenAssignment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { newDueAt, reason } = req.body;

  if (!newDueAt || !reason) throw ApiError.badRequest("newDueAt and reason are required");

  const assignment = await TaskAssignment.findById(id);
  if (!assignment) throw ApiError.notFound("Assignment not found");

  assignment.dueAt = new Date(newDueAt);
  assignment.closesAt = new Date(newDueAt);
  await assignment.save();

  await AuditLog.create({
    actorId: req.user._id,
    actorRole: "admin",
    action: "assignment.reopen",
    entityType: "task_assignment",
    entityId: assignment._id,
    metadata: { newDueAt, reason },
    ip: req.ip,
    userAgent: req.headers["user-agent"]
  });

  return ok(res, assignment);
});
