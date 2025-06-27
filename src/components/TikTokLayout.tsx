
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileTikTok from './mobile/MobileTikTok';
import DesktopTikTok from './desktop/DesktopTikTok';

const TikTokLayout = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-tiktok-black">
      {isMobile ? <MobileTikTok /> : <DesktopTikTok />}
    </div>
  );
};

export default TikTokLayout;
