// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const path = require('path');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    console.log('Request body:', req.body);  // Log the incoming data
    const { email, password, phone_number } = req.body;

    // Validate that all fields are provided
    if (!email || !password || !phone_number) {
      return res.status(400).json({ message: 'All fields (email, password, phone_number) are required.' });
    }

    // Ensure password is a string
    if (typeof password !== 'string') {
      return res.status(400).json({ message: 'Password must be a string.' });
    }

    const username = phone_number || email.split('@')[0];

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password (make sure password is a string)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ phone_number, email, password: hashedPassword });
    await user.save();

    // Send response
    res.status(201).json({ message: 'User created successfully', redirectTo: '/role-selection' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});




// router.post('/signup', async (req, res) => {
//   try {
//     const { email, password, phone } = req.body; // Expect phone instead of username
//     const username = phone || email.split('@')[0]; // Generate a username if missing

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).send('User already exists');
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({ username, email, password: hashedPassword });

//     await user.save();
//     res.status(201).send('User created successfully');
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server error');
//   }
// });


// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// routes/auth.js
router.post('/update-role', async (req, res) => {
  try {
    const { email, role } = req.body;

    // Validate role
    if (!['shop-owner', 'attendant'].includes(role)) {
      return res.status(400).send({ success: false, message: 'Invalid role' });
    }

    // Find the user and update the role
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ success: false, message: 'User not found' });
    }

    user.role = role;
    await user.save();

    res.status(200).send({ success: true, message: 'Role updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Server error' });
  }
});


  

module.exports = router;
