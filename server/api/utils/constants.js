require("dotenv").config();

module.exports = Object.freeze({
  headers: require("./constants/headers"),
  collections: require("./constants/collections_names"),
  shop: require("./constants/shop"),
  product: require("./constants/product"),
  order: require("./constants/order"),
  errors: require("./constants/error_messages"),
  success: require("./constants/success_messages"),
  file: require("./constants/file"),
});
