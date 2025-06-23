import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, MapPin, Calendar, Clock, ChevronRight, ChevronDown } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SearchAutocomplete from '../components/module/SearchAutocomplete';
import { museumData, locations, categories, types } from '../data/data';
import '../styles/datepicker.css';
import '../styles/shared-input.css';


const allItems = [...museumData.exhibitions, ...museumData.collections, ...museumData.tours];

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedDate, setSelectedDate] = useState(null);
  const [visibleCount, setVisibleCount] = useState(9);
  const [filteredItems, setFilteredItems] = useState(allItems);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const memoizedFilteredItems = useMemo(() => {
    return allItems.filter(item =>
      (selectedLocation === 'All' || item.location === selectedLocation) &&
      (selectedCategory === 'All' || item.category === selectedCategory) &&
      (selectedType === 'All' || item.type.toLowerCase() === selectedType.toLowerCase()) &&
      (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (!selectedDate || (item.availability && item.availability.includes(selectedDate.toLocaleDateString('en-US', { weekday: 'long' }))))
    );
  }, [searchQuery, selectedLocation, selectedCategory, selectedType, selectedDate]);

  useEffect(() => {
    setFilteredItems(memoizedFilteredItems);
  }, [memoizedFilteredItems]);

  const handleViewMore = useCallback(() => {
    setVisibleCount(prevCount => prevCount + 9);
  }, []);

  return (
    <section className="overflow-hidden relative py-12 mt-0 bg-white">
      <BackgroundAnimation />
      <div className="relative z-10 px-4 mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-5xl font-semibold text-center text-transparent bg-clip-text bg-proj"
        >
          Explore Museums
        </motion.h2>

        <div className="flex flex-wrap justify-center items-center mb-8 space-y-4 sm:space-y-0 sm:space-x-4">
          <SearchAutocomplete
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            allItems={allItems}
          />

          <div className="relative w-full sm:w-auto">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="select-base"
            >
              <option value="All">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 w-5 h-5 text-gray-400 transform -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative w-full sm:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="py-3 pr-10 pl-4 w-full text-gray-700 bg-white rounded-full border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-proj focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 w-5 h-5 text-gray-400 transform -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative w-full sm:w-auto">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="py-3 pr-10 pl-4 w-full text-gray-700 bg-white rounded-full border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-proj focus:border-transparent"
            >
              {types.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 w-5 h-5 text-gray-400 transform -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative w-full sm:w-auto">
            <button
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              className="flex justify-between items-center datepicker-input"
            >
              {selectedDate ? selectedDate.toLocaleDateString() : 'Select Date'}
              <Calendar className="w-5 h-5 text-gray-400" />
            </button>
            {isCalendarOpen && (
              <div className="absolute z-10 mt-1 bg-white rounded-lg border border-gray-300 shadow-lg">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date: Date | null) => {
                    setSelectedDate(date);
                    setIsCalendarOpen(false);
                  }}
                  inline
                />
              </div>
            )}
          </div>
        </div>

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
          {filteredItems.slice(0, visibleCount).map((item) => (
            <ExploreCard key={item.id} item={item} />
          ))}
        </motion.div>

        {visibleCount < filteredItems.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 text-center"
          >
            <button
              onClick={handleViewMore}
              className="inline-flex justify-center items-center px-8 py-4 text-lg font-medium text-white rounded-full shadow-lg transition-all duration-300 bg-proj hover:bg-blue-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:shadow-xl"
            >
              View More
              <ChevronRight className="ml-2" size={20} />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

interface ExploreCardProps {
  item: any;
}

function ExploreCard({ item }: ExploreCardProps) {
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
      className="flex overflow-hidden flex-col h-full bg-white rounded-lg border border-opacity-20 shadow-md transition-all duration-300 hover:shadow-lg border-proj"
    >
      <div className="relative h-48">
        <img src={item.image} alt={item.title} className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <h3 className="absolute right-0 bottom-0 left-0 p-4 text-xl font-bold text-white">{item.title}</h3>
      </div>
      <div className="flex-grow p-6">
        <p className="mb-4 text-sm text-gray-600">{item.description}</p>
        <div className="space-y-2">
          <p className="flex items-center text-sm text-gray-600">
            <MapPin className="mr-2 text-proj" size={16} />
            {item.location}
          </p>
          {item.availability && (
            <p className="flex items-center text-sm text-gray-600">
              <Calendar className="mr-2 text-proj" size={16} />
              {item.availability}
            </p>
          )}
          {item.time && (
            <p className="flex items-center text-sm text-gray-600">
              <Clock className="mr-2 text-proj" size={16} />
              {item.time}
            </p>
          )}
          {item.duration && (
            <p className="flex items-center text-sm text-gray-600">
              <Clock className="mr-2 text-proj" size={16} />
              {item.duration}
            </p>
          )}
        </div>
      </div>
      <div className="p-6 mt-auto">
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-proj">₹{item.price}</span>

          <Link to="/book">
            <button className="px-7 py-4 text-sm font-medium text-white rounded-full transition-colors duration-300 bg-proj hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Book Now
            </button>
          </Link>

        </div>
      </div>
    </motion.div>
  )
};

function BackgroundAnimation() {
  return (
    <div className="overflow-hidden absolute inset-0 pointer-events-none">
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