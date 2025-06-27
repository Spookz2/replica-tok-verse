
import React from 'react';
import DesktopSidebar from './DesktopSidebar';
import DesktopVideoFeed from './DesktopVideoFeed';

const DesktopTikTok = () => {
  return (
    <div className="h-screen flex bg-tiktok-black">
      <DesktopSidebar />
      <div className="flex-1 overflow-hidden">
        <DesktopVideoFeed />
      </div>
    </div>
  );
};

export default DesktopTikTok;
