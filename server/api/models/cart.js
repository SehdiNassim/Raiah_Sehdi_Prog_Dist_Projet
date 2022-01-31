const mongoose = require("mongoose");
const { CART_COLLECTION } = require("../utils/constants").collections;

const cartSchema = new mongoose.Schema(
  {
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        index : true,
    }, 
    idProduct: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Product",
        index : true,
    }, 
    quantity: {
        type: Number,
        required: true
    }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema, CART_COLLECTION);