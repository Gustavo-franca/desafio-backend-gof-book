const moongose = require('mongoose');

const HouseSchema = require('../schema/HouseSchema');

module.exports = moongose.model('House',HouseSchema);