
import React, { useState } from 'react';
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
  }
];

const DesktopVideoFeed = () => {
  const [videos, setVideos] = useState(mockVideos);

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

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-lg mx-auto py-8">
        {videos.map((video) => (
          <div key={video.id} className="mb-8 bg-tiktok-gray-900 rounded-lg overflow-hidden">
            <div className="relative">
              <VideoPlayer url={video.url} isActive={true} />
              <VideoControls 
                video={video}
                onLike={() => handleLike(video.id)}
                isMobile={false}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesktopVideoFeed;
