const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const router = express.Router();
const dotenv = require('dotenv');

// Assuming Shop model is set up
const Shop = require('../models/Shop'); // Import your Shop model


require('dotenv').config(); 
// MongoDB connection (replace with your actual connection details)
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, 
  connectTimeoutMS: 30000, 
})


// Mock database models (replace with actual DB integration)
let sales = [];
let attendants = [];
let transactions = [];
let expenses = [];

// Log a sale
router.post('/log-sale', (req, res) => {
    const { amount, description } = req.body;
    const newSale = {
        amount,
        description,
        date: new Date().toISOString(),
    };
    sales.push(newSale);
    transactions.push(newSale);  // Assuming all sales are transactions
    res.status(200).json({ message: 'Sale logged successfully' });
});

// Add an attendant
router.post('/add-attendant', (req, res) => {
    const { name, role } = req.body;
    const newAttendant = { name, role };
    attendants.push(newAttendant);
    res.status(200).json({ message: 'Attendant added successfully' });
});

// Get transactions
router.get('/get-transactions', (req, res) => {
    res.status(200).json(transactions);
});

// Get expenses
router.get('/get-expenses', (req, res) => {
    res.status(200).json(expenses);
});



// Get the owner ID from session
router.get('/get-owner-id', (req, res) => {
    const ownerId = req.session.ownerId;
    if (ownerId) {
        res.json({ ownerId });
    } else {
        res.status(400).json({ message: 'Owner not logged in' });
    }
});

// Shop Owner Dashboard Route
router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/shopOwner', 'Dashboard.html'));
});

router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/shopOwner', 'HomePage.html'));
});

// Shop Registration Route
router.post('/register-shop', async (req, res) => {
    const { name, type, location, ownerId } = req.body;

    if (!name || !type || !location || !ownerId) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newShop = new Shop({
            name,
            type,
            location,
            ownerId,
        });

        await newShop.save();
        res.status(201).json({ message: 'Shop registered successfully', shop: newShop });
    } catch (error) {
        res.status(500).json({ message: 'Error registering shop', error });
    }
});

// Manage Inventory (This can be expanded later)
router.get('/inventory', (req, res) => {
    res.json({ message: "Shop Owner - Manage Inventory" });
});

// Other Shop Owner-specific routes can be added here

module.exports = router;
