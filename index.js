const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const UserRouter = require("./Router/userRouter");
const UrlRouter = require("./Router/urlRouter");

const connections = mongoose.connection;

const Port = 3333;

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL);
mongoose.connection.once("once", () => {
  console.log("mongoDB is success");
});

app.use("/user", UserRouter);
app.use("/url", UrlRouter);

app.listen(Port, () => {
  console.log(Port, "Litening on port");
});
