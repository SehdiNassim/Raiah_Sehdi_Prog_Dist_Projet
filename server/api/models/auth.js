const mongoose = require("mongoose");
const { AUTH_COLLECTION } = require("../utils/constants").collections;

const authSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      min: 5,
      unique: true,
    },
    password: {
      type: String,
      min: 8,
      max: 1024,
    },
    refreshToken: {
      type: String,
    },
    oauthToken:String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Auth", authSchema, AUTH_COLLECTION);
