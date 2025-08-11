const Message = require('../models/messageModel');


// Create
const addMessage = (obj) => {
  const message = new Message(obj);
  return message.save();
};

const getMessagesBetweenUsers = (userA, userB) => {
 return Message.find({$or: [
  {receiverUser: userA, sender: userB},
  {receiverUser: userB, sender: userA}
 ]}).populate(
  'sender', 'displayName _id'
  ).populate(
  'receiverUser', 'displayName _id'
  ).sort({ timestamp: 1 });
};

const getMessagesFromGroup = (groupId) => {
 return Message.find({ receiverGroup: groupId, isGroupMessage: true }).populate(
  'sender', 'displayName _id'
  ).populate(
  'receiverGroup', 'name _id'
  ).sort({ timestamp: 1 });
};

const getLastConversations = (userId) => {
 return Message.find({
  $or: [
    { sender: userId },
    { receiverUser: userId }
  ]}).sort({ timestamp: 1 });
};

// Update
const updateMessage = (id, obj) => {
  return Message.findByIdAndUpdate(id, obj);
};

// Delete
const deleteMessage = (id) => {
  return Message.findByIdAndDelete(id);
};

module.exports = {
  addMessage,
  updateMessage,
  deleteMessage,
  getMessagesBetweenUsers,
  getMessagesFromGroup,
  getLastConversations,
};
