const express = require("express");
const app = express();
const auth = require("./routes/auth");
const connectDB = require("./config/db");
const PORT = 8000 || process.env.PORT;
connectDB();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Server is Running");
});
app.use("/api/auth", auth);
app.listen(PORT, () => {
  console.log(`Server is established at PORT - ${PORT}`);
});
