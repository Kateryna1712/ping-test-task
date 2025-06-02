import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import ping from "ping";

import 'dotenv/config'

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT"],
  })
);
app.use(bodyParser.json());

interface PingRequest {
  ip?: string;
}

app.post("/ping", async (req: Request, res: Response): Promise<void> => {
  try {
    const { ip }: PingRequest = req.body;

    if (!ip) {
      res.status(400).json({ error: "IP address is required" });
      return;
    }

    const result = await ping.promise.probe(ip, {
      timeout: 10,
      extra: ["-c", "4"],
    });

    if (result.output.includes("cannot resolve") || result.output.includes("Unknown host")) {
      res.status(404).json({ 
        error: "Hostname resolution failed",
        details: `The hostname '${ip}' could not be resolved`,
        originalOutput: result.output.trim()
      });
      return;
    }
    res.json(result);
  } catch (error) {
    console.error("Ping error:", error);
    res.status(500).json({ error: "Ping failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
