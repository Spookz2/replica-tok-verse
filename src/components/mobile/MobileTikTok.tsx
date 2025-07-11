
import React, { useState } from 'react';
import MobileVideoFeed from './MobileVideoFeed';
import MobileBottomNav from './MobileBottomNav';
import InboxScreen from '../InboxScreen';
import ProfileScreen from '../ProfileScreen';
import DiscoverScreen from '../DiscoverScreen';
import CreateScreen from '../CreateScreen';

const MobileTikTok = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <MobileVideoFeed />;
      case 'discover':
        return <DiscoverScreen onBack={() => setActiveTab('home')} />;
      case 'inbox':
        return <InboxScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'create':
        return <CreateScreen onBack={() => setActiveTab('home')} />;
      default:
        return <MobileVideoFeed />;
    }
  };

  return (
    <div className="h-[100dvh] flex flex-col bg-tiktok-black overflow-hidden">
      <div className="flex-1 overflow-hidden">
        {renderScreen()}
      </div>
      {(activeTab === 'home' || activeTab === 'discover' || activeTab === 'inbox' || activeTab === 'profile') && (
        <div className="absolute bottom-0 left-0 right-0">
          <MobileBottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      )}
    </div>
  );
};

export default MobileTikTok;
