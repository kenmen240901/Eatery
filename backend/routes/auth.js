//backend/routes/auth.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const { generateToken } = require('../config/jwt');

router.post('/register', async (req, res) => {
  const { firstName, lastName, username, email, password, phoneNumber, address, postalCode } = req.body;
  try {
    const user = new User({ firstName, lastName, username, email, password, phoneNumber, address, postalCode });
    user.password = await bcrypt.hash(password, 10);
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

    const token = generateToken(user._id);
    res.json({ token, username: user.username, firstName: user.firstName, lastName: user.lastName, email: user.email, phoneNumber: user.phoneNumber, address: user.address, postalCode: user.postalCode });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/update', async (req, res) => {
  const { userId, firstName, lastName, email, phoneNumber, address, postalCode } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.address = address;
    user.postalCode = postalCode;

    await user.save();

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
