const Shop = require("../models/shop");
const Errors = require("../utils/constants").errors;
const Success = require("../utils/constants").success;
const sendError = require('../utils/response').sendError;
const {shopType} = require('../utils/constants').shop;
const ProductControllers = require('../controllers/product');

module.exports.createShop = async (req,res) => {
  const data = req.body;
  data.idUser = req.tokenData.authId ;
  var shop = new Shop(data);
  try{
    await shop.save();
    return res.status(201).json({
      status: Success.SUCCESS,
      message: Success.SHOP_CREATED,
    });
  }
  catch (err) {
    return sendError(Errors.ERROR_WHILE_CREATING_SHOP, Errors.FAILED, res);
  }
};

module.exports.getShop = async (req, res) => {
    const idShop = req.query.id;
    const shop = await getShopById(idShop);
    return res.status(200).json({
        status: Success.SUCCESS,
        message: Success.FETCHED_SHOP_DATA,
        shop
      });
};

module.exports.getShopByUser = async (req, res) => {
  const idUser = req.tokenData.authId;
  const shops = await Shop.find({idUser}).clone();
  return res.status(200).json({
      status: Success.SUCCESS,
      message: Success.FETCHED_SHOP_DATA,
      shops : shops.map(shop=>{
        return {
          _id: shop._id,
          name: shop.name,
          description: shop.description,
          shopURL: shop.shopURL,
          type : shopType[shop.type],
        }
      })
    });
};

const getShopById = async (_id) => {
    const shop = await Shop.findById(_id);
    return  {
      _id: shop._id,
      name: shop.name,
      description: shop.description,
      shopURL: shop.shopURL,
      typeKey : shop.type,
      typeValue : shopType[shop.type],
    };
};

module.exports.editShop = async (req, res) => {
  const _id = req.query.id;
  var shop = await Shop.findByIdAndUpdate(_id,{
    createdAt: 0,
    updatedAt: 0,
    __v: 0,
  });

  if (!shop) {
    return res.status(403).json({
      status: Errors.Failed,
      message: Errors.ERROR_WHILE_UPDATING_SHOP
    });
  }
  try{
    shop = await _updateShop (shop, req.body);
  }
  catch (err) {
    console.log(err);
    return sendError(Errors.ERROR_WHILE_UPDATING_SHOP, Errors.FAILED, res);
  }

  await shop.save((error,updated) => {
    if (error || !updated)
        return res.status(403).json({
          status: Errors.FAILED,
          message: Errors.ERROR_WHILE_UPDATING_SHOP,
        });
      return res.status(200).json({
        status: Success.SUCCESS,
        message: Success.UPDATED_SHOP,
        shop: updated,
      });
  });
};

module.exports.deleteShop = async (req, res) => {
  const _id = req.query.id;
  var shop = await Shop.findByIdAndDelete(_id);

  if (!shop) {
    return res.status(403).json({
      status: Errors.Failed,
      message: Errors.ERROR_WHILE_DELETING_SHOP
    });
  }
  try{
    const idShop = shop._id;
    await ProductControllers.deleteProductsByShop(idShop);
  }
  catch (err) {
    console.log(err);
    return sendError(Errors.ERROR_WHILE_DELETING_SHOP, Errors.FAILED, res);
  }
  return res.status(200).json({
    status: Success.SUCCESS,
    message: Success.DELETED_SHOP,
  });
};

async function _updateShop (shop, updated){
  for (let [key, value] of Object.entries(updated)) {
    try{
      shop[key] = updated[key];
    }
    catch (err) {
      console.log(err);
      throw err;
    }
  }
  return shop;
}
module.exports.getShopById = getShopById;