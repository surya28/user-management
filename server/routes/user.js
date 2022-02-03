const router = require("express").Router();
const User = require("../Models/users");
const Counter = require("../Models/counter");

async function getNextSequenceValue(sequenceName) {
  let sequenceDocument = await Counter.findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { sequence_number: 1 } },
    { new: true }
  );
  return sequenceDocument.sequence_number;
}

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res
      .status(200)
      .send({ message: "Data retrieved successfully", data: users });
  } catch (err) {
    res.send({ message: "could not get user", data: err });
  }
});

router.post("/add", async (req, res) => {
  const emailExists = await User.findOne({ email: req.body.email });
  const serial_number = await getNextSequenceValue("userID");
  console.log(serial_number);
  if (emailExists) {
    return res.status(400).send({ message: "E mail already exists" });
  }

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    s_no: serial_number,
  });
  try {
    const savedUser = await user.save();
    res.send({ message: "User added successfully", data: savedUser });
  } catch (err) {
    res.send({ message: "Could not add User", data: err });
  }
});

router.delete("/delete/:userId", async (req, res) => {
  console.log(req.params);
  try {
    const removedUser = await User.deleteOne({ s_no: req.params.userId });
    res.status(200).send({ message: "User deleted", data: removedUser });
  } catch (err) {
    res.send({ message: "could not delete user", data: err });
  }
});

module.exports = router;
