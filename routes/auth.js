const router = require("express").Router();
const user = require("../schema/User");
const {hashPassword}=require("../middleware/bcrypt");
// Sign UP API
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword=await hashPassword(password);
    const USER = new user({ name:name, email:email, password:hashedPassword });
    await USER.save().then(() =>
      res.status(200).json({
        message: "User Registered Successfully!",
      })
    );
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error in registering user!",
    });
  }
});

module.exports = router;
