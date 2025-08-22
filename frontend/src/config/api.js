// API configuration for different environments
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://fitnutrition-app-backend.onrender.com/api'  // Replace with your actual backend URL
  : 'http://localhost:5000/api';

export default API_BASE_URL;