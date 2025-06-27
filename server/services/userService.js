const userRepo = require('../repositories/userRepo');
const groupRepo = require('../repositories/groupRepo');

const getAllUser = (filters) => {
  return userRepo.getAllUsers(filters);
};

const getById = (id) => {
  return userRepo.getById(id);
};

const addUser = (obj) => {
  return userRepo.addUser(obj);
};

const blockUser = (targetedId, userId) => {
  return userRepo.blockUser(targetedId, userId);
};

const unBlockUser = (targetedId, userId) => {
  return userRepo.unBlockUser(targetedId, userId);
};

const addToGroup = (groupId, userId) => {
  groupRepo.addUserToGroup(groupId, userId);
  return userRepo.addToGroup(groupId, userId);
};

const removeFromGroup = (groupId, userId) => {
  groupRepo.removeUserFromGroup(groupId,userId);
  return userRepo.removeFromGroup(groupId, userId);
};

const getGroupsOfUser = (userId) => {
  return userRepo.getGroupsOfUser(userId);
};

const updateUser = (id, obj) => {
  return userRepo.updateUser(id, obj);
};

const deleteUser = (id) => {
  return userRepo.deleteUser(id);
};

module.exports = {
  getAllUser,
  getById,
  addUser,
  updateUser,
  deleteUser,
  blockUser,
  unBlockUser,
  addToGroup,
  removeFromGroup,
  getGroupsOfUser,
};
