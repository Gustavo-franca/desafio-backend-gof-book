const moongose = require('mongoose');
const {Schema} = moongose;
const HouseSchema = require('./HouseSchema');

const SubHouseSchema = new Schema({
  id : Schema.Types.ObjectId,
  name: String,
})
const SubBookSchema = new Schema({
  id : Schema.Types.ObjectId,
  name: String,
})

const CharacterSchema = new Schema({
  external_id: {
    type: Number,
    unique: true
  },
  name: String,
  gender: String,
  culture: String,
  born: String,
  died: String,
  titles: [String],
  aliases: [String],
  father: String,
  mother: String,
  spouse: String,
  allegiances: [{ type: Schema.Types.ObjectId, ref: 'House' }],
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
  povBooks: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
  tvSeries: [String],
  playedBy: [String]
})
module.exports = CharacterSchema;
