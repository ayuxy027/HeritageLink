import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const FAQSection = () => {
  const faqs = [
    {
      question: "How does the chatbot assist in booking tickets?",
      answer: "Our chatbot guides you through the process of booking tickets by helping you select museums, amenities, and payment methods. It's as interactive as talking to a Ticketing Agent."
    },
    {
      question: "Is the chatbot responsive in regional languages?",
      answer: "Yes, our chatbot is designed to support multiple regional languages including Hindi, Tamil, Telugu, Marathi, and Bengali, making the booking experience accessible for everyone."
    },
    {
      question: "Can I book tickets for special events through the chatbot?",
      answer: "Definitely! The chatbot can assist you in booking tickets for special events and exhibitions, ensuring you don't miss out on unique opportunities."
    },
    {
      question: "Does the chatbot help with cancellations and refunds?",
      answer: "Yes, the chatbot is equipped to guide you through the cancellation process and assist with applying for refunds, providing a hassle-free experience."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-20 bg-blue-50">
      <div className="container px-4 mx-auto">
        <h2 className="mb-12 text-3xl font-bold text-center text-blue-600 md:text-4xl">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                className="flex items-center justify-between w-full p-4 text-left transition-colors duration-300 bg-white rounded-lg focus:outline-none hover:bg-blue-100"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-blue-600">{faq.question}</span>
                <FaChevronDown
                  className={`text-blue-600 transition-transform duration-300 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-4 py-2 bg-white rounded-b-lg">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;