import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { currentUser, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    age: currentUser?.age || '',
    gender: currentUser?.gender || '',
    weight: currentUser?.weight || '',
    height: currentUser?.height || '',
    activityLevel: currentUser?.activityLevel || 'moderately_active',
    goal: currentUser?.goal || 'maintain_weight'
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    const result = await updateProfile(formData);
    
    if (result.success) {
      setMessage('Profile updated successfully!');
    } else {
      setMessage(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="flex justify-center p-8 min-h-[calc(100vh-80px)]">
      <div className="bg-dark-card p-10 rounded-3xl shadow-2xl w-full max-w-3xl border border-slate-700 backdrop-blur-xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
            Update Profile
          </h2>
          <p className="text-text-secondary text-base">Keep your information up to date for accurate recommendations</p>
        </div>

        {message && (
          <div className={`p-4 rounded-xl mb-6 text-center font-medium ${
            message.includes('success') 
              ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
              : 'bg-red-500/10 text-red-400 border border-red-500/20'
          }`}>
            {message}
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
                className="w-full p-4 border-2 border-slate-600 rounded-xl text-base transition-all duration-300 bg-dark-secondary text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-primary focus:bg-dark-tertiary focus:shadow-lg focus:shadow-accent-primary/10"
                required
              />
            </div>
            <div>
              <label className="block mb-3 text-text-primary font-semibold text-sm">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full p-4 border-2 border-slate-600 rounded-xl text-base transition-all duration-300 bg-dark-secondary text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-primary focus:bg-dark-tertiary focus:shadow-lg focus:shadow-accent-primary/10"
                required
                min="1"
                max="120"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-3 text-text-primary font-semibold text-sm">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-4 border-2 border-slate-600 rounded-xl text-base transition-all duration-300 bg-dark-secondary text-text-primary focus:outline-none focus:border-accent-primary focus:bg-dark-tertiary focus:shadow-lg focus:shadow-accent-primary/10"
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block mb-3 text-text-primary font-semibold text-sm">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full p-4 border-2 border-slate-600 rounded-xl text-base transition-all duration-300 bg-dark-secondary text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-primary focus:bg-dark-tertiary focus:shadow-lg focus:shadow-accent-primary/10"
                required
                min="1"
                step="0.1"
              />
            </div>
          </div>

          <div>
            <label className="block mb-3 text-text-primary font-semibold text-sm">Height (cm)</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="w-full p-4 border-2 border-slate-600 rounded-xl text-base transition-all duration-300 bg-dark-secondary text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-primary focus:bg-dark-tertiary focus:shadow-lg focus:shadow-accent-primary/10"
              required
              min="1"
            />
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

          <div className="pt-4">
            <button 
              type="submit" 
              className="w-full p-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-xl font-semibold text-base transition-all duration-300 hover:shadow-lg hover:shadow-accent-primary/40 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Updating...
                </>
              ) : (
                'Update Profile'
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 p-6 bg-dark-secondary rounded-xl border border-slate-600">
          <h3 className="text-lg font-semibold text-text-primary mb-3">💡 Pro Tips</h3>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li>• Update your weight regularly for accurate calorie calculations</li>
            <li>• Adjust your activity level based on your current routine</li>
            <li>• Your fitness goal affects your daily calorie and macro targets</li>
            <li>• Changes will be reflected in your dashboard immediately</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;