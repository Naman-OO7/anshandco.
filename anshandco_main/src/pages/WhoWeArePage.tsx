import React, { useState } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { TEAM_MEMBERS } from '../data/team';
import { TeamMember } from '../types';

interface WhoWeArePageProps {
  onOpenContact: () => void;
  onSelectMember?: (memberId: string) => void;
}

export const WhoWeArePage: React.FC<WhoWeArePageProps> = ({
  onOpenContact,
  onSelectMember
}) => {
  const [hoveredMemberId, setHoveredMemberId] = useState<string | null>(null);

  const handleMemberClick = (memberId: string, e: React.MouseEvent) => {
    // If user holds Ctrl / Cmd or explicitly wants new tab
    if (e.metaKey || e.ctrlKey) {
      window.open(`?portfolio=${memberId}`, '_blank');
      return;
    }
    if (onSelectMember) {
      onSelectMember(memberId);
    } else {
      window.open(`?portfolio=${memberId}`, '_blank');
    }
  };

  return (
    <div className="w-full pt-[120px] pb-24 px-6 md:px-16 max-w-[1440px] mx-auto animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="max-w-[1000px] mb-20">
        <span className="text-[12px] md:text-[13px] tracking-[0.25em] font-normal uppercase text-[#e38528] mb-4 block">
          [ WHO WE ARE? ]
        </span>
        <h1 className="text-[44px] sm:text-[60px] md:text-[76px] lg:text-[84px] leading-[0.98] font-extralight uppercase text-black tracking-tight mb-8">
          THINKERS, CRAFTSMEN &amp; <br />
          <span className="font-normal">CULTURE SHAPERS</span>
        </h1>
        <p className="text-[18px] md:text-[22px] font-light text-neutral-600 leading-relaxed max-w-[780px]">
          We are a tightly-knit guild of designers, writers, technologists, and strategists obsessed with the conviction that high-level creative taste changes everything.
        </p>
      </div>

      {/* CORE GUILD ROSTER SECTION (7 PEOPLE) */}
      <div className="mb-24">
        <div className="mb-12 pb-4 border-b border-neutral-200 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[12px] font-mono tracking-widest text-[#e38528] uppercase">
                [ WHO WORKS IN OUR COMPANY ]
              </span>
              <span className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-[10px] font-mono uppercase border border-neutral-200 dark:border-neutral-700">
                7 Core Specialists
              </span>
            </div>
            <h2 className="text-[32px] md:text-[46px] font-light uppercase tracking-tight text-black dark:text-white">
              The Resident Guild &amp; Specialists
            </h2>
          </div>
          <p className="text-[14px] text-neutral-600 dark:text-neutral-400 font-light max-w-[460px]">
            Seven distinct pillars of mastery. Click on any member portrait to inspect their in-depth portfolio, case studies, and engineering architecture.
          </p>
        </div>

        {/* All 7 Member Slots laid vertically in identical editorial card format */}
        <div className="space-y-12">
          {TEAM_MEMBERS.map((member) => {
            const avatar = member.avatarUrl;
            const isHovered = hoveredMemberId === member.id;

            return (
              <div
                key={member.id}
                onMouseEnter={() => setHoveredMemberId(member.id)}
                onMouseLeave={() => setHoveredMemberId(null)}
                className={`group border p-6 md:p-10 transition-all duration-300 ease-out transform member-card-lift card-hover-lift ${
                  isHovered
                    ? 'border-black dark:border-white bg-white dark:bg-[#121212] shadow-2xl -translate-y-2'
                    : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 dark:bg-[#0e0e0e] shadow-none translate-y-0'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Portrait Column */}
                  <div className={`lg:col-span-5 relative group/portrait overflow-hidden bg-neutral-950 border aspect-[3/4] max-w-[420px] mx-auto lg:mx-0 w-full transition-all duration-300 ease-out transform ${
                    isHovered ? 'border-black dark:border-white shadow-xl' : 'border-neutral-300 dark:border-neutral-700 shadow-none'
                  }`}>
                    <a
                      href={`?portfolio=${member.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        if (!e.metaKey && !e.ctrlKey && onSelectMember) {
                          e.preventDefault();
                          onSelectMember(member.id);
                        }
                      }}
                      className="block w-full h-full cursor-pointer relative"
                    >
                      <img
                        src={avatar}
                        alt={`${member.name} — ${member.role} (${member.creativeRole}) driving brand custodianship and AI services at ANSH&CO`}
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
                        style={{
                          filter: isHovered
                            ? 'grayscale(0%) contrast(100%) brightness(1)'
                            : 'grayscale(100%) contrast(105%) brightness(0.88)',
                          WebkitFilter: isHovered
                            ? 'grayscale(0%) contrast(100%) brightness(1)'
                            : 'grayscale(100%) contrast(105%) brightness(0.88)',
                          transform: isHovered ? 'scale(1.04)' : 'scale(1)',
                        }}
                        className="w-full h-full object-cover member-portrait-img transition-all duration-700 ease-out"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-500 pointer-events-none ${
                        isHovered ? 'opacity-40' : 'opacity-85'
                      }`} />

                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <span className={`text-[20px] font-medium uppercase tracking-tight block transition-colors duration-300 ${
                          isHovered ? 'text-[#e38528]' : 'text-white'
                        }`}>
                          {member.name}
                        </span>
                      </div>
                    </a>
                  </div>

                  {/* Details Column */}
                  <div className="lg:col-span-7 space-y-6">
                    <div>
                      <span className="text-[13px] font-mono uppercase tracking-widest text-[#e38528] block mb-1">
                        {member.creativeRole}
                      </span>
                      <h3 className="text-[34px] md:text-[44px] font-extralight uppercase tracking-tight text-black dark:text-white">
                        {member.name}
                      </h3>
                      <p className="text-[18px] md:text-[20px] font-normal text-neutral-800 dark:text-neutral-200 mt-1">
                        {member.role}
                      </p>
                    </div>

                    <p className="text-[14px] md:text-[15px] text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                      {member.bio}
                    </p>

                    {/* Expertise Badges */}
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 block mb-2">
                        CORE SPECIALIST EXPERTISE:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.map((exp, idx) => {
                          const desc = member.expertiseDescriptions?.[exp];
                          return (
                            <span
                              key={idx}
                              title={desc ? `${exp} – ${desc}` : exp}
                              className="px-3 py-1.5 bg-white dark:bg-[#161616] text-black dark:text-white border border-neutral-300 dark:border-neutral-700 text-[11px] font-mono uppercase tracking-wider hover:border-black dark:hover:border-white transition-colors"
                            >
                              + {exp}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Leadership & Location Bottom Note */}
      <div className="p-10 border-t border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h4 className="text-[16px] font-medium uppercase text-black dark:text-white">
            ANSH&amp;CO Studio Headquarters
          </h4>
          <p className="text-[13px] text-neutral-600 dark:text-neutral-400 font-light mt-1">
            Aman Vihar, Dehradun, Uttarakhand, India. · Direct inquiries:{' '}
            <a href="mailto:contact@anshandco.com" className="font-normal text-black dark:text-white underline hover:text-[#e38528] transition-colors">
              contact@anshandco.com
            </a>{' '}
            · Serving global brands worldwide.
          </p>
        </div>
        <button
          onClick={onOpenContact}
          className="px-6 py-2.5 rounded-full border border-black dark:border-white bg-black dark:bg-white text-white dark:text-black text-[13px] font-light hover:bg-transparent dark:hover:bg-transparent hover:text-black dark:hover:text-white transition-all cursor-pointer whitespace-nowrap self-start md:self-auto"
        >
          Get in Touch With Leadership
        </button>
      </div>
    </div>
  );
};
