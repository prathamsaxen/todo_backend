const router = require("express").Router();
const user = require("../schema/User");
const { hashPassword, comparePasswords } = require("../middleware/bcrypt");
// Sign UP API
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const checkUser= await user.findOne({email:email});
    if(checkUser)
    {
      return res.status(400).json({message:"Email Already Exists!"});
    }
    const hashedPassword = await hashPassword(password);
    const USER = new user({
      name: name,
      email: email,
      password: hashedPassword,
    });
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

// Sign IN API

router.post("/signin", async (req, res) => {
  try {
    const User = await user.findOne({ email: req.body.email });
    if (!User) {
      res.status(400).json({ message: "No User found!" });
    }
    const isPasswordMatch = await comparePasswords(
      req.body.password,
      User.password
    );
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Password does not match" });
    }
    const { password, ...others } = User._doc;
    res.status(200).json({ ...others });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
