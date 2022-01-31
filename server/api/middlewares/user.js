const Validators = require("../utils/validators");
const sendError = require('../utils/response').sendError;


module.exports.validateUserEditFields = (req, res, next) => {
    const { error } = Validators.userEditValidation(req.body);
    if (error) return sendError(error.details[0].message, error, res);
        next();
};