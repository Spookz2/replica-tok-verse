
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Camera } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface EditProfileScreenProps {
  onBack: () => void;
}

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ onBack }) => {
  const [currentUser, setCurrentUser] = useState<any>({});
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    bio: '',
    avatar: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setFormData({
        username: user.username || '',
        name: user.name || '',
        bio: user.bio || '',
        avatar: user.avatar || ''
      });
    }
  }, []);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData(prev => ({ ...prev, avatar: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const updatedUser = { ...currentUser, ...formData };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    onBack();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="h-[100dvh] bg-tiktok-black text-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12">
        <button onClick={onBack}>
          <ChevronLeft size={24} className="text-white" />
        </button>
        <h1 className="text-lg font-semibold">Edit profile</h1>
        <button 
          onClick={handleSave}
          className="text-tiktok-red font-semibold"
        >
          Save
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Profile Picture */}
        <div className="flex justify-center py-6">
          <div className="relative">
            <Avatar className="w-24 h-24">
              <AvatarImage src={formData.avatar || '/placeholder.svg'} />
              <AvatarFallback className="bg-tiktok-gray-600 text-white text-2xl">
                {formData.username?.[0]?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-2 -right-2 w-8 h-8 bg-tiktok-red rounded-full flex items-center justify-center"
            >
              <Camera size={16} className="text-white" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
          </div>
        </div>

        {/* Form Fields */}
        <div className="px-4 space-y-6">
          {/* Username */}
          <div>
            <label className="block text-tiktok-gray-400 text-sm mb-2">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              className="w-full bg-tiktok-gray-800 text-white px-4 py-3 rounded-lg border-b border-tiktok-gray-700 focus:border-tiktok-red outline-none"
              placeholder="Username"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-tiktok-gray-400 text-sm mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full bg-tiktok-gray-800 text-white px-4 py-3 rounded-lg border-b border-tiktok-gray-700 focus:border-tiktok-red outline-none"
              placeholder="Name"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-tiktok-gray-400 text-sm mb-2">Bio</label>
            <div className="relative">
              <textarea
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className="w-full bg-tiktok-gray-800 text-white px-4 py-3 rounded-lg border-b border-tiktok-gray-700 focus:border-tiktok-red outline-none resize-none"
                placeholder="Add a bio to your profile"
                rows={3}
                maxLength={80}
              />
              <div className="absolute bottom-2 right-2 text-tiktok-gray-400 text-xs">
                {formData.bio.length}/80
              </div>
            </div>
          </div>

          {/* Social Links Section */}
          <div className="border-t border-tiktok-gray-800 pt-6">
            <h3 className="text-white font-medium mb-4">Social links</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-xs font-bold">IG</span>
                  </div>
                  <span className="text-white">Instagram</span>
                </div>
                <span className="text-tiktok-gray-400">Add</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-xs font-bold">YT</span>
                  </div>
                  <span className="text-white">YouTube</span>
                </div>
                <span className="text-tiktok-gray-400">Add</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileScreen;
