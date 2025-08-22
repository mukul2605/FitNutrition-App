import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-[calc(100vh-70px)] p-8 flex items-center justify-center">
      <div className="text-center w-full max-w-6xl mx-auto">
        <h1 className="text-6xl font-extrabold mb-4 bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent tracking-tight">
          Welcome to FitNutrition
        </h1>
        <p className="text-xl text-text-secondary mb-12 font-normal max-w-2xl mx-auto">
          Your personal fitness and nutrition companion
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 w-full">
          <div className="bg-dark-card p-10 rounded-2xl shadow-2xl border border-slate-700 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-3xl hover:border-accent-primary backdrop-blur-lg group">
            <h3 className="text-2xl font-semibold mb-4 text-text-primary group-hover:text-accent-primary transition-colors duration-300">
              🏋️ Personalized Nutrition
            </h3>
            <p className="text-text-secondary leading-relaxed">
              Get customized macro and micronutrient recommendations based on your goals
            </p>
          </div>
          
          <div className="bg-dark-card p-10 rounded-2xl shadow-2xl border border-slate-700 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-3xl hover:border-accent-primary backdrop-blur-lg group">
            <h3 className="text-2xl font-semibold mb-4 text-text-primary group-hover:text-accent-primary transition-colors duration-300">
              📊 Fitness Tracking
            </h3>
            <p className="text-text-secondary leading-relaxed">
              Track your progress and get insights on your fitness journey
            </p>
          </div>
          
          <div className="bg-dark-card p-10 rounded-2xl shadow-2xl border border-slate-700 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-3xl hover:border-accent-primary backdrop-blur-lg group">
            <h3 className="text-2xl font-semibold mb-4 text-text-primary group-hover:text-accent-primary transition-colors duration-300">
              🎯 Goal Setting
            </h3>
            <p className="text-text-secondary leading-relaxed">
              Set and achieve your fitness goals with our intelligent recommendations
            </p>
          </div>
        </div>
        
        {!currentUser && (
          <div className="flex gap-4 justify-center">
            <Link 
              to="/register" 
              className="px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-accent-primary/40 hover:-translate-y-1"
            >
              Get Started
            </Link>
            <Link 
              to="/login" 
              className="px-8 py-4 border-2 border-accent-primary bg-transparent text-accent-primary rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-accent-primary hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-primary/30"
            >
              Login
            </Link>
          </div>
        )}
        
        {currentUser && (
          <div className="flex justify-center">
            <Link 
              to="/dashboard" 
              className="px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-accent-primary/40 hover:-translate-y-1"
            >
              Go to Dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;