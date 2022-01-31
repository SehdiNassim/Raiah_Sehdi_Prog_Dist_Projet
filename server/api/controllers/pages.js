const Success = require("../utils/constants").success;
const {shopType} = require('../utils/constants').shop;

module.exports.getShopType = async (req,res) => {
    return res.status(201).json({
      status: Success.SUCCESS,
        shopType
    });
};