const {getKeysArrayFromMap} = require("../../../core/helpers");

const productStatus = {
    ONGOING : 'En cours',  
    DELETED : 'Supprimé',  
};

module.exports.productStatus= productStatus;
module.exports.productStatusKeys = getKeysArrayFromMap(productStatus);