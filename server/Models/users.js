const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  s_no: {
    type: Number,
    required: true,
  },
  //   joining_date: {
  //     type: Date,
  //     required: true,
  //   },
});

module.exports = mongoose.model("members", userSchema);
