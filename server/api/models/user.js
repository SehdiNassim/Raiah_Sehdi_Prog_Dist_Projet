const mongoose = require("mongoose");
const { USER_COLLECTION } = require("../utils/constants").collections;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      min: 5,
      unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: false,
    },
    profileURL: {
        type: String,
        required: false,
    },
    gender: {
        type: String,
        required: false,
    },
    bio: {
        type: String,
        required: false,
    },
    birthDate: {
        type: String,
        required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema, USER_COLLECTION);
