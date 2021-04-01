const mongoose = require('mongoose');
const {promisify} = require('util');
const { DB_USER_PASSWORD , DB_USER_NAME , DB_URL , DB_NAME } = process.env;
const uri = `mongodb+srv://${DB_USER_NAME}:${DB_USER_PASSWORD}@${DB_URL}${DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,
useFindAndModify: true,});
const db = mongoose.connection;

module.exports = db;