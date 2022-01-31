const router = require("express").Router();
const { internalServerError } = require("../utils/response");
const AuthMiddlewares = require("../middlewares/auth");
const CartMiddlewares = require("../middlewares/cart");
const CartControllers = require("../controllers/cart");

router.post(
    "/",
    AuthMiddlewares.checkAccessToken,
    AuthMiddlewares.validateAccessToken,
    CartMiddlewares.checkIfExists,
    CartMiddlewares.checkQuantityAvailability,
    (req, res) => {
      try {
        CartControllers.createCart(req, res);
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
      CartControllers.getCart(req, res);
    } catch (error) {
      internalServerError(res, error);
    }
  }
);

router.delete(
  "/product",
  AuthMiddlewares.checkAccessToken,
  AuthMiddlewares.validateAccessToken,
  (req, res) => {
    try {
      CartControllers.deleteCart(req, res);
    } catch (error) {
      internalServerError(res, error);
    }
  }
);

module.exports = router;