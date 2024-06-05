//backend/models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  address: { type: String },
  postalCode: { type: String },
  role: { type: String, default: 'user' } // 'user' or 'admin'
});

const User = mongoose.model('User', userSchema);

module.exports = User;
