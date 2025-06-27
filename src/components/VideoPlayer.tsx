
import React from 'react';

interface VideoPlayerProps {
  url: string;
  isActive: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, isActive }) => {
  return (
    <div className="relative w-full h-full bg-tiktok-gray-900 flex items-center justify-center">
      <img 
        src={url} 
        alt="Video placeholder" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-20" />
      
      {/* Video overlay elements */}
      <div className="absolute bottom-4 left-4 text-white">
        <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
          <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-1" />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
