const groupRepo = require('../repositories/groupRepo');

const getAllGroups = () => {
  return groupRepo.getAllGroups();
};

const getById = (id) => {
  return groupRepo.getById(id);
};

const addGroup = (obj) => {
  return groupRepo.addGroup(obj);
};

const addUserToGroup = (groupId, userId) => {
  return groupRepo.addUserToGroup(groupId, userId);
};

const removeUserFromGroup = (groupId, userId) => {
  return groupRepo.removeUserFromGroup(groupId, userId);
};

const updateGroup = (id, obj) => {
  return groupRepo.updateGroup(id, obj);
};

const deleteGroup = (id) => {
  return groupRepo.deleteGroup(id);
};

module.exports = {
  getAllGroups,
  getById,
  addGroup,
  updateGroup,
  deleteGroup,
  addUserToGroup,
  removeUserFromGroup,
};
