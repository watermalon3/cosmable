const mongoose = require("mongoose");

const Portfolio = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  imageLinks: {
    type: String,
    required: false,
  },
  ageRange: {
    type: String,
    required: false,
  },
  pronoun: {
    type: String,
    required: false,
  },
  concern: {
    type: String,
    required: false,
  },
  procedure: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("portfolio", Portfolio);
