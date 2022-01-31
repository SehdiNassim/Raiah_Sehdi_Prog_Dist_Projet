const router = require("express").Router();
const { internalServerError } = require("../utils/response");
const AuthMiddlewares = require("../middlewares/auth");
const FileMiddlewares = require("../middlewares/file");
const ShopMiddlewares = require("../middlewares/shop");
const ShopControllers = require("../controllers/shop");

router.post(
    "/",
    AuthMiddlewares.checkAccessToken,
    AuthMiddlewares.validateAccessToken,
    ShopMiddlewares.validateShopCreationFields,
    FileMiddlewares.checkShopFile,
    FileMiddlewares.saveShopFile,
    (req, res) => {
      try {
        ShopControllers.createShop(req, res);
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
        ShopControllers.getShop(req, res);
      } catch (error) {
        internalServerError(res, error);
      }
    }
);

router.get(
  "/user",
  AuthMiddlewares.checkAccessToken,
  AuthMiddlewares.validateAccessToken,
  (req, res) => {
    try {
      ShopControllers.getShopByUser(req, res);
    } catch (error) {
      internalServerError(res, error);
    }
  }
);

router.put(
  "/",
  AuthMiddlewares.checkAccessToken,
  AuthMiddlewares.validateAccessToken,
  ShopMiddlewares.canEditShop,
  ShopMiddlewares.validateShopEditFields,
  FileMiddlewares.checkShopFile,
  FileMiddlewares.saveShopFile,
  (req, res) => {
    try {
       ShopControllers.editShop(req, res);
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
       ShopControllers.deleteShop(req, res);
    } catch (error) {
      internalServerError(res, error);
    }
  }
);

module.exports = router;