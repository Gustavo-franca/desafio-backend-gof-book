const axios = require('axios');
const gofapi = axios.create({
  baseURL: 'https://anapioficeandfire.com/api/',
  timeout: 4000,
});

 async function getBooks(){
  return (await gofapi.get("books?pageSize=20")).data;
}
async function getCharacteres(page,pageSize = 20){
  if(page)
  return (await gofapi.get(`characters?page=${page}&pageSize=${pageSize}`)).data;
}
async function getHouses(page,pageSize = 20){
  if(page)
  return (await gofapi.get(`houses?page=${page}&pageSize=${pageSize}`)).data;
}

async function getCharacter(external_id){
  if(external_id)
  return (await gofapi.get(`characters/${external_id}?`)).data;
}
async function getHouse(external_id){
  if(external_id)
  return (await gofapi.get(`houses/${external_id}?`)).data;
}
async function getBook(external_id){
  if(external_id)
  return (await gofapi.get(`books/${external_id}?`)).data;
}
async function getAllegianceName(external_id){
    if(external_id)
    return (await gofapi.get(`houses/${external_id}?`)).data.name;
}
async function getCharacterName(external_id){
  if(external_id)
  return (await getCharacter(external_id)).name;
  
}  
module.exports ={
  ... gofapi,
  getBooks,
  getCharacteres,
  getHouses,
  getCharacter,
  getHouse,
  getBook,
  getCharacterName,
  getAllegianceName,

}
