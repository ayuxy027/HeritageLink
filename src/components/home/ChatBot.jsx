import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const API_KEY = 'AIzaSyCPOQB5cv8R1ucsx6Y7xhdTJNbzqVdqNfI';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

const Button = React.forwardRef(({ className, variant = 'default', size = 'default', children, ...props }, ref) => {
  const baseStyle = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    ghost: "hover:bg-blue-100 hover:text-blue-600 focus:ring-blue-500",
  };
  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-8 px-2 rounded-md",
    lg: "h-12 px-8 rounded-md",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

const Input = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      ref={ref}
      {...props}
    />
  );
});

const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="flex justify-start"
  >
    <div className="bg-gray-200 text-gray-800 p-3 rounded-lg max-w-[70%]">
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
        className="flex space-x-1"
      >
        <div className="w-2 h-2 bg-blue-600 rounded-full" />
        <div className="w-2 h-2 bg-blue-600 rounded-full" />
        <div className="w-2 h-2 bg-blue-600 rounded-full" />
      </motion.div>
    </div>
  </motion.div>
);

const ChatSection = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef(null);

  const predefinedQuestions = [
    "How to get started",
    "Book Tickets",
    "Museum Status",
    "Contact Staff",
    "History of the Museum"
  ];

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

    try {
      const response = await axios.post(
        `${API_URL}?key=${API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `You are the HeritageLink AI assistant, a museum ticketing system helper. Your role is to assist with ticket bookings, provide museum and exhibit information, and handle visitor services queries. Provide concise, focused responses. Avoid emojis and stay on topic. 
                  avoid using markdown syntax and keep responses short and to the point.
                  If user seems to be curious about something genuinely answer them with a dummy data since this is a hackthon project.
                  keep tone humble and do not respond to any else query rather than our product
                  be highly multi-lingual and able to understand and respond in multiple languages most comfortably and accurately.
                  provide phno 9999999 as a dummy phone number.
                  provide dummy email as heritagelink@heritagelink.com
                  provide dummy address as 123 Rastra Pati Bhawan, New Delhi 110001, India
                  mention that you are made by team innova8ers wherever you can
                  implement the dummy names as indian cities and indian names generate random data just for place holder.
                  Answer in medium length when user asks for any details like how old is museum and other stuff
                  Key functions:
                  1. Ticket Booking: Guide reservation process, provide pricing, handle group bookings, explain policies.
                  2. Museum Information: Offer details on hours, location, admission policies, amenities.
                  3. Exhibit Information: Overview current/upcoming exhibits, dates, notable artifacts.
                  4. Visitor Services: Assist with general inquiries, guided tours, museum rules, special events.
                  Maintain a professional yet friendly tone. If unable to process a request, respond with: "I apologize, there was an error processing your request. How else can I assist you with HeritageLink's services?"
                  User query: ${input}`
                }
              ]
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      const aiResponse = response.data.candidates[0].content.parts[0].text;
      setMessages(prev => [...prev, { text: aiResponse, sender: 'ai' }]);
    } catch (error) {
      console.error('Error fetching response from API:', error);
      setMessages(prev => [...prev, { text: "I apologize, there was an error processing your request. How else can I assist you with HeritageLink's services?", sender: 'ai' }]);
    }

    setIsLoading(false);
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  return (
    <div className="fixed z-50 bottom-4 right-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              width: isExpanded ? '500px' : '350px',
              height: isExpanded ? '80vh' : '600px'
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 260, damping: 20 }}
            className="flex flex-col overflow-hidden bg-white rounded-lg shadow-2xl"
          >
            <motion.div
              className="flex items-center justify-between p-4 text-white bg-blue-600 cursor-move"
              whileHover={{ backgroundColor: "#2563EB" }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 font-bold text-blue-600 bg-white rounded-full">
                  AI
                </div>
                <div>
                  <h3 className="font-semibold">Heritage Link Assistant</h3>
                  <p className="text-xs text-blue-200">Always here to help</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={handleClearChat} className="text-white hover:text-blue-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="text-white hover:text-blue-200">
                  {isExpanded ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  )}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="text-white hover:text-blue-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Button>
              </div>
            </motion.div>
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] p-3 rounded-lg ${message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800'
                      }`}>
                      {message.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 bg-gray-100">
              <div className="flex mb-2 space-x-2">
                <Input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-grow"
                />
                <Button onClick={handleSendMessage} disabled={isLoading}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {predefinedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    onClick={() => setInput(question)}
                    className="text-xs"
                  >
                    {question}
                  </Button>
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
          className="p-4 text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </motion.button>
      )}
    </div>
  );
};

export default ChatSection;