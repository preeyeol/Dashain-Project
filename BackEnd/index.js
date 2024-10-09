require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const app = express();

const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server);

app.use(express.json());

const { userRoute } = require("./route/userRoute");
const tikaRoute = require("./route/tikaRoute");

app.use("/api", userRoute);
app.use("/api", tikaRoute);

io.on("connection", () => {
  console.log("A user is connected to Dashain Project");
});

mongoose
  .connect("mongodb://localhost:27017/dashainproject1")
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch(() => {
    console.log("Can't connect to mongoDB");
  });

server.listen(8090, () => {
  console.log("The Server is running on port 8090");
});
