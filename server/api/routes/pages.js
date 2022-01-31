const router = require("express").Router();
const AuthMiddlewares = require("../middlewares/auth");
const PagesControllers = require("../controllers/pages");
const { internalServerError } = require("../utils/response");

router.get(
    "/shopTypes",
    AuthMiddlewares.checkAccessToken,
    AuthMiddlewares.validateAccessToken,
    (req, res) => {
      try {
        PagesControllers.getShopType(req, res);
      } catch (error) {
        internalServerError(res, error);
      }
    }
);
module.exports  = router;