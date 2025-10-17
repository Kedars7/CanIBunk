import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "404 - Page Not Found | CanIBunk";
  }, []);

  return (
    <div className="relative min-h-screen text-gray-800 font-poppins">
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

      <Navbar />

      <main className="flex items-center justify-center min-h-screen px-4" role="main">
        <div className="text-center max-w-md">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            404
          </h1>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-500 text-lg mb-8">
            Oops! The page you're looking for doesn't exist. Maybe it got bunked too? 😅
          </p>
          <button
            onClick={() => navigate("/")}
            className="inline-block px-8 py-4 text-white font-semibold rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            aria-label="Go back to homepage"
          >
            Go Back Home
          </button>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
