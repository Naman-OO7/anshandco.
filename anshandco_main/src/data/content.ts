import { ClientPartner, CaseStudy, NewsUpdate, ServiceItem } from '../types';

export const CLIENT_PARTNERS: ClientPartner[] = [
  {
    id: 'kanpeki',
    name: 'KANPEKI',
    logoUrl: '/brand-logos/Kanpeki.svg',
    fallbackSig: 1,
    category: 'Beauty & Skincare',
    description: 'A six-year partnership that shaped Kanpeki from formulation to finish, building its products, packaging, activations, website, D2C strategy, and marketplace presence.'
  },
  {
    id: 'cbtl',
    name: 'THE COFFEE BEAN & TEA LEAF',
    logoUrl: '/brand-logos/CBTL.svg',
    fallbackSig: 2,
    category: 'F&B / Hospitality',
    description: "Partnered for the Maldives launch and led India's national expansion, shaping campaigns, design, and communication that introduced the brand's legacy to new audiences."
  },
  {
    id: 'wbd',
    name: 'WARNER BROS. DISCOVERY',
    logoUrl: '/brand-logos/WBD.svg',
    fallbackSig: 3,
    category: 'Entertainment',
    description: "Strategic and creative support for new show launches, driving engagement, visibility, and cultural relevance across the entertainment network's evolving portfolio."
  },
  {
    id: 'bharatiyam',
    name: 'BHARATIYAM BEVERAGES',
    logoUrl: '/brand-logos/Bharatiyam.svg',
    fallbackSig: 4,
    category: 'Beverages & Manufacturing',
    description: "Reimagined Bharatiyam's legacy into a modern, purpose-driven brand. Created a visual language and identity that unified teams internally and created distinction in India's dynamic beverage landscape."
  },
  {
    id: 'tt-group',
    name: 'T&T GROUP',
    logoUrl: '/brand-logos/T&T.svg',
    fallbackSig: 5,
    category: 'Real Estate & Infrastructure',
    description: 'Real estate communication & flagship projects across Delhi NCR, shaping customer sentiment, high-profile project launches, and distinct market positioning.'
  },
  {
    id: 'disha',
    name: 'DISHA PUBLICATION',
    logoUrl: '/brand-logos/Disha.svg',
    fallbackSig: 6,
    category: 'Publishing & EdTech',
    description: 'Academic publisher category-based redesign, modernizing educational editorial systems and strengthening digital learning touchpoints.'
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'roots-and-sky',
    title: 'MARKET MEIN BHAUKAAL',
    client: 'ANSH&CO.',
    mediaType: 'image',
    mediaUrl: 'https://file.garden/aqpuSRZZW6ZbIllx/meme1.jpg',
    posterUrl: 'https://file.garden/aqpuSRZZW6ZbIllx/meme1.jpg',
    gallery: [
      'https://file.garden/aqpuSRZZW6ZbIllx/meme1.jpg',
      'https://file.garden/aqpuSRZZW6ZbIllx/meme5.jpg'
    ],
    fallbackSig: 2,
    dimensions: '278x450',
    aspectClass: 'aspect-[9/14]',
    colSpanClass: 'col-span-12 md:col-span-3',
    summary: 'You handle the business while we create undeniable market dominance through killer brand strategy, explosive Meta & Google performance ads, and cultural hype.',
    tags: ['Brand Strategy', 'Market Dominance', 'Performance Ads', 'Social Hype'],
    link: 'https://www.anshandco.com',
    fullDetails: {
      deliverables: ['Brand Dominance Playbook', 'Market Positioning Strategy', 'High-ROAS Ad Creatives', 'Social Media Takeover'],
      timeline: 'Continuous Momentum',
      impact: '10x market visibility and undisputed regional category authority'
    }
  },
  {
    id: 'otr-make-it-yours',
    title: 'BACCHA HAI TU MERA',
    client: 'ANSH&CO.',
    mediaType: 'image',
    mediaUrl: 'https://file.garden/aqpuSRZZW6ZbIllx/meme2.jpg',
    posterUrl: 'https://file.garden/aqpuSRZZW6ZbIllx/meme2.jpg',
    gallery: [
      'https://file.garden/aqpuSRZZW6ZbIllx/meme2.jpg',
      'https://file.garden/aqpuSRZZW6ZbIllx/m3.jpg'
    ],
    fallbackSig: 3,
    dimensions: '278x450',
    aspectClass: 'aspect-[9/14]',
    colSpanClass: 'col-span-12 md:col-span-3',
    summary: 'Hand over your messy raw footage because our in-house master editors transform basic clips into cinematic viral gold for Instagram Reels, YouTube Shorts, and high-ROAS video ads.',
    tags: ['Video Editing', 'Post Production', 'Motion Design', 'Viral Cuts'],
    link: 'https://www.anshandco.com',
    fullDetails: {
      deliverables: ['Commercial Video Editing', 'High-Retention Short Form Cuts', 'Sound Design & Mastering', 'Color Grading'],
      timeline: 'Rapid Turnaround',
      impact: 'Over 25M organic views generated across social media campaign reels'
    }
  },
  {
    id: 'ruru',
    title: 'OUR REVEAL',
    client: 'ANSH&CO.',
    mediaType: 'video',
    mediaUrl: 'https://file.garden/aqpuSRZZW6ZbIllx/anshandco_logo.mp4',
    posterUrl: '/anshandco-poster.jpg',
    gallery: ['/anshandco-poster.jpg'],
    fallbackSig: 7,
    dimensions: '572x700',
    aspectClass: 'aspect-[4/5]',
    colSpanClass: 'col-span-12 md:col-span-6',
    summary: 'We spent countless late nights debating whether our brandmark should whisper quiet luxury or aggressively flex category dominance. In the end, we decided: why compromise when you can deboss heavy black cardstock, stamp custom shopping bags, and let kinetic light streaks do all the boasting? Here is the identity that makes other agencies secretly reconsider their entire portfolio.',
    tags: ['Brand Identity', 'Logo Animation', 'Agency Reveal', 'Motion Design'],
    link: 'https://www.anshandco.com',
    fullDetails: {
      deliverables: ['Signature Brand Mark', 'Kinetic Logo Animation', 'Luxury Spatial Collateral', 'Sound Identity'],
      timeline: 'In-House Masterpiece',
      impact: '100% unapologetic aesthetic authority and category distinction'
    }
  },
  {
    id: 'goodhairr-co-professional',
    title: 'ANSH&CO. PROFESSIONAL',
    client: 'ANSH&CO. Professional',
    mediaType: 'video',
    mediaUrl: 'https://file.garden/aqpuSRZZW6ZbIllx/Liquid_chrome_logo_reveal.mp4',
    posterUrl: '/liquid-chrome-poster.jpg',
    gallery: ['/liquid-chrome-poster.jpg'],
    fallbackSig: 4,
    dimensions: '1176x650',
    aspectClass: 'aspect-[16/9]',
    colSpanClass: 'col-span-12',
    summary: 'A professional branding-first independent company where we do strategy, design, creativity and make ai solutions. Turning category authority into a wordmark that reads like a compliment, and a system that stands with the people who shape it.',
    tags: ['Rebranding', 'Packaging System', 'Salon Spatial Kit', 'Campaign Film'],
    link: 'https://www.anshandco.com',
    fullDetails: {
      deliverables: ['Comprehensive Rebranding', 'Liquid Chrome Reveal Animation', 'Salon Lookbook', 'Video Series'],
      timeline: '7 Months',
      impact: 'Adopted across 450+ premier salons within 6 months'
    }
  },
  {
    id: 'showcase-extension-1',
    title: 'WEBSITE SLOW HAI LAALE?',
    client: 'ANSH&CO.',
    mediaType: 'image',
    mediaUrl: 'https://file.garden/aqpuSRZZW6ZbIllx/m1.jpg',
    posterUrl: 'https://file.garden/aqpuSRZZW6ZbIllx/m1.jpg',
    gallery: [
      'https://file.garden/aqpuSRZZW6ZbIllx/m1.jpg',
      'https://file.garden/aqpuSRZZW6ZbIllx/m2.jpg'
    ],
    fallbackSig: 14,
    dimensions: '1200x1500',
    aspectClass: 'aspect-[4/5]',
    colSpanClass: 'col-span-12 md:col-span-4',
    summary: 'User rukta nahi... seedha bhaag jata hai, phir bolte ho sale kyu nahi? We engineer high-speed digital performance, lightning-fast Next.js interfaces, and conversion-optimized architectures so your traffic actually turns into sales and inbound calls.',
    tags: ['Web Performance', 'Conversion Optimization', 'Landing Pages', 'Viral Creatives'],
    link: 'https://www.anshandco.com',
    fullDetails: {
      deliverables: ['Performance Web Architecture', 'Conversion Funnel Redesign', 'Speed & Latency Optimization', 'High-Converting Landing Pages'],
      timeline: 'Performance Sprint',
      impact: '99+ PageSpeed score, near-zero bounce rate, and 3.4x spike in direct-to-consumer sales'
    }
  },
  {
    id: 'showcase-extension-2',
    title: 'SAMAY BADAL RAHA HAI',
    client: 'ANSH&CO.',
    mediaType: 'carousel',
    mediaUrl: 'https://file.garden/aqpuSRZZW6ZbIllx/m3.jpg',
    posterUrl: 'https://file.garden/aqpuSRZZW6ZbIllx/m3.jpg',
    gallery: [
      'https://file.garden/aqpuSRZZW6ZbIllx/m3.jpg',
      'https://file.garden/aqpuSRZZW6ZbIllx/meme5.jpg',
      'https://file.garden/aqpuSRZZW6ZbIllx/m2.jpg'
    ],
    fallbackSig: 15,
    dimensions: '1199x1499',
    aspectClass: 'aspect-[4/5]',
    colSpanClass: 'col-span-12 md:col-span-4',
    summary: 'Samay badal raha hai aur bhagwan ka diya sab kuch hai, bas acchi marketing nahi hai? Aa jao, viral meme strategy, killer pop-culture hooks aur high-converting Meta & Google campaigns se sab badalenge.',
    tags: ['Meme Marketing', 'Pop Culture Strategy', 'Viral Campaigns', 'Social Growth'],
    link: 'https://www.anshandco.com',
    fullDetails: {
      deliverables: ['Meme Marketing Campaigns', 'Pop-Culture Moment Marketing', 'Viral Social Creative System', 'High-Retention Visual Hooks'],
      timeline: 'Viral Takeover',
      impact: '15M+ organic impressions across youth & business founder demographics'
    }
  },
  {
    id: 'showcase-extension-3',
    title: 'BUSINESS AUTOMATION & WORKFLOWS',
    client: 'ANSH&CO.',
    mediaType: 'video',
    mediaUrl: 'https://file.garden/aqpuSRZZW6ZbIllx/feature_video.mp4',
    posterUrl: '/feature_video-poster.jpg',
    gallery: ['/feature_video-poster.jpg'],
    fallbackSig: 16,
    dimensions: '720x1280',
    aspectClass: 'aspect-[4/5]',
    colSpanClass: 'col-span-12 md:col-span-4',
    summary: 'Your business looks good, but manual bottlenecks kill growth. We engineer intelligent AI workflow automations and trigger-based architectures that automatically capture leads from your website and WhatsApp, sync custom CRM pipelines, and execute complex operations on complete autopilot.',
    tags: ['Business Automation', 'Workflow Systems', 'CRM Integration', 'Trigger Architecture'],
    link: 'https://www.anshandco.com',
    fullDetails: {
      deliverables: ['Custom Trigger Automations', 'CRM & Pipeline Synchronization', 'End-to-End Operational Workflows', 'Error-Free Business Infrastructure'],
      timeline: 'Sprint Delivery',
      impact: '100% automated lead capture and 40+ hours saved per week on manual workflows'
    }
  },
  {
    id: 'our-mocks',
    title: 'OUR MOCK UPS',
    client: 'ANSH&CO.',
    mediaType: 'image',
    mediaUrl: 'https://file.garden/aqpuSRZZW6ZbIllx/l1.jpg',
    posterUrl: 'https://file.garden/aqpuSRZZW6ZbIllx/l1.jpg',
    gallery: [
      'https://file.garden/aqpuSRZZW6ZbIllx/l1.jpg',
      'https://file.garden/aqpuSRZZW6ZbIllx/l2.jpg',
      'https://file.garden/aqpuSRZZW6ZbIllx/l3.jpg',
      'https://file.garden/aqpuSRZZW6ZbIllx/l4.jpg'
    ],
    fallbackSig: 5,
    dimensions: '572x700',
    aspectClass: 'aspect-[4/5]',
    colSpanClass: 'col-span-12 md:col-span-6',
    summary: 'A curated showcase of high-impact brand mockups, distinctive packaging systems, bespoke identities, and mobile-first visual architectures crafted for modern industry leaders. From refined digital touchpoints to physical product formulations, each presentation demonstrates precision typography, strategic visual harmony, and cinematic aesthetics meticulously engineered to command market authority and captivate global audiences.',
    tags: ['Brand Mockups', 'Packaging Systems', 'Mobile Identity', 'Visual Direction'],
    link: 'https://www.anshandco.com',
    fullDetails: {
      deliverables: ['Packaging Mockup Suite', 'Mobile Brand Architecture', 'Visual Design Language', 'Multi-Surface Identity Kits'],
      timeline: 'Ongoing',
      impact: 'Showcasing full-spectrum physical and digital brand touchpoints'
    }
  },
  {
    id: 'makimono',
    title: 'ORGANIC SEO & GROWTH ENGINE',
    client: 'ANSH&CO.',
    mediaType: 'video',
    mediaUrl: 'https://file.garden/aqpuSRZZW6ZbIllx/feature_video2.mp4',
    posterUrl: '/feature_video2-poster.jpg',
    gallery: ['/feature_video2-poster.jpg'],
    fallbackSig: 8,
    dimensions: '720x1280',
    aspectClass: 'aspect-[9/14]',
    colSpanClass: 'col-span-12 md:col-span-3',
    summary: 'Dominating search rankings and capturing high-intent organic traffic demands more than basic keywords. We build technical SEO architecture, high-converting content ecosystems, and scalable organic growth funnels that position your brand at the absolute top of search results, turning organic discovery into compounding revenue.',
    tags: ['Technical SEO', 'Organic Growth', 'Search Dominance', 'Content Strategy'],
    link: 'https://www.anshandco.com',
    fullDetails: {
      deliverables: ['Technical SEO Architecture', 'Keyword Domination Blueprint', 'High-Intent Content Strategy', 'Search Conversion Tracking'],
      timeline: 'Growth Sprint',
      impact: 'Top-3 search rankings across competitive keywords and 4.2x organic customer acquisition'
    }
  },
  {
    id: 'cubic',
    title: 'TERA BHAI SAMBHAL LEGA',
    client: 'ANSH&CO.',
    mediaType: 'video',
    mediaUrl: 'https://file.garden/aqpuSRZZW6ZbIllx/meme3.mp4',
    posterUrl: '/meme3-poster.jpg',
    gallery: [
      '/meme3_frame_01.jpg',
      '/meme3_frame_02.jpg',
      '/meme3_frame_03.jpg',
      '/meme3_frame_04.jpg',
      '/meme3_frame_05.jpg',
      '/meme3_frame_06.jpg',
      '/meme3_frame_07.jpg'
    ],
    fallbackSig: 6,
    dimensions: '278x450',
    aspectClass: 'aspect-[9/14]',
    colSpanClass: 'col-span-12 md:col-span-3',
    summary: 'From viral reels to high-converting digital ads, our creative strategy turns your business into an undeniable powerhouse.',
    tags: ['Creative Strategy', 'Social Media Growth', 'Digital Ads', 'Brand Acceleration'],
    link: 'https://www.anshandco.com',
    fullDetails: {
      deliverables: ['Digital Growth Architecture', 'Viral Creative Framework', 'High-Converting Ad Creatives', 'Cross-Platform SEO'],
      timeline: 'Continuous Momentum',
      impact: 'Explosive cross-channel reach and compounding audience acquisition'
    }
  }
];

export const NEWS_UPDATES: NewsUpdate[] = [
  {
    id: 'ibda-2026',
    title: 'THREE WINS AT IBDA 2026',
    category: 'Awards & Recognition',
    date: 'February 2026',
    imageUrl: '/news/ibda.jpg',
    fallbackSig: 9,
    accentBg: 'bg-black text-white',
    badge: "INDIA'S BEST DESIGN AWARDS",
    summary: "ANSH&CO. has bagged three prestigious trophies at India's Best Design Awards 2026 across Brand Identity, Packaging Design, and Integrated Campaign categories.",
    link: 'https://www.anshandco.com'
  },
  {
    id: 'switzerland-india-80',
    title: 'DESIGNING THE IDENTITY FOR SWITZERLANDINDIA80',
    category: 'Diplomatic & Cultural Identity',
    date: 'January 2026',
    imageUrl: '/news/swiss.jpg',
    fallbackSig: 10,
    accentBg: 'bg-[#d8232a] text-white',
    badge: 'DIPLOMATIC BILATERAL COMMEMORATION',
    summary: 'Selected by the Embassy of Switzerland in India to conceptualize and design the historic 80-year bilateral partnership brandmark and anniversary communication system.',
    link: 'https://www.anshandco.com'
  },
  {
    id: 'best-places-to-work',
    title: "OFFICIALLY ONE OF INDIA'S BEST PLACES TO WORK",
    category: 'Agency Culture & People',
    date: 'December 2025',
    imageUrl: '/news/bptw.jpg',
    fallbackSig: 11,
    accentBg: 'bg-black text-white',
    badge: 'GREAT PLACE TO WORK CERTIFIED',
    summary: "Proud to be certified as one of India's Best Workplaces, validating our human-first ethos, creative freedom, and inclusive agency environment.",
    link: 'https://www.anshandco.com'
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'strategy',
    name: 'STRATEGY',
    iconUrl: '/services-imgs/Strategy.svg',
    fallbackSig: 12,
    tagline: 'We discover truth and carve unassailable market positions.',
    capabilities: [
      'Brand Architecture & Audits',
      'Market & Consumer Research',
      'Brand Positioning & Purpose',
      'Category Definition & Strategy',
      'Go-to-Market (GTM) Planning'
    ]
  },
  {
    id: 'branding',
    name: 'BRANDING',
    iconUrl: '/services-imgs/Branding.svg',
    fallbackSig: 13,
    tagline: 'Crafted visual identities that endure beyond ephemeral design trends.',
    capabilities: [
      'Visual Identity Systems',
      'Logo Systems & Typographic Guidelines',
      'Packaging & Product Unboxing Experience',
      'Environmental & Spatial Signage',
      'Brand Voice, Tone & Nomenclature'
    ]
  },
  {
    id: 'digital',
    name: 'DIGITAL',
    iconUrl: '/services-imgs/Digital.svg',
    fallbackSig: 14,
    tagline: 'Seamless interactive touchpoints engineered with creative precision.',
    capabilities: [
      'UI/UX Architecture & Prototyping',
      'Bespoke Web & App Development',
      'D2C E-commerce Ecosystems',
      'Interactive 3D / WebGL Showcases',
      'Design Systems & Digital Guidelines'
    ]
  },
  {
    id: 'marketing',
    name: 'MARKETING',
    iconUrl: '/services-imgs/Marketing.svg',
    fallbackSig: 15,
    tagline: 'High-impact campaigns designed to ignite cultural dialogue.',
    capabilities: [
      'Integrated Omnichannel Campaigns',
      'Social Strategy & Community Curation',
      'Performance Creative & Acquisition',
      'PR Stunts & Experiential Activations',
      'Influencer Alliances & Co-Branding'
    ]
  },
  {
    id: 'production',
    name: 'PRODUCTION',
    iconUrl: '/services-imgs/Production.svg',
    fallbackSig: 16,
    tagline: 'World-class cinematic motion, stills, 3D and sound craft in-house.',
    capabilities: [
      'Commercial Films & Digital Reels',
      'High-Resolution Commercial Photography',
      '3D Animation, CGI & VFX',
      'Sound Identity, Scoring & Audio Mixing',
      'Print Production & Specialty Finishing'
    ]
  }
];
