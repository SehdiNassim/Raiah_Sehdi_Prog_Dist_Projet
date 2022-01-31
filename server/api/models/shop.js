const mongoose = require("mongoose");
const { SHOP_COLLECTION } = require("../utils/constants").collections;
const { shopTypeKeys } = require("../utils/constants").shop;

const shopSchema = new mongoose.Schema(
  {
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        index : true,
    }, 
    name: {
        type: String,
        required: true,
    },
    shopURL: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: shopTypeKeys,
    },
    description: {
        type: String,
        required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Shop", shopSchema, SHOP_COLLECTION);
