import React, { useState } from 'react';

export const BrandReelDivider: React.FC = () => {
  const [videoError, setVideoError] = useState(false);

  return (
    <section className="w-full max-w-[1440px] mx-auto py-4 md:py-10 px-4 md:px-12 bg-white dark:bg-[#080808] overflow-hidden transition-colors duration-300">
      <div className="w-full h-[400px] sm:h-[580px] md:h-[800px] lg:h-[950px] relative overflow-hidden bg-white dark:bg-[#080808] flex items-center justify-center">
        {!videoError ? (
          <video
            src="https://file.garden/aqpuSRZZW6ZbIllx/main_video.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onError={(e) => {
              const video = e.currentTarget;
              if (!video.src.endsWith('/main_video.mp4')) {
                video.src = '/main_video.mp4';
                video.play().catch(() => {});
                return;
              }
              setVideoError(true);
            }}
            className="w-full h-full object-contain md:object-cover"
          >
            <source
              src="https://file.garden/aqpuSRZZW6ZbIllx/main_video.mp4"
              type="video/mp4"
            />
            <source
              src="/main_video.mp4"
              type="video/mp4"
            />
          </video>
        ) : (
          <img
            src="/main_video-poster.jpg"
            alt="ANSH&CO brand custodianship, AI workflow automation, and creative motion studio showcase reel"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </section>
  );
};
