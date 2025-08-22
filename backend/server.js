const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS configuration for Render deployment
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? [process.env.FRONTEND_URL || 'https://fitnutrition-app-1.onrender.com']
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Test route loading
try {
  console.log('Loading routes...');
  app.use('/api/auth', require('./routes/auth'));
  console.log('Auth routes loaded');
  app.use('/api/profile', require('./routes/profile'));
  console.log('Profile routes loaded');
  app.use('/api/nutrition', require('./routes/nutrition'));
  console.log('Nutrition routes loaded');
} catch (error) {
  console.error('Error loading routes:', error);
}

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'FitNutrition API is running',
    routes: [
      'GET /health - Health check',
      'POST /api/auth/register - Register user',
      'POST /api/auth/login - Login user',
      'GET /api/auth/me - Get current user',
      'PUT /api/profile - Update profile',
      'GET /api/nutrition/calculations - Get nutrition calculations'
    ]
  });
});

// Health check endpoint for Render
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`MongoDB URI: ${process.env.MONGODB_URI ? 'Set' : 'Not set'}`);
  console.log(`JWT Secret: ${process.env.JWT_SECRET ? 'Set' : 'Not set'}`);
});