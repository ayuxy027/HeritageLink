import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Fuse from 'fuse.js';

const ChatSection = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [context, setContext] = useState({});
  const messagesEndRef = useRef(null);

  const predefinedQuestions = [
    "How to get started",
    "Book Tickets",
    "Museum Status",
    "Contact Staff",
    "History of the Museum"
  ];

  const predefinedResponses = {
    "How to get started": [
      "Welcome to Heritage Link! To get started, you can explore our exhibitions, book tickets, or join a guided tour. What would you like to do first?",
      "Getting started is easy! You can book tickets or explore our exhibitions. How can I assist you?"
    ],
    "Book Tickets": [
      "Certainly! You can book tickets online through our website or at the entrance. Would you like me to guide you through the online booking process?",
      "Booking tickets is easy! You can do it online or in person. Would you like help with the online process?"
    ],
    "Museum Status": [
      "Our museum is currently open. We operate from 9 AM to 5 PM, Tuesday through Sunday. Is there a specific date you're planning to visit?",
      "The museum is open from 9 AM to 5 PM, Tuesday through Sunday. Do you have a particular date in mind for your visit?"
    ],
    "Contact Staff": [
      "You can contact our staff by calling (555) 123-4567 or by emailing info@heritagelink.com. How may we assist you today?",
      "To reach our staff, call (555) 123-4567 or email info@heritagelink.com. How can we assist you?"
    ],
    "History of the Museum": [
      "This Museum was founded in 1950 and has been an epitome of cultural education in our community for over 70 years. Would you like to know more about any specific era of our history?",
      "Our Museum has been a cultural cornerstone since 1950. Interested in learning more about our history?"
    ]
  };

  const fuse = new Fuse(predefinedQuestions, { includeScore: true, threshold: 0.4 });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setMessages(prev => [...prev, { text: input, sender: 'user' }]);
    setInput('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    let response = "I'm sorry, I don't have information about that. Can you try asking one of the predefined questions?";
    const matchingQuestion = fuse.search(input);
    if (matchingQuestion.length > 0) {
      const bestMatch = matchingQuestion[0].item;
      const possibleResponses = predefinedResponses[bestMatch];
      response = possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
      setContext({ ...context, lastQuestion: bestMatch });
    } else {
      try {
        const apiResponse = await axios.post(
          'https://api.google.com/v1/generate-response', // Replace with actual API endpoint
          {
            prompt: input
            // Add other parameters if required by the API
          },
          {
            headers: {
              'Authorization': `Bearer AIzaSyCPOQB5cv8R1ucsx6Y7xhdTJNbzqVdqNfI`,
              'Content-Type': 'application/json'
            }
          }
        );
        response = apiResponse.data.response; // Adjust according to API response structure
      } catch (error) {
        console.error('Error fetching response from Google Gemini:', error);
        response = "Sorry, there was an error processing your request.";
      }
    }

    setMessages(prev => [...prev, { text: response, sender: 'ai' }]);
    setIsLoading(false);
  };

  const handleClearChat = () => {
    setMessages([]);
    setContext({});
  };

  return (
    <div className="fixed z-50 bottom-4 right-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="overflow-hidden bg-white rounded-lg shadow-xl w-80 md:w-96"
          >
            <div className="flex items-center justify-between p-4 text-white bg-gradient-to-r from-[#2b6cb0] to-[#3182ce]">
              <h3 className="text-lg font-semibold">HeritageLink Assistant</h3>
              <div className="flex items-center">
                <button onClick={handleClearChat} className="mr-2 text-white hover:text-gray-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
                <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-4 overflow-y-auto bg-white h-80">
              {messages.map((message, index) => (
                <div key={index} className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  <span className={`inline-block p-2 rounded-lg ${message.sender === 'user' ? 'bg-gradient-to-r from-[#2b6cb0] to-[#3182ce] text-white' : 'bg-gray-100 text-[#2b6cb0]'}`}>
                    {message.text}
                  </span>
                </div>
              ))}
              {isLoading && (
                <div className="text-center">
                  <span className="inline-block p-2 text-[#2b6cb0] bg-gray-100 rounded-lg">
                    Thinking...
                  </span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 bg-gradient-to-r from-[#2b6cb0] to-[#3182ce]">
              <div className="flex mb-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your question..."
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
                {predefinedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(question)}
                    className="px-2 py-1 text-xs text-[#2b6cb0] bg-white rounded-full hover:bg-blue-100 transition-colors duration-300"
                  >
                    {question}
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
          style={{
            boxShadow: '0 0 0 4px rgba(255, 255, 255, 0.7), 0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
          </svg>
        </motion.button>
      )}
    </div>
  );
};

export default ChatSection;