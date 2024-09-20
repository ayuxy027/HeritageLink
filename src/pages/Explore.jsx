import React, { useState } from 'react';
import { CalendarIcon, ClockIcon, MapPinIcon, TicketIcon, SearchIcon } from 'lucide-react';

const museumData = {
  exhibitions: [
    {
      title: "Ancient Civilizations",
      description: "Dive into the rich history of India's ancient civilizations, including the Indus Valley Civilization.",
      availability: "Available daily",
      time: "10:00 AM - 6:00 PM",
      price: 30,
      location: "National Museum, New Delhi"
    },
    {
      title: "Modern Art Masterpieces",
      description: "A curated collection of modern Indian art, featuring works from prominent artists such as M.F. Husain.",
      availability: "Available daily",
      time: "9:00 AM - 5:00 PM",
      price: 25,
      location: "Chhatrapati Shivaji Maharaj Vastu Sangrahalaya, Mumbai"
    },
    {
      title: "Natural Wonders",
      description: "A captivating exhibit focusing on India's diverse ecosystems, featuring rare flora and fauna.",
      availability: "Available daily",
      time: "10:00 AM - 7:00 PM",
      price: 20,
      location: "Indian Museum, Kolkata"
    }
  ],
  collections: [
    {
      title: "Prehistoric Artifacts",
      description: "Featuring tools and artifacts from the Bhimbetka Rock Shelters, dating back to 30,000 BCE.",
      location: "Salar Jung Museum, Hyderabad",
      price: 15
    },
    {
      title: "Mughal Miniatures",
      description: "A unique collection of Mughal miniature paintings, showcasing the intricate art style of the era.",
      location: "City Palace Museum, Jaipur",
      price: 40
    },
    {
      title: "Cultural Heritage",
      description: "Explore the incredible diversity of India's cultural heritage, from textiles to sculptures.",
      location: "National Handicrafts and Handlooms Museum, New Delhi",
      price: 10
    }
  ],
  tours: [
    {
      title: "Guided Museum Tour",
      description: "A 90-minute expert-led tour through India's key historical periods, starting from the Mauryan Empire to modern India.",
      duration: "90 minutes",
      price: 50,
      location: "National Museum, New Delhi"
    },
    {
      title: "360° Virtual Experience",
      description: "Enjoy an immersive digital experience exploring key exhibits, including the Harappan collection and Gupta-era statues.",
      duration: "60 minutes",
      price: 20,
      location: "Online"
    },
    {
      title: "Kids Discovery Tour",
      description: "A fun and interactive 45-minute tour designed for children, featuring Indian myths and cultural activities.",
      duration: "45 minutes",
      price: 15,
      location: "Gandhi Memorial Museum, Madurai"
    }
  ],
  filters: {
    categories: ["All", "Historical", "Art", "Science", "Cultural"],
    durations: ["All", "Short (< 1 hour)", "Medium (1-2 hours)", "Long (> 2 hours)"]
  }
};

const ExplorePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('exhibitions');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDuration, setSelectedDuration] = useState('All');

  const allItems = [
    ...museumData.exhibitions.map(item => ({ ...item, type: 'exhibition' })),
    ...museumData.collections.map(item => ({ ...item, type: 'collection' })),
    ...museumData.tours.map(item => ({ ...item, type: 'tour' }))
  ];

  const filteredItems = allItems.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (activeTab === 'exhibitions' ? item.type === 'exhibition' :
     activeTab === 'collections' ? item.type === 'collection' :
     item.type === 'tour') &&
    (selectedCategory === 'All' || item.category === selectedCategory) &&
    (selectedDuration === 'All' || 
     (selectedDuration === 'Short (< 1 hour)' && item.duration && parseInt(item.duration) < 60) ||
     (selectedDuration === 'Medium (1-2 hours)' && item.duration && parseInt(item.duration) >= 60 && parseInt(item.duration) <= 120) ||
     (selectedDuration === 'Long (> 2 hours)' && item.duration && parseInt(item.duration) > 120))
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white p-4 sm:p-6 md:p-8 font-body">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-600 text-center mb-8">Explore Indian Museums</h2>

        <div className="mb-6 relative">
          <input 
            type="text" 
            placeholder="Search exhibitions, collections, or tours..." 
            className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-blue-200 focus:border-blue-400 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" />
        </div>

        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <div className="flex items-center space-x-4">
            <span className="font-semibold">Category:</span>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 rounded border border-blue-200 focus:border-blue-400 focus:outline-none"
            >
              {museumData.filters.categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <span className="font-semibold">Duration:</span>
            <select 
              value={selectedDuration} 
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="p-2 rounded border border-blue-200 focus:border-blue-400 focus:outline-none"
            >
              {museumData.filters.durations.map((duration) => (
                <option key={duration} value={duration}>{duration}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex border-b border-gray-200">
            {['exhibitions', 'collections', 'tours'].map((tab) => (
              <button
                key={tab}
                className={`py-2 px-4 font-medium text-sm focus:outline-none ${
                  activeTab === tab
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-blue-600'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.description}</p>
                <div className="space-y-2 text-sm text-gray-500">
                  {item.type === 'exhibition' && (
                    <>
                      <div className="flex items-center space-x-2">
                        <CalendarIcon className="w-4 h-4 flex-shrink-0" />
                        <span>{item.availability}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ClockIcon className="w-4 h-4 flex-shrink-0" />
                        <span>{item.time}</span>
                      </div>
                    </>
                  )}
                  {item.type === 'tour' && (
                    <div className="flex items-center space-x-2">
                      <ClockIcon className="w-4 h-4 flex-shrink-0" />
                      <span>{item.duration}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <MapPinIcon className="w-4 h-4 flex-shrink-0" />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TicketIcon className="w-4 h-4 flex-shrink-0" />
                    <span>₹{item.price}</span>
                  </div>
                </div>
              </div>
              <div className="px-6 pb-6">
                <button className="w-full py-2 px-4 bg-proj hover:bg-proj-hover text-white font-semibold rounded-md transition-colors duration-300">
                  {item.type === 'collection' ? 'View Collection' : 'Book Now'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;