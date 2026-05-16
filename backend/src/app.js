import express from "express";
import cors from "cors";
import clubRoutes from "./routes/club.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api/clubs", clubRoutes);

app.use(errorMiddleware);

export default app;
