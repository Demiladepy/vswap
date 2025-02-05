const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Import auth routes

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
  useCreateIndex: true,
  serverSelectionTimeoutMS: 30000, // 30 seconds timeout for server selection
  connectTimeoutMS: 30000, // 30 seconds connection timeout
} )
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));



// Use auth routes
app.use('/api/auth', authRoutes);

// Serve static files from public folder
// app.use(express.static(path.join(__dirname, 'public')));

// // Routes
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// Other routes...

// Start Server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });




// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'public/static')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/auth', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'auth.html'));
  });

app.get('/usertype', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'UserSelectorPage.html'));
  });

  app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Registrations.html'));
  });

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Dashboard.html'));
});

app.get('/superadmin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'SuperAdmin.html'));
  });

// Utils placeholder (e.g., helper functions)
// const utils = require('./utils');

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
