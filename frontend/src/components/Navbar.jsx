import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(
          "https://canibunk.onrender.com/v1/user/checkLogin",
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        setIsLoggedIn(response.data.loggedIn);
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("https://canibunk.onrender.com/v1/user/logout", {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="font-poppins">
      <header className="top-0 left-0 right-0">
        <nav
          className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center min-h-20 glassmorphism border-b border-gray-200/50"
          style={{
            background: "rgba(255,255,255,0.3)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          <div className="flex items-center">
            <img
              src="/mockup2.png"
              alt="CanIBunk Logo"
              onClick={() => navigate('/')}
              className="h-8 sm:h-10 md:h-12 w-auto object-contain cursor-pointer select-none hover:opacity-90 transition-opacity"
              style={{ maxWidth: '120px', minWidth: '80px' }}
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-gray-700 transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-gray-700 transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-gray-700 transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {!isLoggedIn ? (
              <button
                onClick={() => navigate('/login')}
                className="inline-block px-4 lg:px-8 py-2 text-white font-semibold rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Login
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="inline-block px-4 lg:px-8 py-2 text-gray-700 font-semibold rounded-lg shadow-md bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 transform hover:scale-105"
              >
                Logout
              </button>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-40' : 'max-h-0'
          }`}
          style={{
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {!isLoggedIn ? (
              <button
                onClick={() => {
                  navigate('/login');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full px-6 py-3 text-white font-semibold rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              >
                Login
              </button>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full px-6 py-3 text-gray-700 font-semibold rounded-lg shadow-md bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
