
import React, { useState } from 'react';
import MobileVideoFeed from './MobileVideoFeed';
import MobileBottomNav from './MobileBottomNav';
import InboxScreen from '../InboxScreen';
import ProfileScreen from '../ProfileScreen';

const MobileTikTok = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <MobileVideoFeed />;
      case 'discover':
        return <MobileVideoFeed />;
      case 'inbox':
        return <InboxScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'create':
        return <div className="flex-1 bg-tiktok-black flex items-center justify-center">
          <p className="text-white text-lg">Create Screen Coming Soon</p>
        </div>;
      default:
        return <MobileVideoFeed />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-tiktok-black">
      <div className="flex-1 overflow-hidden">
        {renderScreen()}
      </div>
      <MobileBottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default MobileTikTok;
