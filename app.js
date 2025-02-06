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
const session = require('express-session');

// Load environment variables
dotenv.config();
require('dotenv').config(); 

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;


// Set the views directory and EJS as the templating engine
// app.set('views', path.join(__dirname, 'view'));
// // Set EJS as the view engine
// app.set('view engine', 'ejs');

// Middleware setup
app.use(session({
  secret: 'your_secret_key', // This can be any string
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));



// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors({
//   origin: '*', // Allow requests from any origin (adjust as necessary)
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type'],
// }
// ));

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
