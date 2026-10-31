import React from 'react';
import { LinkedInIcon, InstagramIcon, TwitterXIcon } from './Icons';
import { PageRoute } from './Navbar';

interface FooterProps {
  onOpenContact: () => void;
  onNavigate: (sectionId: string) => void;
  onNavigatePage?: (page: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onOpenContact, 
  onNavigate,
  onNavigatePage 
}) => {
  const handlePageClick = (page: PageRoute) => {
    if (onNavigatePage) {
      onNavigatePage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full max-w-[1440px] mx-auto bg-black text-white pt-20 pb-16 px-6 md:px-16 flex flex-col justify-between select-none">
      {/* 4 Column Directory */}
      <div className="grid grid-cols-2 md:grid-cols-12 gap-12 md:gap-8 pb-16 border-b border-neutral-800">
        {/* Col 1: NAVIGATION PAGES */}
        <div className="col-span-1 md:col-span-3 flex flex-col">
          <h4 className="text-[12px] font-medium tracking-[0.25em] uppercase text-neutral-400 mb-6">
            PAGES
          </h4>
          <ul className="flex flex-col gap-3 text-[14px] font-light text-neutral-300">
            <li>
              <a
                href="/?page=what-we-are"
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey) {
                    e.preventDefault();
                    handlePageClick('what-we-are');
                  }
                }}
                className="hover:text-[#e38528] transition-colors cursor-pointer text-left"
              >
                What we are?
              </a>
            </li>
            <li>
              <a
                href="/?page=who-we-are"
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey) {
                    e.preventDefault();
                    handlePageClick('who-we-are');
                  }
                }}
                className="hover:text-[#e38528] transition-colors cursor-pointer text-left"
              >
                Who we are?
              </a>
            </li>
            <li>
              <a
                href="/?page=what-we-provide"
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey) {
                    e.preventDefault();
                    handlePageClick('what-we-provide');
                  }
                }}
                className="hover:text-[#e38528] transition-colors cursor-pointer text-left"
              >
                What we provide?
              </a>
            </li>
            <li>
              <a
                href="/?page=who-trust-us"
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey) {
                    e.preventDefault();
                    handlePageClick('who-trust-us');
                  }
                }}
                className="hover:text-[#e38528] transition-colors cursor-pointer text-left"
              >
                Who Trust us?
              </a>
            </li>
          </ul>
        </div>

        {/* Col 2: SERVICES */}
        <div className="col-span-1 md:col-span-3 flex flex-col">
          <h4 className="text-[12px] font-medium tracking-[0.25em] uppercase text-neutral-400 mb-6">
            CAPABILITIES
          </h4>
          <ul className="flex flex-col gap-3 text-[14px] font-light text-neutral-300">
            <li>
              <a
                href="/?page=what-we-provide"
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey) {
                    e.preventDefault();
                    handlePageClick('what-we-provide');
                  }
                }}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                Web &amp; Mobile Apps
              </a>
            </li>
            <li>
              <a
                href="/?page=what-we-provide"
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey) {
                    e.preventDefault();
                    handlePageClick('what-we-provide');
                  }
                }}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                Custom CRM &amp; ERPs
              </a>
            </li>
            <li>
              <a
                href="/?page=what-we-provide"
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey) {
                    e.preventDefault();
                    handlePageClick('what-we-provide');
                  }
                }}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                Digital Marketing &amp; SEO
              </a>
            </li>
            <li>
              <a
                href="/?page=what-we-provide"
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey) {
                    e.preventDefault();
                    handlePageClick('what-we-provide');
                  }
                }}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                Meta Ads &amp; Social Growth
              </a>
            </li>
            <li>
              <a
                href="/?page=what-we-provide"
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey) {
                    e.preventDefault();
                    handlePageClick('what-we-provide');
                  }
                }}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                AI Video &amp; Production
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3: ENGAGE */}
        <div className="col-span-1 md:col-span-3 flex flex-col">
          <h4 className="text-[12px] font-medium tracking-[0.25em] uppercase text-neutral-400 mb-6">
            CONNECT
          </h4>
          <ul className="flex flex-col gap-3 text-[14px] font-light text-neutral-300">
            <li>
              <button
                onClick={onOpenContact}
                className="hover:text-[#e38528] transition-colors cursor-pointer text-left"
              >
                Start a Conversation
              </button>
            </li>
            <li>
              <a
                href="/?page=who-trust-us"
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey) {
                    e.preventDefault();
                    handlePageClick('who-trust-us');
                  }
                }}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                Client Partnerships
              </a>
            </li>
            <li>
              <a
                href="/"
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey) {
                    e.preventDefault();
                    handlePageClick('home');
                  }
                }}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                Home Experience
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4: ANSH&CO Brand Badge */}
        <div className="col-span-1 md:col-span-3 flex flex-col justify-between items-start md:items-end pt-4 md:pt-0">
          <div className="text-left md:text-right">
            <span className="text-[28px] md:text-[34px] font-normal tracking-[0.2em] uppercase text-white block">
              ANSH&amp;CO
            </span>
            <span className="text-[11px] font-mono tracking-widest text-[#e38528] uppercase mt-2 block">
              CREATIVE IDEAS. DIGITAL POSSIBILITIES.
            </span>
          </div>
          <div className="text-neutral-500 text-[11px] font-mono mt-8 md:mt-0 text-left md:text-right">
            <span>© {new Date().getFullYear()} ANSH&amp;CO. ALL RIGHTS RESERVED.</span>
          </div>
        </div>
      </div>

      {/* Corporate Address & Contact Details Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pt-10 text-[13px] font-light text-neutral-400">
        {/* Address */}
        <div className="max-w-[420px]">
          <p className="text-white mb-1">
            <strong>ANSH&amp;CO Studios &amp; Headquarters</strong>
          </p>
          <address className="not-italic leading-relaxed block text-neutral-300">
            Aman Vihar, Dehradun, Uttarakhand 248001, India
          </address>
        </div>

        {/* Phones & Email */}
        <div className="flex flex-col gap-1.5 text-neutral-300 leading-relaxed">
          <p>
            Email:{' '}
            <a href="mailto:contact@anshandco.com" className="text-white hover:text-[#e38528] font-medium transition-colors">
              contact@anshandco.com
            </a>
            <br />
            Call Leadership:{' '}
            <a href="tel:+917668422047" className="text-white hover:text-[#e38528] transition-colors">
              +91 76684 22047
            </a>{' '}
            |{' '}
            <a href="tel:+919152762613" className="text-white hover:text-[#e38528] transition-colors">
              +91 91527 62613
            </a>
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-5 text-white">
          <a
            href="https://www.linkedin.com/company/ansh-co/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="hover:text-[#e38528] transition-colors"
          >
            <LinkedInIcon className="w-5 h-5" />
          </a>
          <a
            href="https://www.instagram.com/anshandco?obrf=dDc0dWcwcDdmbDhy&utm_source=qr"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="hover:text-[#e38528] transition-colors"
          >
            <InstagramIcon className="w-5 h-5" />
          </a>
          <a
            href="https://www.x.com"
            target="_blank"
            rel="noreferrer"
            aria-label="X (Twitter)"
            className="hover:text-[#e38528] transition-colors"
          >
            <TwitterXIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};
