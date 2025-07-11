
import React, { useState, useRef, useEffect } from 'react';
import { X, FlipHorizontal, Timer, Volume2, Music, Sparkles } from 'lucide-react';

interface CreateScreenProps {
  onBack: () => void;
}

const CreateScreen: React.FC<CreateScreenProps> = ({ onBack }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    // Initialize camera
    const initCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
          audio: true
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (error) {
        console.log('Camera access denied');
      }
    };

    initCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="h-[100dvh] bg-black relative overflow-hidden">
      {/* Camera feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover"
      />

      {/* Top controls */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 pt-12">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="w-8 h-8 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
            <X size={20} className="text-white" />
          </button>
          
          <div className="flex items-center space-x-3">
            <button className="w-8 h-8 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
              <Timer size={18} className="text-white" />
            </button>
            <button className="w-8 h-8 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
              <Volume2 size={18} className="text-white" />
            </button>
            <button className="w-8 h-8 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
              <FlipHorizontal size={18} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Side controls */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 space-y-6">
        <button className="w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
          <Sparkles size={24} className="text-white" />
        </button>
        <button className="w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
          <Music size={24} className="text-white" />
        </button>
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-8 left-0 right-0 z-20 px-4">
        <div className="flex items-center justify-center space-x-12">
          <button className="text-white font-medium">
            Templates
          </button>
          
          {/* Record button */}
          <button 
            onClick={toggleRecording}
            className={`w-20 h-20 rounded-full border-4 border-white flex items-center justify-center ${
              isRecording ? 'bg-tiktok-red' : 'bg-transparent'
            }`}
          >
            <div className={`w-12 h-12 rounded-full ${
              isRecording ? 'bg-white' : 'bg-tiktok-red'
            }`}></div>
          </button>
          
          <button className="text-white font-medium">
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateScreen;
