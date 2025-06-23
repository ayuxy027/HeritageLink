import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Music, Microscope, Palette, Cpu, Ticket, ChevronRight, Camera, Book, Globe, Film, Beaker } from 'lucide-react';

const events = [
  {
    title: "Indus Valley Civilization: Ancient Wonders",
    date: "June 15 - July 31, 2024",
    time: "10:00 AM - 5:00 PM",
    location: "National Museum, Delhi",
    description: "Explore Indus Valley artifacts and interactive displays.",
    icon: Palette
  },
  {
    title: "Mughal Art: A Legacy of Innovation",
    date: "July 1 - August 31, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "Chhatrapati Shivaji Museum, Mumbai",
    description: "Curated exhibition of Mughal art and architecture.",
    icon: Palette
  },
  {
    title: "Dinosaur Discovery: India’s Prehistoric Past",
    date: "August 5 - August 15, 2024",
    time: "11:00 AM - 3:00 PM",
    location: "Birla Science Museum, Hyderabad",
    description: "Hands-on activities showcasing India’s prehistoric life.",
    icon: Microscope
  },
  {
    title: "Modern Marvels: India's Tech Journey",
    date: "September 10 - October 31, 2024",
    time: "10:00 AM - 6:00 PM",
    location: "Visvesvaraya Museum, Bangalore",
    description: "Evolution of technology from ancient to modern times.",
    icon: Cpu
  },
  {
    title: "Swar Sangam: Indian Classical Music",
    date: "Every Saturday in October 2024",
    time: "7:00 PM - 9:00 PM",
    location: "India Habitat Centre, Delhi",
    description: "Live classical music performances from maestros.",
    icon: Music
  },
  {
    title: "Photography in Indian History",
    date: "November 1 - December 15, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "Kolkata Museum of Modern Art",
    description: "Photography journey from early days to digital era.",
    icon: Camera
  },
  {
    title: "Indian Literary Legends",
    date: "December 1 - January 15, 2025",
    time: "10:00 AM - 7:00 PM",
    location: "Jaipur Literature Museum",
    description: "Rare manuscripts and exhibits of India’s literary icons.",
    icon: Book
  },
  {
    title: "India’s Cultural Diversity",
    date: "January 15 - February 28, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "National Museum, Delhi",
    description: "Explore India’s cultural heritage and artifacts.",
    icon: Globe
  },
  {
    title: "Bollywood: 100 Years of Indian Cinema",
    date: "February 1 - March 15, 2025",
    time: "11:00 AM - 8:00 PM",
    location: "Film City, Mumbai",
    description: "Film screenings, memorabilia, and interactive exhibits.",
    icon: Film
  }
];

export default function Events() {
  return (
    <section className="relative py-8 mt-0 overflow-hidden bg-white">
      <BackgroundAnimation />
      <div className="relative z-10 px-4 mx-auto max-w-7xl">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-5xl font-semibold text-center text-transparent bg-proj bg-clip-text"
        >
          Discover Events
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
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {events.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Link 
            to="/explore"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white transition-all duration-300 rounded-full shadow-lg bg-proj hover:bg-blue-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:shadow-xl"
          >
            Explore More Events
            <ChevronRight className="ml-2" size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function EventCard({ event }) {
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
      whileHover={{ scale: 1.05 }}
      className="flex flex-col h-full overflow-hidden transition-all duration-300 bg-white border rounded-lg shadow-md border-opacity-20 hover:shadow-lg border-proj"
    >
      <div className="flex-grow p-6">
        <div className="flex items-center justify-between mb-4">
          <motion.div
            className="p-3 bg-blue-100 rounded-full"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <event.icon size={32} className="text-blue-500" />
          </motion.div>
          <Link 
            to="/book"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition-colors duration-300 rounded-full bg-proj hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Ticket className="mr-2" size={16} />
            Book Now
          </Link>
        </div>
        <h3 className="mb-2 text-xl font-bold text-transparent bg-proj bg-clip-text">{event.title}</h3>
        <div className="mb-4 space-y-2">
          <p className="flex items-center text-sm text-gray-600">
            <Calendar className="mr-2 text-blue-500" size={16} />
            {event.date}
          </p>
          <p className="flex items-center text-sm text-gray-600">
            <Clock className="mr-2 text-blue-500" size={16} />
            {event.time}
          </p>
          <p className="flex items-center text-sm text-gray-600">
            <MapPin className="mr-2 text-blue-500" size={16} />
            {event.location}
          </p>
        </div>
        <p className="text-sm text-gray-700">{event.description}</p>
      </div>
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