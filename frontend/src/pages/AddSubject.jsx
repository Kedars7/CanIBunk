import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const AddSubject = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [conducted, setConducted] = useState("");
  const [attended, setAttended] = useState("");
  const [criteria, setCriteria] = useState("75");

  const handelAddSub = async (e) => {
    e.preventDefault();
    try {
      if (Number(conducted) < Number(attended)) {
        return console.log(
          "Attended lectures cannot be greater than total conducted"
        );
      }

      await axios.post(
        "http://localhost:7000/v1/subjects",
        {
          name,
          criteria: Number(criteria),
          totalConducted: Number(conducted),
          totalAttended: Number(attended),
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success("Subject added successfully");
      setAttended("");
      setCriteria("75");
      setConducted("");
      setName("");
      
      // Redirect to dashboard after 1 second
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      toast.error("Server error");
      console.error(error.response?.data?.message || "Failed");
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

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-6 lg:p-8 py-24">
        <div className="w-full max-w-md">
          <div className="p-6 sm:p-8 md:p-10 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-xl">
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Add a New Subject
              </h1>
              <p className="text-sm sm:text-base text-gray-500">
                Enter details to start tracking attendance 📚
              </p>
            </div>

          <form onSubmit={handelAddSub} className="space-y-5 sm:space-y-6">
            {/* Subject Name */}
            <div>
              <label
                htmlFor="subject-name"
                className="block text-xs sm:text-sm font-bold text-gray-700 mb-2"
              >
                Subject Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="subject-name"
                type="text"
                placeholder="e.g., Advanced Calculus"
                className="block w-full rounded-xl border-2 border-gray-200 h-11 sm:h-12 px-4 text-sm sm:text-base text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                required
              />
            </div>

            {/* Attendance Criteria */}
            <div>
              <label
                htmlFor="criteria"
                className="block text-xs sm:text-sm font-bold text-gray-700 mb-2"
              >
                Attendance Criteria (%)
              </label>
              <input
                value={criteria}
                onChange={(e) => setCriteria(e.target.value)}
                id="criteria"
                type="number"
                min="0"
                max="100"
                placeholder="e.g., 75"
                className="block w-full rounded-xl border-2 border-gray-200 h-11 sm:h-12 px-4 text-sm sm:text-base text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                required
              />
            </div>

            {/* Conducted & Attended */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="total-conducted"
                  className="block text-xs sm:text-sm font-bold text-gray-700 mb-2"
                >
                  Total Lectures
                </label>
                <input
                  value={conducted}
                  onChange={(e) => setConducted(e.target.value)}
                  id="total-conducted"
                  type="number"
                  min="0"
                  placeholder="e.g., 20"
                  className="block w-full rounded-xl border-2 border-gray-200 h-11 sm:h-12 px-4 text-sm sm:text-base text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="total-attended"
                  className="block text-xs sm:text-sm font-bold text-gray-700 mb-2"
                >
                  Attended Lectures
                </label>
                <input
                  value={attended}
                  onChange={(e) => setAttended(e.target.value)}
                  id="total-attended"
                  type="number"
                  min="0"
                  placeholder="e.g., 15"
                  className="block w-full rounded-xl border-2 border-gray-200 h-11 sm:h-12 px-4 text-sm sm:text-base text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="w-full h-11 sm:h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Add Subject
              </button>
            </div>
          </form>

          <div className="mt-5 sm:mt-6 text-center">
            <button
              onClick={() => navigate("/dashboard")}
              className="text-xs sm:text-sm font-medium text-gray-500 hover:text-purple-600 transition-colors"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AddSubject;
