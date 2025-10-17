import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:7000/v1/user/login",
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

        if(data){
          toast.success("User logged in!!")
          navigate("/dashboard");
        }
    } catch (error) {
      toast.error("Login Failed");
      console.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="relative min-h-screen text-gray-800 font-poppins">
      {/* Background Blobs - matching Landing page */}
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
        <div
          className="blob3 absolute w-[400px] h-[400px] top-1/2 left-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 228, 230, 0.4) 0%, rgba(255,255,255,0) 70%)",
          }}
        ></div>
      </div>

      <div className="relative flex min-h-screen items-center justify-center px-4 sm:px-6 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 md:p-10">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Welcome Back!
              </h1>
              <p className="text-sm sm:text-base text-gray-500">
                Sign in to track your attendance
              </p>
            </div>

            {/* Form */}
            <form className="space-y-5 sm:space-y-6" onSubmit={handleLogin}>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full h-11 sm:h-12 rounded-xl border-2 border-gray-200 px-4 text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full h-11 sm:h-12 rounded-xl border-2 border-gray-200 px-4 text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-11 sm:h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Sign In
              </button>
            </form>

            {/* Footer */}
            <p className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="font-bold text-purple-600 hover:text-purple-700 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
