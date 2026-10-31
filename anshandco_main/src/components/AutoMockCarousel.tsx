import React, { useState, useEffect } from 'react';

export const MOCK_CAROUSEL_IMAGES = [
  'https://file.garden/aqpuSRZZW6ZbIllx/l1.jpg',
  'https://file.garden/aqpuSRZZW6ZbIllx/l2.jpg',
  'https://file.garden/aqpuSRZZW6ZbIllx/l3.jpg',
  'https://file.garden/aqpuSRZZW6ZbIllx/l4.jpg'
];

interface AutoMockCarouselProps {
  images?: string[];
  aspect?: string;
  className?: string;
  objectFit?: 'cover' | 'contain';
  interactive?: boolean;
  alt?: string;
  onClick?: () => void;
}

export const AutoMockCarousel: React.FC<AutoMockCarouselProps> = ({
  images = MOCK_CAROUSEL_IMAGES,
  aspect = 'aspect-[4/3] md:aspect-[1.15/1]',
  className = '',
  objectFit = 'cover',
  interactive = true,
  alt = 'ANSH&CO brand custodianship, AI services, and digital marketing showcase visual',
  onClick
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div
      onClick={onClick}
      className={`relative w-full ${aspect} bg-neutral-900 overflow-hidden cursor-pointer select-none transition-all duration-300 ease-out ${
        interactive ? 'transform hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/10 video-container-lift' : ''
      } ${className}`}
    >
      {images.map((src, index) => {
        const isActive = index === currentIndex;
        return (
          <img
            key={`${src}-${index}`}
            src={src}
            alt={`${alt} — Slide ${index + 1}`}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={(e) => {
              if (src.includes('m3.jpg')) {
                e.currentTarget.src = '/m3.jpg';
              } else if (src.includes('meme5.jpg')) {
                e.currentTarget.src = '/meme5.jpg';
              } else if (src.includes('m2.jpg')) {
                e.currentTarget.src = '/m2.jpg';
              } else if (src.includes('l1.jpg')) {
                e.currentTarget.src = '/m1.jpg';
              } else if (src.includes('l2.jpg')) {
                e.currentTarget.src = '/m2.jpg';
              } else if (src.includes('l3.jpg')) {
                e.currentTarget.src = '/m3.jpg';
              } else if (src.includes('l4.jpg')) {
                e.currentTarget.src = '/meme5.jpg';
              }
            }}
            className={`absolute inset-0 w-full h-full ${
              objectFit === 'contain' ? 'object-contain p-2 sm:p-4' : 'object-cover'
            } transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          />
        );
      })}
    </div>
  );
};
