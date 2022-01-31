const { FAILED, INTERNAL_SERVER_ERROR } = require("./constants").errors;

// sends internal server error response
module.exports.internalServerError = (res, error) => {
  console.log(error);
  res.status(500).json({
    status: FAILED,
    message: INTERNAL_SERVER_ERROR,
    error: error,
  });
};

module.exports.sendError = (message, error, res) =>{
  return res.status(400).json({
    status: FAILED,
    message: message,
    error: error,
  });
}