import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, Sparkles, Code2, Bot, Layers, Brain, CheckCircle2, X, Maximize2 } from 'lucide-react';
import { TeamMember } from '../types';
import { TEAM_MEMBERS } from '../data/team';

interface MemberPortfolioPageProps {
  memberId: string;
  onBack: () => void;
  onSelectMember: (id: string) => void;
  onOpenContact: () => void;
}

export const MemberPortfolioPage: React.FC<MemberPortfolioPageProps> = ({
  memberId,
  onBack,
  onSelectMember,
  onOpenContact
}) => {
  const [lightboxItem, setLightboxItem] = useState<{ url: string; title: string; subtitle?: string } | null>(null);

  const member = TEAM_MEMBERS.find((m) => m.id === memberId || (memberId === 'member-07' && (m.id === 'hardeep' || m.id === 'harpreet')) || (memberId === 'harpreet' && m.id === 'hardeep') || (memberId === 'hardeep' && m.id === 'hardeep') || m.name.toLowerCase() === memberId?.toLowerCase()) || TEAM_MEMBERS[0];

  const currentIndex = TEAM_MEMBERS.findIndex((m) => m.id === member.id);
  const prevMember = TEAM_MEMBERS[(currentIndex - 1 + TEAM_MEMBERS.length) % TEAM_MEMBERS.length];
  const nextMember = TEAM_MEMBERS[(currentIndex + 1) % TEAM_MEMBERS.length];

  const displayAvatar = member.avatarUrl;

  return (
    <div className="w-full min-h-screen bg-white dark:bg-[#080808] text-black dark:text-white selection:bg-orange-500 selection:text-white pt-[100px] pb-24 transition-colors duration-300">
      {/* Top Floating Control Bar */}
      <div className="sticky top-[80px] z-40 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 py-3 px-6 md:px-16 transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-[12px] uppercase tracking-widest font-mono text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Who We Are</span>
          </button>

          {/* Quick Roster Selector */}
          <div className="hidden lg:flex items-center gap-2">
            <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 mr-2 uppercase">Guild Member:</span>
            {TEAM_MEMBERS.map((m) => (
              <button
                key={m.id}
                onClick={() => onSelectMember(m.id)}
                className={`px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer border ${
                  m.id === member.id
                    ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black'
                    : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-700'
                }`}
              >
                {m.number} {m.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenContact}
              className="px-4 py-1.5 bg-[#e38528] text-white hover:bg-[#d0751e] text-[11px] font-mono uppercase tracking-widest transition-colors cursor-pointer rounded-full"
            >
              Collaborate
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-16 pt-10">
        {/* Section 1: Editorial Header / Case Study Opening */}
        <div className="border-b border-neutral-200 dark:border-neutral-800 pb-16 mb-16">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-[12px] font-mono tracking-widest uppercase">
                GUILD MEMBER [{member.number} / 07]
              </span>
              <span className="text-[12px] font-mono tracking-widest uppercase text-[#e38528]">
                {member.category}
              </span>
            </div>
          </div>

          <h1 className="text-[44px] sm:text-[68px] md:text-[90px] lg:text-[104px] leading-[0.92] font-extralight uppercase text-black dark:text-white tracking-tight mb-6">
            {member.name}
          </h1>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-[760px]">
              <span className="text-[14px] md:text-[16px] font-mono tracking-widest uppercase text-[#e38528] block mb-2">
                {member.creativeRole}
              </span>
              <p className="text-[20px] md:text-[26px] font-light text-neutral-800 dark:text-neutral-200 leading-snug">
                {member.role}
              </p>
              <p className="text-[15px] md:text-[17px] font-light text-neutral-600 dark:text-neutral-400 mt-4 leading-relaxed">
                {member.tagline}
              </p>
            </div>

            {/* Quick Metrics Pillar */}
            <div className="grid grid-cols-2 gap-4 border-l-0 md:border-l border-neutral-200 dark:border-neutral-800 md:pl-8 min-w-[260px]">
              {member.portfolio.stats.map((stat, i) => (
                <div key={i} className="p-3 bg-neutral-50 dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800">
                  <span className="text-[20px] md:text-[24px] font-bold tracking-tight text-black dark:text-white block">
                    {stat.value}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2: Visual Portrait + Core Philosophy Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20 pb-16 border-b border-neutral-200">
          {/* Portrait Column */}
          <div className="lg:col-span-5 relative group">
            <div 
              onClick={() => setLightboxItem({ url: displayAvatar, title: member.name, subtitle: `${member.creativeRole} · Full Resolution Portrait` })}
              className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-950 border border-neutral-300 cursor-pointer group/portrait"
              title="Click to view full portrait"
            >
              <img
                src={displayAvatar}
                alt={`${member.name} — ${member.role} & ${member.creativeRole} specializing in brand custodianship and AI services at ANSH&CO`}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const map: Record<string, string> = {
                    naman: '/team/naman_Editor.png',
                    'member-02': '/team/ankit_pic.jpg',
                    'member-03': '/team/vanshika_pic.jpg',
                    'member-04': '/team/ankita_pic.jpg',
                    'member-05': '/team/sharad_pic.jpg',
                    'member-06': '/team/arpit_pic.jpg',
                    hardeep: '/team/hardeep_pic.jpg',
                    harpreet: '/team/hardeep_pic.jpg',
                  };
                  const fallback = map[member.id];
                  if (fallback && !e.currentTarget.src.endsWith(fallback)) {
                    e.currentTarget.src = fallback;
                  }
                }}
                className="w-full h-full object-cover object-center member-portrait-img transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
                <span className="text-[11px] font-mono tracking-widest text-[#e38528] uppercase block mb-1">
                  ANSH&amp;CO. RESIDENT CRAFTSMAN
                </span>
                <span className="text-[22px] font-medium uppercase tracking-tight block">
                  {member.name}
                </span>
                <span className="text-[12px] text-neutral-300 font-mono block">
                  {member.creativeRole}
                </span>
              </div>
            </div>
          </div>

          {/* Philosophy & Overview Column */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-8">
            <div className="p-8 md:p-10 bg-neutral-900 text-white">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={16} className="text-[#e38528]" />
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#e38528]">
                  CORE CRAFT PHILOSOPHY
                </span>
              </div>
              <blockquote className="text-[22px] md:text-[28px] font-light leading-snug tracking-tight mb-6">
                &ldquo;{member.portfolio.heroStatement}&rdquo;
              </blockquote>
              <p className="text-[14px] md:text-[15px] text-neutral-300 font-light leading-relaxed">
                {member.portfolio.creativePhilosophy}
              </p>
              <div className="mt-6 pt-6 border-t border-white/20 flex items-center justify-between text-[12px] font-mono text-neutral-400">
                <span>MANIFETSO LAW:</span>
                <span className="text-white italic">&ldquo;{member.portfolio.quote}&rdquo;</span>
              </div>
            </div>

            {/* In-depth Bio */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#e38528] block mb-2">
                OVERVIEW &amp; PROFILE
              </span>
              <h3 className="text-[24px] md:text-[28px] font-light uppercase tracking-tight text-black mb-4">
                How {member.name} Builds &amp; Deploys
              </h3>
              <p className="text-[15px] md:text-[16px] text-neutral-700 font-light leading-relaxed mb-6">
                {member.bio}
              </p>
            </div>

            {/* Core Expertise Showcase */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#e38528] block mb-3">
                DEPLOYED EXPERTISE &amp; DOMAINS
              </span>
              <div className="flex flex-wrap gap-2.5">
                {member.expertise.map((exp, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-black text-[12px] font-mono uppercase tracking-wider border border-neutral-300 transition-colors"
                  >
                    + {exp}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Technical Arsenal & Skill Matrix */}
        <div className="mb-20 pb-16 border-b border-neutral-200">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[12px] font-mono tracking-widest uppercase text-[#e38528] block mb-1">
                SYSTEM ARSENAL
              </span>
              <h2 className="text-[32px] md:text-[44px] font-light uppercase tracking-tight text-black">
                Mastered Technologies &amp; Frameworks
              </h2>
            </div>
            <p className="text-[13px] text-neutral-500 font-mono max-w-[420px]">
              Production-grade execution powered by modern engineering tools, autonomous AI engines, and cognitive workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {member.portfolio.technologies.map((group, idx) => (
              <div key={idx} className="p-6 border border-neutral-200 hover:border-black bg-white transition-all duration-300 ease-out transform hover:-translate-y-2 hover:shadow-xl hover:shadow-black/10 flex flex-col justify-between card-hover-lift">
                <div>
                  <div className="flex items-center gap-2 mb-4 text-[#e38528]">
                    {idx === 0 ? <Code2 size={18} /> : idx === 1 ? <Bot size={18} /> : idx === 2 ? <Layers size={18} /> : <Brain size={18} />}
                    <span className="text-[11px] font-mono text-neutral-400">STACK 0{idx + 1}</span>
                  </div>
                  <h4 className="text-[16px] font-medium uppercase tracking-tight text-black mb-4">
                    {group.category}
                  </h4>
                  <ul className="space-y-2">
                    {group.skills.map((skill, sIdx) => (
                      <li key={sIdx} className="text-[13px] text-neutral-600 font-light flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#e38528] rounded-full" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Featured Systems & Works */}
        <div className="mb-20 pb-16 border-b border-neutral-200">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[12px] font-mono tracking-widest uppercase text-[#e38528] block mb-1">
                SELECTED SYSTEMS &amp; PRODUCTION WORKS
              </span>
              <h2 className="text-[32px] md:text-[44px] font-light uppercase tracking-tight text-black">
                Tangible Execution &amp; Impact
              </h2>
            </div>
            <p className="text-[14px] text-neutral-600 font-light max-w-[460px]">
              Every system is engineered for longevity, extreme performance, and measurable transformation.
            </p>
          </div>

          <div className="space-y-16">
            {member.portfolio.featuredWork.map((work, idx) => (
              <div
                key={work.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-neutral-200 p-8 md:p-12 hover:border-black transition-colors"
              >
                {/* Media Side with Smooth Cross-Fade Hover Effect */}
                {work.mediaUrl && (
                  <div 
                    onClick={() => setLightboxItem({ url: work.mediaUrl!, title: work.title, subtitle: `Case 0${idx + 1} · ${work.category}` })}
                    className="lg:col-span-6 order-2 lg:order-1 overflow-hidden bg-neutral-900 border border-neutral-200 aspect-[16/10] relative group/work-img cursor-pointer"
                    title="Click to view full image in perfect shape"
                  >
                    <img
                      src={work.mediaUrl}
                      alt={`${work.title} — ${work.category} system engineered by ${member.name} for ANSH&CO brand custodianship and AI services`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale contrast-105 transition-all duration-700 ease-in-out group-hover:grayscale-0 group-hover:scale-105"
                    />
                    {/* Smooth Gradient Cross-Fade Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out pointer-events-none" />
                    <div className="absolute bottom-3 right-3 p-1.5 rounded-full bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 size={14} />
                    </div>
                  </div>
                )}

                {/* Details Side */}
                <div className={`${work.mediaUrl ? 'lg:col-span-6' : 'lg:col-span-12'} order-1 lg:order-2 space-y-4`}>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#e38528]">
                      [ CASE 0{idx + 1} ]
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400 uppercase">
                      {work.category}
                    </span>
                  </div>

                  <h3 className="text-[26px] md:text-[34px] font-light uppercase tracking-tight text-black">
                    {work.title}
                  </h3>

                  <p className="text-[14px] md:text-[15px] text-neutral-600 font-light leading-relaxed">
                    {work.description}
                  </p>

                  <div className="p-4 bg-neutral-50 border-l-2 border-[#e38528]">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">
                      MEASURED IMPACT
                    </span>
                    <p className="text-[14px] font-medium text-black">
                      {work.impact}
                    </p>
                  </div>

                  <div className="pt-2">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 block mb-2">
                      CORE DELIVERABLES:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {work.deliverables.map((deliv, dIdx) => (
                        <div key={dIdx} className="text-[12px] font-light text-neutral-700 flex items-center gap-1.5">
                          <span className="text-[#e38528]">✓</span>
                          <span>{deliv}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap gap-2">
                    {work.tags.map((t, tIdx) => (
                      <span key={tIdx} className="px-2 py-1 bg-neutral-100 text-neutral-600 text-[10px] font-mono uppercase">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Concrete Deliverables Checklist */}
        <div className="mb-20 p-8 md:p-12 bg-neutral-900 text-white">
          <div className="max-w-[1000px] mb-8">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#e38528] block mb-2">
              WHAT {member.name} DELIVERS FOR PARTNERS
            </span>
            <h2 className="text-[28px] md:text-[38px] font-light uppercase tracking-tight text-white">
              End-to-End Capabilities &amp; System Architecture
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {member.portfolio.deliverables.map((item, idx) => (
              <div key={idx} className="p-4 border border-white/20 flex items-start gap-3">
                <span className="text-[#e38528] font-mono text-[13px] mt-0.5">0{idx + 1}.</span>
                <span className="text-[14px] md:text-[15px] font-light text-neutral-200">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 6: Next Member Navigation (Endless Roster Loop) */}
        <div className="border-t border-neutral-200 pt-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <button
            onClick={() => onSelectMember(prevMember.id)}
            className="flex items-center gap-3 text-neutral-600 hover:text-black transition-colors cursor-pointer group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <div className="text-left">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">PREVIOUS MEMBER</span>
              <span className="text-[14px] font-medium uppercase tracking-tight">{prevMember.number} {prevMember.name}</span>
            </div>
          </button>

          <button
            onClick={onOpenContact}
            className="px-8 py-3 rounded-full bg-black text-white hover:bg-[#e38528] text-[13px] font-medium tracking-wide uppercase transition-colors cursor-pointer"
          >
            Work with {member.name} &amp; ANSH&amp;CO.
          </button>

          <button
            onClick={() => onSelectMember(nextMember.id)}
            className="flex items-center gap-3 text-neutral-600 hover:text-black transition-colors cursor-pointer group text-right"
          >
            <div className="text-right">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">NEXT MEMBER</span>
              <span className="text-[14px] font-medium uppercase tracking-tight">{nextMember.number} {nextMember.name}</span>
            </div>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Lightbox Closeup View - Clean & Minimal matching Image 1 */}
      {lightboxItem && (
        <div 
          onClick={() => setLightboxItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200 select-none cursor-zoom-out"
        >
          {/* Circular close button matching Image 1 */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxItem(null);
            }}
            className="fixed top-5 right-5 sm:top-6 sm:right-6 z-50 p-2.5 rounded-full bg-black/80 hover:bg-black text-white hover:scale-105 transition-all shadow-xl cursor-pointer"
            aria-label="Close"
          >
            <X size={22} />
          </button>

          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative flex items-center justify-center max-w-[92vw] max-h-[92vh] cursor-default"
          >
            <img
              src={lightboxItem.url}
              alt={`${lightboxItem.title}${lightboxItem.subtitle ? ` — ${lightboxItem.subtitle}` : ''} | ANSH&CO brand custodianship and AI services portfolio`}
              className="max-h-[88vh] max-w-[90vw] w-auto h-auto object-contain mx-auto shadow-2xl block select-none rounded-none"
            />
          </div>
        </div>
      )}
    </div>
  );
};
