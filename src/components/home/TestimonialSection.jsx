import React from 'react';

const TestimonialSection = () => {
  const testimonials = [
    {
      name: "Amit Sharma",
      role: "Museum Visitor",
      content: "Using HeritageLink was a fantastic experience! No more waiting in long queues. Booking tickets and getting information about exhibits through the chatbot was so convenient."
    },
    {
      name: "Radhika Rao",
      role: "Museum Director",
      content: "HeritageLink has greatly enhanced our visitor experience and operational efficiency. The insights provided by the analytics are crucial for our strategic decisions."
    },
    {
      name: "Priya Patel",
      role: "International Tourist",
      content: "As someone who prefers Hindi, I was delighted to use the multilingual chatbot. It made planning my visit and booking tickets so much easier and more enjoyable."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-100 to-blue-200">
      <div className="container px-4 mx-auto">
        <h2 className="mb-12 text-3xl font-bold text-center text-blue-600 md:text-4xl">What Our Visitors Say</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 transition-transform duration-300 transform bg-white rounded-lg shadow-lg hover:scale-105"
            >
              <div className="mb-4">
                <h3 className="font-semibold text-blue-600">{testimonial.name}</h3>
                <p className="text-gray-600">{testimonial.role}</p>
              </div>
              <p className="italic text-gray-700">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;