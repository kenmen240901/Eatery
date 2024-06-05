// routes/cart.js

const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Item = require('../models/Item');
const { authenticateToken } = require('../config/jwt');

router.get('/', authenticateToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate('items.itemId');
    if (!cart) {
      console.log('Cart not found for user:', req.user.id);
      return res.json({ items: [] });
    }
    console.log('Cart retrieved for user:', req.user.id);
    res.json(cart);
  } catch (error) {
    console.error('Error getting cart:', error.message);
    res.status(500).json({ error: error.message });
  }
});

router.post('/save', authenticateToken, async (req, res) => {
  const { items } = req.body;
  try {
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      cart = new Cart({ userId: req.user.id, items });
    } else {
      cart.items = items;
    }
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/add', authenticateToken, async (req, res) => {
  const { itemId, quantity } = req.body;
  try {
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] });
    }

    const cartItemIndex = cart.items.findIndex(item => item.itemId.equals(itemId));
    if (cartItemIndex > -1) {
      cart.items[cartItemIndex].quantity += quantity;
    } else {
      cart.items.push({ itemId, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/update', authenticateToken, async (req, res) => {
  const { itemId, quantity } = req.body;
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const cartItemIndex = cart.items.findIndex(item => item.itemId.equals(itemId));
    if (cartItemIndex > -1) {
      cart.items[cartItemIndex].quantity = quantity;
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/remove', authenticateToken, async (req, res) => {
  const { itemId } = req.body;
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(item => !item.itemId.equals(itemId));
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/clear', authenticateToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = [];
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
