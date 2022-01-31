const router = require("express").Router();
const AuthMiddlewares = require("../middlewares/auth");
const UserMiddlewares = require("../middlewares/user");
const FileMiddlewares = require("../middlewares/file");
const UserControllers = require("../controllers/user");
const { internalServerError } = require("../utils/response");

router.get(
    "/",
    AuthMiddlewares.checkAccessToken,
    AuthMiddlewares.validateAccessToken,
    (req, res) => {
      try {
        UserControllers.getUser(req, res);
      } catch (error) {
        internalServerError(res, error);
      }
    }
);

router.patch(
  "/",
  AuthMiddlewares.checkAccessToken,
  AuthMiddlewares.validateAccessToken,
  UserMiddlewares.validateUserEditFields,
  FileMiddlewares.checkProfileFile,
  FileMiddlewares.saveProfileFile,
  (req, res) => {
    try {
       UserControllers.editUser(req, res);
    } catch (error) {
      internalServerError(res, error);
    }
  }
);
module.exports  = router;