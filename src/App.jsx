import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTicketAlt, FaCalendarAlt, FaLanguage, FaChartBar, FaSearch, FaUserPlus, FaChevronDown, FaArrowRight } from 'react-icons/fa';
import Chatbot1 from './Chatbot1';

// Simulated AI response function (replace with actual AI integration)
const getAIResponse = async (message) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const responses = [
    "Welcome to Heritage Link! How can I assist you today?",
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
          className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2b6cb0] to-[#3182ce]"
        >
          HeritageLink
        </motion.div>
        <nav className="hidden space-x-8 md:flex">
          {['Home', 'Exhibitions', 'Tickets', 'About', 'Contact'].map((item, index) => (
            <motion.a
              key={item}
              href="#"
              className="text-gray-600 transition-colors duration-300 hover:text-[#2b6cb0]"
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
          <button className="px-4 py-2 text-[#2b6cb0] transition-colors duration-300 bg-blue-100 rounded-full hover:bg-blue-200">
            Login
          </button>
          <button className="px-4 py-2 text-white transition-colors duration-300 rounded-full bg-gradient-to-r from-[#2b6cb0] to-[#3182ce] hover:from-[#1e4e8c] hover:to-[#2563eb]">
            Book Now
          </button>
        </motion.div>
      </div>
    </header>
  );
};

const HeroSection = () => {
  const dynamicWords = ["Blazing Fast", "AI Powered", "Hassle-Free"];
  const [dynamicText, setDynamicText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleTyping = useCallback(() => {
    const currentWord = dynamicWords[wordIndex];
    const shouldDelete = isDeleting && dynamicText === '';
    const shouldChangeWord = !isDeleting && dynamicText === currentWord;

    if (shouldDelete) {
      setIsDeleting(false);
      setWordIndex((prevIndex) => (prevIndex + 1) % dynamicWords.length);
    } else if (shouldChangeWord) {
      setIsDeleting(true);
    } else {
      setDynamicText(prevText =>
        isDeleting ? currentWord.slice(0, prevText.length - 1) : currentWord.slice(0, prevText.length + 1)
      );
    }
  }, [dynamicText, isDeleting, wordIndex, dynamicWords]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleTyping();
    }, isDeleting ? 150 : 250);

    return () => clearTimeout(timer);
  }, [handleTyping, isDeleting]);

  return (
    <section className="relative py-16 overflow-hidden bg-gradient-to-b from-gray-50 to-white sm:py-24 lg:py-32">
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute right-0 w-1/2 h-full text-gray-100 transform translate-x-1/2" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polygon points="50,0 100,0 50,100 0,100" />
        </svg>
        <svg className="absolute left-0 w-1/4 h-full transform -translate-x-1/2 text-blue-50" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <circle cx="50" cy="50" r="50" />
        </svg>
        <svg className="absolute top-0 w-1/4 left-1/4 h-1/4 text-yellow-50" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polygon points="0,0 100,0 50,100" />
        </svg>
      </div>
      <div className="relative max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <motion.div
          className="text-center lg:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-3xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#2b6cb0] to-[#3182ce] sm:text-4xl sm:leading-tight lg:leading-tight lg:text-5xl font-pj">
            Experience History With, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2b6cb0] to-[#3182ce]">
              {dynamicText}
              <span className="cursor" aria-hidden="true"></span>
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2b6cb0] to-[#3182ce]">Booking</span>
          </h1>
          <p className="max-w-xl mx-auto mt-4 text-lg text-gray-600 sm:mt-6 font-inter lg:mx-0">
            HeritageLink revolutionizes museum visits with our AI-powered chatbot ticketing system. Say goodbye to long queues and hello to seamless, intelligent booking.
          </p>
          <div className="flex flex-col items-center justify-center mt-8 space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
            <button className="relative w-full max-w-xs px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out transform rounded-full bg-gradient-to-r from-[#2b6cb0] to-[#3182ce] hover:from-[#1e4e8c] hover:to-[#2563eb] sm:w-auto hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group">
              <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-in-out rounded-full bg-gradient-to-br from-white/10 to-transparent"></span>
              <span className="relative z-10 flex items-center justify-center">
                Book Tickets
                <FaArrowRight className="ml-2" />
              </span>
            </button>
            <button className="relative w-full max-w-xs px-6 py-2 text-base font-semibold text-[#2b6cb0] transition-all duration-300 ease-in-out transform bg-white border-2 border-[#2b6cb0] rounded-full sm:w-auto hover:bg-blue-50 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 group">
              <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-in-out rounded-full bg-gradient-to-br from-white/50 to-transparent"></span>
              <span className="relative z-10 flex items-center justify-center">
                View Events
                <FaCalendarAlt className="ml-2" />
              </span>
            </button>
          </div>
        </motion.div>
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
    <section className="py-20 bg-gradient-to-r from-[#2b6cb0] to-[#3182ce]">
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
              <h2 className="mb-2 text-4xl font-bold text-white">{stat.value}</h2>
              <p className="text-blue-100">{stat.label}</p>
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
        <h2 className="mb-12 text-3xl font-bold text-center text-[#2b6cb0] md:text-4xl">How Heritage Link Works</h2>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-8 transition-transform duration-300 transform bg-white rounded-lg shadow-lg hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-center w-16 h-16 mb-6 text-white rounded-full bg-gradient-to-r from-[#2b6cb0] to-[#3182ce]">
                <feature.icon className="text-3xl" />
              </div>
              <h3 className="mb-4 text-xl font-semibold text-[#2b6cb0]">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
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
        <h2 className="mb-12 text-3xl font-bold text-center text-[#2b6cb0] md:text-4xl">What Our Visitors Say</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="p-6 transition-transform duration-300 transform bg-white rounded-lg shadow-lg hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 mr-4 rounded-full" />
                <div>
                  <h3 className="font-semibold text-[#2b6cb0]">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="italic text-gray-700">"{testimonial.content}"</p>
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
        <h2 className="mb-12 text-3xl font-bold text-center text-[#2b6cb0] md:text-4xl">Frequently Asked Questions</h2>
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
                <span className="font-semibold text-[#2b6cb0]">{faq.question}</span>
                <FaChevronDown
                  className={`text-[#2b6cb0] transition-transform duration-300 ${openIndex === index ? 'transform rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 py-2 bg-white rounded-b-lg"
                  >
                    <p className="text-gray-600">{faq.answer}</p>
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
    <section className="py-20 text-white bg-gradient-to-br from-[#2b6cb0] to-[#3182ce]">
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
          className="px-8 py-3 text-lg font-semibold text-[#2b6cb0] transition-all duration-300 bg-white rounded-full hover:bg-blue-100 hover:scale-105 transform"
        >
          <FaTicketAlt className="inline-block mr-2" /> Book Your Visit
        </motion.button>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-12 text-white bg-gradient-to-br from-[#2b6cb0] to-[#3182ce]">
    <div className="container px-4 mx-auto">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        <div>
          <h3 className="mb-4 text-lg font-semibold">HeritageLink</h3>
          <ul className="space-y-2">
            <li><a href="#" className="transition-colors duration-300 hover:text-blue-200">About Us</a></li>
            <li><a href="#" className="transition-colors duration-300 hover:text-blue-200">Careers</a></li>
            <li><a href="#" className="transition-colors duration-300 hover:text-blue-200">Press</a></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Visit</h3>
          <ul className="space-y-2">
            <li><a href="#" className="transition-colors duration-300 hover:text-blue-200">Exhibitions</a></li>
            <li><a href="#" className="transition-colors duration-300 hover:text-blue-200">Events</a></li>
            <li><a href="#" className="transition-colors duration-300 hover:text-blue-200">Tours</a></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Support</h3>
          <ul className="space-y-2">
            <li><a href="#" className="transition-colors duration-300 hover:text-blue-200">FAQs</a></li>
            <li><a href="#" className="transition-colors duration-300 hover:text-blue-200">Accessibility</a></li>
            <li><a href="#" className="transition-colors duration-300 hover:text-blue-200">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Connect</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-white transition-colors duration-300 hover:text-blue-200">
              <FaTicketAlt className="w-6 h-6" />
            </a>
            <a href="#" className="text-white transition-colors duration-300 hover:text-blue-200">
              <FaCalendarAlt className="w-6 h-6" />
            </a>
            <a href="#" className="text-white transition-colors duration-300 hover:text-blue-200">
              <FaLanguage className="w-6 h-6" />
            </a>
            <a href="#" className="text-white transition-colors duration-300 hover:text-blue-200">
              <FaChartBar className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
      <div className="pt-8 mt-12 text-center border-t border-blue-400">
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
              backgroundImage: 'linear-gradient(to bottom right, #2b6cb0, #3182ce)',
            }}
          >
            <div className="flex items-center justify-between p-4 text-white bg-gradient-to-r from-[#2b6cb0] to-[#3182ce]">
              <h3 className="text-lg font-semibold">HeritageLink Assistant</h3>
              <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto bg-white bg-opacity-90 h-80">
              {messages.map((message, index) => (
                <div key={index} className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  <span className={`inline-block p-2 rounded-lg ${message.sender === 'user' ? 'bg-gradient-to-r from-[#2b6cb0] to-[#3182ce] text-white' : 'bg-white text-[#2b6cb0] border border-[#2b6cb0]'}`}>
                    {message.text}
                  </span>
                </div>
              ))}
              {isLoading && (
                <div className="text-center">
                  <span className="inline-block p-2 text-[#2b6cb0] bg-white rounded-lg">
                    Thinking...
                  </span>
                </div>
              )}
            </div>
            <div className="p-4 bg-gradient-to-r from-[#2b6cb0] to-[#3182ce]">
              <div className="flex mb-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about tickets, exhibits, or events..."
                  className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#2b6cb0]"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  className="p-2 text-white bg-[#2b6cb0] rounded-r-lg hover:bg-[#1e4e8c] focus:outline-none focus:ring-2 focus:ring-[#2b6cb0] transition-colors duration-300"
                >
                  Send
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {quickResponses.map((response, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(response)}
                    className="px-2 py-1 text-xs text-[#2b6cb0] bg-white rounded-full hover:bg-blue-100 transition-colors duration-300"
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
          className="p-4 text-white transition duration-300 rounded-full shadow-lg bg-gradient-to-r from-[#2b6cb0] to-[#3182ce] hover:from-[#1e4e8c] hover:to-[#2563eb]"
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
    <div className="min-h-screen text-gray-900 bg-white">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeatureSection />
      <TestimonialSection />
      <FAQSection />
      <CTASection />
      <Footer />
      <Chatbot1 />
    </div>
  );
};

export default MuseumTicketingSystem;