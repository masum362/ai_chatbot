import dotenv from "dotenv";
dotenv.config();
import http from "http";
import app from "./app.js";
const server = http.createServer(app);
import connection from "./db/connection.js";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";

const port = process.env.PORT || 3000;

const io = new Server(server
  ,{
  cors:{
    origin:"*",
  }
}
);

io.use((socket, next) => {
  try {
    const token =
      socket.handshake.auth?.token ||
      socket.handshake.headers?.authorization?.split(" ")[1];
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

  console.log("a user connected");
  socket.on("event", (data) => {
    console.log("event", data);
  });
  socket.on("disconnect", () => {
    console.log("disconnect");
  });
});

connection();
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
