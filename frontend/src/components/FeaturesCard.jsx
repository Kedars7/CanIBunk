import React from "react";

const FeaturesCard = () => {
  return (
    <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center" aria-label="Features">
      {/* Card 1 */}
      <article className="p-6 rounded-2xl bg-white/70 backdrop-blur-md shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="text-4xl mb-3" role="img" aria-label="Chart icon">📊</div>
        <h3 className="text-xl font-semibold">Track Attendance</h3>
        <p className="mt-2 text-gray-500 text-sm">
          Log your lectures and keep attendance stats in one place.
        </p>
      </article>

      {/* Card 2 */}
      <article className="p-6 rounded-2xl bg-white/70 backdrop-blur-md shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="text-4xl mb-3" role="img" aria-label="Clock icon">⏱</div>
        <h3 className="text-xl font-semibold">Plan Bunks Smartly</h3>
        <p className="mt-2 text-gray-500 text-sm">
          See exactly how many classes you can skip without risk.
        </p>
      </article>

      {/* Card 3 */}
      <article className="p-6 rounded-2xl bg-white/70 backdrop-blur-md shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="text-4xl mb-3" role="img" aria-label="Cool emoji">😎</div>
        <h3 className="text-xl font-semibold">Stay in the Safe Zone</h3>
        <p className="mt-2 text-gray-500 text-sm">
          Enjoy your naps while staying compliant with attendance rules.
        </p>
      </article>
    </section>
  );
};

export default FeaturesCard;
