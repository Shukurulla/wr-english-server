import mongoose from "mongoose";
import { config } from "./env.js";
import { logger } from "../utils/logger.js";

mongoose.set("strictQuery", true);

// Legacy indexes that must be dropped on startup after the schema change
// that made `assignmentId` optional. Leaving them in place causes E11000
// duplicate-key errors on the second submission / complaint a student creates.
const LEGACY_INDEXES = [
  { collection: "submissions", index: "studentId_1_assignmentId_1" },
  { collection: "grades", index: "assignmentId_1" },
];

async function dropLegacyIndexes() {
  const db = mongoose.connection.db;
  for (const { collection, index } of LEGACY_INDEXES) {
    try {
      await db.collection(collection).dropIndex(index);
      logger.info({ collection, index }, "Dropped legacy index");
    } catch (err) {
      // 27 = IndexNotFound, 26 = NamespaceNotFound (collection doesn't exist yet)
      if (err?.codeName === "IndexNotFound" || err?.code === 27 || err?.code === 26) continue;
      logger.warn({ collection, index, err: err.message }, "Could not drop legacy index");
    }
  }
}

export async function connectDb() {
  await mongoose.connect(config.MONGO_URI, {
    autoIndex: config.NODE_ENV !== "production"
  });
  logger.info({ uri: maskUri(config.MONGO_URI) }, "MongoDB connected");

  await dropLegacyIndexes();

  // Ensure the new indexes exist on all environments (autoIndex is off in prod)
  try {
    await Promise.all(
      Object.values(mongoose.models).map((m) => m.syncIndexes())
    );
    logger.info("Indexes synchronized");
  } catch (err) {
    logger.warn({ err: err.message }, "Index sync failed");
  }
}

export async function disconnectDb() {
  await mongoose.disconnect();
}

function maskUri(uri) {
  return uri.replace(/\/\/([^:]+):([^@]+)@/, "//$1:****@");
}
