//backend/routes/items.js

const express = require('express');
const Item = require('../models/Item');
const router = express.Router();

router.post('/add', async (req, res) => {
  const { name, category, description, image, stock, price } = req.body;
  try {
    const newItem = new Item({ name, category, description, image, stock, price });
    await newItem.save();
    res.status(201).json({ message: 'Item added successfully', item: newItem });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const updatedItem = await Item.findByIdAndUpdate(id, updates, { new: true });
    res.json({ message: 'Item updated successfully', item: updatedItem });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Item.findByIdAndDelete(id);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
