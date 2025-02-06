const express = require('express');
const path = require('path');
const router = express.Router();

// Attendant Dashboard
router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/attendants', 'attendant.html'));
});


// Route to render the attendant page
// router.get('/dashboard', (req, res) => {
//     res.render('attendant', { title: 'Attendant Page' }); // Ensure 'attendant.ejs' exists
// });
// Process Sales
// router.get('/sales', (req, res) => {
//     res.sendFile(path.join(__dirname, '../public/attendants', 'sales.html'));
// });

// Auto Calculate Total
router.get('/auto-calculate-total', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/attendants', 'autoCalculateTotal.html'));
});

// Daily Sales Summary
router.get('/daily-sales-summary', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/attendants', 'dailySalesSummary.html'));
});

// Generate Reports
router.get('/generate-reports', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/attendants', 'generateReports.html'));
});

// Quick Add Product
router.get('/quick-add-product', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/attendants', 'quikAddProduct.html'));
});

// Receipts
router.get('/receipts', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/attendants', 'receipts.html'));
});

// Transactions
router.get('/transactions', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/attendants', 'transactions.html'));
});

// Trends & Insights
router.get('/trends-insights', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/attendants', 'trends&insights.html'));
});

// View Transactions
router.get('/view-transactions', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/attendants', 'viewTransactions.html'));
});

module.exports = router;