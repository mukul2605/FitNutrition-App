// API configuration for different environments
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://fitnutrition-app.onrender.com/api'
  : 'http://localhost:5000/api';

export default API_BASE_URL;