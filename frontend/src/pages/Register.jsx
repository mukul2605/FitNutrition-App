import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    weight: '',
    height: '',
    activityLevel: 'moderately_active',
    goal: 'maintain_weight'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await register(formData);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-70px)] p-8">
      <div className="bg-dark-card p-10 rounded-3xl shadow-2xl w-full max-w-2xl border border-slate-700 backdrop-blur-xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="text-text-secondary text-base">Join FitNutrition today</p>
        </div>
        
        {error && (
          <div className="bg-red-500/10 text-red-400 p-4 rounded-xl mb-6 text-center border border-red-500/20 font-medium">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-3 text-text-primary font-semibold text-sm">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full p-4 border-2 border-slate-600 rounded-xl text-base transition-all duration-300 bg-dark-secondary text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-primary focus:bg-dark-tertiary focus:shadow-lg focus:shadow-accent-primary/10"
                required
              />
            </div>
            <div>
              <label className="block mb-3 text-text-primary font-semibold text-sm">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full p-4 border-2 border-slate-600 rounded-xl text-base transition-all duration-300 bg-dark-secondary text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-primary focus:bg-dark-tertiary focus:shadow-lg focus:shadow-accent-primary/10"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block mb-3 text-text-primary font-semibold text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password (min 6 characters)"
              className="w-full p-4 border-2 border-slate-600 rounded-xl text-base transition-all duration-300 bg-dark-secondary text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-primary focus:bg-dark-tertiary focus:shadow-lg focus:shadow-accent-primary/10"
              required
              minLength="6"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-3 text-text-primary font-semibold text-sm">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Your age"
                className="w-full p-4 border-2 border-slate-600 rounded-xl text-base transition-all duration-300 bg-dark-secondary text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-primary focus:bg-dark-tertiary focus:shadow-lg focus:shadow-accent-primary/10"
                required
                min="1"
                max="120"
              />
            </div>
            <div>
              <label className="block mb-3 text-text-primary font-semibold text-sm">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-4 border-2 border-slate-600 rounded-xl text-base transition-all duration-300 bg-dark-secondary text-text-primary focus:outline-none focus:border-accent-primary focus:bg-dark-tertiary focus:shadow-lg focus:shadow-accent-primary/10"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-3 text-text-primary font-semibold text-sm">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="Your weight in kg"
                className="w-full p-4 border-2 border-slate-600 rounded-xl text-base transition-all duration-300 bg-dark-secondary text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-primary focus:bg-dark-tertiary focus:shadow-lg focus:shadow-accent-primary/10"
                required
                min="1"
                step="0.1"
              />
            </div>
            <div>
              <label className="block mb-3 text-text-primary font-semibold text-sm">Height (cm)</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                placeholder="Your height in cm"
                className="w-full p-4 border-2 border-slate-600 rounded-xl text-base transition-all duration-300 bg-dark-secondary text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-primary focus:bg-dark-tertiary focus:shadow-lg focus:shadow-accent-primary/10"
                required
                min="1"
              />
            </div>
          </div>

          <div>
            <label className="block mb-3 text-text-primary font-semibold text-sm">Activity Level</label>
            <select
              name="activityLevel"
              value={formData.activityLevel}
              onChange={handleChange}
              className="w-full p-4 border-2 border-slate-600 rounded-xl text-base transition-all duration-300 bg-dark-secondary text-text-primary focus:outline-none focus:border-accent-primary focus:bg-dark-tertiary focus:shadow-lg focus:shadow-accent-primary/10"
            >
              <option value="sedentary">Sedentary (little/no exercise)</option>
              <option value="lightly_active">Lightly Active (light exercise 1-3 days/week)</option>
              <option value="moderately_active">Moderately Active (moderate exercise 3-5 days/week)</option>
              <option value="very_active">Very Active (hard exercise 6-7 days/week)</option>
              <option value="extremely_active">Extremely Active (very hard exercise, physical job)</option>
            </select>
          </div>

          <div>
            <label className="block mb-3 text-text-primary font-semibold text-sm">Fitness Goal</label>
            <select
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              className="w-full p-4 border-2 border-slate-600 rounded-xl text-base transition-all duration-300 bg-dark-secondary text-text-primary focus:outline-none focus:border-accent-primary focus:bg-dark-tertiary focus:shadow-lg focus:shadow-accent-primary/10"
            >
              <option value="lose_weight">Lose Weight</option>
              <option value="maintain_weight">Maintain Weight</option>
              <option value="gain_weight">Gain Weight</option>
              <option value="build_muscle">Build Muscle</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="w-full p-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-xl font-semibold text-base transition-all duration-300 hover:shadow-lg hover:shadow-accent-primary/40 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <div className="text-center mt-8">
          <p className="text-text-secondary">
            Already have an account?{' '}
            <Link to="/login" className="text-accent-primary hover:text-accent-secondary font-semibold transition-colors duration-300">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;