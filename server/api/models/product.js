const mongoose = require("mongoose");
const { PRODUCT_COLLECTION } = require("../utils/constants").collections;
const { productStatusKeys } = require("../utils/constants").product;

const productSchema = new mongoose.Schema(
  {
    idShop: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Shop",
    },  
    name: {
        type: String,
        required: true,
    },
    productURL: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: productStatusKeys,
        default : productStatusKeys[0]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema, PRODUCT_COLLECTION);
