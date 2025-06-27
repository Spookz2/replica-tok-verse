
import React, { useState } from 'react';
import { Heart, MessageCircle, Share, User, Plus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import CommentSection from './CommentSection';

interface Video {
  id: number;
  username: string;
  description: string;
  music: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  avatar?: string;
}

interface VideoControlsProps {
  video: Video;
  onLike: () => void;
  isMobile: boolean;
}

const VideoControls: React.FC<VideoControlsProps> = ({ video, onLike, isMobile }) => {
  const [showComments, setShowComments] = useState(false);
  
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  if (isMobile) {
    return (
      <>
        {/* Right side controls */}
        <div className="absolute right-4 bottom-20 flex flex-col items-center space-y-6">
          <div className="flex flex-col items-center">
            <Avatar className="w-12 h-12 border-2 border-white">
              <AvatarImage src={video.avatar} />
              <AvatarFallback className="bg-tiktok-gray-600 text-white">
                {video.username[1].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="w-6 h-6 bg-tiktok-red rounded-full flex items-center justify-center -mt-3 border-2 border-white">
              <Plus size={12} className="text-white" />
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <button 
              onClick={onLike}
              className={`w-12 h-12 rounded-full flex items-center justify-center mb-1 ${
                video.isLiked ? 'bg-tiktok-red' : 'bg-tiktok-gray-600'
              }`}
            >
              <Heart 
                size={24} 
                className={`${video.isLiked ? 'text-white fill-current' : 'text-white'}`} 
              />
            </button>
            <span className="text-white text-xs font-medium">{formatNumber(video.likes)}</span>
          </div>
          
          <div className="flex flex-col items-center">
            <button 
              onClick={() => setShowComments(true)}
              className="w-12 h-12 bg-tiktok-gray-600 rounded-full flex items-center justify-center mb-1"
            >
              <MessageCircle size={24} className="text-white" />
            </button>
            <span className="text-white text-xs font-medium">{formatNumber(video.comments)}</span>
          </div>
          
          <div className="flex flex-col items-center">
            <button className="w-12 h-12 bg-tiktok-gray-600 rounded-full flex items-center justify-center mb-1">
              <Share size={24} className="text-white" />
            </button>
            <span className="text-white text-xs font-medium">{formatNumber(video.shares)}</span>
          </div>
        </div>
        
        {/* Bottom info */}
        <div className="absolute bottom-4 left-4 right-20">
          <div className="mb-2">
            <span className="text-white font-bold text-lg">{video.username}</span>
          </div>
          <div className="mb-2">
            <p className="text-white text-sm">{video.description}</p>
          </div>
          <div className="flex items-center">
            <span className="text-white text-sm">♪ {video.music}</span>
          </div>
        </div>
        
        <CommentSection 
          isOpen={showComments} 
          onClose={() => setShowComments(false)} 
          videoId={video.id} 
        />
      </>
    );
  }

  // Desktop layout
  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
        <div className="flex justify-between items-end">
          <div className="flex-1">
            <div className="mb-2">
              <span className="text-white font-bold text-xl">{video.username}</span>
            </div>
            <div className="mb-2">
              <p className="text-white">{video.description}</p>
            </div>
            <div className="flex items-center mb-4">
              <span className="text-white text-sm">♪ {video.music}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 ml-8">
            <button 
              onClick={onLike}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                video.isLiked ? 'bg-tiktok-red' : 'bg-tiktok-gray-600'
              }`}
            >
              <Heart 
                size={20} 
                className={`${video.isLiked ? 'text-white fill-current' : 'text-white'}`} 
              />
              <span className="text-white text-sm font-medium">{formatNumber(video.likes)}</span>
            </button>
            
            <button 
              onClick={() => setShowComments(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-tiktok-gray-600 rounded-full"
            >
              <MessageCircle size={20} className="text-white" />
              <span className="text-white text-sm font-medium">{formatNumber(video.comments)}</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-tiktok-gray-600 rounded-full">
              <Share size={20} className="text-white" />
              <span className="text-white text-sm font-medium">{formatNumber(video.shares)}</span>
            </button>
          </div>
        </div>
      </div>
      
      <CommentSection 
        isOpen={showComments} 
        onClose={() => setShowComments(false)} 
        videoId={video.id} 
      />
    </>
  );
};

export default VideoControls;
