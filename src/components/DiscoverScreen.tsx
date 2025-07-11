
import React, { useState } from 'react';
import { ChevronLeft, Search, Mic, X, Clock, RefreshCw } from 'lucide-react';

interface DiscoverScreenProps {
  onBack: () => void;
}

const DiscoverScreen: React.FC<DiscoverScreenProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const recentSearches = [
    { text: 'lightskin', isUser: false },
    { text: 'iyezarchive', isUser: true },
    { text: 'iyezwtf', isUser: true },
    { text: 'elijahfoxfir333 look', isUser: false }
  ];

  const suggestions = [
    { text: 'iyezarchive', subtitle: 'Recent search', color: 'text-tiktok-red' },
    { text: 'maryelee24 twitter', color: 'text-tiktok-red' },
    { text: 'nfs lightskin girls', subtitle: 'Recent search', color: 'text-gray-400' },
    { text: 'lancey or lancey', color: 'text-gray-400' },
    { text: 'Duke Dennis Passed Out On Stream', subtitle: 'Trending', color: 'text-gray-400', trending: true },
    { text: 'break right thru jaydes', color: 'text-gray-400' },
    { text: 'latinas', color: 'text-gray-400' },
    { text: 'Ddg Gets Caught Lacking In Baltimore', subtitle: 'Trending', color: 'text-gray-400', trending: true },
    { text: 'Why Was Huda From Love Island US...', subtitle: 'Trending', color: 'text-gray-400', trending: true }
  ];

  return (
    <div className="h-full bg-tiktok-black text-white">
      {/* Header */}
      <div className="flex items-center p-4 space-x-3">
        <button onClick={onBack}>
          <ChevronLeft size={24} className="text-white" />
        </button>
        
        {/* Search Bar */}
        <div className="flex-1 relative">
          <div className="bg-tiktok-gray-700 rounded-full flex items-center px-4 py-2">
            <Search size={20} className="text-tiktok-gray-400 mr-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="iyezarchive"
              className="flex-1 bg-transparent text-white outline-none placeholder-tiktok-gray-400"
            />
            <Mic size={20} className="text-white ml-3" />
          </div>
        </div>
        
        <button className="text-tiktok-red font-medium text-lg">
          Search
        </button>
      </div>

      {/* Recent Searches */}
      <div className="px-4 mb-6">
        {recentSearches.map((search, index) => (
          <div key={index} className="flex items-center justify-between py-3">
            <div className="flex items-center">
              <Clock size={20} className="text-tiktok-gray-400 mr-3" />
              <span className="text-white text-lg">{search.text}</span>
              {search.isUser && (
                <div className="w-4 h-4 bg-tiktok-red rounded-full ml-2 flex items-center justify-center">
                  <div className="w-2 h-3 bg-white rounded-sm"></div>
                </div>
              )}
            </div>
            <X size={20} className="text-tiktok-gray-400" />
          </div>
        ))}
        
        <div className="flex justify-center py-4">
          <button className="text-tiktok-gray-400 text-base">
            See more <span className="ml-1">⌄</span>
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-tiktok-gray-800 mx-4 mb-6"></div>

      {/* You may like section */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-xl font-medium">You may like</h2>
          <div className="flex items-center">
            <RefreshCw size={16} className="text-tiktok-gray-400 mr-1" />
            <span className="text-tiktok-gray-400 text-sm">Refresh</span>
          </div>
        </div>

        {/* Suggestions */}
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-4 ${suggestion.color === 'text-tiktok-red' ? 'bg-tiktok-red' : 'bg-gray-600'}`}></div>
              <div className="flex-1">
                <div className={`text-lg ${suggestion.color}`}>
                  {suggestion.text}
                </div>
                {suggestion.subtitle && (
                  <div className="flex items-center mt-1">
                    {suggestion.trending && (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mr-1">
                        <path d="M7 1L8.5 5.5L13 7L8.5 8.5L7 13L5.5 8.5L1 7L5.5 5.5L7 1Z" fill="currentColor" className="text-tiktok-gray-400" />
                      </svg>
                    )}
                    <span className="text-tiktok-gray-400 text-sm">{suggestion.subtitle}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscoverScreen;
