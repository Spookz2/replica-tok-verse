
import React from 'react';
import MobileVideoFeed from './MobileVideoFeed';
import MobileBottomNav from './MobileBottomNav';

const MobileTikTok = () => {
  return (
    <div className="h-screen flex flex-col bg-tiktok-black">
      <div className="flex-1 overflow-hidden">
        <MobileVideoFeed />
      </div>
      <MobileBottomNav />
    </div>
  );
};

export default MobileTikTok;
