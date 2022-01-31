const router = require("express").Router();
const AuthMiddlewares = require("../middlewares/auth");
const AuthControllers = require("../controllers/auth");
const { internalServerError } = require("../utils/response");
const passport = require("passport");

router.post(
  "/register",
  AuthMiddlewares.validateRegisterFields,
  AuthMiddlewares.validPassword,
  async (req, res) => {
    try {
      await AuthControllers.registerWithEmail(req,res);
    } catch (error) {
      internalServerError(res, error);
    }
  }
);

router.post(
  "/login",
  AuthMiddlewares.validateLoginFields,
  AuthMiddlewares.validPassword,
  async (req, res) => {
    try {
      await AuthControllers.loginWithEmail(req, res);
    } catch (error) {
      internalServerError(res, error);
    }
  }
);

router.get("/token/verify",
  AuthMiddlewares.checkAccessToken,
  AuthMiddlewares.validateAccessToken,
  (req, res) => {
    try {
      return res.status(200).send();
    } catch (error) {
      internalServerError(res, error);
    }
  }
);

//Refresh Access Token
router.get("/token/refresh",
  AuthMiddlewares.checkRefreshToken,
  AuthMiddlewares.validateRefreshToken,
  async (req, res) => {
    try {
      await AuthControllers.refreshAccessToken(req, res);
    } catch (error) {
      internalServerError(res, error);
    }
  }
);

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/failure' }),
  (req, res)=>{
    res.redirect(`${process.env.FRONT_HOST_URL}/auth/google/${req.user.accessToken}`)
  }
);

router.get('/google/token/verify', AuthControllers.loginWithGoogle);

router.get ('/failure', (req,res) => {
  res.sendStatus(401);
});

module.exports  = router;