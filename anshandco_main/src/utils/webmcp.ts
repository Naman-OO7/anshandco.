import { CASE_STUDIES } from '../data/content';
import { TEAM_MEMBERS } from '../data/team';

export interface WebMCPToolDefinition {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (args: Record<string, unknown>) => Promise<unknown> | unknown;
}

declare global {
  interface Navigator {
    modelContext?: {
      registerTool?: (tool: WebMCPToolDefinition) => void;
      unregisterTool?: (name: string) => void;
      provideContext?: (options: { tools: WebMCPToolDefinition[] }) => void;
      tools?: WebMCPToolDefinition[];
    };
  }
}

export function registerAnshWebMCPTools(): void {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return;

  const tools: WebMCPToolDefinition[] = [
    {
      name: 'get_agency_overview',
      description:
        'Get comprehensive company information about ANSH&CO (Brand Custodianship, Next.js Web Engineering, AI Workflow Automation & Growth Studio in Dehradun, India), including headquarters address, direct leadership phone numbers, email, awards, and core pillars.',
      inputSchema: {
        type: 'object',
        properties: {
          includeTeam: {
            type: 'boolean',
            description: 'Include the 7 core in-house specialist profiles.'
          }
        }
      },
      execute: async (args) => {
        return {
          name: 'ANSH&CO',
          tagline: 'CREATIVE IDEAS. DIGITAL POSSIBILITIES.',
          url: 'https://anshandco.com/',
          headquarters: 'Aman Vihar, Dehradun, Uttarakhand 248001, India',
          email: 'contact@anshandco.com',
          phones: ['+91 76684 22047', '+91 91527 62613'],
          pages: {
            home: 'https://anshandco.com/',
            about: 'https://anshandco.com/about',
            services: 'https://anshandco.com/?page=what-we-provide',
            clients: 'https://anshandco.com/?page=who-trust-us',
            contact: 'https://anshandco.com/contact',
            terms: 'https://anshandco.com/terms',
            privacy: 'https://anshandco.com/privacy'
          },
          pillars: [
            'Strategic Rigor',
            'Visual Architecture',
            'Bespoke Code & AI',
            'Long-Term Brand Custodianship'
          ],
          team: args?.includeTeam
            ? TEAM_MEMBERS.map((m) => ({
                id: m.id,
                name: m.name,
                role: m.role,
                tagline: m.tagline,
                url: `https://anshandco.com/?portfolio=${m.id}`
              }))
            : undefined
        };
      }
    },
    {
      name: 'list_agency_services',
      description:
        'List ANSH&CO 15 in-house capabilities across Next.js Web Development, Mobile Apps, Custom CRM/ERP, AI Workflow Automation, Technical SEO/AEO/GEO, Meta & Google Ads, Brand Identity & Packaging, and Viral Reels Production.',
      inputSchema: {
        type: 'object',
        properties: {
          category: {
            type: 'string',
            enum: ['all', 'engineering', 'ai-automation', 'marketing-seo', 'branding-design', 'video-production'],
            description: 'Optional category to filter services.'
          }
        }
      },
      execute: async () => {
        return {
          provider: 'ANSH&CO',
          url: 'https://anshandco.com/?page=what-we-provide',
          capabilities: [
            'High-Speed React & Next.js Web Development & CRO',
            'Mobile App Development (iOS, Android, React Native, Flutter)',
            'Custom CRM Engineering & Pipeline Automation',
            'Enterprise Resource Planning (ERP) Systems',
            'AI Workflow Automation & Trigger-Based Lead Capture',
            'Full-Funnel Digital Marketing & Conversion Rate Optimization',
            'Technical SEO, AEO & GEO Search Domination',
            'Meta Ads & Google Ads High-ROAS Campaigns',
            'Brand Storytelling & Copywriting',
            'Social Media Management & Community Curation',
            'Viral Meme & Pop-Culture Marketing',
            'Generative AI Video Creation & Synthetic Media',
            'Graphic Designing, Brand Identity & Luxury Packaging',
            'Content Marketing & Authority Whitepapers',
            'Cinematic Video Editing, Viral Reels & Digital PR'
          ]
        };
      }
    },
    {
      name: 'get_case_studies',
      description:
        'Search or retrieve ANSH&CO client case studies and verified ROI results (Next.js CRO, AI Workflow Automation, Viral Meme Marketing, Short-Form Reels, Technical SEO, Luxury Brand Identity).',
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Optional keyword to filter case studies.'
          }
        }
      },
      execute: async (args) => {
        const q = typeof args?.query === 'string' ? args.query.toLowerCase().trim() : '';
        const list = CASE_STUDIES.filter(
          (c) =>
            !q ||
            c.title.toLowerCase().includes(q) ||
            c.client.toLowerCase().includes(q) ||
            c.summary.toLowerCase().includes(q) ||
            c.tags.some((t) => t.toLowerCase().includes(q))
        );
        return {
          count: list.length,
          caseStudies: list.map((c) => ({
            id: c.id,
            title: c.title,
            client: c.client,
            category: c.category,
            summary: c.summary,
            metrics: c.metrics,
            url: `https://anshandco.com/?case=${c.id}`
          }))
        };
      }
    },
    {
      name: 'submit_project_inquiry',
      description:
        'Submit a business inquiry, project brief, or consultation request to ANSH&CO leadership (contact@anshandco.com).',
      inputSchema: {
        type: 'object',
        required: ['name', 'email', 'message'],
        properties: {
          name: { type: 'string', description: 'Your full name' },
          email: { type: 'string', description: 'Your business email address' },
          phone: { type: 'string', description: 'Your phone or WhatsApp number' },
          company: { type: 'string', description: 'Your company or brand name' },
          service: {
            type: 'string',
            description: 'Primary service needed (e.g. Branding & Visual Identity, Digital & Web Development, AI Workflow Automation)'
          },
          message: { type: 'string', description: 'Project brief, goals, and timeline' }
        }
      },
      execute: async (args) => {
        const name = String(args?.name || '');
        const email = String(args?.email || '');
        const phone = String(args?.phone || 'Not provided');
        const company = String(args?.company || 'Not provided');
        const service = String(args?.service || 'Branding & AI Engineering');
        const message = String(args?.message || '');

        const subject = encodeURIComponent(`New Client Inquiry: ${service} — ${name}`);
        const body = encodeURIComponent(
          `Hello ANSH&CO Team,\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${company}\nService: ${service}\n\nProject Brief:\n${message}`
        );
        const mailtoUrl = `mailto:contact@anshandco.com?subject=${subject}&body=${body}`;

        return {
          status: 'ready',
          recipient: 'contact@anshandco.com',
          directPhones: ['+91 76684 22047', '+91 91527 62613'],
          mailtoUrl,
          message: 'Project inquiry prepared for ANSH&CO leadership.'
        };
      }
    }
  ];

  try {
    if (!navigator.modelContext) {
      const registeredTools: WebMCPToolDefinition[] = [];
      Object.defineProperty(navigator, 'modelContext', {
        configurable: true,
        writable: true,
        value: {
          tools: registeredTools,
          registerTool(tool: WebMCPToolDefinition) {
            const idx = registeredTools.findIndex((t) => t.name === tool.name);
            if (idx >= 0) registeredTools[idx] = tool;
            else registeredTools.push(tool);
          },
          unregisterTool(name: string) {
            const idx = registeredTools.findIndex((t) => t.name === name);
            if (idx >= 0) registeredTools.splice(idx, 1);
          },
          provideContext(opts: { tools: WebMCPToolDefinition[] }) {
            if (opts && Array.isArray(opts.tools)) {
              opts.tools.forEach((t) => this.registerTool(t));
            }
          }
        }
      });
    }

    if (typeof navigator.modelContext?.registerTool === 'function') {
      tools.forEach((tool) => {
        try {
          navigator.modelContext?.registerTool?.(tool);
        } catch {
          // Ignore duplicate registration errors in strict browser agents
        }
      });
    } else if (typeof navigator.modelContext?.provideContext === 'function') {
      navigator.modelContext.provideContext({ tools });
    }
  } catch {
    // Fallback if navigator is non-extensible
  }
}
