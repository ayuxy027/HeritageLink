import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, ChevronRight, ChevronDown } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SearchAutocomplete from '../components/module/SearchAutocomplete';
import { museumData, locations, categories, types } from '../data/museums';
import { ParticleBackground } from '../components/shared/ParticleBackground';
import '../styles/datepicker.css';
import '../styles/shared-input.css';
import type { MuseumItem } from '../types/museum';

const exploreContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const exploreCardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 12,
    },
  },
};

const allItems: MuseumItem[] = [...museumData.exhibitions, ...museumData.collections, ...museumData.tours];

interface Filters {
  query: string;
  location: string;
  category: string;
  type: string;
  date: Date | null;
}

export default function ExplorePage(): React.JSX.Element {
  const [filters, setFilters] = useState<Filters>({
    query: '',
    location: 'All',
    category: 'All',
    type: 'All',
    date: null,
  });
  const [visibleCount, setVisibleCount] = useState(9);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
    };
    if (isCalendarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCalendarOpen]);

  const filteredItems = useMemo(() => {
    return allItems.filter(
      (item) =>
        (filters.location === 'All' || item.location === filters.location) &&
        (filters.category === 'All' || item.category === filters.category) &&
        (filters.type === 'All' || item.type.toLowerCase() === filters.type.toLowerCase()) &&
        (item.title.toLowerCase().includes(filters.query.toLowerCase()) ||
          item.description.toLowerCase().includes(filters.query.toLowerCase())) &&
        (!filters.date ||
          (item.availability && item.availability.includes(filters.date.toLocaleDateString('en-US', { weekday: 'long' }))))
    );
  }, [filters]);

  const handleViewMore = useCallback(() => {
    setVisibleCount((prev) => prev + 9);
  }, []);

  const updateFilter = useCallback(<K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  return (
    <section className="overflow-hidden relative py-12 mt-0 bg-white">
      <ParticleBackground count={20} colorClass="bg-blue-400" />
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
            searchQuery={filters.query}
            setSearchQuery={(v) => updateFilter('query', v)}
            allItems={allItems}
          />

          <div className="relative w-full sm:w-auto">
            <select
              aria-label="Location"
              value={filters.location}
              onChange={(e) => updateFilter('location', e.target.value)}
              className="select-base"
            >
              <option value="All">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 w-5 h-5 text-gray-400 transform -translate-y-1/2 pointer-events-none" aria-hidden="true" />
          </div>

          <div className="relative w-full sm:w-auto">
            <select
              aria-label="Category"
              value={filters.category}
              onChange={(e) => updateFilter('category', e.target.value)}
              className="py-3 pr-10 pl-4 w-full text-gray-700 bg-white rounded-full border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-proj focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 w-5 h-5 text-gray-400 transform -translate-y-1/2 pointer-events-none" aria-hidden="true" />
          </div>

          <div className="relative w-full sm:w-auto">
            <select
              aria-label="Type"
              value={filters.type}
              onChange={(e) => updateFilter('type', e.target.value)}
              className="py-3 pr-10 pl-4 w-full text-gray-700 bg-white rounded-full border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-proj focus:border-transparent"
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 w-5 h-5 text-gray-400 transform -translate-y-1/2 pointer-events-none" aria-hidden="true" />
          </div>

          <div className="relative w-full sm:w-auto" ref={calendarRef}>
            <button
              type="button"
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              className="flex justify-between items-center datepicker-input"
            >
              {filters.date ? filters.date.toLocaleDateString() : 'Select Date'}
              <Calendar className="w-5 h-5 text-gray-400" aria-hidden="true" />
            </button>
            {isCalendarOpen && (
              <div className="absolute z-10 mt-1 bg-white rounded-lg border border-gray-300 shadow-lg">
                <DatePicker
                  selected={filters.date}
                  onChange={(date: Date | null) => {
                    updateFilter('date', date);
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
          variants={exploreContainerVariants}
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
              type="button"
              onClick={handleViewMore}
              className="inline-flex justify-center items-center px-8 py-4 text-lg font-medium text-white rounded-full shadow-lg transition-all duration-300 bg-proj hover:bg-blue-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:shadow-xl"
            >
              View More
              <ChevronRight className="ml-2" size={20} aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

interface ExploreCardProps {
  item: MuseumItem;
}

function ExploreCard({ item }: ExploreCardProps): React.JSX.Element {
  return (
    <motion.div
      variants={exploreCardVariants}
      whileHover={{ scale: 1.05 }}
      className="flex overflow-hidden flex-col h-full bg-white rounded-lg border border-opacity-20 shadow-md transition-all duration-300 hover:shadow-lg border-proj"
    >
      <div className="relative h-48">
        <img src={item.image} alt={item.title} className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <h3 className="absolute right-0 bottom-0 left-0 p-4 text-xl font-bold text-white">{item.title}</h3>
      </div>
      <div className="flex-grow p-6">
        <p className="mb-4 text-sm text-gray-600">{item.description}</p>
        <div className="space-y-2">
          <p className="flex items-center text-sm text-gray-600">
            <MapPin className="mr-2 text-proj" size={16} aria-hidden="true" />
            {item.location}
          </p>
          {item.availability && (
            <p className="flex items-center text-sm text-gray-600">
              <Calendar className="mr-2 text-proj" size={16} aria-hidden="true" />
              {item.availability}
            </p>
          )}
          {item.time && (
            <p className="flex items-center text-sm text-gray-600">
              <Clock className="mr-2 text-proj" size={16} aria-hidden="true" />
              {item.time}
            </p>
          )}
          {item.duration && (
            <p className="flex items-center text-sm text-gray-600">
              <Clock className="mr-2 text-proj" size={16} aria-hidden="true" />
              {item.duration}
            </p>
          )}
        </div>
      </div>
      <div className="p-6 mt-auto">
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-proj">₹{item.price}</span>
          <Link
            to="/book"
            className="inline-flex items-center justify-center px-7 py-4 text-sm font-medium text-white rounded-full transition-colors duration-300 bg-proj hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Book Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
