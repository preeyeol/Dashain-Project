require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

const { userRoute } = require("./route/userRoute");

app.use("/api", userRoute);

mongoose
  .connect("mongodb://localhost:27017/dashainproject1")
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch(() => {
    console.log("Can't connect to mongoDB");
  });

app.listen(8090, () => {
  console.log("The Server is running on port 8090");
});
