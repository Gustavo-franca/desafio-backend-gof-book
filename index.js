/* buscar dados das api e armazenar no banco de dados
*/

/* subir rotas para buscar dados */
require('./database/database.js');
const express = require("express");
const app = express();

app.get("/",(request,response)=>{
  response.send({status : 200 });
})

app.listen(3000,()=>{
  console.log("server running ...");
})


