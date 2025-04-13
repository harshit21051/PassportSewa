/*const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const app = express();
const PORT = process.env.PORT || 5000;
require('dotenv').config(); // Make sure this comes before using process.env

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database connection string
//const MONGO_URI = 'mongodb+srv://swarnim21567:Swarnim%4045@passportsewa.lv3ev.mongodb.net/?retryWrites=true&w=majority&appName=passportSewa';
//const MONGO_URI = 'mongodb+srv://bharath21362:y6XxGC2vnQNYROM9@cluster101.fgcxxte.mongodb.net/?retryWrites=true&w=majority&appName=Cluster101
//';
//require('dotenv').config();
//const MONGO_URI = process.env.MONGO_URI;

// Database connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/api/auth', authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
*/
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Now MONGO_URI will be properly defined
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/api/auth', authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
