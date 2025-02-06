// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const path = require('path');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const router = express.Router();







router.post('/signup', async (req, res) => {
  try {
    console.log('Request body:', req.body); // Debugging

    let { email, password, phone_number } = req.body;

    if (!email || !password || phone_number === undefined) {
      return res.status(400).json({ message: 'All fields (email, password, phone_number) are required.' });
    }

    if (typeof password !== 'string') {
      return res.status(400).json({ message: 'Password must be a string.' });
    }

    // Convert phone_number to string if it's a number
    phone_number = String(phone_number);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ phone_number, email, password: hashedPassword });

    await user.save();

    res.status(201).json({ message: 'User created successfully', redirectTo: '/auth/role-selection' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to log out' });
    }
    res.status(200).json({ message: 'Logged out successfully' });
  });
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
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     // Compare passwords
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });

//     res.status(200).json({ message: 'Login successful', token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });


// routes/auth.js
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

    // Store email in session
    req.session.email = email;

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, 'your_secret_key', { expiresIn: '1h' });

    // Redirect based on user role
    let redirectTo = '/shopowner/dashboard';
    if (user.role === 'shop-owner') {
      redirectTo = '/shop-owner';
    } else if (user.role === 'attendant') {
      redirectTo = '/attendant/dashboard';
    }

    res.status(200).json({ message: 'Login successful', token, redirectTo });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     // Compare passwords
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     // Check if the user has a role assigned
//     if (!user.role) {
//       return res.status(200).json({ 
//         message: 'Redirect to role selection', 
//         redirectTo: '/role-selection' 
//       });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ userId: user._id, role: user.role }, 'your_secret_key', { expiresIn: '1h' });

//     // Redirect based on user role
//     let redirectTo = '/dashboard';
//     if (user.role === 'shop-owner') {
//       redirectTo = '/shop-owner';
//     } else if (user.role === 'attendant') {
//       redirectTo = '/attendant';
//     }

//     res.status(200).json({ message: 'Login successful', token, redirectTo });

//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

router.post('/update-role', async (req, res) => {
  try {
    const { role } = req.body;
    const email = req.session.email; // Get email from the session

    if (!email) {
      return res.status(401).send({ success: false, message: 'User not logged in' });
    }

    // Validate role
    if (!['shop-owner', 'attendant'].includes(role)) {
      return res.status(400).send({ success: false, message: 'Invalid role' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ success: false, message: 'User not found' });
    }

    // Update the role
    user.role = role;
    await user.save();

    res.status(200).send({ success: true, message: 'Role updated successfully' });
  } catch (error) {
    console.error('Error occurred while updating role:', error);
    res.status(500).send({ success: false, message: 'Server error' });
  }
});

// router.post('/update-role', async (req, res) => {
//   try {
//     const { email, role } = req.body;

//     console.log('Received request to update role:', { email, role });

//     // Validate role
//     if (!['shop-owner', 'attendant'].includes(role)) {
//       console.log('Invalid role:', role); // Log if the role is invalid
//       return res.status(400).send({ success: false, message: 'Invalid role' });
//     }

//     // Find the user and update the role
//     const user = await User.findOne({ email });
//     if (!user) {
//       console.log('User not found for email:', email); // More specific log message
//       return res.status(404).send({ success: false, message: 'User not found' });
//     }

//     console.log('Current user role before update:', user.role);

//     user.role = role;
//     await user.save();

//     console.log('User role updated successfully:', user);

//     res.status(200).send({ success: true, message: 'Role updated successfully' });
//   } catch (error) {
//     console.error('Error occurred while updating role:', error);
//     res.status(500).send({ success: false, message: 'Server error' });
//   }
// });


// router.post('/update-role', async (req, res) => {
//   try {
//     const { email, role } = req.body;

//     // Log the incoming request data for debugging
//     console.log('Received request to update role:', { email, role });

//     // Validate role
//     if (!['shop-owner', 'attendant'].includes(role)) {
//       console.log('Invalid role:', role); // Log if the role is invalid
//       return res.status(400).send({ success: false, message: 'Invalid role' });
//     }

//     // Find the user and update the role
//     const user = await User.findOne({ email });
//     if (!user) {
//       console.log('User not found:', email); // Log if user is not found
//       return res.status(404).send({ success: false, message: 'User not found' });
//     }

//     // Log the current user role before updating
//     console.log('Current user role:', user.role);

//     user.role = role;
//     await user.save();

//     // Log success
//     console.log('Updated user role successfully:', user);

//     res.status(200).send({ success: true, message: 'Role updated successfully' });
//   } catch (error) {
//     // Log error details
//     console.error('Error occurred while updating role:', error);
//     res.status(500).send({ success: false, message: 'Server error' });
//   }
// });



  

module.exports = router;
