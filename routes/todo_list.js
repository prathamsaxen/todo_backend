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
router.get("/todo/:id", async (req, res) => {
  try {
    // const id=req.params.id;
    const list = await Todo_List.find({ user: req.params.id });
    res.status(200).send({ Data: list });
  } catch (err) {
    res
      .status(400)
      .send({ message: "Failed to retrieve todo: " + err.message });
  }
});
router.put("/todo/:id", async (req, res) => {
  try {
    const { email, title, Description, Completed } = req.body;
    const existingUser = await user.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      const updatedTODO = await Todo_List.findByIdAndUpdate(req.params.id, {
        title,
        Description,
        Completed,
      });
      updatedTODO.save().then(() => {
        return res.status(200).json({ message: "Todo Updated!" });
      });
    }
    //  res.status(400).json({ message: "User does not exist" });
  } catch (err) {
    res.status(400).json({ message: "Can't Update Todo: " + err.message });
  }
});
router.delete("/todo/:id", async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      await user.findOneAndUpdate(
        { email },
        { $pull: { todo_list: req.params.id } }
      ); // Remove the todo item ID from user's todo_list array
      await Todo_List.findByIdAndDelete(req.params.id); // Delete the todo item
      return res.status(200).json({ message: "Task Deleted!" });
    } else {
      return res.status(400).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(400).send({ message: "Failed to delete todo: " + err.message });
  }
});

module.exports = router;
