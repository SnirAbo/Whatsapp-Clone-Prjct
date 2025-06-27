const express = require('express');
const groupService = require('../services/groupService');

const router = express.Router();

// Entry point: http://localhost:3000/groups

// Get All 
router.get('/', async (req, res) => {
  try {
    const filters = req.query;
    const groups = await groupService.getAllGroups(filters);
    res.json(groups);
  } catch (error) {
    res.json(error);
  }
});

// Get a group By ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const group = await groupService.getById(id);
    res.json(group);
  } catch (error) {
    res.json(error);
  }
});

// Add a new group
router.post('/', async (req, res) => {
  try {
    const obj = req.body;
    const result = await groupService.addGroup(obj);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Update a group
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await groupService.updateGroup(id, obj);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

// Delete a group
router.delete('/:id/', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await groupService.deleteGroup(id);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
