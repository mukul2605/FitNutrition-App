// API configuration for different environments
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://fitnutrition-app.onrender.com/api'
  : 'http://localhost:5000/api';

console.log('Environment:', import.meta.env.MODE);
console.log('Production mode:', import.meta.env.PROD);
console.log('API Base URL:', API_BASE_URL);

export default API_BASE_URL;