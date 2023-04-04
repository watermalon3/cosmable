const mongoose = require("mongoose");

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
});

module.exports = mongoose.model("profile", Profile);
