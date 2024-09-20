import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { museumData, categories, durations, locations } from './museumData'

const Button = ({ children, className, ...props }) => (
  <button
    className={`px-4 py-2 font-semibold text-white rounded-lg transition-all duration-300 ${className}`}
    {...props}
  >
    {children}
  </button>
)

const Select = ({ value, onChange, options, className }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={`p-2 bg-white border-2 border-blue-200 rounded-lg focus:border-blue-400 focus:outline-none ${className}`}
  >
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
)

const Card = ({ children, className, ...props }) => (
  <div
    className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${className}`}
    {...props}
  >
    {children}
  </div>
)

const ExplorePage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('exhibitions')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedDuration, setSelectedDuration] = useState('All')
  const [selectedLocation, setSelectedLocation] = useState('All')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState('default')
  const [viewMode, setViewMode] = useState('grid')
  const [showHelp, setShowHelp] = useState(false)
  const [visibleItems, setVisibleItems] = useState(6)
  const navigate = useNavigate()

  const allItems = [
    ...museumData.exhibitions,
    ...museumData.collections,
    ...museumData.tours
  ]

  const [filteredItems, setFilteredItems] = useState(allItems)

  useEffect(() => {
    const filtered = allItems.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (activeTab === 'exhibitions' ? item.type === 'exhibition' :
        activeTab === 'collections' ? item.type === 'collection' :
          item.type === 'tour') &&
      (selectedCategory === 'All' || item.category === selectedCategory) &&
      (selectedLocation === 'All' || item.location === selectedLocation) &&
      (selectedDuration === 'All' ||
        (selectedDuration === 'Short' && item.duration && parseInt(item.duration) < 60) ||
        (selectedDuration === 'Medium' && item.duration && parseInt(item.duration) >= 60 && parseInt(item.duration) <= 120) ||
        (selectedDuration === 'Long' && item.duration && parseInt(item.duration) > 120))
    )

    const sortedItems = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low-high':
          return a.price - b.price
        case 'price-high-low':
          return b.price - a.price
        case 'name-a-z':
          return a.title.localeCompare(b.title)
        case 'name-z-a':
          return b.title.localeCompare(a.title)
        default:
          return 0
      }
    })

    setFilteredItems(sortedItems)
  }, [searchTerm, activeTab, selectedCategory, selectedDuration, selectedLocation, sortBy])

  const handleBookNow = (item) => {
    navigate(`/book?id=${item.id}&type=${item.type}`)
  }

  const loadMore = () => {
    setVisibleItems(prevVisibleItems => prevVisibleItems + 3)
  }

  return (
    <div className="min-h-screen p-4 font-sans bg-gradient-to-b from-blue-50 to-white sm:p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-4xl font-semibold text-center text-transparent bg-clip-text bg-proj sm:text-5xl lg:text-5xl">
          Explore Indian Museums
        </h1>

        <div className="flex flex-col items-center justify-between mb-6 space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search exhibitions, collections, or tours..."
              className="w-full py-3 pl-12 pr-4 text-gray-700 transition-all duration-300 bg-white border-2 border-blue-200 rounded-full focus:border-blue-400 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute w-6 h-6 text-blue-500 transform -translate-y-1/2 left-4 top-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:flex-nowrap">
            <Button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="transform bg-blue-600 hover:bg-blue-700 active:bg-blue-800 active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
            </Button>
            <Select
              value={sortBy}
              onChange={setSortBy}
              options={['default', 'price-low-high', 'price-high-low', 'name-a-z', 'name-z-a']}
              className="text-gray-700"
            />
            <div className="flex items-center p-1 space-x-2 bg-white border-2 border-blue-200 rounded-full">
              <Button
                onClick={() => setViewMode('grid')}
                className={`rounded-full ${viewMode === 'grid' ? 'bg-blue-600' : 'bg-white text-gray-600'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </Button>
              <Button
                onClick={() => setViewMode('list')}
                className={`rounded-full ${viewMode === 'list' ? 'bg-blue-600' : 'bg-white text-gray-600'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </div>
        </div>

        {isFilterOpen && (
          <div className="p-6 mb-6 bg-white shadow-lg rounded-xl">
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-4">
                <span className="font-semibold text-gray-700">Category:</span>
                <Select
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                  options={categories}
                  className="text-gray-700"
                />
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-semibold text-gray-700">Duration:</span>
                <Select
                  value={selectedDuration}
                  onChange={setSelectedDuration}
                  options={durations}
                  className="text-gray-700"
                />
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-semibold text-gray-700">Location:</span>
                <Select
                  value={selectedLocation}
                  onChange={setSelectedLocation}
                  options={locations}
                  className="text-gray-700"
                />
              </div>
            </div>
          </div>
        )}

        <div className="mb-8 overflow-x-auto">
          <div className="inline-flex border-b border-gray-200">
            {['exhibitions', 'collections', 'tours'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 font-medium text-sm focus:outline-none transition-colors duration-300 whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-blue-600'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className={`grid gap-6 sm:gap-8 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredItems.slice(0, visibleItems).map((item) => (
            <Card key={item.id} className={`group ${viewMode === 'list' ? 'sm:flex' : ''}`}>
              <div className={`relative overflow-hidden ${viewMode === 'list' ? 'sm:w-1/3' : 'h-48'}`}>
                <img src={item.image} alt={item.title} className="object-cover w-full h-full transition-transform duration-300 transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-bold text-white sm:text-xl md:text-2xl">{item.title}</h3>
                </div>
              </div>
              <div className={`p-6 ${viewMode === 'list' ? 'sm:w-2/3' : ''}`}>
                <p className="mb-4 text-sm text-gray-600 line-clamp-3">{item.description}</p>
                <div className="space-y-2 text-sm text-gray-500">
                  {item.type === 'exhibition' && (
                    <>
                      <div className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{item.availability}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{item.time}</span>
                      </div>
                    </>
                  )}
                  {item.type === 'tour' && (
                    <div className="flex items-center space-x-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{item.duration}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                    <span className="font-semibold text-blue-600">₹{item.price}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    onClick={() => handleBookNow(item)}
                    className="w-full transform bg-blue-600 hover:bg-blue-700 active:bg-blue-800 active:scale-95 group-hover:shadow-lg"
                  >
                    {item.type === 'collection' ? 'View Collection' : 'Book Now'}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {visibleItems < filteredItems.length && (
          <div className="mt-8 text-center">
            <Button
              onClick={loadMore}
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
            >
              View More
            </Button>
          </div>
        )}

        {filteredItems.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-2xl font-semibold text-blue-600">No items found matching your criteria.</p>
            <p className="mt-2 text-lg text-gray-500">Try adjusting your filters or search term.</p>
          </div>
        )}
      </div>

      <div className="fixed bottom-4 right-4">
        <Button
          onClick={() => setShowHelp(true)}
          className="flex items-center justify-center w-12 h-12 transition-all duration-300 transform bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 active:bg-blue-800 hover:shadow-xl hover:scale-105 active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </Button>
      </div>

      {showHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-blue-600">Help</h2>
              <button onClick={() => setShowHelp(false)} className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• Use the search bar to find specific exhibitions, collections, or tours.</li>
              <li>• Filter results by category, duration, and location using the "Filters" button.</li>
              <li>• Sort items by price or name using the dropdown menu.</li>
              <li>• Switch between grid and list view using the icons.</li>
              <li>• Click "Book Now" or "View Collection" to proceed with your selection.</li>
              <li>• Use the "View More" button to load additional items.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default ExplorePage