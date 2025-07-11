
import React, { useState, useRef, useEffect } from 'react';
import VideoPlayer from '../VideoPlayer';
import VideoControls from '../VideoControls';

const mockVideos = [
  {
    id: 1,
    url: '/placeholder.svg',
    username: '@creativecoder',
    description: 'Building the next viral app 🚀 #coding #programming #webdev',
    music: 'Original sound - creativecoder',
    likes: 125400,
    comments: 2340,
    shares: 891,
    isLiked: false,
    avatar: '/placeholder.svg'
  },
  {
    id: 2,
    url: '/placeholder.svg',
    username: '@designqueen',
    description: 'UI/UX tips that changed my life ✨ #design #ui #ux #tips',
    music: 'Aesthetic Vibes - LoFi',
    likes: 89200,
    comments: 1567,
    shares: 456,
    isLiked: true,
    avatar: '/placeholder.svg'
  },
  {
    id: 3,
    url: '/placeholder.svg',
    username: '@techguru',
    description: 'React tricks you NEED to know 🔥 #react #javascript #frontend',
    music: 'Tech House Beats - DJ Mix',
    likes: 203400,
    comments: 4521,
    shares: 1234,
    isLiked: false,
    avatar: '/placeholder.svg'
  }
];

const MobileVideoFeed = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videos, setVideos] = useState(mockVideos);
  const [activeTab, setActiveTab] = useState('For You');
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const currentY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    currentY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    const deltaY = startY.current - currentY.current;
    
    if (Math.abs(deltaY) > 50) {
      if (deltaY > 0 && currentIndex < videos.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else if (deltaY < 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  const handleLike = (videoId: number) => {
    setVideos(videos.map(video => 
      video.id === videoId 
        ? { 
            ...video, 
            isLiked: !video.isLiked, 
            likes: video.isLiked ? video.likes - 1 : video.likes + 1 
          }
        : video
    ));
  };

  const currentVideo = videos[currentIndex];

  return (
    <div 
      ref={containerRef}
      className="h-[100dvh] relative overflow-hidden bg-black"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Simple 2020 TikTok-style top nav */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-transparent">
        <div className="flex items-center justify-center pt-12 pb-4 px-4">
          <div className="flex items-center space-x-8">
            <button 
              onClick={() => setActiveTab('Following')}
              className={`text-lg font-medium ${activeTab === 'Following' ? 'text-white' : 'text-gray-400'}`}
            >
              Following
            </button>
            <button 
              onClick={() => setActiveTab('For You')}
              className={`text-lg font-bold ${activeTab === 'For You' ? 'text-white border-b-2 border-white pb-1' : 'text-gray-400'}`}
            >
              For You
            </button>
          </div>
        </div>
      </div>
      
      <div 
        className="h-full flex flex-col transition-transform duration-300 ease-out"
        style={{ transform: `translateY(-${currentIndex * 100}%)` }}
      >
        {videos.map((video, index) => (
          <div key={video.id} className="h-full flex-shrink-0 relative">
            <VideoPlayer 
              url={video.url}
              isActive={index === currentIndex}
            />
            <VideoControls 
              video={video}
              onLike={() => handleLike(video.id)}
              isMobile={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileVideoFeed;
