import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import { errorHandler } from "./middleware/error.middleware.js"
import authRouter from "./routes/auth.routes.js";
import sessionRouter from "./routes/session.route.js";

const app = express();

// Trust reverse proxy on Render/Railway
app.set("trust proxy", 1);

// Flexible and secure CORS configuration
const corsOption = {
  origin: (origin, callback) => {
    // 1. Allow non-browser requests (Postman, health checks, curl)
    if (!origin) return callback(null, true);
    const clientUrl = process.env.CLIENT_URL
      ? process.env.CLIENT_URL.trim().replace(/\/$/, "")
      : "";
    // 2. Allow your Vercel URL, any *.vercel.app preview URL, and localhost
    if (
      origin === clientUrl ||
      origin.endsWith(".vercel.app") ||
      origin.includes("localhost")
    ) {
      return callback(null, true);
    }
    return callback(new Error(`CORS origin not allowed: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie", "X-Requested-With"],
};

// Middlewares
app.use(cors(corsOption));
app.use(express.json()); // Parse incoming JSON request body (req.body)
app.use(cookieParser()) //parse the incoming cookie
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data
// Root route 
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "EduSync API is running smoothly",
    status: "online",
  });
});
app.use("/api/auth", authRouter);
app.use("/api/session/", sessionRouter);
app.use(errorHandler); //execute manual error handler

export default app;