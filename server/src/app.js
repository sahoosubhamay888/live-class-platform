import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import { errorHandler } from "./middleware/error.middleware.js"
import authRouter from "./routes/auth.routes.js";
import sessionRouter from "./routes/session.route.js";

const app = express();

// Trust reverse proxy on Render/Railway
app.set("trust proxy", 1);

const clientUrl = process.env.CLIENT_URL ? process.env.CLIENT_URL.replace(/\/$/, "") : "http://localhost:5173";

// CORS config: allow frontend origin and credentials (cookies/headers)
const corsOption = {
  origin: [clientUrl, "http://localhost:5173"],
  credentials: true,
};

// Middlewares
app.use(cors(corsOption));
app.use(express.json()); // Parse incoming JSON request body (req.body)
app.use(cookieParser()) //parse the incoming cookie
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data
app.use("/api/auth", authRouter);
app.use("/api/session/", sessionRouter);
app.use(errorHandler); //execute manual error handler

export default app;
