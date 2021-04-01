const createRepository() = require('./repository/PovCharacteresRepository');
const PovCharacters = require('./model/PovCharacteres');
module.export = class PovCharacterController{
  constructor(povCharacterRepository){
    this.repository = povCharacterRepository;
  }

  index(request,response){
    response
  }

}