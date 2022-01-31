const sendError = require('../utils/response').sendError;
const Errors = require('../utils/constants').errors;
const Cart = require('../models/cart');
const {getProductQuantity} = require('../controllers/product');

module.exports.checkIfExists = async (req, res, next) => {
    const idUser = req.tokenData.authId;
    const idProduct = req.body.idProduct;
    const cartItem = await Cart.findOne({idProduct, idUser});
    if (cartItem)  
        return sendError(Errors.PRODUCT_ALREADY_EXISTS, Errors.FAILED, res);
    next();
}

module.exports.checkQuantityAvailability = async (req, res, next) => {
    const idProduct = req.body.idProduct;
    const product = await getProductQuantity(idProduct);
    if (!product)  
        return sendError(Errors.PRODUCT_DOESNT_EXISTS, Errors.FAILED, res);
    const quantity = req.body.quantity;
    if (product.quantity < quantity)  
        return sendError(Errors.QUANTITY_MORE_THAN_AVAILABLE, Errors.FAILED, res);
    next();
}