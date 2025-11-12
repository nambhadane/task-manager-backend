const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Create
router.post('/', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error('❌ Error creating task:', err.message);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

// Read all
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error('❌ Error fetching tasks:', err.message);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
  } catch (err) {
    console.error('❌ Error updating task:', err.message);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error('❌ Error deleting task:', err.message);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

module.exports = router;
