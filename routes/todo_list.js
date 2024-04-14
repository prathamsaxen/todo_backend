const router = require("express").Router();
const user = require("../schema/User");
const Todo_List = require("../schema/Todo_List");

router.post("/add", async (req, res) => {
  try {
    const { email, title, Description, Completed } = req.body;
    const User = await user.findOne({ email });
    if (!User) {
      return res.status(400).send({ message: "User is not registered!" });
    }
    const todo = new Todo_List({ title, Description, Completed });
    await todo.save();
    res.status(200).send({ message: "Todo Saved!" });
  } catch (err) {
    res.status(400).send({ message: "Failed to save todo: " + err.message });
  }
});


module.exports = router;
