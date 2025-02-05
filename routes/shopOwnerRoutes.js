const express = require('express');
const path = require('path');
const router = express.Router();


router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/shopOwner', 'Dashboard.html'));
});
// Shop Owner Dashboard
// router.get('/dashboard', (req, res) => {
//     res.json({ message: "Shop Owner Dashboard" });
// });

// Manage Inventory
router.get('/inventory', (req, res) => {
    res.json({ message: "Shop Owner - Manage Inventory" });
});

// Other Shop Owner-specific routes can be added here

module.exports = router;
