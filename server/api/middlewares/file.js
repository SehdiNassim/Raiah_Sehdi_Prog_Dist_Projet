const Errors = require("../utils/constants").errors;
const { acceptedFilesList, path } = require("../utils/constants").file;
const sendError = require('../utils/response').sendError;

//USER
module.exports.checkProfileFile = (req, res, next) => {
  if(req.files && req.files.PROFILE){
    if(!_validateFileType(req.files.PROFILE))
       return sendError(Errors.FILE_NOT_SUPPORTED, Errors.FILE_ERROR, res)
    next();
  }
  else{
    if (req.method === 'POST')
      return res.status(400).json({
          status : Errors.FAILED,
          message : Errors.MISSION_NOT_SENT
      });
    next();
  }
};

module.exports.saveProfileFile = async (req, res, next)=>{
    try{
        if(req.files && req.files.PROFILE)
          await _saveProfileFile(req.files.PROFILE, req)
        next();
    }
    catch(e){
        return sendError(Errors.ERROR_WHILE_SAVING_FILE, Errors.FILE_ERROR, res);
      }
}

async function _saveProfileFile (file, req) {
  const key = 'PROFILE';
  const fileName = Date.now() + file.name;

  const filePath = `${path}/${key}/${fileName}`;
  const filePathURL = `${process.env.API_HOST_URL}/${filePath}`;

  const err = await file.mv(filePath);

  if (err) 
      return new Error({
        message : err.message
      });

  req.body.profileURL = filePathURL; 
}

//PRODUCT
module.exports.checkProductFile = (req, res, next) => {
  if(req.files && req.files.PRODUCT){
    if(!_validateFileType(req.files.PRODUCT))
       return sendError(Errors.FILE_NOT_SUPPORTED, Errors.FILE_ERROR, res)
    next();
  }
  else{
    if (req.method === 'POST')
      return res.status(400).json({
          status : Errors.FAILED,
          message : Errors.FILE_NOT_SENT
      });
    next();
  }
};

module.exports.saveProductFile = async (req, res, next)=>{
    try{
        if(req.files && req.files.PRODUCT)
          await _saveProductFile(req.files.PRODUCT, req)
        next();
    }
    catch(e){
        return sendError(Errors.ERROR_WHILE_SAVING_FILE, Errors.FILE_ERROR, res);
      }
}

async function _saveProductFile (file, req) {
  const key = 'PRODUCT';
  const fileName = Date.now() + file.name;

  const filePath = `${path}/${key}/${fileName}`;
  const filePathURL = `${process.env.API_HOST_URL}/${filePath}`;

  const err = await file.mv(filePath);

  if (err) 
      return new Error({
        message : err.message
      });

  req.body.productURL = filePathURL; 
}

//SHOP
module.exports.checkShopFile = (req, res, next) => {
    if(req.files && req.files.SHOP){
      if(!_validateFileType(req.files.SHOP))
         return sendError(Errors.FILE_NOT_SUPPORTED, Errors.FILE_ERROR, res)
      next();
    }
    else{
      if (req.method === 'POST')
        return res.status(400).json({
            status : Errors.FAILED,
            message : Errors.FILE_NOT_SENT
        });
      next();
    }
  };
  
module.exports.saveShopFile = async (req, res, next)=>{
      try{
        if(req.files && req.files.SHOP)
          await _saveShopFile(req.files.SHOP, req)
          next();
      }
      catch(e){
          return sendError(Errors.ERROR_WHILE_SAVING_FILE, Errors.FILE_ERROR, res);
        }
}
  
async function _saveShopFile (file, req) {
    const key = 'SHOP';
    const fileName = Date.now() + file.name;
  
    const filePath = `${path}/${key}/${fileName}`;
    const filePathURL = `${process.env.API_HOST_URL}/${filePath}`;
  
    const err = await file.mv(filePath);
  
    if (err) 
        return new Error({
          message : err.message
        });
  
    req.body.shopURL = filePathURL; 
}

function _validateFileType(file){
  return acceptedFilesList.includes(file.mimetype);
}
