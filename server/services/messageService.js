const messageRepo = require('../repositories/messageRepo');


const addMessage = (obj) => {
  return messageRepo.addMessage(obj);
};

const getMessagesBetweenUsers = (userA,userB) => {
  return messageRepo.getMessagesBetweenUsers(userA,userB);
};

const getMessagesFromGroup = (groupId) => {
  return messageRepo.getMessagesFromGroup(groupId);
};

const getLastConversations = (userId) => {
  return messageRepo.getLastConversations(userId);
};

const updateMessage = (id, obj) => {
  return messageRepo.updateMessage(id, obj);
};

const deleteMessage = (id) => {
  return messageRepo.deleteMessage(id);
};

module.exports = {
  addMessage,
  updateMessage,
  deleteMessage,
  getLastConversations,
  getMessagesFromGroup,
  getMessagesBetweenUsers,
};
