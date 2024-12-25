import dotenv from "dotenv";
dotenv.config();
import http from "http";
import app from "./app.js";
const server = http.createServer(app);
import connection from "./db/connection.js";

const port = process.env.PORT || 3000;

connection();
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
