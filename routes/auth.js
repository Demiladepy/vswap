// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// JWT secret from environment
const JWT_SECRET = process.env.JWT_SECRET || 'vswap_jwt_secret_2025';

router.post('/signup', async (req, res) => {
  try {
    const { email, password, phone_number } = req.body;

    // Input validation
    if (!email || !password || phone_number === undefined) {
      return res.status(400).json({ 
        success: false,
        message: 'All fields (email, password, phone_number) are required.' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false,
        message: 'Please provide a valid email address.' 
      });
    }

    // Password validation
    if (typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({ 
        success: false,
        message: 'Password must be at least 6 characters long.' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: 'User already exists with this email.' 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create new user
    const user = new User({ 
      phone_number: String(phone_number), 
      email: email.toLowerCase().trim(), 
      password: hashedPassword 
    });

    await user.save();

    res.status(201).json({ 
      success: true,
      message: 'User created successfully', 
      redirectTo: '/auth/role-selection' 
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error. Please try again later.' 
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Email and password are required.' 
      });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid email or password' 
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid email or password' 
      });
    }

    // Store user info in session
    req.session.userId = user._id;
    req.session.email = user.email;
    req.session.role = user.role;

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        role: user.role,
        email: user.email 
      }, 
      JWT_SECRET, 
      { expiresIn: '24h' }
    );

    // Redirect based on user role
    let redirectTo = '/api/shopowner/dashboard';
    if (user.role === 'shop-owner') {
      redirectTo = '/api/shopowner/dashboard';
    } else if (user.role === 'attendant') {
      redirectTo = '/api/attendant/dashboard';
    }

    res.status(200).json({ 
      success: true,
      message: 'Login successful', 
      token, 
      redirectTo,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error. Please try again later.' 
    });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ 
        success: false,
        message: 'Failed to log out' 
      });
    }
    res.status(200).json({ 
      success: true,
      message: 'Logged out successfully' 
    });
  });
});

router.post('/update-role', async (req, res) => {
  try {
    const { role } = req.body;
    const email = req.session.email;

    if (!email) {
      return res.status(401).json({ 
        success: false, 
        message: 'User not logged in' 
      });
    }

    // Validate role
    if (!['shop-owner', 'attendant'].includes(role)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid role. Must be either shop-owner or attendant.' 
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Update the role
    user.role = role;
    await user.save();

    // Update session
    req.session.role = role;

    res.status(200).json({ 
      success: true, 
      message: 'Role updated successfully',
      role: role
    });
  } catch (error) {
    console.error('Error occurred while updating role:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error. Please try again later.' 
    });
  }
});

module.exports = router;
