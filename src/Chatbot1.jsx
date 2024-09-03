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
      "Welcome to HeritageLink! You can book tickets, check availability, get recommendations, or learn about exhibits. How can I help?",
      "Great to have you here! I can assist with booking, exploring exhibits, or recommendations. What would you like to do?"
    ],
    "Book Tickets": [
      "Sure! Would you like to book tickets for a specific date or get info on current exhibits and events?",
      "Of course! What date are you planning to visit, or do you want to know about our current exhibitions?"
    ],
    "Museum Status": [
      "The museum is open. Would you like real-time updates on exhibit availability or crowd levels?",
      "We're open! I can provide info on less crowded times. Do you have a specific date in mind?"
    ],
    "Contact Staff": [
      "You can reach our staff at (555) 123-4567 or info@heritagelink.com. How else can I help?",
      "Our staff is available at (555) 123-4567 or info@heritagelink.com. Is there something specific you need?"
    ],
    "History of the Museum": [
      "Our museum has been a cultural cornerstone since 1950. Would you like to explore our current exhibits?",
      "With over 70 years of history, would you like to learn about our special exhibits or book a visit?"
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

    let response = "I apologize, I don't have specific information about that. Could you try asking about our booking process, museum status, or current exhibits?";
    const matchingQuestion = fuse.search(input);
    if (matchingQuestion.length > 0) {
      const bestMatch = matchingQuestion[0].item;
      const possibleResponses = predefinedResponses[bestMatch];
      response = possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
      setContext({ ...context, lastQuestion: bestMatch });
    } else {
      try {
        const apiResponse = await axios.post(
          'https://api.openai.com/v1/chat/completions', // Replace with your actual API endpoint
          {
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: "You are HeritageLink, an AI assistant for a museum ticketing system. Provide helpful, concise responses about booking tickets, museum information, and exhibits." },
              { role: "user", content: input }
            ]
          },
          {
            headers: {
              'Authorization': `AIzaSyCPOQB5cv8R1ucsx6Y7xhdTJNbzqVdqNfI`, // Replace with your actual API key
              'Content-Type': 'application/json'
            }
          }
        );
        response = apiResponse.data.choices[0].message.content;
      } catch (error) {
        console.error('Error fetching response from API:', error);
        response = "I apologize, there was an error processing your request. How else can I assist you with HeritageLink's services?";
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
                  placeholder="Ask about booking, exhibits, or more..."
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