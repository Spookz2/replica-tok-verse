
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Copy } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface EditProfileScreenProps {
  onBack: () => void;
}

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ onBack }) => {
  const [currentUser, setCurrentUser] = useState<any>({});
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    bio: '',
    pronouns: ''
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setFormData({
        name: user.name || user.username || '',
        username: user.username || '',
        bio: user.bio || '',
        pronouns: user.pronouns || ''
      });
    }
  }, []);

  const handleSave = () => {
    const updatedUser = {
      ...currentUser,
      ...formData
    };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    onBack();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="h-full bg-tiktok-black text-white overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-tiktok-gray-800">
        <button onClick={onBack} className="p-2">
          <ChevronLeft size={24} className="text-white" />
        </button>
        <h1 className="text-xl font-bold">Edit profile</h1>
        <button onClick={handleSave} className="text-tiktok-red font-medium">
          Save
        </button>
      </div>

      <div className="p-6">
        {/* Profile Photo Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={currentUser.avatar || '/placeholder.svg'} />
              <AvatarFallback className="bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 text-white text-2xl">
                {currentUser.username?.[0]?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
          </div>
          <button className="text-tiktok-blue text-lg font-medium">
            Edit photo or avatar
          </button>
        </div>

        {/* About you section */}
        <div className="mb-8">
          <h2 className="text-tiktok-gray-400 text-lg font-medium mb-6">About you</h2>
          
          {/* Name Field */}
          <div className="flex items-center justify-between py-4 border-b border-tiktok-gray-800">
            <span className="text-white text-lg font-medium">Name</span>
            <div className="flex items-center">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="bg-transparent text-white text-right text-lg outline-none mr-2"
                placeholder="Enter name"
              />
              <ChevronRight size={20} className="text-tiktok-gray-400" />
            </div>
          </div>

          {/* Username Field */}
          <div className="flex items-center justify-between py-4 border-b border-tiktok-gray-800">
            <span className="text-white text-lg font-medium">Username</span>
            <div className="flex items-center">
              <input
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className="bg-transparent text-white text-right text-lg outline-none mr-2"
                placeholder="Enter username"
              />
              <ChevronRight size={20} className="text-tiktok-gray-400" />
            </div>
          </div>

          {/* TikTok URL */}
          <div className="flex items-center justify-center py-4 border-b border-tiktok-gray-800">
            <span className="text-tiktok-gray-400 text-base">tiktok.com/@{formData.username || 'username'}</span>
            <Copy size={16} className="text-tiktok-gray-400 ml-2" />
          </div>

          {/* Pronouns Field */}
          <div className="flex items-center justify-between py-4 border-b border-tiktok-gray-800">
            <span className="text-white text-lg font-medium">Pronouns</span>
            <div className="flex items-center">
              <input
                type="text"
                value={formData.pronouns}
                onChange={(e) => handleInputChange('pronouns', e.target.value)}
                className="bg-transparent text-tiktok-gray-400 text-right text-lg outline-none mr-2"
                placeholder="Add pronouns"
              />
              <ChevronRight size={20} className="text-tiktok-gray-400" />
            </div>
          </div>

          {/* Bio Field */}
          <div className="flex items-center justify-between py-4 border-b border-tiktok-gray-800">
            <span className="text-white text-lg font-medium">Bio</span>
            <div className="flex items-center">
              <input
                type="text"
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className="bg-transparent text-white text-right text-lg outline-none mr-2"
                placeholder="Add bio"
              />
              <ChevronRight size={20} className="text-tiktok-gray-400" />
            </div>
          </div>

          {/* Links Field */}
          <div className="flex items-center justify-between py-4 border-b border-tiktok-gray-800">
            <span className="text-white text-lg font-medium">Links</span>
            <ChevronRight size={20} className="text-tiktok-gray-400" />
          </div>

          {/* Fundraiser Field */}
          <div className="flex items-center justify-between py-4 border-b border-tiktok-gray-800">
            <span className="text-white text-lg font-medium">Fundraiser</span>
            <div className="flex items-center">
              <span className="text-tiktok-gray-400 text-base mr-2">Add fundraiser to your prof...</span>
              <ChevronRight size={20} className="text-tiktok-gray-400" />
            </div>
          </div>

          {/* AI Self Field */}
          <div className="flex items-center justify-between py-4">
            <span className="text-white text-lg font-medium">AI Self</span>
            <div className="flex items-center">
              <span className="text-white text-lg mr-2">Create AI Self</span>
              <ChevronRight size={20} className="text-tiktok-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileScreen;
