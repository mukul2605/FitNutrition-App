import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="h-16 bg-gradient-to-r from-dark-tertiary to-dark-card shadow-2xl border-b border-slate-700 backdrop-blur-lg">
      <div className="h-full max-w-6xl mx-auto flex justify-between items-center px-8">
        <Link to="/" className="h-full flex items-center">
          {/* wrapper sets a stable box; overflow hides the scaled image */}
          <div className="h-12 w-48 overflow-hidden flex items-center">
            <img
              src="/FitNutrition.png"
              alt="FitNutrition Logo"
              className="h-20 w-auto object-contain scale-150 origin-left"
            />
          </div>
        </Link>
        <div className="flex gap-4 items-center">
          {currentUser ? (
            <>
              <Link
                to="/dashboard"
                className="text-text-secondary hover:text-text-primary px-4 py-2 rounded-lg transition-all duration-300 hover:bg-accent-primary/10 hover:-translate-y-0.5 font-medium"
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                className="text-text-secondary hover:text-text-primary px-4 py-2 rounded-lg transition-all duration-300 hover:bg-accent-primary/10 hover:-translate-y-0.5 font-medium"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-text-secondary hover:text-text-primary px-4 py-2 rounded-lg transition-all duration-300 hover:bg-accent-primary/10 hover:-translate-y-0.5 font-medium bg-none border-none cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-text-secondary hover:text-text-primary px-4 py-2 rounded-lg transition-all duration-300 hover:bg-accent-primary/10 hover:-translate-y-0.5 font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-text-secondary hover:text-text-primary px-4 py-2 rounded-lg transition-all duration-300 hover:bg-accent-primary/10 hover:-translate-y-0.5 font-medium"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
