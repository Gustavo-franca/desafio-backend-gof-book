const moongose = require('mongoose');
const Book = require('./Book');
const CharacterSchema = require('../schema/CharacterSchema');

CharacterSchema.post('save', function (character) {
  if(Array.isArray(character.books))
     character.books.forEach(async (book)=>{

    const b = await Book.findOne({_id: book._id})
    b.characters.push(b);
    b.save();
  })
  if(Array.isArray(character.povBooks))
    character.povBooks.forEach(async (book)=>{

    const b = await Book.findOne({_id: book._id})
    b.povCharacters.push(b);
    b.save();
  })
});

module.exports = moongose.model('Character',CharacterSchema);