const Validators = require("../utils/validators");
const sendError = require('../utils/response').sendError;
const Errors = require('../utils/constants').errors;
const Product = require('../models/product');

module.exports.validateProductCreationFields = (req, res, next) => {
    const { error } = Validators.productCreationValidation(req.body);
    if (error) return sendError(error.details[0].message, error, res);
        next();
};

module.exports.validateProductEditFields = (req, res, next) => {
    const { error } = Validators.productEditValidation(req.body);
    if (error) return sendError(error.details[0].message, error, res);
        next();
};
module.exports.canEditProduct = async (req, res, next) => {
    const idUser = req.tokenData.authId;
    const _id = req.query.id;
    const product = await Product.findOne({_id, idUser});
    if (!product)  
        return sendError( Errors.UNAUTHORIZED, Errors.FAILED, res);
    next();
}