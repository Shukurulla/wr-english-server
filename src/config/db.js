import mongoose from "mongoose";
import { config } from "./env.js";
import { logger } from "../utils/logger.js";

mongoose.set("strictQuery", true);

export async function connectDb() {
  await mongoose.connect(config.MONGO_URI, {
    autoIndex: config.NODE_ENV !== "production"
  });
  logger.info({ uri: maskUri(config.MONGO_URI) }, "MongoDB connected");
}

export async function disconnectDb() {
  await mongoose.disconnect();
}

function maskUri(uri) {
  return uri.replace(/\/\/([^:]+):([^@]+)@/, "//$1:****@");
}
