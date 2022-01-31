const Cart = require("../models/cart");
const Errors = require("../utils/constants").errors;
const Success = require("../utils/constants").success;
const sendError = require('../utils/response').sendError;

module.exports.createCart = async (req,res) => {
  var data = {};
  data.idUser = req.tokenData.authId ;
  data.idProduct = req.body.idProduct ;
  data.quantity = req.body.quantity;
  var card = new Cart(data);
  try{
    await card.save();
    return res.status(201).json({
      status: Success.SUCCESS,
      message: Success.CART_CREATED,
    });
  }
  catch (err) {
      console.log(err);
    return sendError(Errors.ERROR_WHILE_CREATING_CART, Errors.FAILED, res);
  }
};

module.exports.getCart = async (req,res) => {
  try{
      const idUser = req.tokenData.authId ;
      const cart = await getCartByUser(idUser);
      return res.status(200).json({
        status: Success.SUCCESS,
        message: Success.FETCHED_CART_DATA,
        cart
      });
  }
  catch (err) {
      console.log(err);
    return sendError(Errors.ERROR_WHILE_GETTING_CART, Errors.FAILED, res);
  }
};

module.exports.deleteCart = async (req,res) => {
  try{
      const idUser = req.tokenData.authId ;
      const idProduct = req.query.idProduct;
      const cartItem = await deleteCartItem(idUser, idProduct);
      return res.status(200).json({
        status: Success.SUCCESS,
        message: Success.DELETED_CART_DATA,
        cartItem
      });
  }
  catch (err) {
      console.log(err);
    return sendError(Errors.ERROR_WHILE_DELETING_CART, Errors.FAILED, res);
  }
};


const getCartByUser = async (idUser) => {
  try{
      const cart = await Cart.find({idUser}, {
        createdAt: 0,
        updatedAt: 0,
        __v:0
    }, {
        populate :"idProduct",
    });
    return cart;
  }
  catch (err) {
    throw err;
  }
};

const deleteCartItem = async (idUser, idProduct)=>{
  const cartItem = await Cart.deleteOne({idUser, idProduct});
  return cartItem;
};

const deleteCartItemsOfProduct = async (idProduct)=>{
  await Cart.deleteMany({idProduct});
};

module.exports.getCartByUser = getCartByUser;
module.exports.deleteCartItem = deleteCartItem;
module.exports.deleteCartItemsOfProduct = deleteCartItemsOfProduct;