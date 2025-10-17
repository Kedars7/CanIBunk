import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const AddLecture = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [conducted, setConducted] = useState(1);
  const [attended, setAttended] = useState(1);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get("http://localhost:7000/v1/subjects", {
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

  const handelClick = async (e) => {
    e.preventDefault();

    if (!selectedSubject) return toast.error("Select a subject");

    if (attended > conducted)
      return toast.error("Attended lectures cannot be greater that conducted lectures");

    try {
      await axios.post(
        "http://localhost:7000/v1/lectures",
        { subjectId: selectedSubject, conducted, attended },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success("Lecture added");
      setSelectedSubject("");
      setAttended(1);
      setConducted(1);
      
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
                Add Today's Lectures
              </h1>
              <p className="text-sm sm:text-base text-gray-500">
                Quickly log your attendance for the day 📝
              </p>
            </div>

          <form onSubmit={handelClick} className="space-y-5 sm:space-y-6">
            {/* Subject */}
            <div>
              <label
                htmlFor="subject"
                className="block text-xs sm:text-sm font-bold text-gray-700 mb-2"
              >
                Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                id="subject"
                name="subject"
                className="block w-full rounded-xl border-2 border-gray-200 h-11 sm:h-12 px-4 text-sm sm:text-base text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
              >
                <option value="" disabled>
                  Select a subject
                </option>
                {subjects.map((subjx, index) => (
                  <option key={subjx._id ?? index} value={subjx._id}>
                    {subjx.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Conducted & Attended */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="conducted"
                  className="block text-xs sm:text-sm font-bold text-gray-700 mb-2"
                >
                  Conducted
                </label>
                <input
                  value={conducted}
                  placeholder="0"
                  onChange={(e) => setConducted(Number(e.target.value))}
                  id="conducted"
                  name="conducted"
                  type="number"
                  min="0"
                  className="block w-full rounded-xl border-2 border-gray-200 h-11 sm:h-12 px-4 text-sm sm:text-base text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                />
              </div>
              <div>
                <label
                  htmlFor="attended"
                  className="block text-xs sm:text-sm font-bold text-gray-700 mb-2"
                >
                  Attended
                </label>
                <input
                  value={attended}
                  placeholder="0"
                  onChange={(e) => setAttended(Number(e.target.value))}
                  id="attended"
                  name="attended"
                  type="number"
                  min="0"
                  className="block w-full rounded-xl border-2 border-gray-200 h-11 sm:h-12 px-4 text-sm sm:text-base text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setAttended(conducted);
                }}
                type="button"
                className="w-full bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-2 border-green-200 rounded-xl h-11 sm:h-12 text-xs sm:text-sm font-bold hover:from-green-100 hover:to-emerald-100 transition-all duration-300 transform hover:scale-105"
              >
                All Attended
              </button>
              <button
                onClick={() => {
                  setAttended(attended + 1);
                  setConducted(conducted + 1);
                }}
                type="button"
                className="w-full bg-gradient-to-r from-blue-50 to-purple-50 text-purple-700 border-2 border-purple-200 rounded-xl h-11 sm:h-12 text-xs sm:text-sm font-bold hover:from-blue-100 hover:to-purple-100 transition-all duration-300 transform hover:scale-105"
              >
                +1 Attended
              </button>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="w-full h-11 sm:h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Add Lecture
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

export default AddLecture;

