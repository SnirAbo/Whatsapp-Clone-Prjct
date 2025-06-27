const userRepo = require('../repositories/userRepo');


const login = (username) => {
  return userRepo.findByUsername(username);
};


const register = (obj) => {
  return userRepo.addUser(obj);
};


module.exports = {
    login,
    register,
};
