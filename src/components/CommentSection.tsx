
import React, { useState } from 'react';
import { X, Heart, MessageCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Comment {
  id: number;
  username: string;
  text: string;
  likes: number;
  timestamp: string;
  avatar?: string;
  isLiked: boolean;
}

interface CommentSectionProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ isOpen, onClose, videoId }) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      username: 'user123',
      text: 'This is amazing! 🔥',
      likes: 45,
      timestamp: '2h',
      isLiked: false
    },
    {
      id: 2,
      username: 'creativeguru',
      text: 'Love this content! Keep it up 👍',
      likes: 23,
      timestamp: '4h',
      isLiked: true
    },
    {
      id: 3,
      username: 'designlover',
      text: 'How did you do this effect?',
      likes: 12,
      timestamp: '6h',
      isLiked: false
    }
  ]);
  
  const [newComment, setNewComment] = useState('');
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  const handleAddComment = () => {
    if (newComment.trim() && currentUser.username) {
      const comment: Comment = {
        id: Date.now(),
        username: currentUser.username,
        text: newComment,
        likes: 0,
        timestamp: 'now',
        isLiked: false
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  const handleLikeComment = (commentId: number) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { 
            ...comment, 
            isLiked: !comment.isLiked, 
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1 
          }
        : comment
    ));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center sm:justify-center">
      <div className="bg-tiktok-black w-full h-[70vh] sm:w-96 sm:h-[80vh] sm:rounded-t-2xl rounded-t-2xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-tiktok-gray-800">
          <span className="text-white font-semibold">Comments</span>
          <button onClick={onClose} className="text-tiktok-gray-400">
            <X size={24} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={comment.avatar} />
                <AvatarFallback className="bg-tiktok-gray-600 text-white text-xs">
                  {comment.username[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-white font-medium text-sm">{comment.username}</span>
                  <span className="text-tiktok-gray-400 text-xs">{comment.timestamp}</span>
                </div>
                <p className="text-white text-sm mb-2">{comment.text}</p>
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => handleLikeComment(comment.id)}
                    className="flex items-center space-x-1"
                  >
                    <Heart 
                      size={14} 
                      className={`${comment.isLiked ? 'text-tiktok-red fill-current' : 'text-tiktok-gray-400'}`} 
                    />
                    <span className="text-tiktok-gray-400 text-xs">{comment.likes}</span>
                  </button>
                  <button className="text-tiktok-gray-400 text-xs">Reply</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-tiktok-gray-800">
          <div className="flex space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-tiktok-gray-600 text-white text-xs">
                {currentUser.username ? currentUser.username[0].toUpperCase() : 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 flex space-x-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 bg-tiktok-gray-800 text-white px-3 py-2 rounded-full text-sm placeholder-tiktok-gray-400 focus:outline-none"
                onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
              />
              <button 
                onClick={handleAddComment}
                className="text-tiktok-red font-medium text-sm px-3"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
