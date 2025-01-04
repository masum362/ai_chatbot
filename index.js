import dotenv from "dotenv";
dotenv.config();
import http from "http";
import app from "./app.js";
const server = http.createServer(app);
import connection from "./db/connection.js";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import * as projectServices from "./services/project.services.js";

const port = process.env.PORT || 3000;

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.use(async (socket, next) => {
  try {
    const token =
      socket.handshake.auth?.token ||
      socket.handshake.headers?.authorization?.split(" ")[1];

    const projectId = socket.handshake.query.projectId;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return next(new Error("Invalid project id"));
    }
    socket.project = await projectServices.getProjectById(projectId);

    if (!token) {
      return next(new Error("Authentication error"));
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded) {
      return next(new Error("Authentication error"));
    }
    socket.userId = decoded.id;
    next();
  } catch (error) {
    next(error);
  }
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.project._id.toString());
  socket.roomId = socket.project._id.toString();

  socket.join(socket.roomId);
  socket.on("project-message", (data) => {
    console.log(data);
    socket.broadcast.to(socket.roomId).emit("project-message", data);
  });

  socket.on("disconnect", () => {
    console.log("disconnect");
  });
});

connection();
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
