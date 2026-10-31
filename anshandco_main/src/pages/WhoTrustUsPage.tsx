import React from 'react';
import { ArrowRight, Star, ExternalLink, ShieldCheck, Award } from 'lucide-react';
import { CLIENT_PARTNERS } from '../data/content';
import { ClientPartner } from '../types';

interface WhoTrustUsPageProps {
  onOpenContact: () => void;
  onSelectClient?: (client: ClientPartner) => void;
  onNavigateToWhatWeAre: () => void;
}

export const WhoTrustUsPage: React.FC<WhoTrustUsPageProps> = ({
  onOpenContact,
  onSelectClient,
  onNavigateToWhatWeAre
}) => {
  const [hoveredPartnerId, setHoveredPartnerId] = React.useState<string | null>(null);
  const testimonials = [
    {
      quote: "ANSH&CO acted as true brand custodians from day one. They didn't just design packaging for Kanpeki—they helped us establish a presence that set the benchmark across the entire luxury skincare landscape.",
      clientName: "Kanpeki Leadership Team",
      category: "Luxury Skincare & Wellness"
    },
    {
      quote: "Launching in the Maldives and driving our expansion across India required a partner who understood both global brand equity and nuanced regional culture. ANSH&CO delivered flawlessly.",
      clientName: "The Coffee Bean & Tea Leaf",
      category: "Global Hospitality & F&B"
    },
    {
      quote: "Their multidisciplinary ability to bridge bold cinematic creativity with disciplined technical execution is rare. Every deliverable feels considered, sharp, and impactful.",
      clientName: "Media & Entertainment Partner",
      category: "Broadcast & Digital Networks"
    }
  ];

  const metrics = [
    { value: '6+ YRS', label: 'Average Partnership Tenure' },
    { value: '50+', label: 'Flagship Brands Built & Scaled' },
    { value: '100%', label: 'Long-Term Custodian Dedication' },
    { value: 'Top 1%', label: 'Workplace & Creative Benchmark' }
  ];

  return (
    <div className="w-full pt-[120px] pb-24 px-6 md:px-16 max-w-[1440px] mx-auto animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="max-w-[1000px] mb-16">
        <span className="text-[12px] md:text-[13px] tracking-[0.25em] font-normal uppercase text-[#e38528] mb-4 block">
          [ WHO TRUST US? ]
        </span>
        <h1 className="text-[44px] sm:text-[60px] md:text-[76px] lg:text-[84px] leading-[0.98] font-extralight uppercase text-black dark:text-white tracking-tight mb-8">
          LONG-TERM CUSTODIANS. <br />
          <span className="font-normal">TRUSTED ALLIANCES.</span>
        </h1>
        <p className="text-[18px] md:text-[22px] font-light text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-[800px]">
          We don't take on hundreds of transactional jobs. We forge deep, lasting partnerships with visionary founders and enterprise leaders who demand category distinction.
        </p>
      </div>

      {/* Trust Metrics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-12 border-y border-neutral-200 dark:border-neutral-800 mb-20">
        {metrics.map((m, idx) => (
          <div key={idx} className="flex flex-col">
            <span className="text-[36px] md:text-[48px] font-light tracking-tight text-black dark:text-white">
              {m.value}
            </span>
            <span className="text-[12px] font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mt-1">
              {m.label}
            </span>
          </div>
        ))}
      </div>

      {/* Featured Client Roster Grid */}
      <div className="mb-20">
        <div className="mb-10 pb-4 border-b border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[12px] font-mono tracking-widest text-[#e38528] uppercase block mb-1">
              STRATEGIC ALLIANCES
            </span>
            <h2 className="text-[32px] md:text-[40px] font-light uppercase tracking-tight text-black dark:text-white">
              Brands That Trust ANSH&amp;CO
            </h2>
          </div>
          <p className="text-[14px] text-neutral-600 dark:text-neutral-400 font-light max-w-[400px]">
            From multinational conglomerates and global entertainment networks to bespoke luxury houses.
          </p>
        </div>

        <div 
          onMouseLeave={() => setHoveredPartnerId(null)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {CLIENT_PARTNERS.map((partner) => {
            const isHovered = hoveredPartnerId === partner.id;
            const isDimmed = hoveredPartnerId !== null && !isHovered;

            return (
              <div
                key={partner.id}
                onMouseEnter={() => setHoveredPartnerId(partner.id)}
                onClick={() => onSelectClient && onSelectClient(partner)}
                className={`p-8 border bg-white dark:bg-[#121212] flex flex-col justify-between cursor-pointer group transition-all duration-300 ease-out ${
                  isHovered
                    ? 'border-black dark:border-white opacity-100'
                    : isDimmed
                    ? 'border-neutral-200 dark:border-neutral-800 opacity-20'
                    : 'border-neutral-200 dark:border-neutral-800 opacity-100 hover:border-black dark:hover:border-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                      PARTNER 0{partner.fallbackSig}
                    </span>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#e38528]">
                      {partner.category}
                    </span>
                  </div>

                  <div className="h-16 flex items-center mb-6">
                    {partner.logoUrl ? (
                      <img
                        src={partner.logoUrl}
                        alt={`${partner.name} — ${partner.category} enterprise partner trusting ANSH&CO for brand custodianship and AI services`}
                        className="max-h-12 max-w-[180px] object-contain transition-all duration-300"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : null}
                    <h3 className="text-[22px] font-medium tracking-tight text-black dark:text-white uppercase">
                      {partner.name}
                    </h3>
                  </div>

                  <p className="text-[14px] text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                    {partner.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-neutral-400 dark:text-neutral-500 group-hover:text-black dark:group-hover:text-white transition-colors">
                  <span className="text-[11px] font-mono uppercase tracking-widest">
                    Long-term Retainer
                  </span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}

          {/* Diplomatic & Institutional Card */}
          <div className="p-8 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#141414] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                  INSTITUTIONAL
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#e38528]">
                  Diplomatic / Sovereign
                </span>
              </div>
              <div className="h-16 flex items-center mb-6">
                <h3 className="text-[22px] font-medium tracking-tight text-black dark:text-white uppercase">
                  SWITZERLAND INDIA 80
                </h3>
              </div>
              <p className="text-[14px] text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                Commissioned by the Embassy of Switzerland in India to commemorate 80 years of bilateral friendship through identity systems and public activations.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-neutral-500 dark:text-neutral-400">
              <span className="text-[11px] font-mono uppercase tracking-widest">
                Sovereign Cultural Identity
              </span>
              <ShieldCheck size={16} className="text-[#e38528]" />
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mb-20">
        <div className="mb-10 pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <span className="text-[12px] font-mono tracking-widest text-[#e38528] uppercase block mb-1">
            CLIENT VOICES
          </span>
          <h2 className="text-[32px] md:text-[40px] font-light uppercase tracking-tight text-black dark:text-white">
            What Our Partners Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="p-8 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between bg-white dark:bg-[#121212]">
              <div>
                <div className="flex items-center gap-1 mb-4 text-[#e38528]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="text-[15px] font-light text-neutral-800 dark:text-neutral-200 leading-relaxed italic mb-8">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <span className="text-[13px] font-medium uppercase text-black dark:text-white block">
                  {t.clientName}
                </span>
                <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block mt-0.5">
                  {t.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Card */}
      <div className="p-10 md:p-14 bg-black dark:bg-[#141414] border border-transparent dark:border-neutral-800 text-white rounded-none flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#e38528] mb-2 block">
            BECOME A PARTNER
          </span>
          <h3 className="text-[30px] md:text-[40px] font-light uppercase tracking-tight text-white">
            Ready to Build Your Category Benchmark?
          </h3>
          <p className="text-[14px] text-neutral-400 font-light mt-1 max-w-[520px]">
            Schedule an executive discovery session with our founding partners.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={onNavigateToWhatWeAre}
            className="px-6 py-3 rounded-full border border-white text-white text-[13px] font-light hover:bg-white hover:text-black transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span>What We Are?</span>
            <ArrowRight size={14} />
          </button>
          <button
            onClick={onOpenContact}
            className="px-6 py-3 rounded-full bg-white text-black text-[13px] font-medium hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            Start a Conversation
          </button>
        </div>
      </div>
    </div>
  );
};
