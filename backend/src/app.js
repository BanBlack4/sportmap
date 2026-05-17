import express from "express";
import cors from "cors";
import clubRoutes from "./routes/club.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/api/clubs", clubRoutes);
app.use("/api/auth",authRoutes);
app.use(errorHandler);

export default app;