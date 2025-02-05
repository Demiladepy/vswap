const express = require('express');
const path = require('path');
const router = express.Router();


// Attendant Dashboard
router.get('/auth', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/auth', 'auth.html'));
});

// Process Sales
router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/auth', 'Registrations.html'));
});

// Process Sales
router.get('/role-selection', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/auth', 'UserSelectorPage.html'));
});

// Other Attendant-specific routes can be added here

module.exports = router;