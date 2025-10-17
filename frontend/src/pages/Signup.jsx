import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const navigateTo = useNavigate();

  const handelRegister = async (e) => {
    e.preventDefault();
    if (password != confirmPass) {
      return console.log("Both passwords should be same");
    }

    try {
      const { data } = await axios.post(
        "https://canibunk.onrender.com/v1/user/register",
        {
          name,
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("User sign up successfully")
      localStorage.setItem("jwt", data.token);
      navigateTo("/login");
      setName("");
      setEmail("");
      setPassword("");
      confirmPass("");
    } catch (error) {
      toast.error("Server error. Try again")
      if (error.response) {
        // Server responded with a status other than 2xx
        console.log(error.response.data.message); // <-- this is your backend error message
        alert(error.response.data.message); // show user-friendly message
      } else {
        console.log(error.message);
        alert("Something went wrong. Please try again.");
      }
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

      <div className="relative flex items-center justify-center min-h-screen px-4 sm:px-6 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 space-y-5 sm:space-y-6">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Create Your Account
              </h2>
              <p className="text-sm sm:text-base text-gray-500">
                Track your attendance effortlessly
              </p>
            </div>

            {/* Form */}
            <form className="space-y-4 sm:space-y-5" onSubmit={handelRegister}>
              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  required
                  className="w-full h-11 sm:h-12 rounded-xl border-2 border-gray-200 px-4 text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  required
                  className="w-full h-11 sm:h-12 rounded-xl border-2 border-gray-200 px-4 text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  required
                  className="w-full h-11 sm:h-12 rounded-xl border-2 border-gray-200 px-4 text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="confirmPass" className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPass"
                  placeholder="••••••••"
                  required
                  className="w-full h-11 sm:h-12 rounded-xl border-2 border-gray-200 px-4 text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full h-11 sm:h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Sign Up
              </button>
            </form>

            {/* Sign in link */}
            <p className="text-center text-xs sm:text-sm text-gray-500">
              Already have an account?{" "}
              <button
                onClick={() => navigateTo("/login")}
                className="font-bold text-purple-600 hover:text-purple-700 transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
