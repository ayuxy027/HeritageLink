import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, MapPin, Calendar, Clock, ChevronRight, ChevronDown } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const museumData = {
  exhibitions: [
    {
      id: 'e1',
      type: 'exhibition',
      title: 'Ancient India',
      description: 'Explore the rich history of ancient India. Located in the National Museum, New Delhi, which houses a vast collection of artifacts from across India’s history, with notable exhibitions focused on ancient civilizations, culture, and archaeology.',
      image: '/images/museum1.jpg',
      availability: 'Daily',
      time: '10:00 AM - 6:00 PM',
      location: 'New Delhi',
      category: 'History',
      price: 50
    },
    {
      id: 'e2',
      type: 'exhibition',
      title: 'Modern Art of India',
      description: 'Contemporary Indian art pieces. Located in Chhatrapati Shivaji Maharaj Vastu Sangrahalaya, Mumbai, this museum is home to a variety of exhibitions, including modern and contemporary Indian art, playing a key role in promoting and preserving Indian cultural heritage.',
      image: '/images/museum2.jpg',
      availability: 'Tue-Sun',
      time: '11:00 AM - 7:00 PM',
      location: 'Mumbai',
      category: 'Art',
      price: 40
    },
    {
      id: 'e3',
      type: 'exhibition',
      title: 'Wonders of Nature',
      description: 'Biodiversity of India. Located in Visvesvaraya Industrial and Technological Museum, Bengaluru, a science and technology museum offering hands-on exhibits on natural history, biodiversity, and innovations that highlight India’s rich scientific contributions.',
      image: '/images/museum3.jpg',
      availability: 'Daily',
      time: '9:00 AM - 5:00 PM',
      location: 'Bengaluru',
      category: 'Science',
      price: 50
    },
  ],
  collections: [
    {
      id: 'c1',
      type: 'collection',
      title: 'Mughal Miniatures',
      description: 'Witness the Historic Mughal India. Located in the State Museum of Tribal and Folk Art, Khajuraho, which showcases a range of tribal and folk art, including Mughal miniature paintings and historic sculptures, offering a glimpse into India’s diverse artistic traditions.',
      image: '/images/museum4.jpg',
      location: 'Khajuraho',
      category: 'Sculpture',
      price: 25
    },
    {
      id: 'c2',
      type: 'collection',
      title: 'Ancient Sculptures',
      description: 'Sculptures from Indian history. Located in the State Museum of Tribal and Folk Art, Khajuraho, which houses various ancient sculptures from different historical periods of India, focusing on the rich sculptural heritage of the Khajuraho region.',
      image: '/images/museum5.jpg',
      location: 'Khajuraho',
      category: 'Sculpture',
      price: 25
    },
    {
      id: 'c3',
      type: 'collection',
      title: 'Textile Traditions',
      description: 'Textile heritage of India. Located in the Calico Museum of Textiles, Ahmedabad, renowned for its extensive collection of Indian textiles, preserving India’s textile heritage.',
      image: '/images/museum6.jpg',
      location: 'Ahmedabad',
      category: 'Crafts',
      price: 35
    },
  ],
  tours: [
    {
      id: 't1',
      type: 'tour',
      title: 'Highlights of Indian History',
      description: 'Guided tour covering Indian history. Located in the National Museum, New Delhi, offering guided tours that take visitors through India’s vast and intricate history, showcasing artifacts from different regions and periods.',
      image: '/images/museum7.jpg',
      duration: '2 hours',
      location: 'New Delhi',
      category: 'History',
      price: 80
    },
    {
      id: 't2',
      type: 'tour',
      title: 'Art Through the Ages',
      description: 'Evolution of Indian art. Located in Chhatrapati Shivaji Maharaj Vastu Sangrahalaya, Mumbai, this tour takes you through the evolution of Indian art from traditional forms to contemporary expressions, guided by experts.',
      image: '/images/museum8.jpg',
      duration: '1.5 hours',
      location: 'Mumbai',
      category: 'Art',
      price: 65
    },
  ]
};



const allItems = [...museumData.exhibitions, ...museumData.collections, ...museumData.tours];

const locations = ['All', ...new Set(allItems.map(item => item.location))];
const categories = ['All', ...new Set(allItems.map(item => item.category))];
const types = ['All', 'Exhibition', 'Collection', 'Tour'];

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedDate, setSelectedDate] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [filteredItems, setFilteredItems] = useState(allItems);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  useEffect(() => {
    const filtered = allItems.filter(item =>
      (selectedLocation === 'All' || item.location === selectedLocation) &&
      (selectedCategory === 'All' || item.category === selectedCategory) &&
      (selectedType === 'All' || item.type.toLowerCase() === selectedType.toLowerCase()) &&
      (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (!selectedDate || (item.availability && item.availability.includes(selectedDate.toLocaleDateString('en-US', { weekday: 'long' }))))
    );
    setFilteredItems(filtered);
  }, [searchQuery, selectedLocation, selectedCategory, selectedType, selectedDate]);

  const handleViewMore = () => {
    setVisibleCount(prevCount => prevCount + 3);
  };

  return (
    <section className="relative py-12 mt-0 overflow-hidden bg-white">
      <BackgroundAnimation />
      <div className="relative z-10 px-4 mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-5xl font-semibold text-center text-transparent bg-proj bg-clip-text"
        >
          Explore Museums
        </motion.h2>

        <div className="flex flex-wrap items-center justify-center mb-8 space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-proj focus:border-transparent"
            />
            <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
          </div>

          <div className="relative w-full sm:w-auto">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full py-3 pl-4 pr-10 text-gray-700 bg-white border border-gray-300 rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-proj focus:border-transparent"
            >
              {locations.map((location) => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
            <ChevronDown className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 pointer-events-none right-3 top-1/2" />
          </div>

          <div className="relative w-full sm:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full py-3 pl-4 pr-10 text-gray-700 bg-white border border-gray-300 rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-proj focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <ChevronDown className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 pointer-events-none right-3 top-1/2" />
          </div>

          <div className="relative w-full sm:w-auto">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full py-3 pl-4 pr-10 text-gray-700 bg-white border border-gray-300 rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-proj focus:border-transparent"
            >
              {types.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <ChevronDown className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 pointer-events-none right-3 top-1/2" />
          </div>

          <div className="relative w-full sm:w-auto">
            <button
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              className="w-full py-3 pl-4 pr-10 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-proj focus:border-transparent"
            >
              {selectedDate ? selectedDate.toLocaleDateString() : 'Select Date'}
            </button>
            <Calendar className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 pointer-events-none right-3 top-1/2" />
            {isCalendarOpen && (
              <div className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => {
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
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white transition-all duration-300 rounded-full shadow-lg bg-proj hover:bg-blue-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:shadow-xl"
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

function ExploreCard({ item }) {
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
      <div className="relative h-48">
        <img src={item.image} alt={item.title} className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <h3 className="absolute bottom-0 left-0 right-0 p-4 text-xl font-bold text-white">{item.title}</h3>
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
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-proj">₹{item.price}</span>

          <Link to="/book">
            <button className="py-4 text-sm font-medium text-white transition-colors duration-300 rounded-full px-7 bg-proj hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Book Now
            </button>
          </Link>

        </div>
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