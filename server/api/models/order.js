const mongoose = require("mongoose");
const { ORDER_COLLECTION } = require("../utils/constants").collections;
const { orderStatusKeys } = require("../utils/constants").order;


const orderComponentSchema = new mongoose.Schema(
    {
      idProduct: {
          type: mongoose.Schema.Types.ObjectId,
          ref : "Product",
          index : true,
      }, 
      quantity: {
          type: Number,
          required: true,
      },
    },
    { timestamps: true }
);

const orderSchema = new mongoose.Schema(
  {
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        index : true,
    }, 
    products: [{
        type: orderComponentSchema
    }],
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: orderStatusKeys,
        default: orderStatusKeys[0]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema, ORDER_COLLECTION);