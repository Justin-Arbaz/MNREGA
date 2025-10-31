import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleMGNREGAData, handleCacheHealth, handleClearCache } from "./routes/mgnrega";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  // Demo endpoint
  app.get("/api/demo", handleDemo);

  // MGNREGA endpoints
  app.get("/api/mgnrega/data", handleMGNREGAData);
  app.get("/api/mgnrega/cache-health", handleCacheHealth);
  app.post("/api/mgnrega/clear-cache", handleClearCache);

  return app;
}
