
import React, { useState } from 'react';
import { Camera, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoFeedProps {
  id: string;
  name: string;
  source: string;
  hasAlert?: boolean;
  className?: string;
}

const VideoFeed: React.FC<VideoFeedProps> = ({ 
  id,
  name,
  source,
  hasAlert = false,
  className
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={cn("video-feed group", className)}>
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-security-background/80 z-10">
          <Camera className="w-10 h-10 text-security-foreground/50 mb-2" />
          <p className="text-sm text-security-foreground/70">Loading feed...</p>
        </div>
      )}
      
      <video 
        src={source} 
        onLoadedData={() => setIsLoading(false)}
        autoPlay 
        muted 
        loop 
        className="w-full h-full object-cover"
      />
      
      {hasAlert && (
        <div className="absolute top-2 right-2 z-20">
          <div className="bg-security-alert rounded-full p-1 animate-pulse-alert">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>
      )}
      
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="font-medium text-sm">{name}</p>
        <p className="text-xs text-security-foreground/70">ID: {id}</p>
      </div>
    </div>
  );
};

export default VideoFeed;
