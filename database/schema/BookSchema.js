const moongose = require('mongoose');
const {Schema} = moongose;
const CharacterSchema = require('./CharacterSchema');


const BookSchema = new Schema({
  external_id :  {
    type: Number,
    unique: true
  },
  name:String,
  isbn:String,
  authors: [String],
  numberOfPages: Number,
  publisher: String,
  country: String,
  mediaType: String,
  released: Date,
  characters: [{ type: Schema.Types.ObjectId, ref: 'Character' }],
  povCharacters: [{ type: Schema.Types.ObjectId, ref: 'Character' }] 
})

module.exports = BookSchema;
