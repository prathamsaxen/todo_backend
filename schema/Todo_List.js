const mongoose = require("mongoose");
const todo_list = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    // unique: true,
    required: true,
  },
  Completed: {
    type: Boolean,
    required: true,
  },
  user: [
    {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  ],
});

module.exports = mongoose.model("todo_list", todo_list);
