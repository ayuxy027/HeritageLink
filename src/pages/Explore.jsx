import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Grid, List, Calendar, Clock, MapPin, Tag, DollarSign, HelpCircle, ChevronDown, X } from 'lucide-react';

// Assume these are imported from your data file
const museumData = {
  exhibitions: [
    { id: 'e1', type: 'exhibition', title: 'Ancient India', description: 'Explore the rich history of ancient India through artifacts and interactive displays.', image: '/placeholder.svg?height=400&width=600', availability: 'Daily', time: '10:00 AM - 6:00 PM', location: 'New Delhi', category: 'History', price: 250 },
    { id: 'e2', type: 'exhibition', title: 'Modern Art of India', description: 'A curated collection of contemporary Indian art pieces from renowned artists.', image: '/placeholder.svg?height=400&width=600', availability: 'Tue-Sun', time: '11:00 AM - 7:00 PM', location: 'Mumbai', category: 'Art', price: 300 },
    // Add more exhibitions as needed
  ],
  collections: [
    { id: 'c1', type: 'collection', title: 'Mughal Miniatures', description: 'A stunning collection of intricate Mughal miniature paintings from the 16th-19th centuries.', image: '/placeholder.svg?height=400&width=600', location: 'Jaipur', category: 'Art', price: 200 },
    { id: 'c2', type: 'collection', title: 'Ancient Sculptures', description: 'Marvel at the exquisite sculptures from various periods of Indian history.', image: '/placeholder.svg?height=400&width=600', location: 'Khajuraho', category: 'Sculpture', price: 180 },
    // Add more collections as needed
  ],
  tours: [
    { id: 't1', type: 'tour', title: 'Highlights of Indian History', description: 'A guided tour covering the main highlights of Indian history across multiple galleries.', image: '/placeholder.svg?height=400&width=600', duration: '2 hours', location: 'New Delhi', category: 'History', price: 500 },
    { id: 't2', type: 'tour', title: 'Art Through the Ages', description: 'Experience the evolution of Indian art from ancient times to the modern era.', image: '/placeholder.svg?height=400&width=600', duration: '1.5 hours', location: 'Mumbai', category: 'Art', price: 450 },
    // Add more tours as needed
  ]
};

const categories = ['All', 'History', 'Art', 'Sculpture', 'Architecture', 'Science'];
const durations = ['All', 'Short (< 1 hour)', 'Medium (1-2 hours)', 'Long (> 2 hours)'];
const locations = ['All', 'New Delhi', 'Mumbai', 'Jaipur', 'Khajuraho', 'Kolkata'];

const Button = React.forwardRef(({ children, className, ...props }, ref) => (
  <button
    ref={ref}
    className={`px-6 py-3 font-medium text-lg text-white rounded-full transition-all duration-300 ${className}`}
    {...props}
  >
    {children}
  </button>
));

const Select = ({ value, onChange, options, className, label }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`appearance-none w-full p-3 pr-10 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-proj focus:border-transparent ${className}`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute text-gray-400 transform -translate-y-1/2 pointer-events-none top-1/2 right-3" size={20} />
    </div>
  </div>
);

const Card = ({ children, className, ...props }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl ${className}`}
    {...props}
  >
    {children}
  </motion.div>
);

const ExplorePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('exhibitions');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDuration, setSelectedDuration] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('grid');
  const [showHelp, setShowHelp] = useState(false);
  const [visibleItems, setVisibleItems] = useState(6);

  const allItems = [
    ...museumData.exhibitions,
    ...museumData.collections,
    ...museumData.tours
  ];

  const [filteredItems, setFilteredItems] = useState(allItems);

  const filterAndSortItems = useCallback(() => {
    let filtered = allItems.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (activeTab === 'all' || item.type === activeTab.slice(0, -1)) &&
      (selectedCategory === 'All' || item.category === selectedCategory) &&
      (selectedLocation === 'All' || item.location === selectedLocation) &&
      (selectedDuration === 'All' ||
        (selectedDuration === 'Short (< 1 hour)' && item.duration && parseInt(item.duration) < 60) ||
        (selectedDuration === 'Medium (1-2 hours)' && item.duration && parseInt(item.duration) >= 60 && parseInt(item.duration) <= 120) ||
        (selectedDuration === 'Long (> 2 hours)' && item.duration && parseInt(item.duration) > 120))
    );

    switch (sortBy) {
      case 'price-low-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-a-z':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-z-a':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    setFilteredItems(filtered);
  }, [searchTerm, activeTab, selectedCategory, selectedDuration, selectedLocation, sortBy]);

  useEffect(() => {
    filterAndSortItems();
  }, [filterAndSortItems]);

  const loadMore = () => {
    setVisibleItems(prevVisibleItems => prevVisibleItems + 3);
  };

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedDuration('All');
    setSelectedLocation('All');
    setSortBy('default');
  };

  return (
    <div className="min-h-screen p-8 font-sans bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto space-y-12 max-w-7xl">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-center text-transparent bg-proj bg-clip-text sm:text-6xl lg:text-7xl"
        >
          Explore Indian Museums
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="relative w-full max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search exhibitions, collections, or tours..."
              className="w-full py-4 pr-4 text-lg text-gray-700 transition-all duration-300 bg-white border-2 border-gray-200 rounded-full pl-14 focus:border-proj focus:outline-none focus:ring-2 focus:ring-proj focus:ring-opacity-50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute w-6 h-6 text-gray-400 transform -translate-y-1/2 left-5 top-1/2" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="bg-proj hover:bg-opacity-90 active:bg-opacity-100"
            >
              <Filter className="inline-block w-5 h-5 mr-2" />
              Filters
            </Button>
            <Select
              value={sortBy}
              onChange={setSortBy}
              options={['default', 'price-low-high', 'price-high-low', 'name-a-z', 'name-z-a']}
              className="text-gray-700 min-w-[200px]"
              label="Sort by"
            />
            <div className="flex items-center p-1 space-x-2 bg-white border-2 border-gray-200 rounded-full">
              <Button
                onClick={() => setViewMode('grid')}
                className={`rounded-full ${viewMode === 'grid' ? 'bg-proj' : 'bg-white text-gray-600'}`}
              >
                <Grid className="w-5 h-5" />
              </Button>
              <Button
                onClick={() => setViewMode('list')}
                className={`rounded-full ${viewMode === 'list' ? 'bg-proj' : 'bg-white text-gray-600'}`}
              >
                <List className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden bg-white shadow-lg rounded-xl"
            >
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <Select
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                    options={categories}
                    className="text-gray-700"
                    label="Category"
                  />
                  <Select
                    value={selectedDuration}
                    onChange={setSelectedDuration}
                    options={durations}
                    className="text-gray-700"
                    label="Duration"
                  />
                  <Select
                    value={selectedLocation}
                    onChange={setSelectedLocation}
                    options={locations}
                    className="text-gray-700"
                    label="Location"
                  />
                </div>
                <div className="flex justify-end">
                  <Button onClick={resetFilters} className="text-gray-700 bg-gray-200 hover:bg-gray-300">
                    Reset Filters
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="overflow-x-auto">
          <div className="inline-flex border-b border-gray-200">
            {['all', 'exhibitions', 'collections', 'tours'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-8 font-medium text-lg focus:outline-none transition-colors duration-300 whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-b-2 border-proj text-proj'
                    : 'text-gray-500 hover:text-proj'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
          }`}
        >
          <AnimatePresence>
            {filteredItems.slice(0, visibleItems).map((item) => (
              <Card key={item.id} className={`group ${viewMode === 'list' ? 'sm:flex' : ''}`}>
                <div className={`relative ${viewMode === 'list' ? 'sm:w-1/3' : 'h-64'}`}>
                  <img src={item.image} alt={item.title} className="object-cover w-full h-full transition-transform duration-300 transform group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                  </div>
                </div>
                <div className={`p-6 flex flex-col justify-between ${viewMode === 'list' ? 'sm:w-2/3' : 'h-64'}`}>
                  <div>
                    <p className="mb-4 text-gray-600 line-clamp-3">{item.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                      {item.type === 'exhibition' && (
                        <>
                          <div className="flex items-center space-x-2">
                            <Calendar className="flex-shrink-0 w-5 h-5 text-proj" />
                            <span>{item.availability}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="flex-shrink-0 w-5 h-5 text-proj" />
                            <span>{item.time}</span>
                          </div>
                        </>
                      )}
                      {item.type === 'tour' && (
                        <div className="flex items-center space-x-2">
                          <Clock className="flex-shrink-0 w-5 h-5 text-proj" />
                          <span>{item.duration}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <MapPin className="flex-shrink-0 w-5 h-5 text-proj" />
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Tag className="flex-shrink-0 w-5 h-5 text-proj" />
                        <span>{item.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <span className="text-2xl font-bold text-proj">₹{item.price}</span>
                    <Button
                      onClick={() => {/* Handle booking logic */}}
                      className="bg-proj hover:bg-opacity-90 active:bg-opacity-100"
                    >
                      {item.type === 'collection' ? 'View Collection' : 'Book Now'}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </AnimatePresence>
        </motion.div>

        {visibleItems < filteredItems.length && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Button
              onClick={loadMore}
              className="bg-proj hover:bg-opacity-90 active:bg-opacity-100"
            >
              View More
            </Button>
          </motion.div>
        )}

        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="py-12 text-center"
          >
            <p className="text-3xl font-bold text-proj">No items found matching your criteria.</p>
            <p className="mt-4 text-xl text-gray-500">Try adjusting your filters or search term.</p>
          </motion.div>
        )}
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-8 right-8"
      >
        <Button
          onClick={() => setShowHelp(true)}
          className="flex items-center justify-center w-16 h-16 transition-all duration-300 transform rounded-full shadow-lg bg-proj hover:bg-opacity-90 active:bg-opacity-100 hover:shadow-xl hover:scale-105 active:scale-95"
        >
          <HelpCircle className="w-8 h-8" />
        </Button>
      </motion.div>

      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-2xl p-8 bg-white shadow-2xl rounded-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-transparent bg-proj bg-clip-text">Help</h2>
                <button onClick={() => setShowHelp(false)} className="text-gray-500 transition-colors duration-300 hover:text-gray-700">
                  <X className="w-8 h-8" />
                </button>
              </div>
              <ul className="space-y-4 text-lg text-gray-600">
                <li className="flex items-start">
                  <Search className="flex-shrink-0 w-6 h-6 mt-1 mr-4 text-proj" />
                  Use the search bar to find specific exhibitions, collections, or tours.
                </li>
                <li className="flex items-start">
                  <Filter className="flex-shrink-0 w-6 h-6 mt-1 mr-4 text-proj" />
                  Filter results by category, duration, and location using the "Filters" button.
                </li>
                <li className="flex items-start">
                  <ChevronDown className="flex-shrink-0 w-6 h-6 mt-1 mr-4 text-proj" />
                  Sort items by price or name using the dropdown menu.
                </li>
                <li className="flex items-start">
                  <Grid className="flex-shrink-0 w-6 h-6 mt-1 mr-4 text-proj" />
                  Switch between grid and list view using the icons.
                </li>
                <li className="flex items-start">
                  <DollarSign className="flex-shrink-0 w-6 h-6 mt-1 mr-4 text-proj" />
                  Click "Book Now" or "View Collection" to proceed with your selection.
                </li>
                <li className="flex items-start">
                  <ChevronDown className="flex-shrink-0 w-6 h-6 mt-1 mr-4 text-proj" />
                  Use the "View More" button to load additional items.
                </li>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExplorePage;