// src/app.ts
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import addressRoutes from "./routes/address.routes";
import projectRoutes from "./routes/project.routes";
import userProjectRoutes from "./routes/userProject.routes";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use("/users", userRoutes);
app.use("/addresses", addressRoutes);
app.use("/projects", projectRoutes);
app.use("/user-projects", userProjectRoutes);

// Middleware genérico de tratamento de erros (opcional)
app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(err);
    res.status(500).json({ message: "Erro interno", details: err.message });
  }
);

export default app;
