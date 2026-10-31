import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

export const HeroVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [scale, setScale] = useState(1);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    // Start video playback quietly on initial mount
    const timer = setTimeout(() => {
      setHasEntered(true);
      if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.play().catch(() => {});
      }
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isMuted) {
        // Automatically play sound when clicked
        videoRef.current.muted = false;
        videoRef.current.volume = 1;
        setIsMuted(false);
        videoRef.current.play().catch(() => {});
      } else {
        togglePlay();
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = Math.max(0, Math.min(1, 1 - rect.top / windowHeight));
        setScale(1 + progress * 0.12);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="w-full pt-[90px] md:pt-[110px] pb-8 md:pb-14 bg-white dark:bg-[#080808] transition-colors duration-300">
      <div
        ref={containerRef}
        className={`relative w-full max-w-[1300px] h-[480px] sm:h-[650px] md:h-[880px] mx-auto px-4 md:px-8 overflow-hidden group animate-hero-fade-in-up transition-opacity duration-700 ${
          hasEntered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="w-full h-full relative overflow-hidden bg-black">
          <video
            ref={videoRef}
            id="hero-video"
            src="/hero-vid.mp4"
            poster="/anshandco-poster.jpg"
            onClick={handleVideoClick}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="auto"
            title={isMuted ? 'Click to play with sound' : 'Click to pause'}
            onCanPlay={() => {
              if (videoRef.current && isPlaying) {
                videoRef.current.play().catch(() => {});
              }
            }}
            onError={(e) => {
              const video = e.currentTarget;
              if (!video.src.includes('1778852713264-hero-vid.mp4')) {
                video.src = 'https://pub-a23acf44682e42368d7e030f3e6be365.r2.dev/1778852713264-hero-vid.mp4';
                video.play().catch(() => {});
              } else if (!video.src.endsWith('/hero-vid.mp4')) {
                video.src = '/hero-vid.mp4';
                video.play().catch(() => {});
              }
            }}
            style={{ transform: `scale(${scale})` }}
            className="w-full h-full object-cover transition-transform duration-200 ease-out"
          >
            <source
              src="/hero-vid.mp4"
              type="video/mp4"
            />
            <source
              src="https://pub-a23acf44682e42368d7e030f3e6be365.r2.dev/1778852713264-hero-vid.mp4"
              type="video/mp4"
            />
          </video>

          {/* Interactive controls */}
          <div className="absolute bottom-6 right-6 flex items-center gap-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={togglePlay}
              className="p-3 rounded-full bg-black/60 text-white backdrop-blur-sm hover:bg-black transition-colors"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <button
              onClick={toggleMute}
              className="p-3 rounded-full bg-black/60 text-white backdrop-blur-sm hover:bg-black transition-colors"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
