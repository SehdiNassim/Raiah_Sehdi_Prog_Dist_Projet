const User = require("../models/user");
const Success = require("../utils/constants").success;
const Errors = require("../utils/constants").errors;

module.exports.createUser = async (userData) => {
  var user = new User(userData);
  await user.save();
};

module.exports.getUser = async (req,res) => {
  const _id = req.tokenData.authId;
  const projection = _getProjection(req.query.q);
  const user = await User.findById(_id, projection);
  return res.status(200).json({
    status: Success.SUCCESS,
    user
  });
};

module.exports.editUser = async (req, res) => {
  const _id = req.tokenData.authId;
  var user = await User.findByIdAndUpdate(_id,{
    createdAt: 0,
    updatedAt: 0,
    __v: 0,
  });

  if (!user) {
    return res.status(403).json({
      status: Errors.Failed,
      message: Errors.ERROR_WHILE_UPDATING_USER
    });
  }
  try{
    user = await _updateUser (user, req.body);
  }
  catch (err) {
    console.log(err);
    return sendError(Errors.ERROR_WHILE_UPDATING_USER, Errors.FAILED, res);
  }

  await user.save((error,updated) => {
    if (error || !updated)
        return res.status(403).json({
          status: Errors.FAILED,
          message: Errors.ERROR_WHILE_UPDATING_USER,
        });
      return res.status(200).json({
        status: Success.SUCCESS,
        message: Success.USER_PRODUCT,
        user: updated,
      });
  });
};

const _getProjection = (q) => {
  switch (q) {
    case "navbar": return {
      firstName:1,
      lastName:1,
      profileURL:1,
      email:1
    }
    default : return {
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    }
  }
}

async function _updateUser (user, updated){
  for (let [key, value] of Object.entries(updated)) {
    try{
         user[key] = updated[key];
    }
    catch (err) {
      console.log(err);
      throw err;
    }
  }
  return user;
}