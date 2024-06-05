const express = require('express');
const router = express.Router(); 
const Order = require('../models/Order');
const Item = require('../models/Item')
const { v4: uuidv4 } = require('uuid'); 
const { authenticateToken } = require('../config/jwt'); 

function generateUniqueId() {
  return uuidv4();
}

router.post('/add', authenticateToken, async (req, res) => {
  try {
    console.log('Authenticated user:', req.user);
    console.log('Request body:', req.body);

    const { items, total } = req.body;

    if (!req.user || !req.user._id) {
      return res.status(400).json({ error: 'User is not authenticated' });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Invalid items array' });
    }

    if (typeof total !== 'number' || total <= 0) {
      return res.status(400).json({ error: 'Invalid total amount' });
    }

    const newOrderItems = [];
    for (const { itemId, quantity } of req.body.items) {
      const item = await Item.findById(itemId);
      if (!item) {
        return res.status(400).json({ error: `Item with ID ${itemId} not found` });
      }
      newOrderItems.push({
        itemId,
        itemName: item.name, 
        quantity
      });
    }

    const newOrder = new Order({
      userId: req.user._id,
      items: newOrderItems,
      total: req.body.total,
      orderID: generateUniqueId(),
      trackingID: generateUniqueId()
    });

    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error); 
    res.status(500).json({ error: error.message });
  }
});

router.get('/', authenticateToken, async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(400).json({ error: 'User is not authenticated' });
    }

    const orders = await Order.find({ userId: req.user._id });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/updateItemQuantity', async (req, res) => {
  try {
    const { items } = req.body;

    for (const item of items) {
      const { itemId, quantity } = item;

      if (!itemId || !quantity || isNaN(quantity)) {
        return res.status(400).json({ error: 'Invalid request parameters' });
      }

      await Item.updateOne({ _id: itemId }, { $inc: { stock: -quantity } });
    }

    res.status(200).json({ message: 'Item quantities updated successfully' });
  } catch (error) {
    console.error('Error updating item quantity:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



module.exports = router; 
