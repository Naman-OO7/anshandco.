/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, PageRoute } from './components/Navbar';
import { HeroVideo } from './components/HeroVideo';
import { KineticManifesto } from './components/KineticManifesto';
import { BrandReelDivider } from './components/BrandReelDivider';
import { MissionSection } from './components/MissionSection';
import { SelectedWorksSection } from './components/SelectedWorksSection';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { WorkWithUsCTA } from './components/WorkWithUsCTA';
import { Footer } from './components/Footer';
import { ScrollReveal } from './components/ScrollReveal';

import { WhatWeArePage } from './pages/WhatWeArePage';
import { WhoWeArePage } from './pages/WhoWeArePage';
import { WhatWeProvidePage } from './pages/WhatWeProvidePage';
import { WhoTrustUsPage } from './pages/WhoTrustUsPage';
import { MemberPortfolioPage } from './pages/MemberPortfolioPage';
import { TermsPage, PrivacyPage, ContactPage } from './pages/LegalAndContactPages';
import { registerAnshWebMCPTools } from './utils/webmcp';

import { ContactModal } from './components/ContactModal';
import { CaseStudyModal } from './components/CaseStudyModal';
import { NewsModal } from './components/NewsModal';
import { ViewAllDrawer } from './components/ViewAllDrawer';

import { CaseStudy, NewsUpdate, ClientPartner } from './types';
import { CASE_STUDIES, NEWS_UPDATES } from './data/content';
import { TEAM_MEMBERS } from './data/team';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsUpdate | null>(null);
  const [viewAllDrawerOpen, setViewAllDrawerOpen] = useState(false);
  const [viewAllTab, setViewAllTab] = useState<'works' | 'clients' | 'news'>('works');

  // Register WebMCP tools on page load for in-browser AI agents
  useEffect(() => {
    registerAnshWebMCPTools();
  }, []);

  // Handle initial URL parameters & history state (supports clean paths + /services/* + ?page=, ?portfolio=, ?case=, ?news=)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const portfolioParam = params.get('portfolio') || params.get('member');
    const rawPath = window.location.pathname.replace(/^\/+|\/+$/g, '');
    const mappedPath: PageRoute | null =
      rawPath === 'about' || rawPath === 'services/brand-custodianship'
        ? 'what-we-are'
        : rawPath.startsWith('services/')
        ? 'what-we-provide'
        : (['what-we-are', 'who-we-are', 'what-we-provide', 'who-trust-us', 'terms', 'privacy', 'contact'].includes(rawPath)
            ? (rawPath as PageRoute)
            : null);
    const rawPageParam = params.get('page');
    const pageParam: PageRoute | null =
      rawPageParam === 'about'
        ? 'what-we-are'
        : (rawPageParam as PageRoute | null) || mappedPath;
    const caseParam = params.get('case');
    const newsParam = params.get('news');
    const queryParam = (params.get('q') || params.get('search') || '').trim().toLowerCase();
    let initialPage: PageRoute = portfolioParam ? 'who-we-are' : (pageParam || 'home');
    
    if (portfolioParam) {
      setSelectedMemberId(portfolioParam);
      setCurrentPage('who-we-are');
    } else if (pageParam) {
      setCurrentPage(pageParam);
    }

    if (caseParam) {
      const foundCase = CASE_STUDIES.find((c) => c.id === caseParam);
      if (foundCase) setSelectedCaseStudy(foundCase);
    } else if (newsParam) {
      const foundNews = NEWS_UPDATES.find((n) => n.id === newsParam);
      if (foundNews) setSelectedNews(foundNews);
    } else if (queryParam && !portfolioParam && !pageParam) {
      const matchedMember = TEAM_MEMBERS.find(
        (m) =>
          m.name.toLowerCase().includes(queryParam) ||
          m.role.toLowerCase().includes(queryParam) ||
          m.id.toLowerCase() === queryParam
      );
      const matchedCase = CASE_STUDIES.find(
        (c) =>
          c.title.toLowerCase().includes(queryParam) ||
          c.client.toLowerCase().includes(queryParam) ||
          c.summary.toLowerCase().includes(queryParam) ||
          c.tags.some((t) => t.toLowerCase().includes(queryParam))
      );
      const matchedNews = NEWS_UPDATES.find(
        (n) =>
          n.title.toLowerCase().includes(queryParam) ||
          n.summary.toLowerCase().includes(queryParam)
      );

      if (matchedMember) {
        setSelectedMemberId(matchedMember.id);
        setCurrentPage('who-we-are');
        initialPage = 'who-we-are';
      } else if (matchedCase) {
        setSelectedCaseStudy(matchedCase);
      } else if (matchedNews) {
        setSelectedNews(matchedNews);
      } else if (
        queryParam.includes('service') ||
        queryParam.includes('provide') ||
        queryParam.includes('price') ||
        queryParam.includes('pricing')
      ) {
        setCurrentPage('what-we-provide');
        initialPage = 'what-we-provide';
      } else if (
        queryParam.includes('team') ||
        queryParam.includes('who we are') ||
        queryParam.includes('founder')
      ) {
        setCurrentPage('who-we-are');
        initialPage = 'who-we-are';
      } else if (
        queryParam.includes('client') ||
        queryParam.includes('trust') ||
        queryParam.includes('partner')
      ) {
        setCurrentPage('who-trust-us');
        initialPage = 'who-trust-us';
      } else if (queryParam.includes('what we are') || queryParam.includes('about')) {
        setCurrentPage('what-we-are');
        initialPage = 'what-we-are';
      } else {
        setViewAllDrawerOpen(true);
      }
    }

    if (!window.history.state) {
      window.history.replaceState(
        {
          page: initialPage,
          memberId: portfolioParam || null,
          modal: caseParam ? 'case-study' : newsParam ? 'news' : null
        },
        '',
        window.location.href
      );
    }
  }, []);

  // Dynamically sync SEO title, meta description, OpenGraph, canonical URL, and BreadcrumbList per route/case study/portfolio
  useEffect(() => {
    let title = 'ANSH&CO | AI Solutions, Branding, Web Engineering & Growth Agency';
    let description =
      'ANSH&CO is an in-house Brand Custodian, Next.js Web Engineering, AI Workflow Automation & Viral Marketing Studio in Dehradun serving global brands. Call +91 76684 22047.';
    let canonicalUrl = 'https://anshandco.com/';

    const rawPath = window.location.pathname.replace(/^\/+|\/+$/g, '');
    const searchParams = new URLSearchParams(window.location.search);
    const hasQueryPage = searchParams.has('page');

    const serviceRouteMeta: Record<string, { title: string; description: string; url: string }> = {
      'services/ai-automation': {
        title: 'AI Workflow Automation & Custom CRM Engineering Studio | ANSH&CO',
        description:
          'ANSH&CO engineers trigger-based AI workflow automations, autonomous sales agents, WhatsApp lead capture, and custom CRM/ERP software in Dehradun, India.',
        url: 'https://anshandco.com/services/ai-automation'
      },
      'services/web-engineering': {
        title: 'High-Speed Next.js Web Development & Mobile App Studio | ANSH&CO',
        description:
          'Bespoke React & Next.js web engineering, headless e-commerce, iOS/Android mobile apps, and 99+ PageSpeed Core Web Vitals optimization by ANSH&CO.',
        url: 'https://anshandco.com/services/web-engineering'
      },
      'services/brand-custodianship': {
        title: 'Luxury Brand Identity, Packaging Design & 3D Motion Studio | ANSH&CO',
        description:
          '3x India’s Best Design Awards (IBDA) 2026 winning brand custodianship, bespoke visual identity, luxury tactile packaging, and 3D liquid chrome reveals by ANSH&CO.',
        url: 'https://anshandco.com/services/brand-custodianship'
      },
      'services/seo-growth': {
        title: 'Technical SEO, AEO, GEO & Viral Performance Growth Agency | ANSH&CO',
        description:
          'Dominate Google Search, AI Answer Engines (ChatGPT, Perplexity, Gemini), Meta & Google Ads, and viral short-form video reels with ANSH&CO Growth Studio.',
        url: 'https://anshandco.com/services/seo-growth'
      }
    };

    if (selectedCaseStudy) {
      title = `${selectedCaseStudy.title} — ${selectedCaseStudy.client} Case Study | ANSH&CO`;
      description = `${selectedCaseStudy.summary} Delivered by ANSH&CO Brand Custodianship & AI Engineering Studio.`;
      canonicalUrl = `https://anshandco.com/?case=${selectedCaseStudy.id}`;
    } else if (selectedNews) {
      title = `${selectedNews.title} — ${selectedNews.category} | ANSH&CO`;
      description = selectedNews.summary;
      canonicalUrl = `https://anshandco.com/?news=${selectedNews.id}`;
    } else if (selectedMemberId) {
      const member = TEAM_MEMBERS.find(
        (m) =>
          m.id === selectedMemberId ||
          m.name.toLowerCase() === selectedMemberId.toLowerCase()
      );
      if (member) {
        title = `${member.name} — ${member.role} | ANSH&CO`;
        description = `${member.name} (${member.role}) at ANSH&CO: ${member.tagline}`;
        canonicalUrl = `https://anshandco.com/?portfolio=${member.id}`;
      }
    } else if (serviceRouteMeta[rawPath]) {
      title = serviceRouteMeta[rawPath].title;
      description = serviceRouteMeta[rawPath].description;
      canonicalUrl = serviceRouteMeta[rawPath].url;
    } else if (rawPath === 'about' && currentPage === 'what-we-are') {
      title = 'About Us | ANSH&CO — Brand Custodians, AI Solutions & Web Engineering Studio';
      description =
        'About ANSH&CO: Independent 100% in-house Brand Custodianship, Next.js Web Engineering, AI Workflow Automation, Custom CRM/ERP & Viral Marketing Studio in Dehradun, India.';
      canonicalUrl = 'https://anshandco.com/about';
    } else if (currentPage === 'what-we-are') {
      title = 'What We Are? | Brand Custodian & AI Engineering Studio — ANSH&CO';
      description =
        'Discover ANSH&CO’s 4 core pillars: Strategic Rigor, Visual Architecture, Bespoke Code & AI, and Long-Term Brand Custodianship in Dehradun, India.';
      canonicalUrl = hasQueryPage
        ? 'https://anshandco.com/?page=what-we-are'
        : 'https://anshandco.com/what-we-are';
    } else if (currentPage === 'who-we-are') {
      title = 'Who We Are? | Multidisciplinary Engineers, Designers & Strategists — ANSH&CO';
      description =
        'Meet the 100% in-house collective of full-stack engineers, AI architects, brand strategists, and master video editors at ANSH&CO Studios in Dehradun.';
      canonicalUrl = hasQueryPage
        ? 'https://anshandco.com/?page=who-we-are'
        : 'https://anshandco.com/who-we-are';
    } else if (currentPage === 'what-we-provide') {
      title = 'What We Provide? | Next.js Web Dev, AI Automation, Branding & SEO — ANSH&CO';
      description =
        'Explore ANSH&CO capabilities: Custom React & Next.js Web Engineering, AI Workflow & CRM Automation, Brand Identity, Technical SEO, and Viral Reel Production.';
      canonicalUrl = hasQueryPage
        ? 'https://anshandco.com/?page=what-we-provide'
        : 'https://anshandco.com/what-we-provide';
    } else if (currentPage === 'who-trust-us') {
      title = 'Who Trust Us? | Enterprise Partners & Client Case Studies — ANSH&CO';
      description =
        'Trusted by global leaders including Warner Bros. Discovery, The Coffee Bean & Tea Leaf, Kanpeki, Bharatiyam Beverages, T&T Group, and Disha Publication.';
      canonicalUrl = hasQueryPage
        ? 'https://anshandco.com/?page=who-trust-us'
        : 'https://anshandco.com/who-trust-us';
    } else if (currentPage === 'contact') {
      title = 'Contact Us | ANSH&CO — Speak With Studio Leadership';
      description =
        'Contact ANSH&CO Studios & Headquarters in Aman Vihar, Dehradun, India. Call +91 76684 22047 or +91 91527 62613, or email contact@anshandco.com.';
      canonicalUrl = 'https://anshandco.com/contact';
    } else if (currentPage === 'terms') {
      title = 'Terms of Service | ANSH&CO — Legal & Commercial Terms';
      description =
        'Official Terms of Service, intellectual property ownership, milestone billing, and AI content usage policy for ANSH&CO (anshandco.com).';
      canonicalUrl = 'https://anshandco.com/terms';
    } else if (currentPage === 'privacy') {
      title = 'Privacy Policy | ANSH&CO — Data Protection & Confidentiality';
      description =
        'Official Privacy Policy, enterprise NDA protection, and data handling practices of ANSH&CO Studios & Headquarters (anshandco.com).';
      canonicalUrl = 'https://anshandco.com/privacy';
    }

    document.title = title;

    const setMeta = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute('content', content);
    };

    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:url"]', canonicalUrl);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);

    const canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonicalEl) canonicalEl.setAttribute('href', canonicalUrl);

    const selfLinkEl = document.querySelector('link[rel="self"]');
    if (selfLinkEl) selfLinkEl.setAttribute('href', canonicalUrl);

    // Dynamically update hierarchical BreadcrumbList JSON-LD for the active route
    const breadcrumbItems: Array<{
      '@type': 'ListItem';
      position: number;
      name: string;
      item: string;
    }> = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'ANSH&CO — Where it begins?',
        item: 'https://anshandco.com/'
      }
    ];

    if (selectedCaseStudy) {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: `${selectedCaseStudy.title} — Case Study`,
        item: `https://anshandco.com/?case=${selectedCaseStudy.id}`
      });
    } else if (selectedMemberId) {
      const member = TEAM_MEMBERS.find(
        (m) =>
          m.id === selectedMemberId ||
          m.name.toLowerCase() === selectedMemberId.toLowerCase()
      );
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: 'Who we are?',
        item: 'https://anshandco.com/who-we-are'
      });
      if (member) {
        breadcrumbItems.push({
          '@type': 'ListItem',
          position: 3,
          name: `${member.name} — ${member.role}`,
          item: `https://anshandco.com/?portfolio=${member.id}`
        });
      }
    } else if (serviceRouteMeta[rawPath]) {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: 'What we provide?',
        item: 'https://anshandco.com/what-we-provide'
      });
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 3,
        name: serviceRouteMeta[rawPath].title.split('|')[0].trim(),
        item: serviceRouteMeta[rawPath].url
      });
    } else if (currentPage === 'what-we-are') {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: 'What we are?',
        item: canonicalUrl
      });
    } else if (currentPage === 'who-we-are') {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: 'Who we are?',
        item: canonicalUrl
      });
    } else if (currentPage === 'what-we-provide') {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: 'What we provide?',
        item: canonicalUrl
      });
    } else if (currentPage === 'who-trust-us') {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: 'Who trust us?',
        item: canonicalUrl
      });
    } else if (currentPage === 'contact' || currentPage === 'terms' || currentPage === 'privacy') {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: title.split('|')[0].trim(),
        item: canonicalUrl
      });
    }

    let dynamicBreadcrumbEl = document.getElementById(
      'dynamic-breadcrumb-jsonld'
    ) as HTMLScriptElement | null;
    if (!dynamicBreadcrumbEl) {
      dynamicBreadcrumbEl = document.createElement('script');
      dynamicBreadcrumbEl.id = 'dynamic-breadcrumb-jsonld';
      dynamicBreadcrumbEl.type = 'application/ld+json';
      document.head.appendChild(dynamicBreadcrumbEl);
    }
    dynamicBreadcrumbEl.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems
    });
  }, [currentPage, selectedMemberId, selectedCaseStudy, selectedNews]);

  // Listen to browser popstate (phone back / cancel button & browser back/forward)
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      // 1. If any modal was open, close it and prevent leaving website
      if (contactOpen || selectedCaseStudy || selectedNews || viewAllDrawerOpen) {
        setContactOpen(false);
        setSelectedCaseStudy(null);
        setSelectedNews(null);
        setViewAllDrawerOpen(false);
        return;
      }

      // 2. If viewing a member's portfolio, go back to Who We Are team list
      if (selectedMemberId) {
        setSelectedMemberId(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // 3. Page navigation based on history state or URL
      const state = e.state;
      if (state && state.page) {
        setCurrentPage(state.page);
        setSelectedMemberId(state.memberId || null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const searchParams = new URLSearchParams(window.location.search);
        const pParam = searchParams.get('portfolio') || searchParams.get('member');
        const pgParam = searchParams.get('page') as PageRoute | null;
        const cleanPath = window.location.pathname.replace(/^\/+|\/+$/g, '');
        const pathRoute: PageRoute | null =
          cleanPath === 'about' || cleanPath === 'services/brand-custodianship'
            ? 'what-we-are'
            : cleanPath.startsWith('services/')
            ? 'what-we-provide'
            : (['what-we-are', 'who-we-are', 'what-we-provide', 'who-trust-us', 'terms', 'privacy', 'contact'].includes(cleanPath)
                ? (cleanPath as PageRoute)
                : null);

        if (pParam) {
          setCurrentPage('who-we-are');
          setSelectedMemberId(pParam);
        } else if (pgParam || pathRoute) {
          setCurrentPage((pgParam || pathRoute) as PageRoute);
          setSelectedMemberId(null);
        } else {
          setCurrentPage('home');
          setSelectedMemberId(null);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [contactOpen, selectedCaseStudy, selectedNews, viewAllDrawerOpen, selectedMemberId]);

  const scrollToSection = (sectionId: string) => {
    if (currentPage !== 'home') {
      handleNavigatePage('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigatePage = (page: PageRoute, replace = false) => {
    setSelectedMemberId(null);
    setSelectedCaseStudy(null);
    setSelectedNews(null);
    setContactOpen(false);
    setViewAllDrawerOpen(false);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const targetUrl = page === 'home' ? '/' : `/${page}`;
    const stateObj = { page, memberId: null, modal: null };
    if (replace) {
      window.history.replaceState(stateObj, '', targetUrl);
    } else {
      window.history.pushState(stateObj, '', targetUrl);
    }
  };

  const handleSelectMember = (memberId: string | null) => {
    setSelectedMemberId(memberId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (memberId) {
      window.history.pushState({ page: 'who-we-are', memberId, modal: null }, '', `?portfolio=${memberId}`);
    } else {
      window.history.pushState({ page: 'who-we-are', memberId: null, modal: null }, '', '/who-we-are');
    }
  };

  const handleSelectCaseStudy = (study: CaseStudy | null) => {
    setSelectedCaseStudy(study);
    if (study) {
      window.history.pushState({ page: currentPage, memberId: selectedMemberId, modal: 'case-study', id: study.id }, '', `?case=${study.id}`);
    }
  };

  const handleCloseCaseStudy = () => {
    setSelectedCaseStudy(null);
    if (window.history.state?.modal === 'case-study') {
      window.history.back();
    }
  };

  const handleSelectNews = (news: NewsUpdate | null) => {
    setSelectedNews(news);
    if (news) {
      window.history.pushState({ page: currentPage, memberId: selectedMemberId, modal: 'news', id: news.id }, '', `?news=${news.id}`);
    }
  };

  const handleCloseNews = () => {
    setSelectedNews(null);
    if (window.history.state?.modal === 'news') {
      window.history.back();
    }
  };

  const handleOpenContact = () => {
    setContactOpen(true);
    window.history.pushState({ page: currentPage, memberId: selectedMemberId, modal: 'contact' }, '', '?contact=true');
  };

  const handleCloseContact = () => {
    setContactOpen(false);
    if (window.history.state?.modal === 'contact') {
      window.history.back();
    }
  };

  const handleOpenViewAll = (tab: 'works' | 'clients' | 'news') => {
    setViewAllTab(tab);
    setViewAllDrawerOpen(true);
    window.history.pushState({ page: currentPage, memberId: selectedMemberId, modal: 'view-all', tab }, '', `?view=${tab}`);
  };

  const handleCloseViewAll = () => {
    setViewAllDrawerOpen(false);
    if (window.history.state?.modal === 'view-all') {
      window.history.back();
    }
  };

  const handleSelectClient = (client: ClientPartner) => {
    handleOpenViewAll('clients');
  };

  // Keyboard navigation event listener
  useEffect(() => {
    const HOME_SECTIONS = [
      'hero-section',
      'manifesto-section',
      'reel-section',
      'mission-section',
      'selected-works-section',
      'capabilities-section',
      'cta-section',
      'footer-section'
    ];
    const NAV_PAGES: PageRoute[] = ['home', 'what-we-are', 'who-we-are', 'what-we-provide', 'who-trust-us'];

    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. ESC key: closes any open modal or drawer
      if (e.key === 'Escape') {
        if (contactOpen) {
          setContactOpen(false);
          return;
        }
        if (selectedCaseStudy) {
          setSelectedCaseStudy(null);
          return;
        }
        if (selectedNews) {
          setSelectedNews(null);
          return;
        }
        if (viewAllDrawerOpen) {
          setViewAllDrawerOpen(false);
          return;
        }
        if (selectedMemberId) {
          setSelectedMemberId(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        return;
      }

      // Ignore if user is currently typing in an input, textarea, or select
      const activeEl = document.activeElement as HTMLElement | null;
      if (activeEl) {
        const tagName = activeEl.tagName;
        if (tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT' || activeEl.isContentEditable) {
          return;
        }
      }

      // If a modal is open, allow in-modal navigation and prevent page scroll
      const isAnyModalOpen = contactOpen || !!selectedCaseStudy || !!selectedNews || viewAllDrawerOpen;
      if (isAnyModalOpen) {
        if (selectedCaseStudy && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
          e.preventDefault();
          const allStudies = CASE_STUDIES;
          const currentIdx = allStudies.findIndex((s) => s.id === selectedCaseStudy.id);
          if (currentIdx !== -1) {
            const delta = e.key === 'ArrowRight' ? 1 : -1;
            const nextIdx = (currentIdx + delta + allStudies.length) % allStudies.length;
            setSelectedCaseStudy(allStudies[nextIdx]);
          }
        }
        return;
      }

      // 2. Main Page Navigation: ArrowLeft and ArrowRight
      if (e.key === 'ArrowRight' && !e.altKey && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        const currentIdx = NAV_PAGES.indexOf(currentPage);
        if (currentIdx !== -1) {
          const nextIdx = (currentIdx + 1) % NAV_PAGES.length;
          handleNavigatePage(NAV_PAGES[nextIdx]);
        }
        return;
      }

      if (e.key === 'ArrowLeft' && !e.altKey && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        const currentIdx = NAV_PAGES.indexOf(currentPage);
        if (currentIdx !== -1) {
          const prevIdx = (currentIdx - 1 + NAV_PAGES.length) % NAV_PAGES.length;
          handleNavigatePage(NAV_PAGES[prevIdx]);
        }
        return;
      }

      // 3. Section Navigation: ArrowDown, ArrowUp, Spacebar
      const isDownKey = e.key === 'ArrowDown' || (e.key === ' ' && !e.shiftKey) || e.key === 'PageDown';
      const isUpKey = e.key === 'ArrowUp' || (e.key === ' ' && e.shiftKey) || e.key === 'PageUp';

      if (isDownKey || isUpKey) {
        e.preventDefault();

        if (currentPage === 'home') {
          const scrollY = window.scrollY;
          const sectionElements = HOME_SECTIONS.map((id) => {
            const el = document.getElementById(id);
            if (!el) return null;
            const rect = el.getBoundingClientRect();
            return { id, top: rect.top + scrollY };
          }).filter(Boolean) as { id: string; top: number }[];

          if (isDownKey) {
            // Find next section below current view
            const nextSec = sectionElements.find((s) => s.top > scrollY + 80);
            if (nextSec) {
              window.scrollTo({ top: Math.max(0, nextSec.top - 80), behavior: 'smooth' });
            } else {
              window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }
          } else {
            // Find previous section above current view
            const prevSections = sectionElements.filter((s) => s.top < scrollY - 80);
            const prevSec = prevSections[prevSections.length - 1];
            if (prevSec) {
              window.scrollTo({ top: Math.max(0, prevSec.top - 80), behavior: 'smooth' });
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }
        } else {
          // On other pages, smoothly scroll through content blocks
          const step = window.innerHeight * 0.75;
          window.scrollBy({
            top: isDownKey ? step : -step,
            behavior: 'smooth'
          });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    currentPage,
    contactOpen,
    selectedCaseStudy,
    selectedNews,
    viewAllDrawerOpen,
    selectedMemberId
  ]);

  return (
    <div className="relative min-h-screen bg-white text-black dark:bg-[#080808] dark:text-neutral-100 font-sans selection:bg-orange-500 selection:text-white transition-colors duration-300">
      {/* Global Navigation Header */}
      <Navbar
        currentPage={currentPage}
        onNavigatePage={handleNavigatePage}
        onOpenContact={handleOpenContact}
      />

      <main className="w-full flex flex-col">
        {currentPage === 'home' && (
          <>
            <h1 className="sr-only">
              ANSH&amp;CO — In-House Brand Custodianship, Next.js Web Engineering, AI Workflow Automation &amp; Growth Studio
            </h1>
            {/* Section 2: Hero Video & Custom Cursor Area (Initial Mount Hero Entrance) */}
            <div id="hero-section">
              <HeroVideo />
            </div>

            {/* Section 3: Kinetic Typographic Manifesto [ PURPOSE + HUMAN + CREATIVE ] */}
            <ScrollReveal id="manifesto-section" direction="up" distance={32} duration={850}>
              <KineticManifesto onKnowMore={() => handleNavigatePage('what-we-provide')} />
            </ScrollReveal>

            {/* Section 4: Brand Reel Transition (Fluid Ribbon) */}
            <ScrollReveal id="reel-section" direction="up" distance={36} duration={850}>
              <BrandReelDivider />
            </ScrollReveal>

            {/* Section 5: Brand Mission Statement & Kinetic Logo (WE HELP BUILD BRANDS) */}
            <ScrollReveal id="mission-section" direction="up" distance={36} duration={850}>
              <MissionSection onKnowMore={() => handleNavigatePage('what-we-provide')} />
            </ScrollReveal>

            {/* Section 6: Selected Works / Portfolio Showcase [ SOMETHING LIGHT LIKE OUR THEME? ] */}
            <ScrollReveal id="selected-works-section" direction="up" distance={40} duration={900}>
              <SelectedWorksSection
                onSelectCaseStudy={handleSelectCaseStudy}
                onViewAll={() => handleOpenViewAll('works')}
              />
            </ScrollReveal>

            {/* Section 8: Capabilities & FAQ Accordion [ SERVICES & GOOD QUESTIONS ] */}
            <ScrollReveal id="capabilities-section" direction="up" distance={36} duration={850}>
              <CapabilitiesSection
                onKnowMore={() => handleNavigatePage('what-we-provide')}
                onOpenContact={handleOpenContact}
              />
            </ScrollReveal>

            {/* Section 9: Call to Action Banner (WORK WITH US. LET'S CREATE SOMETHING BOLD.) */}
            <ScrollReveal id="cta-section" direction="up" distance={32} duration={850}>
              <WorkWithUsCTA
                onOpenContact={handleOpenContact}
              />
            </ScrollReveal>
          </>
        )}

        {/* Page 1: What we are? */}
        {currentPage === 'what-we-are' && (
          <WhatWeArePage
            onOpenContact={handleOpenContact}
            onNavigateToProvide={() => handleNavigatePage('what-we-provide')}
            onNavigateToTeam={() => handleNavigatePage('who-we-are')}
            onNavigateToTrust={() => handleNavigatePage('who-trust-us')}
          />
        )}

        {/* Page 2: Who we are? or Member Portfolio Case Study */}
        {currentPage === 'who-we-are' && (
          selectedMemberId ? (
            <MemberPortfolioPage
              memberId={selectedMemberId}
              onBack={() => handleSelectMember(null)}
              onSelectMember={(id) => handleSelectMember(id)}
              onOpenContact={handleOpenContact}
            />
          ) : (
            <WhoWeArePage
              onOpenContact={handleOpenContact}
              onSelectMember={(id) => handleSelectMember(id)}
            />
          )
        )}

        {/* Page 3: What we provide? */}
        {currentPage === 'what-we-provide' && (
          <WhatWeProvidePage
            onOpenContact={handleOpenContact}
            onNavigateToWhoTrustUs={() => handleNavigatePage('who-trust-us')}
          />
        )}

        {/* Page 4: Who Trust us? */}
        {currentPage === 'who-trust-us' && (
          <WhoTrustUsPage
            onOpenContact={handleOpenContact}
            onSelectClient={handleSelectClient}
            onNavigateToWhatWeAre={() => handleNavigatePage('what-we-are')}
          />
        )}

        {/* Legal & Contact Pages */}
        {currentPage === 'terms' && (
          <TermsPage
            onNavigatePage={handleNavigatePage}
            onOpenContact={handleOpenContact}
          />
        )}

        {currentPage === 'privacy' && (
          <PrivacyPage
            onNavigatePage={handleNavigatePage}
            onOpenContact={handleOpenContact}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            onNavigatePage={handleNavigatePage}
            onOpenContact={handleOpenContact}
          />
        )}
      </main>

      {/* Site Footer & Navigation */}
      <div id="footer-section">
        <Footer
          onOpenContact={handleOpenContact}
          onNavigate={scrollToSection}
          onNavigatePage={handleNavigatePage}
        />
      </div>

      {/* Modals & Dialogs */}
      <ContactModal isOpen={contactOpen} onClose={handleCloseContact} />
      {selectedCaseStudy && (
        <CaseStudyModal
          study={selectedCaseStudy}
          onClose={handleCloseCaseStudy}
          onOpenContact={() => {
            handleCloseCaseStudy();
            handleOpenContact();
          }}
        />
      )}
      {selectedNews && (
        <NewsModal
          update={selectedNews}
          onClose={handleCloseNews}
          onOpenContact={() => {
            handleCloseNews();
            handleOpenContact();
          }}
        />
      )}
      <ViewAllDrawer
        isOpen={viewAllDrawerOpen}
        initialTab={viewAllTab}
        onClose={handleCloseViewAll}
        onSelectCaseStudy={(study) => {
          handleCloseViewAll();
          handleSelectCaseStudy(study);
        }}
        onSelectNews={(news) => {
          handleCloseViewAll();
          handleSelectNews(news);
        }}
      />
    </div>
  );
}
