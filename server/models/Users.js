const mongoose = require("mongoose");
const User = new mongoose.Schema({
  userName: {
    type: String,
    max: 100,
    required: true,
    validate: /[a-z]/,
    unique: true,
    minlength: 1,
  },
  email: {
    type: String,
    required: true,
    validate: /[a-z]/,
    unique: true,
    minlength: 1,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  name: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  practiceName: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  occupation: {
    type: String,
    required: false,
  },
  profilePicture: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: true,
    unique: true,
    default: function () {
      return this.userName.toLowerCase();
    }
  }
});

module.exports = mongoose.model("user", User);
