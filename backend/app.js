require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/studentRoutes'); // Import routes

const app = express();

// Configure CORS
const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true, 
  };
// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Environment Variables
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.get('/', (req, res) => {
    res.send('Server is up and running!');
  });
  

// MongoDB Connection
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Routes
app.use('/students', studentRoutes); // Use student routes

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
