const express = require('express');
const messageService = require('../services/messageService');

const router = express.Router();

// Entry point: http://localhost:3000/users

// Get All 
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const messages = await messageService.getLastConversations(id);
    res.json(messages);
  } catch (error) {
    res.json(error);
  }
});

// Get a user By ID
router.get('/chat', async (req, res) => {
  try {
    const { userA, userB } = req.query;
    const chat = await messageService.getMessagesBetweenUsers(userA,userB);
    res.json(chat);
  } catch (error) {
    res.json(error);
  }
});

router.get('/group', async (req, res) => {
  try {
    const { groupId } = req.query;
    const chat = await messageService.getMessagesFromGroup(groupId);
    res.json(chat);
  } catch (error) {
    res.status(500).json(error.message);
  }
});



// Add a new message
router.post('/', async (req, res) => {
  try {
    const obj = req.body;
    const result = await messageService.addMessage(obj);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Update a message
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await messageService.updateMessage(id, obj);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

// Delete a message
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await messageService.deleteMessage(id);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
