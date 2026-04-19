import { buildApp } from "./app.js";
import { config } from "./config/env.js";
import { connectDb } from "./config/db.js";
import { logger } from "./utils/logger.js";

async function start() {
  await connectDb();
  const app = buildApp();
  const server = app.listen(config.PORT, () => {
    logger.info({ port: config.PORT, env: config.NODE_ENV }, "Server started");
  });

  const shutdown = (signal) => {
    logger.info({ signal }, "Shutting down");
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(1), 10000).unref();
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}

start().catch((err) => {
  logger.fatal({ err }, "Failed to start server");
  process.exit(1);
});
