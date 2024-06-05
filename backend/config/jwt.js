const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    console.log('Auth header:', authHeader);

    if (!authHeader) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.replace('Bearer ', '');
    console.log('Token:', token);

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.userId).select('-password');

    if (!req.user) {
      return res.status(401).json({ message: 'Invalid token.' });
    }

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(400).json({ message: 'Invalid token.' });
  }
};


const generateToken = (userId) => {
  const payload = { userId };
  const secret = process.env.JWT_SECRET || 'your_jwt_secret';
  const options = { expiresIn: '1h' };

  return jwt.sign(payload, secret, options);
};

module.exports = { authenticateToken, generateToken };
