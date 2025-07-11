
import React, { useState } from 'react';
import { ChevronLeft, Search, Mic, X, Clock, RefreshCw } from 'lucide-react';

interface DiscoverScreenProps {
  onBack: () => void;
}

const DiscoverScreen: React.FC<DiscoverScreenProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const recentSearches = [
    { text: 'charli damelio', isUser: true },
    { text: 'addison rae', isUser: true },
    { text: 'dance challenge', isUser: false },
    { text: 'bella poarch', isUser: true }
  ];

  const suggestions = [
    { text: 'charli damelio', subtitle: 'Recent search', color: 'text-tiktok-red' },
    { text: 'savage dance challenge', color: 'text-tiktok-red' },
    { text: 'renegade dance', subtitle: 'Recent search', color: 'text-gray-400' },
    { text: 'addison rae workout', color: 'text-gray-400' },
    { text: 'Bella Poarch M to the B', subtitle: 'Trending', color: 'text-gray-400', trending: true },
    { text: 'WAP dance challenge', color: 'text-gray-400' },
    { text: 'corvette corvette', color: 'text-gray-400' },
    { text: 'Dreams Fleetwood Mac Challenge', subtitle: 'Trending', color: 'text-gray-400', trending: true },
    { text: 'Buss It Challenge', subtitle: 'Trending', color: 'text-gray-400', trending: true }
  ];

  return (
    <div className="h-[100dvh] bg-tiktok-black text-white overflow-hidden">
      {/* Header with proper positioning */}
      <div className="flex items-center p-4 space-x-3 pt-12">
        <button onClick={onBack} className="flex-shrink-0">
          <ChevronLeft size={24} className="text-white" />
        </button>
        
        {/* Search Bar - properly sized */}
        <div className="flex-1 relative">
          <div className="bg-tiktok-gray-700 rounded-full flex items-center px-4 py-2.5">
            <Search size={18} className="text-tiktok-gray-400 mr-3 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="charli damelio"
              className="flex-1 bg-transparent text-white outline-none placeholder-tiktok-gray-400 text-sm"
            />
            <Mic size={18} className="text-white ml-3 flex-shrink-0" />
          </div>
        </div>
        
        <button className="text-tiktok-red font-medium text-base flex-shrink-0">
          Search
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Recent Searches */}
        <div className="px-4 mb-6">
          {recentSearches.map((search, index) => (
            <div key={index} className="flex items-center justify-between py-3">
              <div className="flex items-center">
                <Clock size={18} className="text-tiktok-gray-400 mr-3" />
                <span className="text-white text-base">{search.text}</span>
                {search.isUser && (
                  <div className="w-4 h-4 bg-tiktok-red rounded-full ml-2 flex items-center justify-center">
                    <div className="w-2 h-3 bg-white rounded-sm"></div>
                  </div>
                )}
              </div>
              <X size={18} className="text-tiktok-gray-400" />
            </div>
          ))}
          
          <div className="flex justify-center py-4">
            <button className="text-tiktok-gray-400 text-sm">
              See more <span className="ml-1">⌄</span>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-tiktok-gray-800 mx-4 mb-6"></div>

        {/* You may like section */}
        <div className="px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white text-lg font-medium">You may like</h2>
            <div className="flex items-center">
              <RefreshCw size={14} className="text-tiktok-gray-400 mr-1" />
              <span className="text-tiktok-gray-400 text-xs">Refresh</span>
            </div>
          </div>

          {/* Suggestions */}
          <div className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-4 ${suggestion.color === 'text-tiktok-red' ? 'bg-tiktok-red' : 'bg-gray-600'}`}></div>
                <div className="flex-1">
                  <div className={`text-base ${suggestion.color}`}>
                    {suggestion.text}
                  </div>
                  {suggestion.subtitle && (
                    <div className="flex items-center mt-1">
                      {suggestion.trending && (
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="mr-1">
                          <path d="M7 1L8.5 5.5L13 7L8.5 8.5L7 13L5.5 8.5L1 7L5.5 5.5L7 1Z" fill="currentColor" className="text-tiktok-gray-400" />
                        </svg>
                      )}
                      <span className="text-tiktok-gray-400 text-xs">{suggestion.subtitle}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverScreen;
