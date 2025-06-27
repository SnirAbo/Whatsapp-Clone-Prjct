const express = require('express');
const userService = require('../services/userService');


const router = express.Router();

// Entry point: http://localhost:3000/users

// Get All 
router.get('/', async (req, res) => {
  try {
    const filters = req.query;
    const users = await userService.getAllUser(filters);
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});

// Get a user By ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getById(id);
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

// Add a new user
router.post('/', async (req, res) => {
  try {
    const obj = req.body;
    const result = await userService.addUser(obj);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Update a user
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await userService.updateUser(id, obj);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

// Block user
router.put('/block', async (req, res) => {
  try {
    const { targetedId, userId } = req.body;
    const result = await userService.blockUser(targetedId, userId);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

// unBlock user
router.put('/unblock', async (req, res) => {
  try {
    const { targetedId , userId} = req.body;
    const result = await userService.unBlockUser(targetedId, userId);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

// join to group
router.put('/join-group', async (req, res) => {
  try {
    const { targetedId, userId } = req.body;
    const result = await userService.addToGroup(targetedId, userId);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

// remove from group
router.put('/leave-group', async (req, res) => {
  try {
    const { targetedId, userId } = req.body;
    const result = await userService.removeFromGroup(targetedId, userId);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

// get all groups
router.get('/:id/groups', async (req, res) => {
  try {
    const { id } = req.params;
    const groups = await userService.getGroupsOfUser(id);
    res.json(groups);
  } catch (error) {
    res.json(error);
  }
});


// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userService.deleteUser(id);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});
module.exports = router;
