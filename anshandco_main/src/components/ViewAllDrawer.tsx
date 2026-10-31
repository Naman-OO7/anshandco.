import React, { useState, useEffect } from 'react';
import { X, ExternalLink, ArrowRight } from 'lucide-react';
import { CASE_STUDIES, CLIENT_PARTNERS } from '../data/content';
import { CaseStudy, NewsUpdate, ClientPartner } from '../types';

interface ViewAllDrawerProps {
  isOpen: boolean;
  initialTab?: string;
  onClose: () => void;
  onSelectCaseStudy: (study: CaseStudy) => void;
  onSelectNews?: (news: NewsUpdate) => void;
}

const CASE_STUDY_SECONDARY_IMAGES: Record<string, string> = {
  'showcase-extension-1': 'https://file.garden/aqpuSRZZW6ZbIllx/m2.jpg',
  'roots-and-sky': 'https://file.garden/aqpuSRZZW6ZbIllx/meme5.jpg',
  'otr-make-it-yours': 'https://file.garden/aqpuSRZZW6ZbIllx/m3.jpg',
  'showcase-extension-2': 'https://file.garden/aqpuSRZZW6ZbIllx/m2.jpg',
  'our-mocks': 'https://file.garden/aqpuSRZZW6ZbIllx/l2.jpg',
};

const CASE_STUDY_SECONDARY_FALLBACKS: Record<string, string> = {
  'showcase-extension-1': '/m2.jpg',
  'roots-and-sky': '/meme5.jpg',
  'otr-make-it-yours': '/m3.jpg',
  'showcase-extension-2': '/m2.jpg',
  'our-mocks': '/l2.jpg',
};

export const ViewAllDrawer: React.FC<ViewAllDrawerProps> = ({
  isOpen,
  initialTab = 'works',
  onClose,
  onSelectCaseStudy,
}) => {
  const [activeTab, setActiveTab] = useState<'works' | 'clients'>(initialTab === 'clients' ? 'clients' : 'works');

  useEffect(() => {
    setActiveTab(initialTab === 'clients' ? 'clients' : 'works');
  }, [initialTab]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-[1140px] bg-white dark:bg-[#121212] text-black dark:text-white p-6 sm:p-10 md:p-12 shadow-2xl max-h-[92vh] overflow-y-auto border border-transparent dark:border-neutral-800 transition-colors">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-neutral-500 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors cursor-pointer"
          aria-label="Close drawer"
        >
          <X size={22} />
        </button>

        <div className="mb-8">
          <span className="text-[12px] tracking-[0.25em] font-mono uppercase text-[#e38528] mb-2 block">
            [ DIRECTORY ARCHIVE ]
          </span>
          <div className="flex items-center gap-6 mt-4 border-b border-neutral-200 dark:border-neutral-800 pb-3">
            <button
              onClick={() => setActiveTab('works')}
              className={`text-[13px] sm:text-[14px] uppercase tracking-wider pb-2 font-medium transition-colors cursor-pointer -mb-[14px] ${
                activeTab === 'works'
                  ? 'text-black dark:text-white border-b-2 border-black dark:border-white font-semibold'
                  : 'text-neutral-400 dark:text-neutral-500 hover:text-black dark:hover:text-white'
              }`}
            >
              MEME STUDIES ({CASE_STUDIES.length})
            </button>
            <button
              onClick={() => setActiveTab('clients')}
              className={`text-[13px] sm:text-[14px] uppercase tracking-wider pb-2 font-medium transition-colors cursor-pointer -mb-[14px] ${
                activeTab === 'clients'
                  ? 'text-black dark:text-white border-b-2 border-black dark:border-white font-semibold'
                  : 'text-neutral-400 dark:text-neutral-500 hover:text-black dark:hover:text-white'
              }`}
            >
              CLIENT PARTNERS ({CLIENT_PARTNERS.length})
            </button>
          </div>
        </div>

        {/* Tab 1: Meme Studies Grid */}
        {activeTab === 'works' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CASE_STUDIES.map((study) => {
              const secondaryImg =
                (study.gallery && study.gallery.length > 1 ? study.gallery[1] : null) ||
                CASE_STUDY_SECONDARY_IMAGES[study.id] ||
                (study.id === 'roots-and-sky' ? '/meme5.jpg' : null) ||
                (study.id === 'otr-make-it-yours' ? '/m3.jpg' : null) ||
                (study.id === 'showcase-extension-1' ? '/m2.jpg' : null) ||
                study.posterUrl;
              const fallbackSec = CASE_STUDY_SECONDARY_FALLBACKS[study.id] || '/m2.jpg';

              return (
                <div
                  key={study.id}
                  onClick={() => {
                    onClose();
                    onSelectCaseStudy(study);
                  }}
                  className="border border-neutral-200 dark:border-neutral-800 p-4 hover:border-black dark:hover:border-neutral-400 transition-all duration-300 cursor-pointer group bg-neutral-50/40 dark:bg-[#181818]/60 hover:bg-white dark:hover:bg-[#1c1c1c] hover:shadow-lg"
                >
                  <div className="w-full aspect-video bg-neutral-900 overflow-hidden mb-3 relative rounded-none">
                    {/* Primary Cover Image - Fades out on hover */}
                    <img
                      src={study.posterUrl}
                      alt={`${study.title} — ${study.client} case study by ANSH&CO brand custodianship and AI services`}
                      onError={(e) => {
                        if (study.id === 'showcase-extension-1') {
                          e.currentTarget.src = '/m1.jpg';
                        } else if (study.id === 'roots-and-sky') {
                          e.currentTarget.src = '/meme1.jpg';
                        } else if (study.id === 'otr-make-it-yours') {
                          e.currentTarget.src = '/meme2.jpg';
                        }
                      }}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 group-hover:opacity-0 transition-all duration-700 ease-in-out"
                    />

                    {/* Secondary Image - Cross-fades in on hover */}
                    <img
                      src={secondaryImg}
                      alt={`${study.title} — interactive preview of ANSH&CO brand custodianship and AI workflow solutions`}
                      onError={(e) => {
                        e.currentTarget.src = fallbackSec;
                      }}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out"
                    />

                    {/* Subtle Dark Gradient & Hover Indicator */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out pointer-events-none" />
                  </div>
                  <span className="text-[11px] text-[#e38528] uppercase font-mono font-medium">
                    {study.client}
                  </span>
                  <h4 className="text-[15px] font-medium text-black dark:text-white mt-1 mb-2 group-hover:text-[#e38528] transition-colors uppercase tracking-tight">
                    {study.title}
                  </h4>
                  <p className="text-[12px] text-neutral-600 dark:text-neutral-400 line-clamp-3 font-light leading-relaxed">
                    {study.summary}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Client Partners Grid */}
        {activeTab === 'clients' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CLIENT_PARTNERS.map((client) => (
              <div
                key={client.id}
                className="border border-neutral-200 dark:border-neutral-800 p-6 flex flex-col justify-between bg-neutral-50/50 dark:bg-[#181818]/60 hover:border-black dark:hover:border-neutral-400 hover:bg-white dark:hover:bg-[#1c1c1c] transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                      PARTNER 0{client.fallbackSig}
                    </span>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#e38528]">
                      {client.category}
                    </span>
                  </div>

                  <div className="h-14 flex items-center mb-4">
                    {client.logoUrl ? (
                      <img
                        src={client.logoUrl}
                        alt={`${client.name} — ${client.category} brand custodianship and AI services partner of ANSH&CO`}
                        className="max-h-10 max-w-[160px] object-contain dark:brightness-125"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : null}
                    <h4 className="text-[18px] font-medium tracking-tight text-black dark:text-white uppercase">
                      {client.name}
                    </h4>
                  </div>

                  <p className="text-[13px] text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                    {client.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-neutral-200/60 dark:border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
                  <span>ENTERPRISE RETAINER</span>
                  <span className="text-[#e38528]">ACTIVE CLIENT</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
