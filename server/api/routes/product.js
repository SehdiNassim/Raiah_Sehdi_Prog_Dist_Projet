const router = require("express").Router();
const { internalServerError } = require("../utils/response");
const AuthMiddlewares = require("../middlewares/auth");
const FileMiddlewares = require("../middlewares/file");
const ProductMiddlewares = require("../middlewares/product");
const ProductControllers = require("../controllers/product");

router.post(
    "/",
    AuthMiddlewares.checkAccessToken,
    AuthMiddlewares.validateAccessToken,
    ProductMiddlewares.validateProductCreationFields,
    FileMiddlewares.checkProductFile,
    FileMiddlewares.saveProductFile,
    (req, res) => {
      try {
        ProductControllers.createProduct(req, res);
      } catch (error) {
        internalServerError(res, error);
      }
    }
);

router.get(
    "/",
    AuthMiddlewares.checkAccessToken,
    AuthMiddlewares.validateAccessToken,
    (req, res) => {
      try {
         ProductControllers.getProductByID(req, res);
      } catch (error) {
        internalServerError(res, error);
      }
    }
);

router.get(
    "/shop",
    AuthMiddlewares.checkAccessToken,
    AuthMiddlewares.validateAccessToken,
    (req, res) => {
      try {
         ProductControllers.getProductsByUserByShop(req, res);
      } catch (error) {
        internalServerError(res, error);
      }
    }
);

router.get(
  "/dashboard",
  AuthMiddlewares.checkAccessToken,
  AuthMiddlewares.validateAccessToken,
  (req, res) => {
    try {
       ProductControllers.getProductsDashboard(req, res);
    } catch (error) {
      internalServerError(res, error);
    }
  }
);

router.put(
  "/",
  AuthMiddlewares.checkAccessToken,
  AuthMiddlewares.validateAccessToken,
  ProductMiddlewares.canEditProduct,
  ProductMiddlewares.validateProductEditFields,
  FileMiddlewares.checkProductFile,
  FileMiddlewares.saveProductFile,
  (req, res) => {
    try {
       ProductControllers.editProduct(req, res);
    } catch (error) {
      internalServerError(res, error);
    }
  }
);

router.delete(
  "/",
  AuthMiddlewares.checkAccessToken,
  AuthMiddlewares.validateAccessToken,
  (req, res) => {
    try {
       ProductControllers.deleteProduct(req, res);
    } catch (error) {
      internalServerError(res, error);
    }
  }
);
module.exports = router;