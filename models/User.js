const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phone_number: {
    type: String,
    required: true,
    // unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['shop-owner', 'attendant'],
    required: true, // Ensures the role is assigned when a user is created
    default: 'attendant' // Default role can be 'attendant' or another role
  }
});

module.exports = mongoose.model('User', userSchema);
