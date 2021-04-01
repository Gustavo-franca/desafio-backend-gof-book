/* buscar dados das api e armazenar no banco de dados
*/
const dotenv = require('dotenv');
dotenv.config();


/* subir rotas para buscar dados */
const db = require('./database/database.js');
const express = require("express");
const app = express();
const router = require('./routes');
const replica = require('./replica');

app.use(router);
app.get("/", (request, response) => {
  response.send({ status: 200 });
})

db.once('open',()=>{

    replica.start();

    app.listen(3000, () => {
      console.log("server running ...");
    })

 })



