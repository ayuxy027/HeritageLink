import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTicketAlt, FaCalendarAlt, FaLanguage, FaChartBar, FaSearch, FaUserPlus, FaChevronDown } from 'react-icons/fa';

// Simulated AI response function (replace with actual AI integration)
const getAIResponse = async (message) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const responses = [
    "Welcome to HeritageLink! How can I assist you today?",
    "Our museum is open from 9 AM to 5 PM, Tuesday through Sunday.",
    "Tickets can be booked online or at the entrance. Would you like me to guide you through the booking process?",
    "Our current exhibition 'Ancient Wonders' showcases artifacts from ancient civilizations. It's a must-see!",
    "Yes, we offer guided tours every hour. The next available tour starts in 30 minutes.",
    "I'm sorry, I didn't understand that. Could you please rephrase your question?"
  ];
  return responses[Math.floor(Math.random() * responses.length)];
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container flex items-center justify-between px-4 py-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-blue-600"
        >
          HeritageLink
        </motion.div>
        <nav className="hidden space-x-8 md:flex">
          {['Home', 'Exhibitions', 'Tickets', 'About', 'Contact'].map((item, index) => (
            <motion.a
              key={item}
              href="#"
              className="text-gray-600 transition-colors duration-300 hover:text-blue-600"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {item}
            </motion.a>
          ))}
        </nav>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-4"
        >
          <button className="px-4 py-2 text-blue-600 transition-colors duration-300 bg-blue-100 rounded-full hover:bg-blue-200">
            Login
          </button>
          <button className="px-4 py-2 text-white transition-colors duration-300 bg-blue-600 rounded-full hover:bg-blue-700">
            Book Now
          </button>
        </motion.div>
      </div>
    </header>
  );
};

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center md:flex-row">
          <motion.div
            className="mb-10 md:w-1/2 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1 className="mb-6 text-5xl font-bold leading-tight text-blue-800 md:text-6xl">
              Experience History, <br />
              <span className="text-blue-600">Book with Ease</span>
            </h1>
            <p className="mb-8 text-xl text-blue-700">
              HeritageLink revolutionizes museum visits with our AI-powered chatbot ticketing system. Say goodbye to long queues and hello to seamless, intelligent booking.
            </p>
            <div className="flex space-x-4">
              <button className="px-8 py-3 text-white transition-colors duration-300 bg-blue-600 rounded-full hover:bg-blue-700">
                <FaTicketAlt className="inline-block mr-2" /> Book Tickets
              </button>
              <button className="px-8 py-3 text-blue-600 transition-colors duration-300 bg-white rounded-full hover:bg-blue-50">
                <FaCalendarAlt className="inline-block mr-2" /> View Events
              </button>
            </div>
          </motion.div>
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <img src="/placeholder.svg?height=400&width=400" alt="Museum Illustration" className="w-full h-auto" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  const stats = [
    { label: "Annual Visitors", value: "500,000+" },
    { label: "Exhibitions", value: "50+" },
    { label: "Customer Satisfaction", value: "98%" },
    { label: "Booking Time Reduced", value: "75%" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h2 className="mb-2 text-4xl font-bold text-blue-600">{stat.value}</h2>
              <p className="text-blue-800">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

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
        <h2 className="mb-12 text-3xl font-bold text-center text-blue-800 md:text-4xl">How HeritageLink Works</h2>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-8 bg-white rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <feature.icon className="mb-4 text-4xl text-blue-600" />
              <h3 className="mb-2 text-xl font-semibold text-blue-800">{feature.title}</h3>
              <p className="text-blue-700">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialSection = () => {
  const testimonials = [
    {
      name: "Emily Chen",
      role: "Museum Visitor",
      content: "HeritageLink made booking tickets a breeze! No more waiting in long queues. I love how I can book tickets and get information about exhibits all through the chatbot.",
      image: "/placeholder.svg?height=100&width=100"
    },
    {
      name: "David Smith",
      role: "Museum Director",
      content: "Implementing HeritageLink has significantly improved our visitor experience and operational efficiency. The analytics provided are invaluable for our decision-making process.",
      image: "/placeholder.svg?height=100&width=100"
    },
    {
      name: "Sophie Martin",
      role: "International Tourist",
      content: "As a non-English speaker, I was thrilled to use the multilingual chatbot. It made planning my visit and booking tickets so much easier and more enjoyable.",
      image: "/placeholder.svg?height=100&width=100"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-100 to-blue-200">
      <div className="container px-4 mx-auto">
        <h2 className="mb-12 text-3xl font-bold text-center text-blue-800 md:text-4xl">What Our Visitors Say</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 mr-4 rounded-full" />
                <div>
                  <h3 className="font-semibold text-blue-800">{testimonial.name}</h3>
                  <p className="text-blue-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="italic text-blue-700">"{testimonial.content}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const faqs = [
    {
      question: "How does the chatbot ticketing system work?",
      answer: "Our AI-powered chatbot guides you through the booking process, answering questions and helping you select the right tickets. You can interact with it just like you would with a human representative."
    },
    {
      question: "Is the chatbot available 24/7?",
      answer: "Yes, our chatbot is available round the clock to assist with bookings and answer queries about the museum and its exhibitions."
    },
    {
      question: "Can I book tickets for special events through the chatbot?",
      answer: "The chatbot can handle bookings for regular admissions as well as special events and exhibitions."
    },
    {
      question: "What languages does the chatbot support?",
      answer: "Our chatbot currently supports multiple languages including English, Spanish, French, Chinese, and Arabic, with more languages being added regularly."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-20 bg-blue-50">
      <div className="container px-4 mx-auto">
        <h2 className="mb-12 text-3xl font-bold text-center text-blue-800 md:text-4xl">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                className="flex items-center justify-between w-full p-4 text-left bg-white rounded-lg focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-blue-800">{faq.question}</span>
                <FaChevronDown
                  className={`text-blue-600 transition-transform duration-300 ${openIndex === index ? 'transform rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 pb-4 bg-white rounded-b-lg"
                  >
                    <p className="text-blue-700">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="py-20 text-white bg-gradient-to-br from-blue-600 to-blue-800">
      <div className="container px-4 mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-3xl font-bold md:text-4xl"
        >
          Ready to Experience History?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 text-xl"
        >
          Book your tickets now and enjoy a seamless, queue-free visit to our museum.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="px-8 py-3 text-lg font-semibold text-blue-600 transition-colors duration-300 bg-white rounded-full hover:bg-blue-100"
        >
          <FaTicketAlt className="inline-block mr-2" /> Book Your Visit
        </motion.button>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-12 text-blue-700 bg-blue-50">
    <div className="container px-4 mx-auto">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        <div>
          <h3 className="mb-4 text-lg font-semibold text-blue-800">HeritageLink</h3>
          <ul className="space-y-2">
            <li><a href="#" className="transition-colors duration-300 hover:text-blue-600">About Us</a></li>
            <li><a href="#" className="transition-colors duration-300 hover:text-blue-600">Careers</a></li>
            <li><a href="#" className="transition-colors duration-300 hover:text-blue-600">Press</a></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold text-blue-800">Visit</h3>
          <ul className="space-y-2">
            <li><a href="#" className="transition-colors duration-300 hover:text-blue-600">Exhibitions</a></li>
            <li><a href="#" className="transition-colors duration-300 hover:text-blue-600">Events</a></li>
            <li><a href="#" className="transition-colors duration-300 hover:text-blue-600">Tours</a></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold text-blue-800">Support</h3>
          <ul className="space-y-2">
            <li><a href="#" className="transition-colors duration-300 hover:text-blue-600">FAQs</a></li>
            <li><a href="#" className="transition-colors duration-300 hover:text-blue-600">Accessibility</a></li>
            <li><a href="#" className="transition-colors duration-300 hover:text-blue-600">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold text-blue-800">Connect</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-blue-600 transition-colors duration-300 hover:text-blue-800">
              <FaTicketAlt className="w-6 h-6" />
            </a>
            <a href="#" className="text-blue-600 transition-colors duration-300 hover:text-blue-800">
              <FaCalendarAlt className="w-6 h-6" />
            </a>
            <a href="#" className="text-blue-600 transition-colors duration-300 hover:text-blue-800">
              <FaLanguage className="w-6 h-6" />
            </a>
            <a href="#" className="text-blue-600 transition-colors duration-300 hover:text-blue-800">
              <FaChartBar className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
      <div className="pt-8 mt-12 text-center border-t border-blue-200">
        <p>&copy; 2024 HeritageLink. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

const ChatSection = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setMessages(prev => [...prev, { text: input, sender: 'user' }]);
    setInput('');

    try {
      const response = await getAIResponse(input);
      setMessages(prev => [...prev, { text: response, sender: 'ai' }]);
    } catch (error) {
      console.error('Error generating response:', error);
      setMessages(prev => [...prev, { text: 'Sorry, I encountered an error. Please try again.', sender: 'ai' }]);
    }

    setIsLoading(false);
  };

  const quickResponses = [
    "How to get started",
    "Book Tickets",
    "Museum Status",
    "Contact Staff",
    "History of the Museum"
  ];

  return (
    <div className="fixed z-50 bottom-4 right-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="overflow-hidden bg-white rounded-lg shadow-xl w-80 md:w-96"
            style={{
              backgroundImage: 'linear-gradient(to bottom right, #87CEEB, #1E90FF)',
            }}
          >
            <div className="flex items-center justify-between p-4 text-white bg-blue-600">
              <h3 className="text-lg font-semibold">HeritageLink Assistant</h3>
              <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto bg-white bg-opacity-50 h-80">
              {messages.map((message, index) => (
                <div key={index} className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  <span className={`inline-block p-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-white text-blue-800'}`}>
                    {message.text}
                  </span>
                </div>
              ))}
              {isLoading && (
                <div className="text-center">
                  <span className="inline-block p-2 text-blue-800 bg-white rounded-lg">
                    Thinking...
                  </span>
                </div>
              )}
            </div>
            <div className="p-4 bg-blue-100">
              <div className="flex mb-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about tickets, exhibits, or events..."
                  className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  className="p-2 text-white bg-blue-500 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Send
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {quickResponses.map((response, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(response)}
                    className="px-2 py-1 text-xs text-blue-700 bg-blue-200 rounded-full hover:bg-blue-300"
                  >
                    {response}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="p-4 text-white transition duration-300 bg-blue-600 rounded-full shadow-lg hover:bg-blue-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
          </svg>
        </motion.button>
      )}
    </div>
  );
};

const MuseumTicketingSystem = () => {
  return (
    <div className="min-h-screen text-blue-900 bg-white">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeatureSection />
      <TestimonialSection />
      <FAQSection />
      <CTASection />
      <Footer />
      <ChatSection />
    </div>
  );
};

export default MuseumTicketingSystem;