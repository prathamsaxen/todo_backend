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
      // console.log(existingUser);
      existingUser.todo_list.push(list);
      existingUser.save();
    }
  } catch (err) {
    res.status(400).send({ message: "Failed to save todo: " + err.message });
  }
});

module.exports = router;
