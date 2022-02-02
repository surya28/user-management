const router = require("express").Router();
const User = require("../Models/users");

router.post("/add", async (req, res) => {
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    return res.status(400).send({ message: "E mail already exists" });
  }

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    address: req.body.address
  });
  try {
    const savedUser = await user.save();
    res.send({ message: "User added successfully", data: savedUser });
  } catch (err) {
    res.send({ message: "Could not add User", data: err });
  }
});

module.exports = router;
