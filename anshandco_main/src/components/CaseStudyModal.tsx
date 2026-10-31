import React, { useState, useEffect, useRef, useMemo } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { CaseStudy } from '../types';

interface CaseStudyModalProps {
  study: CaseStudy | null;
  onClose: () => void;
  onOpenContact?: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ study, onClose, onOpenContact }) => {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Reset active media index when study changes
  useEffect(() => {
    setActiveMediaIndex(0);
  }, [study?.id]);

  // Extract gallery images unconditionally
  const galleryImages = useMemo(() => {
    if (!study) return [];
    if (study.gallery && study.gallery.length > 0) {
      return Array.from(new Set(study.gallery));
    }
    const list: string[] = [];
    if (study.mediaUrl) list.push(study.mediaUrl);
    if (study.posterUrl && !list.includes(study.posterUrl)) list.push(study.posterUrl);
    return list;
  }, [study]);

  // Continuous auto-transition for memes / image galleries when enlarged
  useEffect(() => {
    if (!study || study.mediaType === 'video' || galleryImages.length <= 1) return;

    const interval = setInterval(() => {
      setActiveMediaIndex((prev) => (prev + 1) % galleryImages.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [study, galleryImages.length]);

  // Automatically play video with sound when enlarged; fallback to quiet if browser blocks unmuted autoplay
  useEffect(() => {
    if (study?.mediaType === 'video' && videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.defaultMuted = false;
      videoRef.current.volume = 1;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback if browser policy blocks unmuted autoplay without previous user gesture
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => {});
          }
        });
      }
    }
  }, [study]);

  // Keyboard navigation: Left/Right arrows to cycle memes, Escape to close
  useEffect(() => {
    if (!study) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (galleryImages.length > 1) {
        if (e.key === 'ArrowRight' || e.key === ' ') {
          e.preventDefault();
          setActiveMediaIndex((prev) => (prev + 1) % galleryImages.length);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          setActiveMediaIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [study, galleryImages.length, onClose]);

  if (!study) return null;

  const handleImageFallback = (e: React.SyntheticEvent<HTMLImageElement, Event>, src: string) => {
    const target = e.currentTarget;
    if (src.includes('m1.jpg') || study.id === 'showcase-extension-1') {
      target.src = '/m1.jpg';
    } else if (src.includes('m2.jpg')) {
      target.src = '/m2.jpg';
    } else if (src.includes('m3.jpg') || study.id === 'showcase-extension-2') {
      target.src = '/m3.jpg';
    } else if (src.includes('meme1.jpg') || study.id === 'roots-and-sky') {
      target.src = '/meme1.jpg';
    } else if (src.includes('meme2.jpg') || study.id === 'otr-make-it-yours') {
      target.src = '/meme2.jpg';
    } else if (src.includes('meme5.jpg')) {
      target.src = '/meme5.jpg';
    } else if (src.includes('l1.jpg') || study.id === 'our-mocks') {
      target.src = '/m1.jpg';
    } else if (src.includes('l2.jpg')) {
      target.src = '/m2.jpg';
    } else if (src.includes('l3.jpg')) {
      target.src = '/m3.jpg';
    } else if (src.includes('l4.jpg')) {
      target.src = '/meme5.jpg';
    } else {
      target.src = `https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80&sig=${study.fallbackSig}`;
    }
  };

  const getVideoSources = () => {
    if (study.id === 'cubic') {
      return ['https://file.garden/aqpuSRZZW6ZbIllx/meme3.mp4', '/meme3.mp4'];
    }
    if (study.id === 'goodhairr-co-professional') {
      return ['https://file.garden/aqpuSRZZW6ZbIllx/Liquid_chrome_logo_reveal.mp4', '/liquid-chrome-logo-reveal.mp4'];
    }
    if (study.id === 'ruru') {
      return ['https://file.garden/aqpuSRZZW6ZbIllx/anshandco_logo.mp4', '/our-reveal.mp4'];
    }
    if (study.id === 'showcase-extension-3') {
      return ['https://file.garden/aqpuSRZZW6ZbIllx/feature_video.mp4', '/feature_video.mp4'];
    }
    if (study.id === 'makimono') {
      return ['https://file.garden/aqpuSRZZW6ZbIllx/feature_video2.mp4', '/feature_video2.mp4'];
    }
    return [study.mediaUrl, '/our-reveal.mp4'];
  };

  const handleMediaClick = () => {
    if (galleryImages.length > 1) {
      setActiveMediaIndex((prev) => (prev + 1) % galleryImages.length);
    }
  };

  const handleVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.muted) {
        videoRef.current.muted = false;
        videoRef.current.volume = 1;
        videoRef.current.play().catch(() => {});
      } else {
        if (videoRef.current.paused) {
          videoRef.current.play().catch(() => {});
        } else {
          videoRef.current.pause();
        }
      }
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[960px] bg-white dark:bg-[#121212] text-black dark:text-white shadow-2xl max-h-[92vh] overflow-y-auto border border-transparent dark:border-neutral-800 transition-colors"
      >
        {/* Circular Close Button in Top-Right matching screenshot */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/70 hover:bg-black text-white hover:scale-105 transition-all shadow-xl cursor-pointer"
          aria-label="Close modal"
          title="Close modal"
        >
          <X size={20} />
        </button>

        {/* Media Frame (Top): Complete height from top to bottom (matching Image 3), zero padding, smooth continuous transition */}
        <div className="relative w-full bg-neutral-950 flex items-center justify-center p-0 h-[480px] sm:h-[560px] md:h-[640px] overflow-hidden">
          {study.mediaType === 'video' ? (
            <video
              ref={videoRef}
              controls
              autoPlay
              loop
              playsInline
              poster={study.posterUrl}
              onClick={handleVideoClick}
              onError={() => {
                if (videoRef.current) {
                  const sources = getVideoSources();
                  if (sources.length > 1 && videoRef.current.src !== sources[1]) {
                    videoRef.current.src = sources[1];
                    videoRef.current.play().catch(() => {});
                  }
                }
              }}
              className="w-full h-full object-contain mx-auto block bg-black rounded-none cursor-pointer"
            >
              {getVideoSources().map((src, sIdx) => (
                <source key={sIdx} src={src} type="video/mp4" />
              ))}
            </video>
          ) : (
            <div
              onClick={handleMediaClick}
              className={`relative flex items-center justify-center w-full h-full ${
                galleryImages.length > 1 ? 'cursor-pointer' : 'cursor-default'
              }`}
              title={galleryImages.length > 1 ? 'Click to view next meme' : undefined}
            >
              {galleryImages.map((src, idx) => {
                const isActive = idx === activeMediaIndex;
                return (
                  <img
                    key={`${src}-${idx}`}
                    src={src}
                    alt={`${study.title} — ${study.client} case study by ANSH&CO brand custodianship and AI services studio (${idx + 1} of ${galleryImages.length})`}
                    referrerPolicy="no-referrer"
                    onError={(e) => handleImageFallback(e, src)}
                    className={`w-full h-full object-contain mx-auto shadow-2xl transition-opacity duration-1000 ease-in-out select-none rounded-none block ${
                      isActive ? 'opacity-100 relative z-10' : 'opacity-0 absolute inset-0 pointer-events-none z-0'
                    }`}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Content Body (Bottom): Clean section */}
        <div className="p-6 sm:p-8 md:p-12 flex flex-col gap-6 bg-white dark:bg-[#121212] transition-colors">
          {/* Header Row: Client tag & external link */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
            <div>
              <span className="text-[12px] font-medium tracking-[0.2em] uppercase text-[#e38528]">
                {study.client}
              </span>
              <h2 className="text-[28px] sm:text-[34px] md:text-[40px] font-light uppercase tracking-tight text-black dark:text-white mt-1 leading-tight">
                {study.title}
              </h2>
            </div>
            <div className="flex flex-col sm:items-end gap-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onOpenContact) {
                    onOpenContact();
                  }
                }}
                className="text-[12px] uppercase font-normal tracking-[0.15em] text-neutral-600 dark:text-neutral-400 hover:text-[#e38528] dark:hover:text-[#e38528] flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <span>anshandco.com</span>
                <ExternalLink size={14} />
              </button>
              {study.id === 'showcase-extension-1' && (
                <a
                  href="https://wa.me/917668422047?text=Hi%20ANSH%26CO%2C%20my%20website%20is%20slow%20or%20not%20converting%20traffic%20into%20sales.%20I%20want%20a%20free%20speed%20and%20conversion%20audit."
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Fix your slow website and boost sales with ANSH&CO Next.js engineering"
                  className="inline-flex items-center text-[11px] font-mono uppercase tracking-[0.15em] text-black dark:text-white hover:opacity-70 transition-opacity w-fit"
                >
                  FIX SPEED →
                </a>
              )}
              {study.id === 'showcase-extension-3' && (
                <a
                  href="https://wa.me/917668422047?text=Hi%20ANSH%26CO%2C%20I%20want%20to%20automate%20our%20lead%20capture%20and%20CRM%20workflow."
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Automate your business workflows and CRM pipeline with ANSH&CO"
                  className="inline-flex items-center text-[11px] font-mono uppercase tracking-[0.15em] text-black dark:text-white hover:opacity-70 transition-opacity w-fit"
                >
                  AUTOMATE WORKFLOW →
                </a>
              )}
              {study.id === 'otr-make-it-yours' && (
                <a
                  href="https://wa.me/917668422047?text=Hi%20ANSH%26CO%2C%20we%20have%20raw%20footage%20and%20want%20to%20scale%20with%20viral%20reels%20and%20video%20production."
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Transform raw footage into viral reels with ANSH&CO video production"
                  className="inline-flex items-center text-[11px] font-mono uppercase tracking-[0.15em] text-black dark:text-white hover:opacity-70 transition-opacity w-fit"
                >
                  GO VIRAL →
                </a>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {study.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[12px] font-light text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 rounded-none"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Narrative Summary */}
          <p className="text-[15px] leading-[1.8] font-light text-neutral-700 dark:text-neutral-300">
            {study.summary}
          </p>

          {/* Deliverables / Timeline / Outcome & Impact Grid */}
          {study.fullDetails && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-neutral-100 dark:border-neutral-800">
              <div>
                <h4 className="text-[11px] font-medium tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500 mb-2">
                  Key Deliverables
                </h4>
                <ul className="text-[13px] font-light text-neutral-600 dark:text-neutral-400 flex flex-col gap-1.5">
                  {study.fullDetails.deliverables.map((deliv, idx) => (
                    <li key={idx}>· {deliv}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-[11px] font-medium tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500 mb-2">
                  Timeline
                </h4>
                <p className="text-[13px] font-light text-neutral-600 dark:text-neutral-400">
                  {study.fullDetails.timeline}
                </p>
              </div>

              <div>
                <h4 className="text-[11px] font-medium tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500 mb-2">
                  Outcome &amp; Impact
                </h4>
                <p className="text-[13px] font-light text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {study.fullDetails.impact}
                </p>
              </div>
            </div>
          )}

          {/* Footer Action: CLOSE Button in bottom right */}
          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-2.5 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 text-[12px] font-medium uppercase tracking-wider transition-colors cursor-pointer"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
