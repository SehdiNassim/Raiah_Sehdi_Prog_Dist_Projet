// validation
const Joi = require("@hapi/joi");

module.exports.registerValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    email: Joi.string().min(3).max(256).required().email(),
    password: Joi.string().min(6).required(),
    phoneNumber: Joi.string().min(9).required(),
  });

  return schema.validate(data);
};

module.exports.loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(256).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

module.exports.userEditValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    gender: Joi.string().allow(""),
    birthDate: Joi.string().allow(""),
    location: {
      address: Joi.string().allow(""),
      zip: Joi.string().allow(""),
      city: Joi.string().allow(""),
    },
    phoneNumber: Joi.string().allow(""),
    bio: Joi.string().allow(""),
  });

  return schema.validate(data);
};


module.exports.productCreationValidation = (data) => {
  const schema = Joi.object({
    idShop: Joi.string().required(),
    name: Joi.string().required(),
    bio: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().min(1).required(),
  });

  return schema.validate(data);
};

module.exports.productEditValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string(),
    bio: Joi.string(),
    price: Joi.number(),
    quantity: Joi.number().min(1)
  });

  return schema.validate(data);
};

module.exports.shopCreationValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    type: Joi.string().required(),
    description: Joi.string().required()
  });

  return schema.validate(data);
};

module.exports.shopEditValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string(),
    type: Joi.string(),
    description: Joi.string()
  });
  return schema.validate(data);
};