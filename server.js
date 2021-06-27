const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const userRouter = require("./routes/user");
const fileRouter = require("./routes/file");
const User = require("./models/User");
const cors = require("cors");
require("dotenv").config();

const db = mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.use("/users", userRouter);
app.use("/files", fileRouter);

app.get("/", (req, res) => {
  res.json({ alive: true });
});

app.get("/blog", async (req, res) => {
  const allUsers = await User.find();
  const users = allUsers.map((user) => user.name);
  const songs = allUsers.map((user) => user.songs);
  return res.json({ users, songs });
});

PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`connected to port ${PORT}`);
});
