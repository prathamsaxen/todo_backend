const express = require("express");
const app = express();
const auth = require("./routes/auth");
const connectDB = require("./config/db");
connectDB();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hey This is Wokring");
});
app.use("/api/auth", auth);
app.listen(8000, () => {
  console.log("Server is Running!");
});
