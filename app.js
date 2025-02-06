const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth'); 
const superAdminRoutes = require('./routes/superAdminRoutes');
const attendantRoutes = require('./routes/attendantRoutes');
const shopOwnerRoutes = require('./routes/shopOwnerRoutes');
const authRoutess = require('./routes/authRoutes');

// Load environment variables
dotenv.config();
require('dotenv').config(); 

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, 
  connectTimeoutMS: 30000, 
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/superadmin', superAdminRoutes);
app.use('/attendant', attendantRoutes);
app.use('/shopowner', shopOwnerRoutes);
app.use('/auth', authRoutess);

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Default Route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
