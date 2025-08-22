import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
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

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-70px)] p-8">
      <div className="bg-dark-card p-12 rounded-3xl shadow-2xl w-full max-w-md border border-slate-700 backdrop-blur-xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-text-secondary text-base">Sign in to your account</p>
        </div>
        
        {error && (
          <div className="bg-red-500/10 text-red-400 p-4 rounded-xl mb-6 text-center border border-red-500/20 font-medium">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-6">
            <label className="block mb-3 text-text-primary font-semibold text-sm">
              Email Address
            </label>
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
          
          <div className="mb-6">
            <label className="block mb-3 text-text-primary font-semibold text-sm">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-4 border-2 border-slate-600 rounded-xl text-base transition-all duration-300 bg-dark-secondary text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-primary focus:bg-dark-tertiary focus:shadow-lg focus:shadow-accent-primary/10"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full p-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-xl font-semibold text-base transition-all duration-300 hover:shadow-lg hover:shadow-accent-primary/40 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
        
        <div className="relative text-center mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-600"></div>
          </div>
          <span className="relative bg-dark-card px-4 text-text-muted text-sm">or</span>
        </div>
        
        <div className="text-center">
          <p className="text-text-secondary text-sm mb-4">Don't have an account?</p>
          <Link 
            to="/register" 
            className="w-full block p-4 border-2 border-accent-primary bg-transparent text-accent-primary rounded-xl font-semibold text-base transition-all duration-300 hover:bg-accent-primary hover:text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent-primary/30"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;