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
});

module.exports = mongoose.model("todo_list", todo_list);