const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  sequence_number: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("counter", counterSchema);
