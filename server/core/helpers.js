const crypto = require('crypto');
const BLANK_SPACE = " ";
const FORWARD_SLASH = "/";
const COMMA = ",";

module.exports.join = (...args) => {
  var res = "";
  args.forEach((arg) => (res += arg));
  return res;
};

module.exports.joinWithSpace = (...args) => {
  var res = "";
  args.forEach((arg) => (res = res + BLANK_SPACE + arg));
  return res.trim();
};

module.exports.joinWithCommaSpace = (...args) => {
  var res = "";
  args.forEach((arg) => (res = res + COMMA + BLANK_SPACE + arg));
  return res.trim().substr(2);
};

module.exports.joinWithForwardSlash = (...args) => {
  var res = "";
  args.forEach((arg) => (res = res + FORWARD_SLASH + arg));
  return res.trim().substr(1);
};

module.exports.getValuesArrayFromMap = (map) => {
  if (map){
    var list = [];

    for (const [_, value] of Object.entries(map)) {
      list.push(value);
    }
    return list;
  }
  return [];
};

module.exports.getKeysArrayFromMap = (map) => {
  if (map){
    var list = [];

    for (const [_, value] of Object.entries(map)) {
      list.push(_);
    }
    return list;
  }
  return [];
};

module.exports.getKeyValueArrayFromMap = (map) => {
  if (map){
    var list = [];

    for (const [_, value] of Object.entries(map)) {
      list.push({
        KEY : _ ,
        VALUE : value
      });
    }
    return list;
  }
  return [];
};

module.exports.checkIfLowerCase = (query)=>{
  return /[a-z]/.test(query) && !/[A-Z]/.test(query);
}

module.exports.checkHasDuplicates = (arr)=> {
  return arr.some( function(item) {
      return arr.indexOf(item) !== arr.lastIndexOf(item);
  });
}
module.exports.hashThePassword = (password) => {
  return crypto.pbkdf2Sync(password,process.env.SALT,10,100,'sha512').toString();
}