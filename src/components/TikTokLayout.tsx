
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileTikTok from './mobile/MobileTikTok';
import DesktopTikTok from './desktop/DesktopTikTok';
import AuthScreen from './AuthScreen';

const TikTokLayout = () => {
  const isMobile = useIsMobile();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (user: any) => {
    setCurrentUser(user);
  };

  if (!currentUser) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-tiktok-black">
      {isMobile ? <MobileTikTok /> : <DesktopTikTok />}
    </div>
  );
};

export default TikTokLayout;
