
import React, { useState, useEffect } from 'react';
import { Plus, Star, Lock, Repeat, Share2, Heart, Grid3X3, Bookmark, UserPlus, Menu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import EditProfileScreen from './EditProfileScreen';

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState('videos');
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>({});
  
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, [showEditProfile]); // Refresh when edit screen closes
  
  const userVideos = [
    { id: 1, thumbnail: '/placeholder.svg', views: '7,381' },
    { id: 2, thumbnail: '/placeholder.svg', views: '10.2K' },
    { id: 3, thumbnail: '/placeholder.svg', views: '6,316' },
    { id: 4, thumbnail: '/placeholder.svg', views: '2.1K' },
    { id: 5, thumbnail: '/placeholder.svg', views: '8.7K' },
    { id: 6, thumbnail: '/placeholder.svg', views: '3.4K' }
  ];

  const tabs = [
    { id: 'videos', icon: Grid3X3, label: 'Videos' },
    { id: 'private', icon: Lock, label: 'Private' },
    { id: 'reposts', icon: Repeat, label: 'Reposts' },
    { id: 'liked', icon: Heart, label: 'Liked' },
    { id: 'bookmarks', icon: Bookmark, label: 'Bookmarks' }
  ];

  if (showEditProfile) {
    return <EditProfileScreen onBack={() => setShowEditProfile(false)} />;
  }

  return (
    <div className="h-full bg-tiktok-black text-white overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <UserPlus size={24} className="text-white" />
        </div>
        <div className="flex items-center space-x-4">
          <Star size={24} className="text-white" />
          <Share2 size={24} className="text-white" />
          <Menu size={24} className="text-white" />
        </div>
      </div>

      {/* Profile Info */}
      <div className="flex flex-col items-center px-4 pb-6">
        {/* Avatar */}
        <div className="relative mb-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src={currentUser.avatar || '/placeholder.svg'} />
            <AvatarFallback className="bg-tiktok-gray-600 text-white text-2xl">
              {currentUser.username?.[0]?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-tiktok-blue rounded-full flex items-center justify-center">
            <Plus size={16} className="text-white" />
          </div>
        </div>

        {/* Username */}
        <h1 className="text-xl font-bold mb-2">@{currentUser.username || 'user'}</h1>

        {/* Stats */}
        <div className="flex items-center space-x-8 mb-4">
          <div className="text-center">
            <div className="text-xl font-bold">39</div>
            <div className="text-tiktok-gray-400 text-sm">Following</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold">146</div>
            <div className="text-tiktok-gray-400 text-sm">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold">2,032</div>
            <div className="text-tiktok-gray-400 text-sm">Likes</div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-center text-tiktok-gray-300 mb-4">
          {currentUser.bio || `main acc @${currentUser.username || 'user'}wtf`}
        </p>

        {/* Action Buttons */}
        <div className="flex space-x-3 mb-6">
          <div className="flex items-center space-x-2 bg-tiktok-gray-800 px-4 py-2 rounded-lg">
            <Star size={16} className="text-tiktok-red" />
            <span className="text-white font-medium">9+</span>
          </div>
          <button 
            onClick={() => setShowEditProfile(true)}
            className="bg-tiktok-gray-800 px-6 py-2 rounded-lg"
          >
            <span className="text-white font-medium">Edit</span>
          </button>
        </div>

        {/* TikTok Studio Button */}
        <button className="flex items-center space-x-2 bg-tiktok-gray-800 px-4 py-2 rounded-lg">
          <div className="w-4 h-4 bg-tiktok-red rounded-full"></div>
          <span className="text-white font-medium">TikTok Studio</span>
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center border-b border-tiktok-gray-800 mb-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center py-3 px-4 ${
                activeTab === tab.id ? 'border-b-2 border-white' : ''
              }`}
            >
              <Icon size={20} className={activeTab === tab.id ? 'text-white' : 'text-tiktok-gray-400'} />
            </button>
          );
        })}
      </div>

      {/* Video Grid */}
      <div className="px-4">
        <div className="grid grid-cols-3 gap-1">
          {userVideos.map((video) => (
            <div key={video.id} className="aspect-square bg-tiktok-gray-800 rounded-lg overflow-hidden relative">
              <img 
                src={video.thumbnail} 
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 flex items-center space-x-1">
                <div className="w-4 h-4 bg-black bg-opacity-50 rounded flex items-center justify-center">
                  <span className="text-white text-xs">▶</span>
                </div>
                <span className="text-white text-xs font-medium">{video.views}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
