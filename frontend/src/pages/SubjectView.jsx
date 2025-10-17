import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const SubjectView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subject, setSubject] = useState(null);
  const [criteria, setCriteria] = useState(75);
  const [lectures, setLectures] = useState([]);
  const [canBunk, setCanBunk] = useState(0);
  const [cannotBunk, setCannotBunk] = useState(0);

  const simulateBunk = (perCriteria, attended, conducted) => {
    let tempAttended = attended;
    let tempConducted = conducted;
    let canBunk = 0;

    // Case A: How many lectures can I miss?
    while (true) {
      if (getPercentage(tempAttended, tempConducted + 1) >= perCriteria) {
        canBunk++;
        tempConducted++;
      } else {
        break;
      }
    }

    if (canBunk > 0) {
      setCanBunk(canBunk);
      setCannotBunk(0);
      return;
    }

    // Case B: How many lectures must I attend?
    tempAttended = attended;
    tempConducted = conducted;
    let cannotBunk = 0;

    while (getPercentage(tempAttended + 1, tempConducted + 1) < perCriteria) {
      tempAttended++;
      tempConducted++;
      cannotBunk++;
    }

    setCannotBunk(cannotBunk + 1);
    setCanBunk(0);
  };

  const handleDeleteLecture = async (lectureId) => {
    if (!window.confirm("Are you sure you want to delete this lecture?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:7000/v1/lectures/${lectureId}`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      // Refresh lectures and subject data
      const lecturesResponse = await axios.get(
        `http://localhost:7000/v1/lectures/${id}`,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setLectures(lecturesResponse.data);

      const subjectResponse = await axios.get(
        `http://localhost:7000/v1/subjects/${id}`,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setSubject(subjectResponse.data);
    } catch (error) {
      console.error("Error deleting lecture:", error.response?.data?.message || error.message);
      alert("Failed to delete lecture. Please try again.");
    }
  };

  const handleDeleteSubject = async () => {
    if (!window.confirm("Are you sure you want to delete this subject? All associated lectures will also be deleted.")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:7000/v1/subjects/${id}`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      // Redirect to dashboard after successful deletion
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting subject:", error.response?.data?.message || error.message);
      alert("Failed to delete subject. Please try again.");
    }
  };

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7000/v1/subjects/${id}`,
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        setSubject(response.data);
        setCriteria(response.data.criteria);
      } catch (error) {
        console.error(error.response?.data?.message || "Failed");
      }
    };

    const fetchLectures = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7000/v1/lectures/${id}`,
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        setLectures(response.data);
      } catch (error) {
        console.error(error.response?.data?.message || "Failed");
      }
    };

    fetchSubject();
    fetchLectures();
  }, [id]);

  // Separate effect for simulateBunk
  useEffect(() => {
    if (subject) {
      simulateBunk(
        subject.criteria,
        Number(subject.totalAttended),
        Number(subject.totalConducted)
      );
    }
  }, [subject]);

  function futureMessage(attended, conducted) {
    var futurePerc;
    if (canBunk > 0) {
      futurePerc = getPercentage(attended, conducted + canBunk);

        return (
          <>
            Bunking {canBunk} more lecture{canBunk !== 1 && "s"} will
            result in{" "}
            <span className="font-bold text-slate-700">
              {futurePerc}%
            </span>{" "}
            attendance.
          </>
        );
    }
    else {
      futurePerc = getPercentage(attended + cannotBunk, conducted + cannotBunk);

        return (
          <>
            Attending {cannotBunk} more lecture{cannotBunk !== 1 && "s"} will
            result in{" "}
            <span className="font-bold text-slate-700">
              {futurePerc}%
            </span>{" "}
            attendance.
          </>
        );
    }
  }

  function getMessage() {
    

    if (canBunk > 0) {
      if (canBunk === 1)
        return "😏 You’re safe! You can bunk the next lecture.";
      else if (canBunk < 4)
        return `🎉 Chill mode on! You can bunk the next ${canBunk} lectures.`;
      else
        return `🔥 You’re on fire! You can bunk the next ${canBunk} lectures. Use this power wisely 😎.`;
    } else {
      if (cannotBunk === 1)
        return "⚠️ Careful! You cannot bunk the next lecture.";
      else if (cannotBunk < 4)
        return `📉 Danger zone! You cannot bunk the next ${cannotBunk} lectures. Stay awake 😬.`;
      else
        return `🚨 Oops! You cannot bunk the next ${cannotBunk} lectures. Time to be the class topper 🤓.`;
    }
  }

  function getPercentage(attended, conducted) {
    if (!subject) return null;
    return ((attended / conducted) * 100).toFixed(1);
  }

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

      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 px-4 py-8 sm:py-12 md:px-8 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-6xl">
          {/* Subject Header */}
          <div className="mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex-1">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 sm:mb-3">
                  {subject?.name || "Loading..."}
                </h2>
                <p className="text-gray-500 text-sm sm:text-base md:text-lg">
                  Track your attendance and plan your lectures to stay above{" "}
                  <span className="font-bold text-purple-600">{criteria}%</span> 🎯
                </p>
              </div>
              <button
                onClick={handleDeleteSubject}
                className="flex items-center justify-center gap-2 h-10 sm:h-12 px-4 sm:px-6 text-sm sm:text-base rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-red-600 hover:to-rose-700 transition-all duration-300 transform hover:scale-105"
              >
                Delete Subject
              </button>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3">
            {/* Attendance Chart */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-lg p-6 sm:p-8 lg:col-span-2 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Attendance Trend 📈</h3>
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div className="flex flex-col">
                  <p className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {getPercentage(
                      subject?.totalAttended || 0,
                      subject?.totalConducted || 0
                    ) || "0"}%
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">Overall Attendance</p>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-bold text-white shadow-md">
                  <span>📊</span>
                  <span className="hidden sm:inline">Tracking</span>
                </div>
              </div>
              <div className="mt-4 sm:mt-6 h-48 sm:h-64">
                {/* Chart.js Line Chart */}
                <Line
                  data={{
                    labels: lectures.map((lect) => {
                      const date = new Date(lect.date);
                      return `${date.getMonth() + 1}/${date.getDate()}`;
                    }),
                    datasets: [
                      {
                        label: "Attendance %",
                        data: lectures.map((lect, idx) => {
                          // Calculate cumulative attendance up to this point
                          const cumulativeLectures = lectures.slice(0, idx + 1);
                          const totalAttended = cumulativeLectures.reduce((sum, l) => sum + l.attended, 0);
                          const totalConducted = cumulativeLectures.reduce((sum, l) => sum + l.conducted, 0);
                          return totalConducted > 0 ? ((totalAttended / totalConducted) * 100).toFixed(1) : 0;
                        }),
                        borderColor: "rgb(99, 102, 241)",
                        backgroundColor: "rgba(99, 102, 241, 0.1)",
                        fill: true,
                        tension: 0.4,
                        borderWidth: 3,
                        pointRadius: 4,
                        pointBackgroundColor: "rgb(99, 102, 241)",
                        pointBorderColor: "#fff",
                        pointBorderWidth: 2,
                        pointHoverRadius: 6,
                      },
                      {
                        label: `Target (${criteria}%)`,
                        data: lectures.map(() => criteria),
                        borderColor: "rgb(239, 68, 68)",
                        borderDash: [5, 5],
                        borderWidth: 2,
                        pointRadius: 0,
                        fill: false,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: true,
                        position: "top",
                        labels: {
                          usePointStyle: true,
                          padding: 15,
                          font: {
                            size: 12,
                            weight: "bold",
                          },
                        },
                      },
                      tooltip: {
                        backgroundColor: "rgba(0,0,0,0.8)",
                        padding: 12,
                        cornerRadius: 8,
                        titleFont: { size: 14, weight: "bold" },
                        bodyFont: { size: 12 },
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                          callback: function(value) {
                            return value + "%";
                          },
                        },
                        grid: {
                          color: "rgba(0,0,0,0.05)",
                        },
                      },
                      x: {
                        grid: {
                          display: false,
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>

            {/* Safe Buffer / Bunk Status */}
            <div className="bg-gradient-to-br from-white/80 to-purple-50/50 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-lg p-6 sm:p-8 flex flex-col justify-between hover:shadow-xl transition-all duration-300">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Can I Bunk? 🤔</h3>
                <p className="text-lg sm:text-2xl font-bold text-gray-800 leading-relaxed">
                  {getMessage() ?? "Loading..."}
                </p>
              </div>
              <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between items-center p-2 sm:p-3 bg-white/60 rounded-lg">
                  <span className="text-gray-600 font-medium">Total Lectures:</span>
                  <span className="font-bold text-gray-800">{subject?.totalConducted || 0}</span>
                </div>
                <div className="flex justify-between items-center p-2 sm:p-3 bg-white/60 rounded-lg">
                  <span className="text-gray-600 font-medium">Attended:</span>
                  <span className="font-bold text-green-600">{subject?.totalAttended || 0}</span>
                </div>
                <div className="p-2 sm:p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <p className="text-gray-700 font-medium leading-relaxed">
                    {futureMessage(subject?.totalAttended || 0, subject?.totalConducted || 0) ?? "Loading..."}
                  </p>
                </div>
              </div>
            </div>

            {/* Lecture History */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-lg p-4 sm:p-6 md:p-8 lg:col-span-3 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Lecture History 📚</h3>
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="inline-block min-w-full align-middle">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="border-b-2 border-gray-200 text-gray-600">
                      <tr>
                        <th className="py-3 px-3 sm:py-4 sm:px-6 font-bold">Date</th>
                        <th className="py-3 px-3 sm:py-4 sm:px-6 font-bold text-center">
                          Conducted
                        </th>
                        <th className="py-3 px-3 sm:py-4 sm:px-6 font-bold text-center">
                          Attended
                        </th>
                        <th className="py-3 px-3 sm:py-4 sm:px-6 font-bold text-center">
                          Status
                        </th>
                        <th className="py-3 px-3 sm:py-4 sm:px-6 font-bold text-center">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...lectures].reverse().map((lect, index) => {
                        const formatedDate = new Date(
                          lect.date
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        });

                        const attendanceRate = lect.conducted > 0 ? (lect.attended / lect.conducted) * 100 : 0;

                        return (
                          <tr key={index} className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-colors">
                            <td className="py-3 px-3 sm:py-4 sm:px-6 font-medium text-gray-700 whitespace-nowrap">{formatedDate}</td>
                            <td className="py-3 px-3 sm:py-4 sm:px-6 text-center">
                              <span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 text-blue-700 font-bold text-xs sm:text-sm">
                                {lect.conducted}
                              </span>
                            </td>
                            <td className="py-3 px-3 sm:py-4 sm:px-6 text-center">
                              <span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-100 text-green-700 font-bold text-xs sm:text-sm">
                                {lect.attended}
                              </span>
                            </td>
                            <td className="py-3 px-3 sm:py-4 sm:px-6 text-center">
                              {attendanceRate >= criteria ? (
                                <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold">
                                ✓ Good
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full bg-gradient-to-r from-red-400 to-rose-500 text-white text-xs font-bold">
                                ✗ Missed
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-3 sm:py-4 sm:px-6 text-center">
                            <button
                              onClick={() => handleDeleteLecture(lect._id)}
                              className="inline-flex items-center gap-1 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gradient-to-r from-red-500 to-rose-600 text-white text-xs font-bold shadow-md hover:shadow-lg hover:from-red-600 hover:to-rose-700 transition-all duration-300 transform hover:scale-105"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SubjectView;
