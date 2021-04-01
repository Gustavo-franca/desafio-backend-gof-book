const router = require('express').Router();
const axios = require('axios');
const validator = require('validator');

router.get('/povcharacter/:book',async (req,response)=>{
    try{
      const bookId = req.param.book;
      const bookData = (await axios.get('https://anapioficeandfire.com/api/books/1')).data;
    
      console.log(bookData);
        bookData.povCharacters = await Promise.all(bookData.povCharacters.map(async (character)=>{
       const data = (await axios.get(character)).data;
        return data;
      }));

      bookData.characters = await Promise.all(bookData.characters.map(async (character)=>{
                    const data = (await axios.get(character)).data;
                      return data;
                    }));
       response.status(200).send(bookData);
    }catch(err){
      response.status(500).send({ error: err.message });
    }
    
});

module.exports = router;