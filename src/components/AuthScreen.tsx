
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AuthScreenProps {
  onLogin: (user: any) => void;
}

interface User {
  id: string;
  username: string;
  email: string;
  bio: string;
  followers: number;
  following: number;
  likes: number;
  videos: any[];
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      // Login logic
      const users = JSON.parse(localStorage.getItem('tikTokUsers') || '[]');
      const user = users.find((u: User) => 
        (u.username === formData.username || u.email === formData.username) && 
        formData.password === 'password123' // Simple password for demo
      );
      
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        onLogin(user);
      } else {
        alert('Invalid credentials');
      }
    } else {
      // Signup logic
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      
      const users = JSON.parse(localStorage.getItem('tikTokUsers') || '[]');
      const existingUser = users.find((u: User) => 
        u.username === formData.username || u.email === formData.email
      );
      
      if (existingUser) {
        alert('Username or email already exists');
        return;
      }
      
      const newUser: User = {
        id: Date.now().toString(),
        username: formData.username,
        email: formData.email,
        bio: 'New TikTok creator ✨',
        followers: 0,
        following: 0,
        likes: 0,
        videos: []
      };
      
      users.push(newUser);
      localStorage.setItem('tikTokUsers', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      onLogin(newUser);
    }
  };

  return (
    <div className="min-h-screen bg-tiktok-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-tiktok-gray-900 border-tiktok-gray-800">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">
            {isLogin ? 'Log in to TikTok' : 'Sign up for TikTok'}
          </CardTitle>
          <CardDescription className="text-tiktok-gray-400">
            {isLogin ? 'Welcome back!' : 'Create your account to get started'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white">
                {isLogin ? 'Username or Email' : 'Username'}
              </Label>
              <Input
                id="username"
                type="text"
                placeholder={isLogin ? 'Enter username or email' : 'Choose a username'}
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className="bg-tiktok-gray-800 border-tiktok-gray-700 text-white placeholder-tiktok-gray-400"
                required
              />
            </div>
            
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="bg-tiktok-gray-800 border-tiktok-gray-700 text-white placeholder-tiktok-gray-400"
                  required
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="bg-tiktok-gray-800 border-tiktok-gray-700 text-white placeholder-tiktok-gray-400"
                required
              />
            </div>
            
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="bg-tiktok-gray-800 border-tiktok-gray-700 text-white placeholder-tiktok-gray-400"
                  required
                />
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-tiktok-red to-tiktok-pink hover:from-red-600 hover:to-pink-600"
            >
              {isLogin ? 'Log in' : 'Sign up'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-tiktok-gray-400 hover:text-white transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthScreen;
