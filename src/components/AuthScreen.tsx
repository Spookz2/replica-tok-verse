
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const AuthScreen = ({ onLogin }: { onLogin: (user: any) => void }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      
      const newUser = {
        id: Date.now(),
        username: formData.username,
        email: formData.email,
        avatar: '/placeholder.svg',
        followers: 0,
        following: 0,
        likes: 0
      };
      
      const existingUsers = JSON.parse(localStorage.getItem('tiktokUsers') || '[]');
      existingUsers.push(newUser);
      localStorage.setItem('tiktokUsers', JSON.stringify(existingUsers));
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      onLogin(newUser);
    } else {
      const existingUsers = JSON.parse(localStorage.getItem('tiktokUsers') || '[]');
      const user = existingUsers.find((u: any) => 
        (u.username === formData.username || u.email === formData.username) && 
        u.password === formData.password
      );
      
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        onLogin(user);
      } else {
        alert('Invalid credentials');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-tiktok-black via-tiktok-gray-900 to-tiktok-black flex flex-col">
      {/* Animated Banner */}
      <div className="relative h-32 bg-gradient-to-r from-tiktok-red via-tiktok-pink to-tiktok-red overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2">TikTok</h1>
            <p className="text-white/80 text-sm">Make Your Day</p>
          </div>
        </div>
        {/* Floating elements */}
        <div className="absolute top-4 left-8 w-3 h-3 bg-white/30 rounded-full animate-bounce"></div>
        <div className="absolute bottom-6 right-12 w-2 h-2 bg-white/40 rounded-full animate-ping"></div>
        <div className="absolute top-8 right-20 w-4 h-4 bg-white/20 rounded-full animate-pulse"></div>
      </div>

      {/* Form Container */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-tiktok-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-tiktok-gray-700">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              {isSignUp ? 'Join TikTok' : 'Welcome Back'}
            </h2>
            <p className="text-tiktok-gray-400">
              {isSignUp ? 'Create your account to get started' : 'Sign in to continue'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Username or Email"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className="w-full px-4 py-3 bg-tiktok-gray-700 border border-tiktok-gray-600 rounded-lg text-white placeholder-tiktok-gray-400 focus:outline-none focus:ring-2 focus:ring-tiktok-pink"
                required
              />
            </div>

            {isSignUp && (
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-tiktok-gray-700 border border-tiktok-gray-600 rounded-lg text-white placeholder-tiktok-gray-400 focus:outline-none focus:ring-2 focus:ring-tiktok-pink"
                  required
                />
              </div>
            )}

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-3 bg-tiktok-gray-700 border border-tiktok-gray-600 rounded-lg text-white placeholder-tiktok-gray-400 focus:outline-none focus:ring-2 focus:ring-tiktok-pink pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-tiktok-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {isSignUp && (
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full px-4 py-3 bg-tiktok-gray-700 border border-tiktok-gray-600 rounded-lg text-white placeholder-tiktok-gray-400 focus:outline-none focus:ring-2 focus:ring-tiktok-pink pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-tiktok-gray-400 hover:text-white"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-tiktok-red to-tiktok-pink text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-tiktok-pink hover:text-tiktok-red transition-colors"
            >
              {isSignUp 
                ? 'Already have an account? Sign In' 
                : "Don't have an account? Sign Up"
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
