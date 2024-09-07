import React from 'react';

const StatsSection = () => {
  const stats = [
    { label: "Annual Visitors", value: "500,000+" },
    { label: "Exhibitions", value: "50+" },
    { label: "Customer Satisfaction", value: "98%" },
    { label: "Booking Time Reduced", value: "75%" },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <h2 className="mb-2 text-4xl font-bold text-white">{stat.value}</h2>
              <p className="text-blue-100">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;