[Deployed here, Click to visit](https://fitnutrition-app-1.onrender.com)

# FitNutrition - MERN Stack Fitness Application

A comprehensive fitness and nutrition tracking application built with the MERN stack that provides personalized nutrition recommendations, macro/micronutrient calculations, and fitness goal tracking.

## Features

- **User Authentication**: Secure JWT-based authentication with bcrypt password hashing
- **Personalized Nutrition**: Custom macro and micronutrient recommendations based on user profile
- **Fitness Calculations**: BMR, TDEE, BMI, and protein requirement calculations
- **Goal-Based Recommendations**: Tailored advice for weight loss, maintenance, gain, or muscle building
- **Responsive Design**: Mobile-friendly interface
- **Profile Management**: Update personal information and fitness goals

## Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **cookie-parser** - Cookie parsing middleware

### Frontend

- **React** - Frontend framework
- **Vite** - Build tool and development server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management


## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Profile

- `PUT /api/profile` - Update user profile

### Nutrition

- `GET /api/nutrition/calculations` - Get personalized nutrition calculations

## Calculations & Formulas

### BMR (Basal Metabolic Rate)

Uses the Mifflin-St Jeor Equation:

- **Men**: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5
- **Women**: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161

### TDEE (Total Daily Energy Expenditure)

BMR multiplied by activity level factor:

- Sedentary: BMR × 1.2
- Lightly Active: BMR × 1.375
- Moderately Active: BMR × 1.55
- Very Active: BMR × 1.725
- Extremely Active: BMR × 1.9

### Protein Requirements

- **Muscle Building/Very Active**: 2.2g per kg body weight
- **Weight Loss**: 2.0g per kg body weight
- **General Active**: 1.6g per kg body weight

### Macronutrient Distribution

- **Protein**: Based on calculated requirements
- **Fat**: 25% of total calories
- **Carbohydrates**: Remaining calories

## Project Structure

```
fitness-app/
├── backend/                # Node.js/Express backend
│   ├── middleware/         # Express middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── server.js          # Express server
│   ├── package.json
│   └── .env
├── frontend/              # React/Vite frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React context
│   │   ├── pages/         # Page components
│   │   ├── App.jsx
│   │   └── App.css
│   ├── package.json
│   └── vite.config.js
├── package.json           # Root package.json for scripts
└── README.md
```


## Security Features

- Password hashing with bcrypt
- JWT token authentication
- HTTP-only cookies for token storage
- Input validation and sanitization
- CORS configuration
- Environment variable protection


