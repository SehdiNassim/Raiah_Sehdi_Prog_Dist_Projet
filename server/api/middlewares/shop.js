const Validators = require("../utils/validators");
const sendError = require('../utils/response').sendError;
const Shop = require('../models/shop');

module.exports.validateShopCreationFields = (req, res, next) => {
    const { error } = Validators.shopCreationValidation(req.body);
    if (error) return sendError(error.details[0].message, error, res);
        next();
};

module.exports.validateShopEditFields = (req, res, next) => {
    const { error } = Validators.shopEditValidation(req.body);
    if (error) return sendError(error.details[0].message, error, res);
        next();
};

module.exports.canEditShop = async (req, res, next) => {
    const idUser = req.tokenData.authId;
    const _id = req.query.id;
    const shop = await Shop.findOne({_id, idUser});
    if (!shop)  
        return sendError( Errors.UNAUTHORIZED, Errors.FAILED, res);
    next();
}