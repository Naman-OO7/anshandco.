import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { LinkedInIcon, InstagramIcon, TwitterXIcon } from './Icons';
import { useTheme } from '../context/ThemeContext';

export type PageRoute = 'home' | 'what-we-are' | 'who-we-are' | 'what-we-provide' | 'who-trust-us' | 'terms' | 'privacy' | 'contact';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigatePage: (page: PageRoute) => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  onNavigatePage, 
  onOpenContact
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on resize to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Handle phone back / cancel button when mobile menu is open
  useEffect(() => {
    const handlePopState = () => {
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [mobileMenuOpen]);

  const navItems: { label: string; page: PageRoute; num: string }[] = [
    { label: 'Where it begins?', page: 'home', num: '01' },
    { label: 'What we are?', page: 'what-we-are', num: '02' },
    { label: 'Who we are?', page: 'who-we-are', num: '03' },
    { label: 'What we provide?', page: 'what-we-provide', num: '04' },
    { label: 'Who Trust us?', page: 'who-trust-us', num: '05' },
  ];

  const handleItemClick = (page: PageRoute) => {
    onNavigatePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleMobileMenu = () => {
    if (!mobileMenuOpen) {
      window.history.pushState({ mobileMenu: true }, '');
      setMobileMenuOpen(true);
    } else {
      setMobileMenuOpen(false);
      if (window.history.state?.mobileMenu) {
        window.history.back();
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        mobileMenuOpen
          ? 'bg-white dark:bg-[#0a0a0a] border-b border-neutral-200 dark:border-neutral-800 py-4'
          : isScrolled
          ? 'bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md border-b border-neutral-100 dark:border-neutral-800 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_15px_-3px_rgba(0,0,0,0.4)] py-4'
          : 'bg-white dark:bg-[#080808] py-6 md:py-8'
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Wordmark & Official Logo: ANSH&CO */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleItemClick('home');
          }}
          className="flex items-center gap-2.5 text-[20px] md:text-[24px] font-normal tracking-[0.25em] uppercase text-black dark:text-white hover:opacity-75 transition-opacity select-none cursor-pointer"
        >
          <img
            src="/logo.png"
            alt="ANSH&CO Official Brand Logo"
            width={30}
            height={30}
            className="w-7 h-7 md:w-8 md:h-8 rounded-md object-cover shrink-0"
          />
          <span>ANSH&amp;CO</span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-10 text-[14px] font-light">
          {navItems.filter((i) => i.page !== 'home').map((item) => {
            const isActive = currentPage === item.page;
            const href = item.page === 'home' ? '/' : `/${item.page}`;
            return (
              <a
                key={item.page}
                href={href}
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey) {
                    e.preventDefault();
                    handleItemClick(item.page);
                  }
                }}
                className={`transition-colors relative py-1 cursor-pointer select-none text-[14px] ${
                  isActive 
                    ? 'text-black dark:text-white font-medium after:w-full' 
                    : 'text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white after:w-0 hover:after:w-full'
                } after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-black dark:after:bg-white after:transition-all after:duration-250`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Action Buttons (Desktop & Tablet) */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Global Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-10 h-10 rounded-full border border-neutral-300 dark:border-neutral-700 bg-neutral-100/90 dark:bg-neutral-800/90 text-neutral-800 dark:text-neutral-100 hover:border-black dark:hover:border-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-300 flex items-center justify-center cursor-pointer active:scale-95 shadow-sm"
          >
            {theme === 'dark' ? (
              <Sun size={18} className="text-[#f59e0b] animate-in zoom-in-75 duration-200" />
            ) : (
              <Moon size={18} className="text-neutral-700 animate-in zoom-in-75 duration-200" />
            )}
          </button>

          <a
            href="/contact"
            onClick={(e) => {
              if (!e.metaKey && !e.ctrlKey) {
                e.preventDefault();
                onOpenContact();
              }
            }}
            className="px-6 py-2 rounded-full border border-black dark:border-white bg-black dark:bg-white text-white dark:text-black text-[14px] font-light hover:bg-transparent dark:hover:bg-transparent hover:text-black dark:hover:text-white transition-all duration-300 cursor-pointer"
          >
            Contact Us
          </a>
        </div>

        {/* Mobile Header Controls (Theme Toggle & Hamburger on small screens) */}
        <div className="flex sm:hidden items-center gap-2">
          {/* Global Theme Toggle Button (Mobile) */}
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-9 h-9 rounded-full border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 flex items-center justify-center cursor-pointer active:scale-90 transition-transform"
          >
            {theme === 'dark' ? (
              <Sun size={17} className="text-[#f59e0b]" />
            ) : (
              <Moon size={17} className="text-neutral-700" />
            )}
          </button>

          <button
            onClick={handleToggleMobileMenu}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="p-2 -mr-1 text-black dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 focus:outline-none transition-transform duration-200 active:scale-95 cursor-pointer rounded-full"
          >
            {mobileMenuOpen ? (
              <X size={26} className="transition-transform duration-200 rotate-90 animate-in fade-in" />
            ) : (
              <Menu size={26} className="transition-transform duration-200 animate-in fade-in" />
            )}
          </button>
        </div>

        {/* Tablet Hamburger Button (when sm screen shows contact button) */}
        <div className="hidden sm:flex lg:hidden items-center gap-2">
          <button
            onClick={handleToggleMobileMenu}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="p-2.5 -mr-2 text-black dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 focus:outline-none transition-transform duration-200 active:scale-95 cursor-pointer rounded-full"
          >
            {mobileMenuOpen ? (
              <X size={26} className="transition-transform duration-200 rotate-90 animate-in fade-in" />
            ) : (
              <Menu size={26} className="transition-transform duration-200 animate-in fade-in" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Fullscreen Drawer */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-x-0 bottom-0 top-[65px] bg-white/98 dark:bg-[#0a0a0a]/98 backdrop-blur-xl z-40 px-6 sm:px-10 py-6 sm:py-8 flex flex-col justify-between overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-300 text-black dark:text-white"
          style={{ height: 'calc(100dvh - 65px)' }}
        >
          {/* Mobile Nav Links with Numbers */}
          <nav className="flex flex-col gap-2 pt-2">
            {/* Mobile Theme Switch Row inside drawer */}
            <div className="flex items-center justify-between py-3 mb-2 border-b border-neutral-100 dark:border-neutral-800">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
                [ APPEARANCE ]
              </span>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-[12px] font-medium text-black dark:text-white cursor-pointer active:scale-95 transition-all"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun size={15} className="text-[#f59e0b]" />
                    <span>Dark Theme</span>
                  </>
                ) : (
                  <>
                    <Moon size={15} className="text-neutral-700" />
                    <span>Light Theme</span>
                  </>
                )}
              </button>
            </div>

            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500 mb-2">
              [ NAVIGATION ROSTER ]
            </span>
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              const href = item.page === 'home' ? '/' : `/${item.page}`;
              return (
                <a
                  key={item.page}
                  href={href}
                  onClick={(e) => {
                    if (!e.metaKey && !e.ctrlKey) {
                      e.preventDefault();
                      handleItemClick(item.page);
                    }
                  }}
                  className={`group flex items-center justify-between py-3.5 border-b border-neutral-100 dark:border-neutral-800 text-left cursor-pointer transition-all duration-200 ${
                    isActive ? 'border-black dark:border-white' : 'hover:border-neutral-300 dark:hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-baseline gap-3.5">
                    <span className={`text-[12px] font-mono tracking-wider ${
                      isActive ? 'text-[#e38528] font-medium' : 'text-neutral-400 dark:text-neutral-500 group-hover:text-black dark:group-hover:text-white'
                    }`}>
                      {item.num}
                    </span>
                    <span className={`text-[20px] sm:text-[24px] font-light uppercase tracking-tight transition-colors ${
                      isActive ? 'text-[#e38528] font-normal' : 'text-black dark:text-white group-hover:text-[#e38528]'
                    }`}>
                      {item.label}
                    </span>
                  </div>
                  <ArrowUpRight 
                    size={18} 
                    className={`transition-all duration-200 ${
                      isActive 
                        ? 'text-[#e38528] opacity-100 translate-x-0' 
                        : 'text-neutral-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                    }`} 
                  />
                </a>
              );
            })}
          </nav>

          {/* Bottom Actions & Social Footer */}
          <div className="flex flex-col gap-5 pt-8 mt-6 border-t border-neutral-200 dark:border-neutral-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-4 rounded-full border border-black dark:border-white bg-black dark:bg-white text-white dark:text-black text-[15px] uppercase tracking-wider font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors cursor-pointer text-center shadow-lg active:scale-[0.99]"
            >
              Contact Leadership
            </button>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-neutral-500 dark:text-neutral-400 text-[12px] font-light">
              <span className="font-mono uppercase tracking-wider text-[11px] text-neutral-400 dark:text-neutral-500">
                Dehradun, India · Global
              </span>
              <div className="flex items-center gap-5 text-black dark:text-white">
                <a
                  href="https://www.linkedin.com/company/ansh-co/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="p-1 hover:text-[#e38528] transition-colors"
                >
                  <LinkedInIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/anshandco?obrf=dDc0dWcwcDdmbDhy&utm_source=qr"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="p-1 hover:text-[#e38528] transition-colors"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.x.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="X (Twitter)"
                  className="p-1 hover:text-[#e38528] transition-colors"
                >
                  <TwitterXIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

