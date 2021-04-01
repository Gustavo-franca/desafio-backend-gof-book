/* Vou Separar em  Books . House , Characteres */

/* Cada link como character e Hous ou Book dentro de outro Book deve conter 2 informação o nome e o interno

sendo assim ao encontrar um htttp será chamado a função de criação daquele character caso ele já existir apenas unilo , assim temos que começar duplicando a 
House depois CHaracteres e então Books
 */
const gofApi = require('./service/gofApi');
const Book = require('./database/model/Book');
const House = require('./database/model/House');
const Character = require('./database/model/Character');


async function start(){
  async function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
  }
  function mapId(url){
        const arrUrl = url.split('/');
        const id = arrUrl[arrUrl.length - 1];
        if(!id)return undefined;
        return parseInt(id);
                            
      }
  async function updateBooks(errors = 0){
        try{
          let books = [];
          try{
           books =await  gofApi.getBooks();
          }catch(err){
            throw new Error("request error");
          }

        const updatedBooks = await Promise.all(books.map(handleBook));
        await Book.insertMany(updatedBooks.filter((book)=>book)); 
        }catch(err){
          console.log(`[ERROR]:${err.message}`);
          if(err.message == "request error"){
            if(errors > 3)throw new Error("attempted limit exceeded");
            await sleep(1000);
            return await updateBooks(errors + 1 );
          }else{
            throw err;
          }
        }

  }
  async function handleReplicaGof(){
    try{
      await updateBooks();

      await  getCharacteresAndTreat();
      await updateCharacteresFamily();
      await updateHouses();
      console.log("Database Atualizada com Sucesso ...");
    }catch(err){
        console.log(`[ERROR]:${err.message}, 
replication failed`);
        console.error(err);

    }
  }
  async function updateHouses(page = 0, errors = 0 ){
    async function handleRequest(page,pageCount,errors = 0){
        try{ 
        return await gofApi.getHouses(page,pageCount);
        }catch(err){
            console.log(`[REQUEST_ERROR]:${err.message} in page ${page} of Houses`);
         if(err){
            if(errors > 3){
              errors = 0;
              throw new Error(`[REQUEST_ERROR]: attempted limit exceeded`);
            };
            await sleep(1000);
            return  await  handleRequest(page,pageCount,errors + 1 );
          }else{
            throw err;
          }
        }
     }
     try{
       const pageCount = 50;
       let housesResponse;
       do{

          housesResponse = await handleRequest(page,pageCount);
          if(housesResponse)
          await Promise.all(housesResponse.map(handleHouse));
          page++;
          await sleep(200);

       }while(housesResponse && housesResponse.length);
     }catch(err){
         if(err.message == "[REQUEST_ERROR]: attempted limit exceeded"){
              console.log(`${err.message},
proceeding to the next page`);
              errors = 0;
               await sleep(1000);
              return await updateHouses(page + 1,errors);
            }else{
            throw err;
          }
     }
    return
  }
  async function updateCharacteresFamily(){
    const limit = 50;
    let skip = 0;
    let hasNext = 0;
    try{
      do{
        const characters = await Character.find(null,"father mother spouse",{skip,limit});
        await Promise.all(characters.map(async (character)=>{
          character.father =  !Number. isNaN(parseInt(character.father))?(await Character.find({external_id: parseInt(character.father)},"name")).name : '';
          character.mother = !Number. isNaN(parseInt(character.mother))?(await Character.find({external_id: parseInt(character.mother)},"name")).name : '';
          character.spouse = !Number. isNaN(parseInt(character.spouse))?(await Character.find({external_id: parseInt(character.spouse)},"name")).name : '';
          await character.save();
        }));
        skip++;
        hasNext = characters && characters.length > 0;
      }while(hasNext);
    }catch(err){
      console.log(`[ERROR]:${err.message}`);
      throw err;
    }

  }
   async function getCharacteresAndTreat(page = 0,errors = 0){
     async function handleRequest(page,pageCount,errors = 0){
        try{ 
        return await gofApi.getCharacteres(page,pageCount);
        }catch(err){
          
            console.log(`[REQUEST_ERROR]:${err.message} in page ${page} of character`);
         if(err){
            if(errors > 3){
              console.log(`[ERROR]: attempted limit exceeded,
proceeding to the next page`);
              errors = 0;
              throw new Error(`[REQUEST_ERROR]: attempted limit exceeded`);
            };
            await sleep(1000);
            return  await  handleRequest(page,pageCount,errors + 1 );
          }else{
            throw err;
          }
        }
     }
     try{
       const pageCount = 50;
       const characters = []
       let charactersResponse;
       do{

          charactersResponse = await handleRequest(page,pageCount);
          if(charactersResponse)
          await Promise.all(charactersResponse.map(handleCharacter));
          page++;
          await sleep(200);

       }while(charactersResponse && charactersResponse.length);
     }catch(err){
         if(err.message == "[REQUEST_ERROR]: attempted limit exceeded"){
              console.log(`${err.message},
proceeding to the next page`);
              errors = 0;
               await sleep(1000);
              return await getCharacteresAndTreat(page + 1,errors)
            }else{
            throw err;
          }
     }
   }

 async function handleBook(book){
      book.external_id = mapId(book.url);
      const b = await Book.findOne({external_id: book.external_id});
      if(b)return undefined;
      const characters = [];
      const povCharacters = [];
      return {
        ... book,
        povCharacters,
        characters
      }
 }
 async function handleHouse(house){
    house.external_id = mapId(house.url);
      const houseBank = await House.findOne({external_id: house.external_id});
    if(houseBank)return undefined;

    house.overlord =  mapId( house.overlord );

    houses.cadetBranches = houses.cadetBranches.map(mapId);
    houses.swornMembers =Array.isArray(houses.swornMembers)? houses.swornMembers.map((member)=>{
      return !Number. isNaN(mapId( house.currentLord )?await Character.findOne({external_id: mapId(member)}):"";
    }): [] ;


    houses.currentLord =  !Number. isNaN(mapId( house.currentLord ))?await Character.findOne({external_id : mapId( house.currentLord ) }) : "";
    houses.heir =    !Number. isNaN( mapId( house.heir ))?await Character.findOne({external_id : mapId( house.heir ) }): "";
    houses.founder =   !Number. isNaN( mapId( house.founder ))?await Character.findOne({external_id : mapId( house.founder ) }) : "";
    
 }
  async function handleCharacter(character){
      character.external_id = mapId(character.url);
    const characterBank = await Character.findOne({external_id: character.external_id});
    if(characterBank)return undefined;

    character.books = await  Promise.all(character.books.map(async (url)=>{
      const external_id = mapId(url);
      return await Book.findOne({external_id});
    }));
    character.povBooks = await  Promise.all(character.povBooks.map(async (url)=>{
      const external_id = mapId(url);
      return await Book.findOne({external_id});
    }));

    character.allegiances = [];
    character.father = mapId(character.father);
    character.mother = mapId(character.mother);
    character.spouse = mapId(character.spouse);

    const c = new Character(character);
    await c.save();
    return c;

  }

  
  await  handleReplicaGof();

}
module.exports = {
  start,
}

