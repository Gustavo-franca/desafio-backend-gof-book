const moongose = require('mongoose');
const {Schema} = moongose;
const CharacterSchema = require('./CharacterSchema');
const HouseSchema = new Schema({
  name:String,
  region:String,
  coatOfArms:String,
  words:String,
  titles:[String],
  seats:[String],
  currentLord:{ type: Schema.Types.ObjectId, ref: 'Character' },
  heir:{ type: Schema.Types.ObjectId, ref: 'Character' },
  overlord:{ type: Schema.Types.ObjectId, ref: 'House' },
  founded:String,
  founder:{ type: Schema.Types.ObjectId, ref: 'Character' },
  diedOut:String,
  ancestralWeapons:[String],
  cadetBranches: [{ type: Schema.Types.ObjectId, ref: 'House' }],
  swornMembers: [{ type: Schema.Types.ObjectId, ref: 'Character' }],
})
module.exports = HouseSchema;

