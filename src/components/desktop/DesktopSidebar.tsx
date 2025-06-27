
import React, { useState } from 'react';
import { Home, Search, Plus, User } from 'lucide-react';

const DesktopSidebar = () => {
  const [activeItem, setActiveItem] = useState('home');

  const menuItems = [
    { id: 'home', icon: Home, label: 'For You' },
    { id: 'following', icon: User, label: 'Following' },
    { id: 'discover', icon: Search, label: 'Discover' },
  ];

  return (
    <div className="w-64 bg-tiktok-black border-r border-tiktok-gray-800 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white">TikTok</h1>
      </div>
      
      <nav className="flex-1 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg mb-2 text-left transition-colors ${
                isActive 
                  ? 'bg-tiktok-gray-800 text-white' 
                  : 'text-tiktok-gray-400 hover:bg-tiktok-gray-900 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
        
        <button className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg mb-2 text-left bg-gradient-to-r from-tiktok-red to-tiktok-pink text-white font-medium">
          <Plus size={20} />
          <span>Upload</span>
        </button>
      </nav>
      
      <div className="p-3">
        <button className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-tiktok-gray-400 hover:bg-tiktok-gray-900 hover:text-white">
          <User size={20} />
          <span>Profile</span>
        </button>
      </div>
    </div>
  );
};

export default DesktopSidebar;
