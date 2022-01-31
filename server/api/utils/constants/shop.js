const {getKeysArrayFromMap} = require("../../../core/helpers");

const shopType = {
    TECH : 'High-Tech',
    GAMES : 'Consoles & Jeux vidéos',
    GROCERY : 'Épicerie & Courses',     
    MODE : 'Mode & Accéssoires',     
    HEALTH_COSMETIC : 'Santé & Cosmétiques',     
    HOME : 'Maison & Habitat',     
    CAR : 'Auto-Moto',     
    CULTURE_DIVERTISMENT : 'Culture & Divertissement',     
    FINANCE : 'Finances & Assurances',     
    TRAVEL : 'Voyages',     
};

module.exports.shopType= shopType;
module.exports.shopTypeKeys = getKeysArrayFromMap(shopType);