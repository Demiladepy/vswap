const express = require('express');
const path = require('path');
const router = express.Router();


// Attendant Dashboard
router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/attendants', 'attendant.html'));
});

// Process Sales
router.get('/sales', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/attendants', 'sales.html'));
});

// Other Attendant-specific routes can be added here

module.exports = router;
