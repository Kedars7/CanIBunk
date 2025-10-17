import React from "react";

const FeaturesCard = () => {
  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
      {/* Card 1 */}
      <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-md shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="text-4xl mb-3">📊</div>
        <h3 className="text-xl font-semibold">Track Attendance</h3>
        <p className="mt-2 text-gray-500 text-sm">
          Log your lectures and keep attendance stats in one place.
        </p>
      </div>

      {/* Card 2 */}
      <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-md shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="text-4xl mb-3">⏱</div>
        <h3 className="text-xl font-semibold">Plan Bunks Smartly</h3>
        <p className="mt-2 text-gray-500 text-sm">
          See exactly how many classes you can skip without risk.
        </p>
      </div>

      {/* Card 3 */}
      <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-md shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="text-4xl mb-3">😎</div>
        <h3 className="text-xl font-semibold">Stay in the Safe Zone</h3>
        <p className="mt-2 text-gray-500 text-sm">
          Enjoy your naps while staying compliant with attendance rules.
        </p>
      </div>
    </div>
  );
};

export default FeaturesCard;
