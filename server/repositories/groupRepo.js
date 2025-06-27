const Group = require('../models/groupModel');

// Get All
const getAllGroups = () => {
  return Group.find();
};

// Get By ID
const getById = (id) => {
  return Group.findById(id);
};

const addUserToGroup = (groupId, userId) => {
 return Group.findByIdAndUpdate(
  groupId,
  { $addToSet: {users : userId}}, 
  { new: true });
};
const removeUserFromGroup = (groupId, userId) => {
   return Group.findByIdAndUpdate(
    groupId,
    { $pull: {users : userId}},
     { new: true });
};

// Create
const addGroup = (obj) => {
  const group = new Group(obj);
  return group.save();
};

// Update
const updateGroup = (id, obj) => {
  return Group.findByIdAndUpdate(id, obj);
};

// Delete
const deleteGroup = (id) => {
  return Group.findByIdAndDelete(id);
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
