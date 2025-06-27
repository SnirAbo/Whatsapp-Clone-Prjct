const Message = require('../models/messageModel');


// Create
const addMessage = (obj) => {
  const message = new Message(obj);
  return message.save();
};

const getMessagesBetweenUsers = (userA, userB) => {
 return Message.find({$or: [
  {receiver: userA, sender: userB},
  {receiver: userB, sender: userA}
 ]}).sort({ timestamp: 1 });
 
};

const getMessagesFromGroup = (groupId) => {
 return Message.find({ receiver: groupId, isGroupMessage: true }).sort({ timestamp: 1 });
};

const getLastConversations = (userId) => {
 return Message.find({
  $or: [
    { sender: userId },
    { receiver: userId }
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
