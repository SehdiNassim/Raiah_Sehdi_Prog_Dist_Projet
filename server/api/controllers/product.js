const ObjectId = require('mongoose').Types.ObjectId;
const Product = require("../models/product");
const Errors = require("../utils/constants").errors;
const Success = require("../utils/constants").success;
const {shopTypeKeys, shopType} = require("../utils/constants").shop;
const {productStatusKeys} = require("../utils/constants").product;
const sendError = require('../utils/response').sendError;
const {getShopById} = require('../controllers/shop');
const {deleteCartItemsOfProduct} = require('../controllers/cart');

module.exports.createProduct = async (req,res) => {
  const data = req.body;
  var product = new Product(data);
  try{
    await product.save();
    return res.status(201).json({
      status: Success.SUCCESS,
      message: Success.PRODUCT_CREATED,
    });
  }
  catch (err) {
    return sendError(Errors.ERROR_WHILE_CREATING_PRODUCT, Errors.FAILED, res);
  }
};

module.exports.getProductByID = async (req, res) => {
  const _id = req.query.id;
  await Product.findById(_id,
      (error, product) => {
        if (error) {
          return res.status(403).json({
            status: Errors.FAILED,
            message: Errors.ERROR_WHILE_GETTING_PRODUCT,
          });
        }
  
        return res.status(200).json({
          status: Success.SUCCESS,
          message: Success.FETCHED_PRODUCT_DATA,
          product
        });
      }
  );
};

module.exports.getProductsByUserByShop = async (req, res) => {
  const idShop = req.query.idShop;
  const shop = await getShopById(idShop);
  await Product.find({idShop, status : productStatusKeys[0]},
    {
      createdAt:0,
      updatedAt:0,
      __v:0
    },
      (error, products) => {
        if (error) {
          return res.status(403).json({
            status: Errors.FAILED,
            message: Errors.ERROR_WHILE_GETTING_PRODUCT,
          });
        }
  
        return res.status(200).json({
          status: Success.SUCCESS,
          message: Success.FETCHED_PRODUCT_DATA,
          shop,
          products
        });
      }
  ).clone();
};

module.exports.getProductsDashboard = async (req, res) => {
  const idUser = req.tokenData.authId;
  const nb = parseInt(process.env.NB_PRODUCTS_PER_PAGE);
  const page = req.query.p? req.query.p : 0;
  const shopTypes = req.query.shopTypes ? req.query.shopTypes : shopTypeKeys;
  const max = req.query.maxPrice ? parseInt(req.query.maxPrice) : Number.MAX_SAFE_INTEGER;
  const min = req.query.minPrice ? parseInt(req.query.minPrice) : 0;

  await Product.aggregate([
    {
      $project : {
        createdAt:0,
        updatedAt:0,
        __v:0
      }
    },
    {
      $match :{
        $expr :{
          $and :[
            {
              $eq : ["$status", productStatusKeys[0]]
            },
            {
              $lte : ["$price", max]
            },
            {
              $gte : ["$price", min]
            }
          ]
        }
      }
    },
    {
      $lookup : {
        from : "shop",
        let : {shopID : "$idShop", userID : ObjectId(idUser)},
        pipeline :[
          {
            $match :{
              $expr: {
                $and : [
                  {
                    $eq :["$_id" , "$$shopID"]
                  },
                  {
                    $ne :["$idUser" , "$$userID"]
                  },
                  {
                    $in :["$type" , shopTypes]
                  }
                ]
              }
            }
          },
          {
            $project : {
              name:1,
              type:1,
              idUser:1
            }
          }
        ],
        as : 'shop'
      }
    },
    {
      $unwind :{
        path : '$shop',
        preserveNullAndEmptyArrays : false
      }
    },
    {
      $facet :{
        products: [
          {
            $skip : nb*(parseInt(page)), 
          },{
            $limit :nb
          }
        ],
        count : [
          {
            $count : 'nb'
          }
        ]
      }
    }
  ],
      (error, products) => {
        if (error) {
          return res.status(403).json({
            status: Errors.FAILED,
            message: Errors.ERROR_WHILE_GETTING_PRODUCT,
          });
        }
        
        //IF NO CONSLTANTS RETURN EMPTY ARRAY 
        if (products[0].products.length ===0) {
          return res.status(200).json({
            status: Errors.FAILED,
            message: Errors.FETCHED_PRODUCT_DATA,
            products: [],
            nbPages :0
          });
        }
        //CALCULATE NB PAGES
        var nbPages = Math.ceil(products[0].count[0].nb / nb);
        if (nbPages===0)
          nbPages++;
          
        products = products[0].products;

        return res.status(200).json({
          status: Success.SUCCESS,
          message: Success.FETCHED_PRODUCT_DATA,
          products : products.map(product =>{
            return {
              _id : product._id,
              name : product.name,
              productURL : product.productURL,
              bio : product.bio,
              price : product.price,
              quantity : product.quantity,
              shop : {
                name : product.shop.name,
                type : shopType[product.shop.type]
              }
            }
          }),
          nbPages
        });
      }
  );
};

module.exports.getProductPrice = async (_id) => {
 const product = await Product.findById(_id,{price :1});
 console.log(product);
 return product.price ? product.price : 0;
};

module.exports.getProductQuantity = async (_id) => {
  const product = await Product.findById(_id,{quantity : 1});
  return product;
};

module.exports.updateQuantity = async (_id, nb) => {
  await Product.updateOne({_id},{$inc : {quantity : -nb}});
};

module.exports.editProduct = async (req, res) => {
  const _id = req.query.id;
  var product = await Product.findByIdAndUpdate(_id,{
    createdAt: 0,
    updatedAt: 0,
    __v: 0,
  });

  if (!product) {
    return res.status(403).json({
      status: Errors.Failed,
      message: Errors.ERROR_WHILE_UPDATING_PRODUCT
    });
  }
  try{
    product = await _updateProduct (product, req.body);
  }
  catch (err) {
    console.log(err);
    return sendError(Errors.ERROR_WHILE_UPDATING_PRODUCT, Errors.FAILED, res);
  }

  await product.save((error,updated) => {
    if (error || !updated)
        return res.status(403).json({
          status: Errors.FAILED,
          message: Errors.ERROR_WHILE_UPDATING_PRODUCT,
        });
      return res.status(200).json({
        status: Success.SUCCESS,
        message: Success.UPDATED_PRODUCT,
        product: updated,
      });
  });
};

module.exports.deleteProduct = async (req, res) => {
  const _id = req.query.id;
  var product = await Product.findByIdAndUpdate(_id,{
    status : productStatusKeys[1]
  });
  if (!product) {
    return res.status(403).json({
      status: Errors.Failed,
      message: Errors.PRODUCT_DOESNT_EXISTS
    });
  }
  try{
    await deleteCartItemsOfProduct(product._id);
  }
  catch (err) {
    console.log(err);
    return sendError(Errors.ERROR_WHILE_DELETING_PRODUCT, Errors.FAILED, res);
  }

  return res.status(200).json({
    status: Success.SUCCESS,
    message: Success.DELETED_PRODUCT,
  });
};

async function _updateProduct (product, updated){
  for (let [key, value] of Object.entries(updated)) {
    try{
         product[key] = updated[key];
    }
    catch (err) {
      console.log(err);
      throw err;
    }
  }
  return product;
}

module.exports.deleteProductsByShop = async (idShop) => {
  await Product.updateMany({idShop}, {status : productStatusKeys[1]});
  const products = await Product.find({idShop}, {
    _id:1
  }).clone();
  products.forEach(async product => {
    await deleteCartItemsOfProduct(product._id);
  });
  return;
}