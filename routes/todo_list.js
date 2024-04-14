const router = require("express").Router();
const user = require("../schema/User");
const Todo_List = require("../schema/Todo_List");

router.post("/todo", async (req, res) => {
  try {
    const { email, title, Description, Completed } = req.body;
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      const list = new Todo_List({
        title,
        Description,
        Completed,
        user: existingUser,
      });
      list.save().then(() => res.status(200).json({ message: "TODO Saved" }));
      existingUser.todo_list.push(list);
      existingUser.save();
    }
  } catch (err) {
    res.status(400).send({ message: "Failed to save todo: " + err.message });
  }
});

router.delete("/todo", async (req, res) => {
  try {
    const { _id } = req.body;
    const todo_find = await Todo_List.findOne({ _id });
    if(!todo_find)
    {
      return res.status(404).send({ message: "Todo does not exist"});
    }
    todo_find
      .deleteOne()
      .then(() => res.status(200).json({ message: "Todo Deleted!" }));
  } catch (err) {
    res.status(400).send({ message: "Failed to delete todo: " + err.message });
  }
});

module.exports = router;
