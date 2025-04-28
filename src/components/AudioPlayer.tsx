
import React, { useRef, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Headphones, Play, Pause, Volume2, SkipBack, SkipForward, Loader2 } from 'lucide-react';

interface AudioPlayerProps {
  audioUrl: string | null;
  isLoading: boolean;
  title: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, isLoading, title }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    // Reset player state when audio changes
    if (audioUrl) {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
      
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [audioUrl]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      const current = audio.currentTime;
      const duration = audio.duration;
      setCurrentTime(current);
      setProgress((current / duration) * 100);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    
    const value = parseFloat(e.target.value);
    const time = (value / 100) * duration;
    
    audioRef.current.currentTime = time;
    setProgress(value);
    setCurrentTime(time);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <Card className="bg-podcast-gray border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Headphones className="h-5 w-5 text-podcast-green" />
            <span>AI Podcast</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-36 space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-podcast-purple" />
          <p className="text-podcast-lightGray">Generating audio...</p>
        </CardContent>
      </Card>
    );
  }

  if (!audioUrl) {
    return (
      <Card className="bg-podcast-gray border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Headphones className="h-5 w-5 text-podcast-green" />
            <span>AI Podcast</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-36">
          <p className="text-podcast-lightGray">Generate a podcast to listen</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-podcast-gray border-none shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Headphones className="h-5 w-5 text-podcast-green" />
          <span>AI Podcast</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="text-white font-medium truncate">
            {title || "AI Generated Podcast"}
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-podcast-lightGray">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              className="flex-grow mx-2 h-1 bg-podcast-gray audio-player-progress"
              style={{ 
                background: `linear-gradient(to right, #8758FF ${progress}%, #2C2C2C ${progress}%)` 
              }}
            />
            <span className="text-xs text-podcast-lightGray">{formatTime(duration)}</span>
          </div>
          
          <div className="flex items-center justify-center space-x-4">
            <Button variant="ghost" size="icon" className="text-podcast-lightGray hover:text-white hover:bg-podcast-gray">
              <SkipBack className="h-5 w-5" />
            </Button>
            
            <Button
              onClick={togglePlayPause}
              variant="outline"
              size="icon"
              className="rounded-full bg-podcast-purple text-white hover:bg-podcast-purple hover:bg-opacity-80 border-none w-10 h-10"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            
            <Button variant="ghost" size="icon" className="text-podcast-lightGray hover:text-white hover:bg-podcast-gray">
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>
          
          <audio ref={audioRef} src={audioUrl} preload="metadata" />
        </div>
      </CardContent>
    </Card>
  );
};

export default AudioPlayer;
