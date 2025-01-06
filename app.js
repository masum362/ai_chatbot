import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./router/user.router.js";
import projectRouter from "./router/project.route.js";
import aiRouter from './router/ai.route.js'

const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", userRouter);
app.use("/api/project", projectRouter);
app.use('/api/ai',aiRouter)

export default app;
