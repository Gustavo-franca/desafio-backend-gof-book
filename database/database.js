const mongoose = require('mongoose');
const {promisfy} = require('util');
const { DB_USER_PASSWORD , DB_USER_NAME , DB_URL , DB_NAME } = process.env;
const uri = `mongodb+srv://${DB_USER_NAME}:${DB_USER_PASSWORD}@${DB_URL}${DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Banco de dados connectado");
});

console.log("runnig");