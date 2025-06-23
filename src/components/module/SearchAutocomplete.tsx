import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SearchAutocomplete({ searchQuery, setSearchQuery, allItems }) {
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (searchQuery.length > 1) {
            const searchTerms = searchQuery.toLowerCase().split(' ');
            const filtered = allItems
                .filter(item => {
                    const titleMatch = searchTerms.every(term =>
                        item.title.toLowerCase().includes(term)
                    );
                    const descriptionMatch = searchTerms.every(term =>
                        item.description.toLowerCase().includes(term)
                    );
                    return titleMatch || descriptionMatch;
                })
                .slice(0, 5);
            setSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }, [searchQuery, allItems]);

    return (
        <div className="relative w-full md:w-[32rem] lg:w-[40rem]" ref={searchRef}>
            <div className="relative group">
                <input
                    type="text"
                    placeholder="Search experiences..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-12 py-3.5 w-full text-gray-700 bg-white rounded-xl border-2 border-gray-200 shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-proj/50 focus:border-proj hover:border-proj/30 hover:shadow-md"
                />
                <Search className="absolute left-3.5 top-1/2 w-5 h-5 text-gray-400 transition-colors transform -translate-y-1/2 group-hover:text-proj/70" />
                {searchQuery && (
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3.5 top-1/2 text-gray-400 transform -translate-y-1/2 hover:text-gray-600"
                    >
                        <X className="w-4 h-4" />
                    </motion.button>
                )}
            </div>

            <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="overflow-hidden absolute z-50 mt-2 w-full rounded-xl border shadow-lg backdrop-blur-sm bg-white/95 border-gray-200/70"
                    >
                        {suggestions.map((item) => (
                            <motion.div
                                key={item.id}
                                whileHover={{ backgroundColor: '#f3f4f6' }}
                                className="flex items-center p-3 transition-colors cursor-pointer hover:bg-gray-50"
                                onClick={() => {
                                    setSearchQuery(item.title);
                                    setShowSuggestions(false);
                                }}
                            >
                                <div className="overflow-hidden relative mr-3 w-12 h-12 rounded-lg">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                                    />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-800">{item.title}</p>
                                    <p className="text-sm text-gray-500">{item.location}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}