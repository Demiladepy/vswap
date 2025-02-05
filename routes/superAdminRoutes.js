const express = require('express');
const path = require('path');
const router = express.Router();

// Super Admin Dashboard
router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/superAdmin', 'SuperAdmin.html'));
});

// Manage Users
router.get('/manage-users', (req, res) => {
    res.json({ message: "Super Admin - Manage Users" });
});

// Other Super Admin-specific routes can be added here

module.exports = router;
