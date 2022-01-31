const router = require("express").Router();
const { internalServerError } = require("../utils/response");
const AuthMiddlewares = require("../middlewares/auth");
const OrderControllers = require("../controllers/order");

router.post(
    "/",
    AuthMiddlewares.checkAccessToken,
    AuthMiddlewares.validateAccessToken,
    (req, res) => {
      try {
        OrderControllers.createOrder(req, res);
      } catch (error) {
        internalServerError(res, error);
      }
    }
);

router.patch(
  "/",
  AuthMiddlewares.checkAccessToken,
  AuthMiddlewares.validateAccessToken,
  (req, res) => {
    try {
      OrderControllers.createOrder(req, res);
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
        OrderControllers.getOrder(req, res);
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
        OrderControllers.getOrderByUser(req, res);
    } catch (error) {
      internalServerError(res, error);
    }
  }
);

module.exports = router;