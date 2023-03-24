const mongoose = require("mongoose");
const Portfolio = new mongoose.Schema({
  images: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    required: false,
  },
});

const Profile = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: false,
  },
  links: {
    type: Array,
    required: false,
  },
  photos: {
    type: Array,
    portfolio: Portfolio,
    required: false,
  },
});

module.exports = mongoose.model("profile", Profile);
