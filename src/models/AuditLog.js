import mongoose from "mongoose";

const { Schema } = mongoose;

const auditLogSchema = new Schema({
  actorId: { type: Schema.Types.ObjectId, ref: "User" },
  actorRole: String,
  action: { type: String, required: true },
  entityType: String,
  entityId: Schema.Types.ObjectId,
  metadata: Schema.Types.Mixed,
  ip: String,
  userAgent: String,
  at: { type: Date, default: Date.now }
});

auditLogSchema.index({ actorId: 1, at: -1 });
auditLogSchema.index({ entityType: 1, entityId: 1 });
auditLogSchema.index({ action: 1, at: -1 });

export const AuditLog = mongoose.model("AuditLog", auditLogSchema);
