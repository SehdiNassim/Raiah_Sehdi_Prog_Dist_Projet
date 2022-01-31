const Order = require("../models/order");
const Errors = require("../utils/constants").errors;
const Success = require("../utils/constants").success;
const sendError = require('../utils/response').sendError;
const {getCartByUser, deleteCartItem} = require('../controllers/cart');
const {updateQuantity} = require('../controllers/product');

module.exports.createOrder = async (req,res) => {
  const idUser = req.tokenData.authId ;
  const cartItems = await getCartByUser(idUser);
  var data = {idUser};
  data.products =[]; 
  data.amount = 0;
  cartItems.forEach((cartItem) => {
    data.products.push({
      idUser: cartItem.idUser,
      idProduct : cartItem.idProduct._id,
      quantity: cartItem.quantity
    });
    data.amount += cartItem.idProduct.price * cartItem.quantity;
    deleteCartItem(idUser, cartItem.idProduct._id);
    updateQuantity(cartItem.idProduct._id, cartItem.quantity);
  });

  var order = new Order(data);
  try{
    await order.save();
    return res.status(201).json({
      status: Success.SUCCESS,
      message: Success.ORDER_CREATED,
    });
  }
  catch (err) {
      console.log(err);
    return sendError(Errors.ERROR_WHILE_CREATING_ORDER, Errors.FAILED, res);
  }
};

module.exports.getOrder = async (req, res) => {
    const _id = req.query.id;
    const order = await getOrderById(_id);
    return res.status(200).json({
        status: Success.SUCCESS,
        message: Success.FETCHED_ORDER_DATA,
        order
      });
};

module.exports.getOrderByUser = async (req, res) => {
  const idUser = req.tokenData.authId;
  const order = await Order.find({idUser},{
    amount: 1,
    status: 1,
    products:{
        idProduct :1,
        quantity: 1,
    },
    createdAt:1
}, {
    populate : {
        path : "products.idProduct",
    }
}).clone();
  return res.status(200).json({
      status: Success.SUCCESS,
      message: Success.FETCHED_ORDER_DATA,
      order
    });
};

const getOrderById = async (_id) => {
    const order = await Order.findById(_id, {
        createdAt: 0,
        updatedAt: 0,
        __v:0
    }, {
        populate : {
            path : "products.idProduct",
            select : ["name", "productURL"]
        }
    });
    return order;
};

module.exports.getOrderById = getOrderById;