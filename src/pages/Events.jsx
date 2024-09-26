import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Music, Microscope, Palette, Cpu, Ticket, ChevronRight, Camera, Book, Globe, Film, Beaker } from 'lucide-react';

const events = [
  {
    title: "Ancient Egypt: Unveiling the Mysteries",
    date: "June 15 - September 30, 2024",
    time: "10:00 AM - 6:00 PM",
    location: "Main Exhibition Hall",
    description: "Explore the wonders of Ancient Egypt through our extensive collection of artifacts and interactive displays.",
    icon: Palette
  },
  {
    title: "Renaissance Masters: Art and Innovation",
    date: "July 1 - October 31, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "West Wing Gallery",
    description: "Immerse yourself in the beauty of Renaissance art with our curated exhibition featuring works from legendary artists.",
    icon: Palette
  },
  {
    title: "Dinosaur Discovery Days",
    date: "August 5 - August 20, 2024",
    time: "11:00 AM - 4:00 PM",
    location: "Paleontology Center",
    description: "A family-friendly event showcasing our paleontology collection with hands-on activities for young explorers.",
    icon: Microscope
  },
  {
    title: "Modern Marvels: Technology Through Time",
    date: "September 10 - December 15, 2024",
    time: "10:00 AM - 7:00 PM",
    location: "Innovation Pavilion",
    description: "Witness the evolution of technology from ancient times to the present day in this innovative exhibition.",
    icon: Cpu
  },
  {
    title: "Cultural Fusion: World Music Concert Series",
    date: "Every Saturday in October 2024",
    time: "7:00 PM - 10:00 PM",
    location: "Grand Auditorium",
    description: "Experience a blend of global musical traditions with live performances in our grand hall.",
    icon: Music
  },
  {
    title: "Photography Through the Ages",
    date: "November 1 - January 31, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "Visual Arts Center",
    description: "Discover the evolution of photography from its inception to the digital age in this comprehensive exhibition.",
    icon: Camera
  },
  {
    title: "Literary Legends: A Celebration of Words",
    date: "December 1 - February 28, 2025",
    time: "10:00 AM - 8:00 PM",
    location: "Library Annex",
    description: "Explore the works and lives of literary giants through rare manuscripts, first editions, and interactive displays.",
    icon: Book
  },
  {
    title: "World Cultures: A Global Journey",
    date: "January 15 - April 30, 2025",
    time: "9:00 AM - 7:00 PM",
    location: "International Gallery",
    description: "Embark on a virtual journey around the world, exploring diverse cultures, traditions, and artifacts.",
    icon: Globe
  },
  {
    title: "Cinema Retrospective: A Century of Film",
    date: "February 1 - May 31, 2025",
    time: "11:00 AM - 9:00 PM",
    location: "Multimedia Theater",
    description: "Celebrate the art of cinema with classic screenings, memorabilia, and interactive film history exhibits.",
    icon: Film
  }
];

export default function Events() {
  return (
    <section className="relative py-20 mt-0 overflow-hidden bg-white">
      <BackgroundAnimation />
      <div className="relative z-10 max-w-7xl px-4 mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-5xl font-bold text-center text-transparent bg-proj bg-clip-text"
        >
          Discover Our Exciting Events
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
            to="/events"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white transition-all duration-300 rounded-full bg-proj hover:bg-blue-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl"
          >
            View More Events
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
      <div className="p-6 flex-grow">
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
        <h3 className="text-xl font-bold text-transparent bg-proj bg-clip-text mb-2">{event.title}</h3>
        <div className="space-y-2 mb-4">
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