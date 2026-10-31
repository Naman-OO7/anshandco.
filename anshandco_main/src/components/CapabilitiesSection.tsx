import React, { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import {
  ServiceStrategyBadge,
  ServiceBrandingBadge,
  ServiceDigitalBadge,
  ServiceMarketingBadge,
  ServiceDevelopmentBadge,
  ServiceProductionBadge
} from './Icons';

interface CapabilitiesSectionProps {
  onKnowMore: () => void;
  onOpenContact?: () => void;
}

interface FAQItem {
  question: string;
  answer: string;
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({ onKnowMore, onOpenContact }) => {
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleContact = onOpenContact || onKnowMore;

  const faqs: FAQItem[] = [
    {
      question: "What does it mean that ANSH&CO is a 'Brand Custodian'?",
      answer: "Traditional agencies operate on transactional, short-term handoffs—delivering a brief or logo file and vanishing. As brand custodians, we act as long-term creative and technical stewards standing alongside founders. We actively protect your brand equity, ensure design fidelity across every digital and physical touchpoint, and scale your presence over years, not weeks."
    },
    {
      question: "What capabilities and disciplines do you handle in-house?",
      answer: "Every deliverable is crafted in-house by our multidisciplinary squads. We cover Brand Strategy & Visual Identity, Custom Full-Stack Web & Mobile Engineering (React, Next.js, Node), AI Solutions & Workflow Automation, Performance Ads (Meta & Google), Technical SEO, and Cinematic Video & Motion Production. Zero outsourced freelance handoffs guarantees aesthetic cohesion and high velocity."
    },
    {
      question: "How does a typical client engagement begin?",
      answer: "Every partnership begins with our Interrogation & Discovery phase. We immerse ourselves in your business economics, audience psychology, and competitive whitespace before drawing a single vector or committing code. From there, we architect a tailored strategic roadmap, clear deliverables matrix, and milestones aligned with your commercial growth."
    },
    {
      question: "Do you partner with early-stage startups or only enterprise brands?",
      answer: "We partner with visionary leaders across both spectrums. Whether you are an ambitious zero-to-one startup establishing category distinction, or a legacy enterprise (like Warner Bros. Discovery or sovereign cultural bodies like the Embassy of Switzerland) requiring comprehensive repositioning, we scale our focus to meet your ambitions."
    },
    {
      question: "How do you structure pricing and commercial partnerships?",
      answer: "We reject arbitrary hour-billing in favor of value-aligned partnership models. Depending on your roadmap, we offer dedicated monthly Brand Custodianship retainers for continuous execution and growth, or fixed-scope sprints for flagship brand identity overhauls, custom platforms, and product launches."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="services" className="w-full max-w-[1440px] mx-auto pt-16 md:pt-24 pb-16 md:pb-24 px-6 md:px-16 bg-white dark:bg-[#080808] border-t border-neutral-100 dark:border-neutral-800 transition-colors duration-300">
      {/* Intro Block: [ WHAT DO YOU WANT? ] */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-16 md:mb-20">
        <div className="flex flex-col items-start max-w-[800px]">
          <span className="text-[12px] md:text-[13px] tracking-[0.25em] font-normal uppercase text-black dark:text-white mb-4">
            [ WHAT DO YOU WANT? ]
          </span>
          <p className="text-[14px] md:text-[15px] leading-[1.75] font-light text-neutral-600 dark:text-neutral-400 max-w-[620px]">
            The medium shapes the message. We shape both. Strategy, design, digital, marketing, and production — everything your brand needs to speak with clarity and conviction.
          </p>
        </div>

        <div>
          <button
            onClick={onKnowMore}
            className="text-[12px] uppercase font-normal tracking-[0.2em] text-black dark:text-white border-b border-black dark:border-white pb-0.5 hover:text-[#e38528] hover:border-[#e38528] transition-colors cursor-pointer"
          >
            KNOW MORE
          </button>
        </div>
      </div>

      {/* Services Kinetic Typographic Matrix: [ SERVICES ] */}
      <div className="flex flex-col mb-16 md:mb-24">
        <div className="mb-8">
          <span className="text-[12px] md:text-[13px] tracking-[0.25em] font-normal uppercase text-[#e38528]">
            [ SERVICES ]
          </span>
        </div>

        <div className="flex flex-col gap-2 md:gap-3 select-none">
          {/* STRATEGY */}
          <div
            onMouseEnter={() => setHoveredService('strategy')}
            onMouseLeave={() => setHoveredService(null)}
            className="flex items-center gap-6 cursor-pointer group transition-all duration-300 transform hover:translate-x-3 hover:scale-[1.01]"
          >
            <img
              src="/assets/aistudio/ansh_logo_d7f34171.jpg"
              alt="ANSH&CO Brand Custodianship Strategy and AI Market Positioning"
              loading="lazy"
              decoding="async"
              className="sr-only"
            />
            <h2
              className={`text-[46px] sm:text-[68px] md:text-[88px] lg:text-[108px] font-extralight tracking-tight uppercase leading-[0.95] transition-colors duration-300 ${
                hoveredService === 'strategy' ? 'text-black dark:text-white' : 'text-[#ededed] dark:text-[#222222]'
              }`}
            >
              STRATEGY
            </h2>
            <div className="text-neutral-400 dark:text-neutral-600 group-hover:text-black dark:group-hover:text-white transition-colors">
              <ServiceStrategyBadge className="w-12 h-8 sm:w-16 sm:h-10" />
            </div>
          </div>

          {/* BRANDING */}
          <div
            onMouseEnter={() => setHoveredService('branding')}
            onMouseLeave={() => setHoveredService(null)}
            className="flex items-center gap-6 cursor-pointer group transition-all duration-300 transform hover:translate-x-3 hover:scale-[1.01]"
          >
            <img
              src="/m1.jpg"
              alt="ANSH&CO Brand Identity Design, Packaging Architecture, and Brand Custodianship"
              loading="lazy"
              decoding="async"
              className="sr-only"
            />
            <h2
              className={`text-[46px] sm:text-[68px] md:text-[88px] lg:text-[108px] font-extralight tracking-tight uppercase leading-[0.95] transition-colors duration-300 ${
                hoveredService === 'branding' ? 'text-black dark:text-white' : 'text-[#ededed] dark:text-[#222222]'
              }`}
            >
              BRANDING
            </h2>
            <div className="text-neutral-400 dark:text-neutral-600 group-hover:text-black dark:group-hover:text-white transition-colors">
              <ServiceBrandingBadge className="w-12 h-8 sm:w-16 sm:h-10" />
            </div>
          </div>

          {/* DIGITAL & MARKETING ROW */}
          <div className="flex flex-wrap items-center gap-6 md:gap-12">
            {/* DIGITAL */}
            <div
              onMouseEnter={() => setHoveredService('digital')}
              onMouseLeave={() => setHoveredService(null)}
              className="flex items-center gap-4 cursor-pointer group transition-all duration-300 transform hover:translate-x-2 hover:scale-[1.01]"
            >
              <img
                src="/m2.jpg"
                alt="ANSH&CO Digital Product Design, AI Automation Systems, and Brand Custodianship"
                loading="lazy"
                decoding="async"
                className="sr-only"
              />
              <div className="text-neutral-400 dark:text-neutral-600 group-hover:text-black dark:group-hover:text-white transition-colors">
                <ServiceDigitalBadge className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h2
                className={`text-[46px] sm:text-[68px] md:text-[88px] lg:text-[108px] font-extralight tracking-tight uppercase leading-[0.95] transition-colors duration-300 ${
                  hoveredService === 'digital' ? 'text-black dark:text-white' : 'text-[#ededed] dark:text-[#222222]'
                }`}
              >
                DIGITAL
              </h2>
            </div>

            {/* MARKETING */}
            <div
              onMouseEnter={() => setHoveredService('marketing')}
              onMouseLeave={() => setHoveredService(null)}
              className="flex items-center gap-4 cursor-pointer group transition-all duration-300 transform hover:translate-x-2 hover:scale-[1.01]"
            >
              <img
                src="/meme1.jpg"
                alt="ANSH&CO Performance Marketing, SEO, Meta Ads, and AI Growth Services"
                loading="lazy"
                decoding="async"
                className="sr-only"
              />
              <div className="text-neutral-400 dark:text-neutral-600 group-hover:text-[#e38528] transition-colors">
                <ServiceMarketingBadge className="w-7 h-7 sm:w-9 sm:h-9" />
              </div>
              <h2
                className={`text-[46px] sm:text-[68px] md:text-[88px] lg:text-[108px] font-extralight tracking-tight uppercase leading-[0.95] transition-colors duration-300 ${
                  hoveredService === 'marketing' ? 'text-black dark:text-white' : 'text-[#ededed] dark:text-[#222222]'
                }`}
              >
                MARKETING
              </h2>
            </div>
          </div>

          {/* DEVELOPMENT */}
          <div
            onMouseEnter={() => setHoveredService('development')}
            onMouseLeave={() => setHoveredService(null)}
            className="flex items-center gap-6 cursor-pointer group transition-all duration-300 transform hover:translate-x-3 hover:scale-[1.01]"
          >
            <img
              src="/m3.jpg"
              alt="ANSH&CO Full-Stack Next.js Web Development, Mobile Apps, and Custom AI CRM/ERP Engineering"
              loading="lazy"
              decoding="async"
              className="sr-only"
            />
            <h2
              className={`text-[46px] sm:text-[68px] md:text-[88px] lg:text-[108px] font-extralight tracking-tight uppercase leading-[0.95] transition-colors duration-300 ${
                hoveredService === 'development' ? 'text-black dark:text-white' : 'text-[#ededed] dark:text-[#222222]'
              }`}
            >
              DEVELOPMENT
            </h2>
            <div className="text-neutral-400 dark:text-neutral-600 group-hover:text-black dark:group-hover:text-white transition-colors">
              <ServiceDevelopmentBadge className="w-12 h-8 sm:w-16 sm:h-10" />
            </div>
          </div>

          {/* PRODUCTION */}
          <div
            onMouseEnter={() => setHoveredService('production')}
            onMouseLeave={() => setHoveredService(null)}
            className="flex items-center gap-6 cursor-pointer group transition-all duration-300 transform hover:translate-x-3 hover:scale-[1.01]"
          >
            <img
              src="/meme2.jpg"
              alt="ANSH&CO Cinematic Video Editing, AI Video Generation, and Viral Reels Production"
              loading="lazy"
              decoding="async"
              className="sr-only"
            />
            <h2
              className={`text-[46px] sm:text-[68px] md:text-[88px] lg:text-[108px] font-extralight tracking-tight uppercase leading-[0.95] transition-colors duration-300 ${
                hoveredService === 'production' ? 'text-black dark:text-white' : 'text-[#ededed] dark:text-[#222222]'
              }`}
            >
              PRODUCTION
            </h2>
            <div className="text-neutral-400 dark:text-neutral-600 group-hover:text-black dark:group-hover:text-white transition-colors">
              <ServiceProductionBadge />
            </div>
          </div>
        </div>
      </div>

      {/* Integrated FAQ Block: Seamless 1-Section Flow */}
      <div className="pt-16 md:pt-20 border-t border-neutral-200 dark:border-neutral-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Heading & Action Link */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <span className="text-[12px] md:text-[13px] tracking-[0.25em] font-normal uppercase text-[#e38528] mb-4 block">
              [ A LITTLE MORE CLARITY ]
            </span>

            <h2 className="text-[44px] sm:text-[60px] lg:text-[72px] leading-[0.96] tracking-tight mb-6">
              <span className="font-extralight uppercase text-black dark:text-white block">Good</span>
              <span className="font-serif italic text-[#e38528] block lowercase">questions.</span>
            </h2>

            <p className="text-[15px] font-light text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-[420px] mb-8">
              Everything you need to know about partnering with ANSH&amp;CO as your brand custodians. Have an inquiry that isn't answered here?
            </p>

            <button
              onClick={handleContact}
              className="inline-flex items-center gap-2 text-[12px] font-medium tracking-[0.2em] uppercase text-black dark:text-white hover:text-[#e38528] dark:hover:text-[#e38528] border-b border-black dark:border-white hover:border-[#e38528] dark:hover:border-[#e38528] pb-1 transition-colors cursor-pointer group"
            >
              <span>Speak With Leadership</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Column: 5 Interactive Accordion Items */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800 border-y border-neutral-200 dark:border-neutral-800">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className="transition-colors group">
                  <button
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                    className="w-full py-5 md:py-6 flex items-center justify-between text-left gap-6 cursor-pointer"
                  >
                    <span
                      className={`text-[17px] sm:text-[19px] font-normal tracking-tight transition-colors duration-200 ${
                        isOpen ? 'text-[#e38528]' : 'text-black dark:text-white group-hover:text-[#e38528]'
                      }`}
                    >
                      {faq.question}
                    </span>
                    <span
                      className={`shrink-0 p-1.5 sm:p-2 rounded-full border transition-all duration-300 ${
                        isOpen
                          ? 'border-[#e38528] text-[#e38528] rotate-180 bg-orange-50 dark:bg-orange-950/30'
                          : 'border-neutral-300 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 group-hover:border-black dark:group-hover:border-white group-hover:text-black dark:group-hover:text-white bg-neutral-50 dark:bg-neutral-900'
                      }`}
                    >
                      <ChevronDown size={15} />
                    </span>
                  </button>

                  {/* Expandable Answer */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      isOpen ? 'max-h-[350px] opacity-100 pb-6' : 'max-h-0 opacity-0 pb-0'
                    }`}
                  >
                    <p className="text-[14px] sm:text-[15px] font-light text-neutral-600 dark:text-neutral-400 leading-relaxed pr-6">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
