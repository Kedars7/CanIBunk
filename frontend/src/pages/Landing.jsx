import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FeaturesCard from "../components/FeaturesCard";
import Navbar from "../components/Navbar";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7000/v1/user/checkLogin",
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.loggedIn) {
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error checking login status:", error.response?.data?.message || error.message);
      // If there's an error checking login, redirect to login page
      navigate("/login");
    }
  };

  return (
    <div className="relative min-h-screen text-gray-800">
      {/* Background Blobs */}
      <div className="bg-blobs absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div
          className="blob1 absolute w-[500px] h-[500px] top-[-150px] left-[-150px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(199, 218, 255, 0.5) 0%, rgba(255,255,255,0) 70%)",
          }}
        ></div>
        <div
          className="blob2 absolute w-[600px] h-[600px] bottom-[-200px] right-[-200px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(230, 217, 255, 0.8) 0%, rgba(255,255,255,0) 70%)",
          }}
        ></div>
      </div>

      {/* Navbar */}
      <Navbar/>

      {/* Hero Section */}
      <main className="container mx-auto px-4 sm:px-6 flex flex-col items-center justify-center min-h-screen text-center py-20">
        <div className="max-w-3xl">
          <h1 className="font-poppins text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
            One tap to know if you can{" "}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent gradient-animate">
              nap
            </span>
            😴
          </h1>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-500 font-medium px-4">
            Disclaimer: We don't encourage bunking… but we know you will anyway
            😏.
          </p>
          {/* Value Props Section */}
          <FeaturesCard/>

          <div className="mt-8 sm:mt-10">
            <button
              onClick={handleGetStartedClick}
              className="inline-block px-8 sm:px-10 py-3 sm:py-4 text-sm sm:text-base text-white font-semibold rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
