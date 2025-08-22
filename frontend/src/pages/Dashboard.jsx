import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import API_BASE_URL from '../config/api';

// Create axios instance for dashboard
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

const Dashboard = () => {
  const [nutritionData, setNutritionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchNutritionData();
  }, []);

  const fetchNutritionData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      const res = await api.get('/nutrition/calculations');
      setNutritionData(res.data.data);
    } catch (error) {
      console.error('Nutrition data fetch error:', error);
      setError('Failed to fetch nutrition data');
    }
    setLoading(false);
  };

  if (loading) return (
    <div className="text-center p-16 text-xl text-text-secondary">
      Loading your nutrition data...
    </div>
  );
  
  if (error) return (
    <div className="bg-red-500/10 text-red-400 p-4 rounded-xl m-6 text-center border border-red-500/20 font-medium">
      {error}
    </div>
  );

  const { userStats, recommendations, macros, micronutrients } = nutritionData;

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { category: 'Underweight', color: '#3498db' };
    if (bmi < 25) return { category: 'Normal', color: '#2ecc71' };
    if (bmi < 30) return { category: 'Overweight', color: '#f39c12' };
    return { category: 'Obese', color: '#e74c3c' };
  };

  const bmiInfo = getBMICategory(userStats.bmi);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Dashboard Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
          Welcome back, {currentUser.name}!
        </h1>
        <p className="text-xl text-text-secondary">Here's your personalized nutrition and fitness overview</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* User Stats Card */}
        <div className="bg-dark-card p-8 rounded-2xl shadow-2xl border border-slate-700 backdrop-blur-lg">
          <h3 className="text-2xl font-semibold mb-6 text-text-primary">Your Stats</h3>
          <div className="grid grid-cols-1 gap-6">
            <div className="text-center p-4 bg-dark-secondary rounded-xl">
              <span className="block text-sm text-text-secondary mb-2">BMI</span>
              <span className="block text-3xl font-bold mb-1" style={{ color: bmiInfo.color }}>
                {userStats.bmi}
              </span>
              <span className="text-sm text-text-muted">{bmiInfo.category}</span>
            </div>
            <div className="text-center p-4 bg-dark-secondary rounded-xl">
              <span className="block text-sm text-text-secondary mb-2">BMR</span>
              <span className="block text-3xl font-bold mb-1 text-text-primary">{userStats.bmr}</span>
              <span className="text-sm text-text-muted">calories/day</span>
            </div>
            <div className="text-center p-4 bg-dark-secondary rounded-xl">
              <span className="block text-sm text-text-secondary mb-2">TDEE</span>
              <span className="block text-3xl font-bold mb-1 text-text-primary">{userStats.tdee}</span>
              <span className="text-sm text-text-muted">calories/day</span>
            </div>
          </div>
        </div>

        {/* Weight Recommendation Card */}
        <div className="bg-dark-card p-8 rounded-2xl shadow-2xl border border-slate-700 backdrop-blur-lg">
          <h3 className="text-2xl font-semibold mb-6 text-text-primary">Weight Recommendation</h3>
          <p className="text-lg mb-4 p-4 bg-blue-500/10 border-l-4 border-accent-primary rounded-lg text-text-primary">
            {recommendations.weightRecommendation}
          </p>
          <div className="space-y-3">
            <p className="text-text-secondary">
              <strong className="text-text-primary">Ideal Weight Range:</strong> {userStats.idealWeightRange.min} - {userStats.idealWeightRange.max} kg
            </p>
            <p className="text-text-secondary">
              <strong className="text-text-primary">Current Weight:</strong> {userStats.currentWeight} kg
            </p>
          </div>
        </div>

        {/* Daily Targets Card */}
        <div className="bg-dark-card p-8 rounded-2xl shadow-2xl border border-slate-700 backdrop-blur-lg">
          <h3 className="text-2xl font-semibold mb-6 text-text-primary">Daily Targets</h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="text-center p-6 bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-xl">
              <span className="block text-sm mb-2 opacity-90">Calories</span>
              <span className="block text-3xl font-bold">{recommendations.targetCalories}</span>
            </div>
            <div className="text-center p-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl">
              <span className="block text-sm mb-2 opacity-90">Protein</span>
              <span className="block text-3xl font-bold">{recommendations.proteinRequirement}g</span>
            </div>
          </div>
        </div>

        {/* Macronutrients Card */}
        <div className="bg-dark-card p-8 rounded-2xl shadow-2xl border border-slate-700 backdrop-blur-lg">
          <h3 className="text-2xl font-semibold mb-6 text-text-primary">Macronutrients (Daily)</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center mx-auto mb-3 text-white font-bold text-sm">
                {macros.protein}g
              </div>
              <span className="text-sm text-text-secondary">Protein</span>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center mx-auto mb-3 text-white font-bold text-sm">
                {macros.carbs}g
              </div>
              <span className="text-sm text-text-secondary">Carbs</span>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-500 to-pink-500 flex items-center justify-center mx-auto mb-3 text-white font-bold text-sm">
                {macros.fat}g
              </div>
              <span className="text-sm text-text-secondary">Fat</span>
            </div>
          </div>
        </div>

        {/* Micronutrients Card */}
        <div className="bg-dark-card p-8 rounded-2xl shadow-2xl border border-slate-700 backdrop-blur-lg lg:col-span-2">
          <h3 className="text-2xl font-semibold mb-6 text-text-primary">Essential Micronutrients (Daily)</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="flex justify-between items-center p-3 bg-dark-secondary rounded-lg">
              <span className="font-medium text-text-primary">Vitamin C</span>
              <span className="font-bold text-accent-primary">{micronutrients.vitaminC} mg</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-dark-secondary rounded-lg">
              <span className="font-medium text-text-primary">Vitamin D</span>
              <span className="font-bold text-accent-primary">{micronutrients.vitaminD} mcg</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-dark-secondary rounded-lg">
              <span className="font-medium text-text-primary">Calcium</span>
              <span className="font-bold text-accent-primary">{micronutrients.calcium} mg</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-dark-secondary rounded-lg">
              <span className="font-medium text-text-primary">Iron</span>
              <span className="font-bold text-accent-primary">{micronutrients.iron} mg</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-dark-secondary rounded-lg">
              <span className="font-medium text-text-primary">Magnesium</span>
              <span className="font-bold text-accent-primary">{micronutrients.magnesium} mg</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-dark-secondary rounded-lg">
              <span className="font-medium text-text-primary">Zinc</span>
              <span className="font-bold text-accent-primary">{micronutrients.zinc} mg</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-dark-secondary rounded-lg">
              <span className="font-medium text-text-primary">B12</span>
              <span className="font-bold text-accent-primary">{micronutrients.vitaminB12} mcg</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-dark-secondary rounded-lg">
              <span className="font-medium text-text-primary">Folate</span>
              <span className="font-bold text-accent-primary">{micronutrients.folate} mcg</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-dark-secondary rounded-lg">
              <span className="font-medium text-text-primary">Potassium</span>
              <span className="font-bold text-accent-primary">{micronutrients.potassium} mg</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-dark-secondary rounded-lg">
              <span className="font-medium text-text-primary">Fiber</span>
              <span className="font-bold text-accent-primary">{micronutrients.fiber} g</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;