import React, { useState } from 'react';
import { CLIENT_PARTNERS } from '../data/content';
import { ClientPartner } from '../types';

interface CollaborationsSectionProps {
  onSelectClient?: (client: ClientPartner) => void;
  onViewAll?: () => void;
}

export const CollaborationsSection: React.FC<CollaborationsSectionProps> = ({ onSelectClient, onViewAll }) => {
  const [activeClient, setActiveClient] = useState<string | null>(null);

  return (
    <section className="w-full max-w-[1440px] mx-auto py-16 md:py-24 px-6 md:px-16 bg-white dark:bg-[#080808] border-t border-neutral-100 dark:border-neutral-800 transition-colors duration-300">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-16">
        <div className="flex flex-col items-start max-w-[700px]">
          <span className="text-[12px] md:text-[13px] tracking-[0.25em] font-normal uppercase text-[#e38528] mb-4">
            [ COLLABORATIONS ]
          </span>
          <p className="text-[14px] md:text-[15px] leading-[1.65] font-light text-neutral-600 dark:text-neutral-400 max-w-[580px]">
            We are long-term brand custodians and trusted partners, going beyond expectations to protect and grow the brands we serve.
          </p>
        </div>

        <div>
          <button
            onClick={onViewAll}
            className="text-[12px] uppercase font-normal tracking-[0.2em] text-black dark:text-white border-b border-black dark:border-white pb-0.5 hover:text-[#e38528] hover:border-[#e38528] transition-colors cursor-pointer"
          >
            VIEW ALL
          </button>
        </div>
      </div>

      {/* 6 Client Cards Grid */}
      <div 
        onMouseLeave={() => setActiveClient(null)}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 md:gap-6 pt-4"
      >
        {CLIENT_PARTNERS.map((client) => {
          const isHovered = activeClient === client.id;
          const isDimmed = activeClient !== null && !isHovered;

          return (
            <div
              key={client.id}
              onMouseEnter={() => setActiveClient(client.id)}
              onClick={() => onSelectClient?.(client)}
              className={`flex flex-col group cursor-pointer transition-all duration-300 ease-out ${
                isDimmed ? 'opacity-20' : 'opacity-100'
              }`}
            >
              {/* Logo Frame */}
              <div className="h-[90px] w-full flex items-center justify-start border-b border-neutral-200 dark:border-neutral-800 pb-4 mb-4">
                <ClientLogoDisplay client={client} />
              </div>

              {/* Client description */}
              <p
                className={`text-[12px] leading-[1.65] font-light transition-colors duration-200 ${
                  isHovered ? 'text-black dark:text-white font-normal' : 'text-neutral-600 dark:text-neutral-400'
                }`}
              >
                {client.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

// Internal component to render clean stylized logos with image + SVG fallback
const ClientLogoDisplay: React.FC<{ client: ClientPartner }> = ({ client }) => {
  const [imgFailed, setImgFailed] = useState(false);

  if (!imgFailed) {
    return (
      <img
        src={client.logoUrl}
        alt={`${client.name} — ${client.category} partner of ANSH&CO brand custodianship and AI digital transformation services`}
        referrerPolicy="no-referrer"
        onError={() => setImgFailed(true)}
        className="max-h-[50px] max-w-[180px] object-contain transition-all duration-300"
      />
    );
  }

  // Fallback vector typographic emblem
  return (
    <div className="flex items-center gap-2">
      {client.id === 'kanpeki' && (
        <span className="text-[20px] font-bold tracking-[0.18em] uppercase text-black">
          KANPEKI
        </span>
      )}
      {client.id === 'cbtl' && (
        <div className="flex items-center gap-2 text-black">
          <div className="w-8 h-8 rounded-full border border-black flex items-center justify-center text-[8px] font-bold leading-none text-center">
            CBTL
          </div>
          <span className="text-[11px] font-medium tracking-tight uppercase leading-tight">
            The Coffee Bean<br />& Tea Leaf
          </span>
        </div>
      )}
      {client.id === 'wbd' && (
        <div className="flex items-center gap-2 text-black">
          <div className="w-7 h-8 border-2 border-black flex items-center justify-center font-bold text-[10px] rounded-b-md">
            WB
          </div>
          <span className="text-[11px] font-bold tracking-tight uppercase leading-tight">
            Warner Bros.<br />Discovery
          </span>
        </div>
      )}
      {client.id === 'bharatiyam' && (
        <span className="text-[18px] font-serif font-bold italic text-black">
          Bharatiyam
        </span>
      )}
      {client.id === 'tt-group' && (
        <span className="text-[22px] font-extrabold tracking-widest text-black">
          T&T
        </span>
      )}
      {client.id === 'disha' && (
        <span className="text-[18px] font-semibold tracking-wider text-black">
          DISHA
        </span>
      )}
    </div>
  );
};
