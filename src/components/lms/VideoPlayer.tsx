"use client";

import { useState, useRef, useEffect } from "react";
import { Slider } from "@/components/ui/slider"; // Might need to check if Slider exists or use standard input range
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  src: string;
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
  className?: string;
}

export function VideoPlayer({ src, onProgress, onComplete, className }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Mock video for MVP (using a reliable BBB sample or similar if src provided is empty/mock)
  const videoSrc = src || "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => {
        setCurrentTime(video.currentTime);
        if (onProgress) {
            onProgress((video.currentTime / video.duration) * 100);
        }
    };
    
    const handleLoadedMetadata = () => setDuration(video.duration);
    const handleEnded = () => {
        setIsPlaying(false);
        if (onComplete) onComplete();
    };

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("ended", handleEnded);

    return () => {
       video.removeEventListener("timeupdate", updateTime);
       video.removeEventListener("loadedmetadata", handleLoadedMetadata);
       video.removeEventListener("ended", handleEnded);
    };
  }, [onProgress, onComplete]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
      if (videoRef.current) {
          videoRef.current.muted = !isMuted;
          setIsMuted(!isMuted);
      }
  };

  const handleSeek = (value: number[]) => {
      if (videoRef.current) {
          videoRef.current.currentTime = value[0];
          setCurrentTime(value[0]);
      }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div 
        className={cn("relative bg-black group aspect-video rounded-xl overflow-hidden shadow-2xl", className)}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Video Element */}
      <video 
        ref={videoRef}
        src={videoSrc}
        className="w-full h-full object-contain"
        onClick={togglePlay}
      />

      {/* Overlay Play Button (when paused) */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer" onClick={togglePlay}>
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-transform hover:scale-110">
                <Play className="w-8 h-8 text-white ml-1" />
            </div>
        </div>
      )}

      {/* Controls Bar */}
      <div className={cn(
          "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-12 transition-opacity duration-300",
          showControls ? "opacity-100" : "opacity-0"
      )}>
        {/* Progress Bar */}
        <div className="mb-4 group-hover:block">
            <Slider 
                value={[currentTime]} 
                max={duration} 
                step={1} 
                onValueChange={handleSeek}
                className="cursor-pointer"
            />
        </div>

        <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-4">
                <button onClick={togglePlay} className="hover:text-primary transition-colors">
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>
                
                <div className="flex items-center gap-2 group/volume relative">
                    <button onClick={toggleMute} className="hover:text-primary transition-colors">
                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                    {/* Volume Slider could go here */}
                </div>

                <div className="text-sm font-medium tabular-nums opacity-90">
                    {formatTime(currentTime)} / {formatTime(duration)}
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="hover:text-primary transition-colors hover:rotate-90 duration-300">
                    <Settings className="w-5 h-5" />
                </button>
                 <button className="hover:text-primary transition-colors">
                    <Maximize className="w-5 h-5" />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
