'use client'

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageCircle, Zap, Globe, Smartphone, ChartBar, Calendar, QrCode, Video, Languages, Database } from 'lucide-react';

const faqs = [
  {
    question: 'What is HeritageLink?',
    answer: 'HeritageLink is an innovative platform designed to enhance the museum experience. It offers features like online ticket booking, AI-powered chatbots for information, QR code entry systems, and personalized recommendations for exhibits.',
    icon: HelpCircle
  },
  {
    question: 'How is HeritageLink different from traditional museum systems?',
    answer: 'HeritageLink offers a digital-first approach to museum visits. It eliminates long queues with online booking and QR code entry, provides multilingual support through AI chatbots, and offers personalized recommendations based on visitor preferences.',
    icon: Zap
  },
  {
    question: 'What are the key features of HeritageLink?',
    answer: 'Key features include online ticket booking, AI chatbots for information in multiple languages, QR code entry system, personalized exhibit recommendations, virtual tour options, and analytics for museum management.',
    icon: MessageCircle
  },
  {
    question: 'How can I book tickets through HeritageLink?',
    answer: 'You can book tickets through the HeritageLink website or mobile app. Simply select your preferred date and time, choose the type of ticket, and complete the payment process.',
    icon: Calendar
  },
  {
    question: 'Is HeritageLink available for all museums?',
    answer: 'HeritageLink is continuously expanding its network. While it\'s not available for all museums yet, we\'re working with numerous cultural institutions to implement our system. Check our website for a list of partner museums.',
    icon: Globe
  },
  {
    question: 'How does the QR code entry system work?',
    answer: 'After booking your ticket, you\'ll receive a unique QR code. When you arrive at the museum, simply scan this code at the entrance for quick and easy access, bypassing traditional queues.',
    icon: QrCode
  },
  {
    question: 'Can I get a virtual tour of the museum before my visit?',
    answer: 'Yes, HeritageLink offers virtual tour options for many partner museums. This feature allows you to preview exhibits and plan your visit more effectively.',
    icon: Video
  },
  {
    question: 'How does HeritageLink support different languages?',
    answer: 'HeritageLink\'s AI chatbot supports multiple languages, making it easier for international visitors to get information and plan their visits in their preferred language.',
    icon: Languages
  },
  {
    question: 'Is there a mobile app for HeritageLink?',
    answer: 'Yes, HeritageLink offers a mobile app available for both iOS and Android devices. The app provides all the features of the web platform in a mobile-friendly format.',
    icon: Smartphone
  },
  {
    question: 'How does HeritageLink benefit museum management?',
    answer: 'HeritageLink provides valuable analytics and insights to museum management, helping them make data-driven decisions about exhibit popularity, visitor flow, and operational efficiency.',
    icon: ChartBar
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="relative py-20 mt-0 overflow-hidden bg-white">
      <BackgroundAnimation />
      <div className="relative z-10 max-w-4xl px-4 mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-4xl font-semibold text-center text-transparent bg-proj bg-clip-text"
        >
          Frequently Asked Questions
        </motion.h2>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { 
                staggerChildren: 0.1,
                delayChildren: 0.3
              }
            }
          }}
          className="space-y-6"
        >
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index}
              faq={faq}
              index={index}
              isActive={activeIndex === index}
              toggleFAQ={toggleFAQ}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link 
            to="/contact"
            className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white transition-colors duration-300 rounded-full bg-proj hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Database className="mr-2 text-blue-200" size={24} />
            Contact our support
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function FAQItem({ faq, index, isActive, toggleFAQ }) {
  return (
    <motion.div 
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: { 
          y: 0, 
          opacity: 1,
          transition: { 
            type: "spring",
            stiffness: 100,
            damping: 12
          }
        }
      }}
      className="overflow-hidden transition-shadow duration-300 bg-white border rounded-lg shadow-md border-opacity-20 hover:shadow-lg border-proj"
    >
      <button 
        className="flex items-center justify-between w-full p-6 text-left focus:outline-none"
        onClick={() => toggleFAQ(index)}
      >
        <div className="flex items-center">
          <motion.div
            className="mr-4 text-blue-500"
            animate={{ rotate: isActive ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <faq.icon size={24} />
          </motion.div>
          <span className="text-lg font-semibold text-transparent bg-proj bg-clip-text">{faq.question}</span>
        </div>
        <motion.div
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-blue-500"
        >
          <ChevronDown size={24} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ 
              duration: 0.3,
              ease: "easeInOut"
            }}
          >
            <div className="px-6 pb-6">
              <p className="text-transparent bg-proj bg-clip-text">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function BackgroundAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-blue-500 rounded-full opacity-10"
          style={{
            width: Math.random() * 4 + 1,
            height: Math.random() * 4 + 1,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
