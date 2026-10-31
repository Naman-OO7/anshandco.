import React from 'react';
import { X, ExternalLink, Award, Calendar, Tag } from 'lucide-react';
import { NewsUpdate } from '../types';

interface NewsModalProps {
  update: NewsUpdate | null;
  onClose: () => void;
  onOpenContact?: () => void;
}

export const NewsModal: React.FC<NewsModalProps> = ({ update, onClose, onOpenContact }) => {
  if (!update) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-[840px] bg-white dark:bg-[#121212] text-black dark:text-white shadow-2xl max-h-[92vh] overflow-y-auto p-6 sm:p-10 md:p-12 border border-transparent dark:border-neutral-800 transition-colors">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2 text-neutral-500 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={22} />
        </button>

        {/* Category & Date */}
        <div className="flex items-center gap-3 text-[12px] text-neutral-500 dark:text-neutral-400 font-light mb-4">
          <span className="flex items-center gap-1.5 text-[#e38528] font-medium">
            <Tag size={13} />
            {update.category}
          </span>
          <span>·</span>
          <span className="flex items-center gap-1.5">
            <Calendar size={13} />
            {update.date}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-[26px] md:text-[36px] font-light uppercase tracking-tight text-black dark:text-white leading-tight mb-6">
          {update.title}
        </h2>

        {/* High-Resolution Visual Artwork / Article Graphic */}
        <div className="w-full bg-neutral-950 flex items-center justify-center mb-8 p-3 sm:p-6 overflow-hidden border border-neutral-200 dark:border-neutral-800">
          <img
            src={update.imageUrl}
            alt={`${update.title} — ${update.category} recognition for ANSH&CO brand custodianship and AI engineering studio`}
            onError={(e) => {
              if (update.id === 'ibda-2026') {
                e.currentTarget.src = '/news/ibda.jpg';
              } else if (update.id === 'switzerland-india-80') {
                e.currentTarget.src = '/news/swiss.jpg';
              } else if (update.id === 'best-places-to-work') {
                e.currentTarget.src = '/news/bptw.jpg';
              }
            }}
            className="max-h-[46vh] max-w-full w-auto h-auto object-contain mx-auto shadow-xl block"
          />
        </div>

        {/* Distinction Badge */}
        {update.badge && (
          <div className="mb-6 p-4 bg-neutral-50 dark:bg-neutral-800/60 border-l-2 border-[#e38528] flex items-center gap-3">
            <Award size={18} className="text-[#e38528] flex-shrink-0" />
            <span className="text-[12px] font-mono tracking-wider uppercase text-neutral-800 dark:text-neutral-200">
              {update.badge}
            </span>
          </div>
        )}

        {/* Body content */}
        <div className="flex flex-col gap-4 text-[15px] leading-[1.8] font-light text-neutral-700 dark:text-neutral-300">
          <p className="font-normal text-black dark:text-white text-[16px]">
            {update.summary}
          </p>
          <p>
            At ANSH&amp;CO., our philosophy has always been centered around the delicate union of purpose, humanity, and creative fearlessness. Recognition from esteemed juries and international institutions reinforces our commitment to crafting identities that stand the test of time and drive genuine cultural relevance.
          </p>
          <p>
            We celebrate this achievement alongside our valued client partners who entrust us with their brand legacies every single day.
          </p>
        </div>

        {/* Footer actions */}
        <div className="pt-8 mt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              onClose();
              if (onOpenContact) {
                onOpenContact();
              }
            }}
            className="text-[12px] uppercase font-normal tracking-[0.15em] text-black dark:text-white hover:text-[#e38528] dark:hover:text-[#e38528] flex items-center gap-1.5 border-b border-black dark:border-white pb-0.5 cursor-pointer transition-colors"
          >
            <span>Read on anshandco.com</span>
            <ExternalLink size={14} />
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2 border border-black dark:border-white bg-black dark:bg-white text-white dark:text-black text-[12px] uppercase tracking-wider hover:bg-transparent dark:hover:bg-transparent hover:text-black dark:hover:text-white transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
