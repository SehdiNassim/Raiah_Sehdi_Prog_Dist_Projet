const {getKeysArrayFromMap} = require("../../../core/helpers");

const orderStatus = {
    PENDING : 'En cours',  
    SENT : 'Envoyé',  
    DELIVERED : 'Livré',  
};

module.exports.orderStatus= orderStatus;
module.exports.orderStatusKeys = getKeysArrayFromMap(orderStatus);