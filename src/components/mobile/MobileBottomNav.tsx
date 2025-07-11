
import React, { useState } from 'react';
import { Home, Search, Plus, MessageCircle, User } from 'lucide-react';

interface MobileBottomNavProps {
  onTabChange: (tab: string) => void;
  activeTab: string;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onTabChange, activeTab }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'discover', icon: Search, label: 'Discover' },
    { id: 'create', icon: Plus, label: 'Create', isSpecial: true },
    { id: 'inbox', icon: MessageCircle, label: 'Inbox' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <div className="bg-tiktok-black border-t border-tiktok-gray-800 px-4 py-2">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          if (item.isSpecial) {
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className="relative"
              >
                <div className="w-12 h-8 bg-gradient-to-r from-tiktok-red to-tiktok-pink rounded-lg flex items-center justify-center">
                  <Icon size={20} className="text-white" />
                </div>
              </button>
            );
          }
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center py-1 ${
                isActive ? 'text-white' : 'text-tiktok-gray-400'
              }`}
            >
              <Icon size={24} />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;
