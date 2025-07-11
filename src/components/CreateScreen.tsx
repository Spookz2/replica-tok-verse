
import React, { useState, useRef, useEffect } from 'react';
import { X, RotateCcw, Music, Sparkles, Timer, MoreHorizontal, ArrowDown } from 'lucide-react';

interface CreateScreenProps {
  onBack: () => void;
}

const CreateScreen: React.FC<CreateScreenProps> = ({ onBack }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState('60s');
  const [selectedMode, setSelectedMode] = useState('PHOTO');

  useEffect(() => {
    // Access front camera
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
          audio: true
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const durations = ['10m', '60s', '15s'];
  const modes = ['PHOTO', 'TEXT'];

  return (
    <div className="h-full bg-black relative overflow-hidden">
      {/* Camera Feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover"
      />

      {/* Top Controls */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 pt-12">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="p-2">
            <X size={24} className="text-white" />
          </button>
          
          <div className="bg-tiktok-gray-700 rounded-full px-4 py-2 flex items-center">
            <Music size={16} className="text-white mr-2" />
            <span className="text-white text-sm font-medium">Add sound</span>
          </div>
          
          <button className="p-2">
            <RotateCcw size={24} className="text-white" />
          </button>
        </div>
      </div>

      {/* Right Side Controls */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-6">
        <button className="w-12 h-12 bg-black bg-opacity-30 rounded-full flex items-center justify-center">
          <X size={24} className="text-white" />
        </button>
        
        <button className="w-12 h-12 bg-black bg-opacity-30 rounded-full flex items-center justify-center">
          <Timer size={24} className="text-white" />
        </button>
        
        <button className="w-12 h-12 bg-black bg-opacity-30 rounded-full flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-white rounded"></div>
        </button>
        
        <button className="w-12 h-12 bg-black bg-opacity-30 rounded-full flex items-center justify-center">
          <ArrowDown size={24} className="text-white" />
        </button>
        
        <button className="w-12 h-12 bg-black bg-opacity-30 rounded-full flex items-center justify-center">
          <Sparkles size={24} className="text-white" />
        </button>
        
        <button className="w-12 h-12 bg-black bg-opacity-30 rounded-full flex items-center justify-center">
          <ArrowDown size={24} className="text-white" />
        </button>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        {/* Duration Selection */}
        <div className="flex justify-center mb-6">
          {durations.map((duration) => (
            <button
              key={duration}
              onClick={() => setSelectedDuration(duration)}
              className={`px-4 py-2 mx-1 text-sm ${
                selectedDuration === duration 
                  ? 'text-white' 
                  : 'text-tiktok-gray-400'
              }`}
            >
              {duration}
            </button>
          ))}
          {modes.map((mode) => (
            <button
              key={mode}
              onClick={() => setSelectedMode(mode)}
              className={`px-4 py-2 mx-1 text-sm rounded-full ${
                selectedMode === mode 
                  ? 'bg-white text-black' 
                  : 'text-white'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Bottom Bar with Record Button */}
        <div className="flex items-center justify-between">
          {/* Left - Recent Photo */}
          <div className="w-12 h-12 rounded-lg overflow-hidden">
            <img 
              src="/placeholder.svg" 
              alt="Recent" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Center - Record Button */}
          <button
            onMouseDown={() => setIsRecording(true)}
            onMouseUp={() => setIsRecording(false)}
            onTouchStart={() => setIsRecording(true)}
            onTouchEnd={() => setIsRecording(false)}
            className={`w-20 h-20 rounded-full border-4 border-white flex items-center justify-center transition-all ${
              isRecording ? 'bg-tiktok-red scale-95' : 'bg-transparent'
            }`}
          >
            <div className={`w-12 h-12 rounded-full ${isRecording ? 'bg-white' : 'bg-tiktok-red'}`}></div>
          </button>

          {/* Right - Gallery */}
          <div className="w-12 h-12 rounded-lg overflow-hidden">
            <img 
              src="/placeholder.svg" 
              alt="Gallery" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Mode Selection */}
        <div className="flex justify-center mt-6 space-x-12">
          <button className="text-white text-lg font-medium">POST</button>
          <button className="text-tiktok-gray-400 text-lg font-medium">CREATE</button>
          <button className="text-tiktok-gray-400 text-lg font-medium">LIVE</button>
        </div>
      </div>
    </div>
  );
};

export default CreateScreen;
