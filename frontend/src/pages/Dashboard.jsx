import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut } from "react-chartjs-2";
import Navbar from "../components/Navbar";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get("https://canibunk.onrender.com/v1/subjects", {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });

        setSubjects(response.data);
      } catch (error) {
        console.error(error.response?.data?.message || "Failed");
      }
    };

    fetchSubjects();
  }, []);

  const handelClick = (subId) => {
    navigate(`/subjectview/${subId}`);
  };

  const getColorVars = (color) => {
    switch (color) {
      case "success":
        return {
          main: "#22c55e",
          gradient: "from-green-400 to-emerald-500",
          bgGradient: "from-green-50 to-emerald-50",
          text: "text-green-600",
          status: "Safe to Bunk 🎉",
          glow: "hover:shadow-[0_8px_30px_rgba(34,197,94,0.3)]",
          chartColors: ["#22c55e", "#86efac"],
        };
      case "warning":
        return {
          main: "#f59e0b",
          gradient: "from-amber-400 to-orange-500",
          bgGradient: "from-amber-50 to-orange-50",
          text: "text-amber-600",
          status: "Be Careful ⚠️",
          glow: "hover:shadow-[0_8px_30px_rgba(245,158,11,0.3)]",
          chartColors: ["#f59e0b", "#fbbf24"],
        };
      case "danger":
        return {
          main: "#ef4444",
          gradient: "from-red-400 to-rose-500",
          bgGradient: "from-red-50 to-rose-50",
          text: "text-red-600",
          status: "Don't Risk It! 🚨",
          glow: "hover:shadow-[0_8px_30px_rgba(239,68,68,0.3)]",
          chartColors: ["#ef4444", "#f87171"],
        };
      default:
        return {};
    }
  };

  return (
    <div className="relative min-h-screen text-gray-800">
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

      {/* Header */}
      <Navbar />

      {/* Main */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-grow">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-poppins mb-2">
              Your Subjects
            </h2>
            <p className="text-gray-500 text-base sm:text-lg">Track your attendance and stay on top of your game 🎯</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={() => navigate("/addsubject")}
              className="flex items-center justify-center gap-2 h-11 sm:h-12 px-4 sm:px-6 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm sm:text-base shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-semibold"
            >
              ✨ Add Subject
            </button>
            <button
              onClick={() => navigate("/addlecture")}
              className="flex items-center justify-center gap-2 h-11 sm:h-12 px-4 sm:px-6 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
            >
              📚 Add Lecture
            </button>
          </div>
        </div>

        {/* Subject Cards */}
        {subjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 sm:py-20 px-4">
            <div className="text-center max-w-md">
              <div className="text-6xl sm:text-8xl mb-4 sm:mb-6">📚</div>
              <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 sm:mb-4">
                No Subjects Yet
              </h3>
              <p className="text-gray-500 text-base sm:text-lg mb-6 sm:mb-8">
                Get started by adding your first subject to track your attendance!
              </p>
              <button
                onClick={() => navigate("/addsubject")}
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                ✨ Add Your First Subject
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {subjects.map((subj, idx) => {
              const percent = (
                (subj.totalAttended / subj.totalConducted) *
                100
              ).toFixed(1);

              var colors;

              if (percent < subj.criteria - 5) {
                colors = getColorVars("danger");
              } else if (percent > subj.criteria + 5) {
                colors = getColorVars("success");
              } else {
                colors = getColorVars("warning");
              }

              return (
                <div
                  key={idx}
                  className={`group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-transparent ${colors.glow} transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 overflow-hidden`}
                >
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}></div>
                  
                  <div className="flex flex-col h-full relative z-10">
                    {/* Progress + Status */}
                    <div className="flex items-start justify-between mb-6">
                      {/* Doughnut Chart with enhanced styling */}
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28">
                        <Doughnut
                          data={{
                            labels: ["Attended", "Missed"],
                            datasets: [
                              {
                                label: "Attendance %",
                                data: [percent, 100 - percent],
                                backgroundColor: colors.chartColors,
                                borderWidth: 0,
                                circumference: 180,
                                rotation: 270,
                              },
                            ],
                          }}
                          options={{
                            responsive: true,
                            maintainAspectRatio: true,
                            cutout: "75%",
                            plugins: {
                              legend: { display: false },
                              tooltip: {
                                enabled: true,
                                backgroundColor: "rgba(0,0,0,0.8)",
                                padding: 12,
                                cornerRadius: 8,
                                titleFont: { size: 14, weight: "bold" },
                                bodyFont: { size: 12 },
                              },
                            },
                          }}
                        />
                      {/* Percentage in center */}
                      <div className="absolute inset-0 flex items-center justify-center pt-8">
                        <div className="text-center">
                          <p className={`text-xl sm:text-2xl font-bold ${colors.text}`}>{Math.round(percent)}%</p>
                        </div>
                      </div>
                    </div>                      {/* Status Badge */}
                      <div
                        className={`px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-bold rounded-full bg-gradient-to-r ${colors.gradient} text-white shadow-md transform transition-transform group-hover:scale-110`}
                      >
                        {colors.status}
                      </div>
                    </div>

                    {/* Subject Info */}
                    <div className="flex-grow mb-4 sm:mb-6">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3 group-hover:text-gray-900 transition-colors">
                        {subj.name}
                      </h3>
                      <div className="space-y-1.5 sm:space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm text-gray-600 font-medium">Attended:</span>
                          <span className="text-xs sm:text-sm font-bold text-gray-800">{subj.totalAttended} / {subj.totalConducted}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm text-gray-600 font-medium">Required:</span>
                          <span className="text-xs sm:text-sm font-bold text-gray-800">{subj.criteria}%</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${colors.gradient} transition-all duration-700 ease-out`}
                          style={{ width: `${Math.min(percent, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Details Button */}
                    <button
                      onClick={() => handelClick(subj._id)}
                      className={`w-full text-center text-sm font-bold bg-gradient-to-r ${colors.gradient} text-white py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
