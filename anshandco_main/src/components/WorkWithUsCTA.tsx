import React, { useState } from 'react';

interface WorkWithUsCTAProps {
  onOpenContact: () => void;
}

export const WorkWithUsCTA: React.FC<WorkWithUsCTAProps> = ({ onOpenContact }) => {
  const [videoError, setVideoError] = useState(false);

  return (
    <section className="relative w-full max-w-[1440px] h-[520px] md:h-[500px] mx-auto overflow-hidden bg-black text-white flex items-center">
      {/* Background Video Stream */}
      <div className="absolute inset-0 z-0">
        {!videoError ? (
          <video
            src="https://file.garden/aqpuSRZZW6ZbIllx/main_video.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onError={() => setVideoError(true)}
            className="w-full h-full object-cover filter brightness-70"
          >
            <source src="https://file.garden/aqpuSRZZW6ZbIllx/main_video.mp4" type="video/mp4" />
            <source src="/main_video.mp4" type="video/mp4" />
          </video>
        ) : (
          <img
            src="/main_video-poster.jpg"
            alt="Partner with ANSH&CO for long-term brand custodianship, AI workflow automation, and full-stack digital growth"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter brightness-60"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/85" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full px-6 md:px-16 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
        {/* Left Headline */}
        <div className="max-w-[550px]">
          <h2 className="text-[34px] sm:text-[44px] md:text-[52px] leading-[1.05] font-light tracking-tight uppercase text-white select-none">
            WORK WITH US.<br />
            LET'S CREATE<br />
            SOMETHING BOLD.
          </h2>
        </div>

        {/* Right Action Pill */}
        <div className="flex flex-col gap-4 w-full sm:w-auto items-start lg:items-end">
          <button
            onClick={onOpenContact}
            className="w-full sm:w-[360px] md:w-[400px] h-[80px] md:h-[95px] rounded-full border border-white text-white text-[32px] md:text-[44px] font-light flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 cursor-pointer select-none"
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};
