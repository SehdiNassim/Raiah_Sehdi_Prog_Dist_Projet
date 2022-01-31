const Validators = require("../utils/validators");
const AuthControllers = require("../controllers/auth");
const Errors = require("../utils/constants").errors;
const sendError = require("../utils/response").sendError;
const Headers = require("../utils/constants").headers;

module.exports.validateRegisterFields = (req, res, next) => {

  const { error } = Validators.registerValidation(req.body);
  if (error) return sendError(error.details[0].message, error, res);
  const passwordError = passwordHasError(req.body.password);

  if (!passwordError) {
    next();
  } else {
    sendError(passwordError, "", res);
  }
};

module.exports.validPassword = (req, res, next) => {
    //compare both password field value
    const pwd = req.body.password;
  
    const hasError = passwordHasError(pwd);
    if (!hasError) {
      next();
    } else {
      return sendError(Errors.INVALID_PASSWORD, hasError, res);
    }
};
  
module.exports.validateLoginFields = (req, res, next) => {
    const { error } = Validators.loginValidation(req.body);
    if (error) return sendError(error.details[0].message, error, res);
    const passwordError = passwordHasError(req.body.password);
    if (!passwordError) {
      next();
    } else {
      sendError(passwordError, "", res);
    }
};

module.exports.checkAccessToken = (req, res, next) => {
  if (!req.header(Headers.AUTHORIZATION_HEADER))
    return sendError(Errors.UNAUTHORIZED, Errors.SPECIFY_VALID_HEADER, res);

  const authHeader = req
    .header(Headers.AUTHORIZATION_HEADER)
    .toString()
    .split(" ");
  if (authHeader != null && authHeader[0] === Headers.BEARER) {
    if (authHeader[1]) {
      req.accessToken = authHeader[1];
      next();
    } else
      return sendError(Errors.INVALID_TOKEN, Errors.SPECIFY_VALID_TOKEN, res);
  } else
    return res.status(403).json({
      status: Errors.FAILED,
      message: Errors.INVALID_AUTH_TYPE,
    });
};

module.exports.validateAccessToken = (req, res, next) => {

  const verificationResult = AuthControllers.verifyAccessToken(req.accessToken);

  if (verificationResult.valid) {
    req.tokenData = verificationResult.data;
    next();

  } else if (verificationResult.error.toString().includes(Headers.EXPIRED)) {

    return res.status(409).json({
      status: Errors.FAILED,
      message: Errors.ACCESS_TOKEN_EXPIRED,
    });

  } else {

    return res.status(400).json({
      status: Errors.FAILED,
      message: Errors.INVALID_TOKEN,
    });
  }
};

function passwordHasError(pwd) {
    // at least one numeric value
    var re = /[0-9]/;
    if (!re.test(pwd)) {
      return Errors.PASSWORD_DOES_NOT_CONTAIN_NUMBER;
    }
  
    // at least one lowercase letter
    re = /[a-z]/;
    if (!re.test(pwd)) {
      return Errors.PASSWORD_DOES_NOT_CONTAIN_LOWERCASE;
    }
  
    // at least one uppercase letter
    re = /[A-Z]/;
    if (!re.test(pwd)) {
      return Errors.PASSWORD_DOES_NOT_CONTAIN_UPPERCASE;
    }
  
    // at least one special character
    re = /[!,.@#%$&^*()-_]/;
    if (!re.test(pwd)) {
      return Errors.PASSWORD_DOES_NOT_CONTAIN_SPECIAL_CHAR;
    }
    return false;
}

/*
 these methods will just check the availability of tokens,
 they won't verify if they are valid or expired
*/
module.exports.checkRefreshToken = (req, res, next) => {
  if (!req.header(Headers.AUTHORIZATION_HEADER))
    return sendError(Errors.INVALID_TOKEN, Errors.INVALID_TOKEN, res);

  const authHeader = req
    .header(Headers.AUTHORIZATION_HEADER)
    .toString()
    .split(" ");
  if (authHeader != null && authHeader[0] === Headers.BEARER) {
    if (authHeader[1]) {
      req.refreshToken = authHeader[1];
      next();
    } else
      return sendError(Errors.INVALID_TOKEN, Errors.SPECIFY_VALID_TOKEN, res);
  } else
    return res.status(403).json({
      status: Errors.FAILED,
      message: Errors.INVALID_AUTH_TYPE,
    });
};

/* 
  refreshToken validation middleware
   - handles expiry of refresh token, in this case the user has to re-login to the application
   - if the refresh token is not valid, then Bad request status code is sent back
*/
module.exports.validateRefreshToken = (req, res, next) => {
  const verificationResult = AuthControllers.verifyRefreshToken(
    req.refreshToken
  );
  if (verificationResult.valid) {
    req.tokenData = verificationResult.data;
    next();
  } else if (verificationResult.error.toString().includes(Headers.EXPIRED)) {
    return res.status(401).json({
      status: Errors.FAILED,
      message: Errors.SESSION_EXPIRED,
    });
  } else {
    return res.status(400).json({
      status: Errors.FAILED,
      message: Errors.INVALID_TOKEN,
    });
  }
};