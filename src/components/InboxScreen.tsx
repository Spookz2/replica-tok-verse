
import React from 'react';
import { Bell, Users, Archive, ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const InboxScreen = () => {
  const conversations = [
    {
      id: 1,
      username: "'abuxkksAB...",
      message: "Yall gon pmo what...",
      time: "5m",
      avatar: "/placeholder.svg",
      hasStory: true,
      isOnline: false
    },
    {
      id: 2,
      username: "THE2NDAZ...",
      message: "I love you Amaya pa...",
      time: "12m",
      avatar: "/placeholder.svg",
      hasStory: true,
      isOnline: true
    }
  ];

  const notifications = [
    {
      id: 1,
      type: 'followers',
      icon: Users,
      title: 'New followers',
      description: 'ghazzal started following you...',
      time: '2h',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      type: 'activity',
      icon: Bell,
      title: 'Activity',
      description: 'Nejapot Ratana commented: [...]',
      time: '4h',
      color: 'bg-pink-500'
    },
    {
      id: 3,
      type: 'system',
      icon: Archive,
      title: 'System notifications',
      description: 'Account updates: Syste...',
      time: '58m',
      color: 'bg-gray-600'
    }
  ];

  return (
    <div className="h-[100dvh] bg-tiktok-black text-white overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-tiktok-gray-800 pt-12">
        <h1 className="text-xl font-bold text-center">Inbox</h1>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Story/Chat Section */}
        <div className="p-4">
          <div className="flex space-x-4 mb-6">
            {/* Create Story */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-tiktok-gray-700 rounded-full flex items-center justify-center relative">
                <div className="w-6 h-6 bg-tiktok-red rounded-full flex items-center justify-center absolute -bottom-1 -right-1">
                  <span className="text-white text-xs">+</span>
                </div>
              </div>
              <span className="text-xs mt-2 text-tiktok-gray-300">Create</span>
            </div>

            {/* Chat Conversations - Bigger profiles */}
            {conversations.map((conv) => (
              <div key={conv.id} className="flex flex-col items-center">
                <div className={`w-20 h-20 rounded-full p-0.5 ${conv.hasStory ? 'bg-gradient-to-r from-tiktok-pink to-tiktok-red' : ''}`}>
                  <Avatar className="w-full h-full">
                    <AvatarImage src={conv.avatar} />
                    <AvatarFallback className="bg-tiktok-gray-600 text-white text-lg">
                      {conv.username[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {conv.isOnline && (
                    <div className="w-5 h-5 bg-green-500 rounded-full border-2 border-tiktok-black absolute -bottom-1 -right-1"></div>
                  )}
                </div>
                <span className="text-xs mt-2 text-tiktok-gray-300 max-w-20 truncate">{conv.username}</span>
                <div className="bg-tiktok-gray-700 rounded-lg px-3 py-1.5 mt-1 max-w-24">
                  <span className="text-xs text-white">{conv.message}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="px-4 space-y-4">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <div key={notification.id} className="flex items-center space-x-3 py-3">
                <div className={`w-12 h-12 ${notification.color} rounded-full flex items-center justify-center`}>
                  <Icon size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium">{notification.title}</h3>
                  <p className="text-tiktok-gray-400 text-sm">{notification.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-tiktok-gray-400 text-sm">{notification.time}</span>
                  <ChevronRight size={16} className="text-tiktok-gray-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InboxScreen;
