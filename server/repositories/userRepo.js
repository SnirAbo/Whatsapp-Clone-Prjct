const User = require('../models/userModel');

// Get All
const getAllUsers = () => {
  return User.find();
};

// Get By ID
const getById = (id) => {
  return User.findById(id);
};

const findByUsername = (username) => {
  return User.findOne({ username });
};

const blockUser = (targetedId , userId) => {
  const blockedUser = User.findByIdAndUpdate(userId, { $addToSet: {blockedUsers : targetedId}} , { new: true });
  return blockedUser ;
};


const addToGroup = (groupId , userId) => {
  const group = User.findByIdAndUpdate(userId, { $addToSet: {groups : groupId}} , { new: true });
  return group ;
};

const unBlockUser = (targetedId , userId) => {
  const unblockedUser = User.findByIdAndUpdate(userId, { $pull: {blockedUsers : targetedId}} , { new: true });
  return unblockedUser ;
};


const removeFromGroup = (groupId , userId) => {
  const group = User.findByIdAndUpdate(userId, { $pull: {groups : groupId}} , { new: true });
  return group ;
};

const getGroupsOfUser = (userId) => {
  return User.findById(userId).populate('groups');
};

// Create
const addUser = (obj) => {
  const user = new User(obj);
  return user.save();
};

// Update
const updateUser = (id, obj) => {
  return User.findByIdAndUpdate(id, obj);
};

// Delete
const deleteUser = (id) => {
  return User.findByIdAndDelete(id);
};

module.exports = {
    getAllUsers,
    getById,
    findByUsername,
    addUser,
    updateUser,
    deleteUser,
    blockUser,
    unBlockUser,
    addToGroup,
    removeFromGroup,
    getGroupsOfUser,
};
