const moongose = require('mongoose');

const BookSchema = require('../schema/BookSchema');


module.exports = moongose.model('Book',BookSchema);