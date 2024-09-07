import React from 'react';
import { FaTicketAlt, FaLanguage, FaChartBar } from 'react-icons/fa';

const FeatureSection = () => {
  const features = [
    {
      icon: FaTicketAlt,
      title: "Efficient Booking",
      description: "Book tickets instantly with our AI-powered chatbot, eliminating long queues and wait times."
    },
    {
      icon: FaLanguage,
      title: "Multilingual Support",
      description: "Our chatbot communicates in multiple languages, ensuring a seamless experience for international visitors."
    },
    {
      icon: FaChartBar,
      title: "Smart Analytics",
      description: "Gain valuable insights into visitor patterns and preferences to optimize museum operations."
    }
  ];

  return (
    <section className="py-20 bg-blue-50">
      <div className="container px-4 mx-auto">
        <h2 className="mb-12 text-3xl font-bold text-center text-blue-600 md:text-4xl">How Heritage Link Works</h2>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 transition-transform duration-300 transform bg-white rounded-lg shadow-lg hover:scale-105"
            >
              <div className="flex items-center justify-center w-16 h-16 mb-6 text-white rounded-full bg-gradient-to-r from-blue-600 to-blue-700">
                <feature.icon className="text-3xl" />
              </div>
              <h3 className="mb-4 text-xl font-semibold text-blue-600">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;