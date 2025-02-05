const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

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
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

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

// Utils placeholder (e.g., helper functions)
// const utils = require('./utils');

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
