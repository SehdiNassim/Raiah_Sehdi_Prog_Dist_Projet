const Auth = require("../models/auth");
const JWTHandler = require("../../core/jwt");
const Headers = require("../utils/constants").headers;
const Errors = require("../utils/constants").errors;
const Success = require("../utils/constants").success;
const UserControllers = require("./user");
const {hashThePassword} = require('../../core/helpers');
const { default: Axios } = require("axios");

/* User registration with email   
    - check if email is existing/email being used by another provider
    - if existing then send conflict response
    - if not existing, create a hashed password using [bcrypt]
    - save the user in the database
    - send an account verification email to the respective email
    - [ERROR] if failed to save user in db, send an error response
*/
module.exports.registerWithEmail = async (req, res) => {
  // check if user exists
  var authUser = await getAuthUserByEmail(req.body.email);

  if (authUser)
    return res
      .status(409)
      .json({ status: Errors.FAILED, message: Errors.EMAIL_IN_USE });

  const hashedPassword = hashThePassword(req.body.password);

  // create user form data
  const newAuthUser = new Auth({
    email: req.body.email,
    password: hashedPassword,
  });

  // creating user in database
  await newAuthUser.save(async (error, savedUser) => {

    if (savedUser) {
      const user = {
        _id : savedUser._id,
        email : req.body.email,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        phoneNumber : req.body.phoneNumber,
      };   

      await _createUserDocument(user);

      return res.status(201).json({
        status: Success.SUCCESS,
        message: Success.ACC_CREATED,
      });
    }

    // Print the error and sent back failed response
    console.log(error);
    return res.status(403).json({
      status: Errors.FAILED,
      message: Errors.REGISTER_FAILED,
    });
  });
};

module.exports.loginWithEmail = async (req, res) => {
  // check if user exists
  const hashedPassword = hashThePassword(req.body.password);

  var authUser = await VerifyCredantialsByEmail(req.body.email, hashedPassword);

  if (!authUser)
    return res
      .status(400)
      .json({ status: Errors.FAILED, message: Errors.INVALID_EMAIL_PASSWORD});

  return loginUser(authUser,res);
};

async function getAuthUserByEmail(email) {
  const authUser = await Auth.findOne(
    { email: email },
    {
      createdAt: 0,
      updatedAt: 0,
    }
  );
  return authUser;
}

async function VerifyCredantialsByEmail(email, password) {
  const authUser = await Auth.findOne(
    { email: email, password : password},
    {
      createdAt: 0,
      updatedAt: 0,
    }
  );
  return authUser;
}

module.exports.verifyRefreshToken = (refreshToken) =>{
  return JWTHandler.verifyRefreshToken(refreshToken);
}

module.exports.refreshAccessToken = async (req,res)=>{
  const auth = await Auth.findOne({
    refreshToken : req.refreshToken
  },{
    _id:1
  });
  if (!auth) 
  return res.status(401).json({
      status: Errors.FAILED,
      message: Errors.UNAUTHORIZED,
  });
  const accessToken = await JWTHandler.genAccessToken(auth._id);
  return res
  .status(200)
  .json({
          status: Success.SUCCESS,
          message: Success.ACCESS_ENABLED,
          'accessToken' :accessToken
      });
};

async function loginUser(authUser, res) {
  authUser = await _createNewRefreshTokenIfAboutToExpire(authUser);

  const accessToken = await JWTHandler.genAccessToken(authUser._id);

  // saving refresh-token in database
  await authUser.save(async (error, savedUser) => {
    if (savedUser) {
      return res
        .status(200)
        //.header(Headers.ACCESS_TOKEN, accessToken)
        //.header(Headers.REFRESH_TOKEN, authUser.refreshToken)
        .json({
                status: Success.SUCCESS,
                message: Success.LOGIN_SUCCESS,
                'accessToken' :accessToken,
                'refreshToken' : authUser.refreshToken
            });
    }
    // Print the error and sent back failed response
    console.log(error);
    return res.status(403).json({
      status: Errors.FAILED,
      message: Helpers.joinWithCommaSpace(
        Errors.LOGIN_FAILED,
        Errors.TRY_LATER
      ),
    });
  });
}

async function _createUserDocument(userData) {
  await UserControllers.createUser(userData);
}

async function _createNewRefreshTokenIfAboutToExpire(authUser) {
  if (authUser.refreshToken) {
    const refreshTokenVerification = verifyRefreshToken(authUser.refreshToken);
    if (refreshTokenVerification.valid) {
      const refreshTokenData = refreshTokenVerification.data;
      var timeToExpiry = refreshTokenData.exp - Date.now() / 1000;

      // looks like we have still more days for our refresh token to expire
      //Choosing a delimited of 1 day to refresh the refreshToken
      if (timeToExpiry > 0) {
        if (timeToExpiry > 60*60*24) {
          return authUser;
        }
      }
    }
  }
  // token might expire soon, so creating new token
  authUser.refreshToken = await JWTHandler.genRefreshToken(authUser._id);
  return authUser;
}

function verifyRefreshToken(refreshToken) {
  return JWTHandler.verifyRefreshToken(refreshToken);
}

module.exports.verifyAccessToken = (refreshToken) => {
  return JWTHandler.verifyAccessToken(refreshToken);
};

module.exports.loginWithGoogle = async (req, res) => {
  // sending access token to server to verify if the token is valid and return the data
  const userData = await getResponseFromURL(
    Headers.GOOGLE_OAUTH_URL + req.query.t
  );
  if (userData.error)
    return res.status(403).json({
      status: Errors.FAILED,
      message: userData.error.error_description,
    });

  if (!userData.email)
    return res.status(403).json({
      status: Errors.FAILED,
      message: Errors.GOOGLE_LOGIN_FAILED,
    });
  var authUser = await getAuthUserByEmail(userData.email);
  if (authUser) {
    // login with google
    tryOAuthLogin(authUser, res, req.query.t);
  } else {
    // register with google
    tryRegisterWithGoogle(userData,res, req.query.t);
  }
};


/* Logs in the user - OAuth
    - save the oauth access token
    - login user
*/
async function tryOAuthLogin(authUser, res, accessToken) {
  authUser.oauthToken = accessToken;
  loginUser(authUser, res);
}


async function tryRegisterWithGoogle(googleUser, res, accessToken) {
  const authUser = new Auth({
    email: googleUser.email,
    oauthToken: accessToken,
  });

  await authUser.save(async (error, savedUser) => {
    if (savedUser) {
      savedUser.firstName = googleUser.name.toString().split(" ")[0];
      savedUser.lastName = googleUser.name.toString().split(" ")[1];
      savedUser.profileURL = googleUser.picture;
      console.log(savedUser);

      await UserControllers.createUser({
        _id : savedUser._id,
        email : savedUser.email,
        firstName: savedUser.firstName, 
        lastName: savedUser.lastName, 
        profileURL: savedUser.profileURL
      });
      loginUser(savedUser, res);
    } else {
      // Print the error and sent back failed response
      console.log(error);
      return res.status(403).json({
        status: Errors.FAILED,
        message: Errors.GOOGLE_REGISTER_FAILED,
      });
    }
  });
}

async function getResponseFromURL(url) {
  const res = await Axios.get(url);
  return res.data;
}
module.exports.getAuthUserByEmail = getAuthUserByEmail;