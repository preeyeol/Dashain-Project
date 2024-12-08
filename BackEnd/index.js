require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const app = express();

const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());

const userRoute = require("./route/userRoute");
const tikaRoute = require("./route/tikaRoute");
const eventRoute = require("./route/eventRoute");
const dashRoute = require("./route/dashboardRoute");
const photoRoute = require("./route/photoRoute");
const searchRoute = require("./route/searchRoute");
const profileRoute = require("./route/profileRoute");
// const AppError = require("./utils/appError");

const errorHandler = require("./middleware/errorMiddleware");

app.get("/errorTest", (req, res) => {
  const error = new Error("Developement Error", 500);
  throw error;
});

app.use("/api", userRoute);
app.use("/api", tikaRoute);
app.use("/api", eventRoute);
app.use("/api/dashboard", dashRoute);
app.use("/api/photos", photoRoute);
app.use("/api", searchRoute);
app.use("/api", profileRoute);

const socketVerify = require("./middleware/socketMiddleware");
const socketHandle = require("./socket/socket");

io.use(socketVerify);
socketHandle(io);

app.set("io", io);

const dashainEvents = [
  {
    title: "Ghatasthapana",
    date: "2024-10-12",
    description: "The first day of Dashain festival.",
    isDashainEvent: true,
  },
  {
    title: "Fulpati",
    date: "2024-10-18",
    description: "The seventh day of Dashain.",
    isDashainEvent: true,
  },
  {
    title: "Maha Ashtami",
    date: "2024-10-19",
    description: "The eighth day of Dashain.",
    isDashainEvent: true,
  },
  {
    title: "Maha Navami",
    date: "2024-10-20",
    description: "The ninth day of Dashain.",
    isDashainEvent: true,
  },
  {
    title: "Vijaya Dashami",
    date: "2024-10-21",
    description: "The main day for receiving tika and blessings.",
    isDashainEvent: true,
  },
  {
    title: "Kojagrat Purnima",
    date: "2024-10-28",
    description: "The final day of Dashain.",
    isDashainEvent: true,
  },
];

// app.use(errorHandler);
const eventSchema = require("./model/eventSchema");

mongoose
  .connect("mongodb://localhost:27017/dashainproject1")
  .then(async () => {
    console.log("Connected to MongoDB");

    // Check if Dashain events already exist and insert if they do not
    for (let event of dashainEvents) {
      const existingEvent = await eventSchema.findOne({
        title: event.title,
        date: event.date,
      });

      if (!existingEvent) {
        // If the event does not exist, insert it
        await eventSchema.create(event);
        console.log(`Inserted event: ${event.title}`);
      }
    }
  })
  .catch((err) => {
    console.log("Can't connect to MongoDB", err);
  });
app.use(errorHandler);
server.listen(8090, () => {
  console.log("The Server is running on port 8090");
});
