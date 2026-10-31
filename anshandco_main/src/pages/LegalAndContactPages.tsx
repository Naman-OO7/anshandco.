import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Mail, MapPin, Phone, ShieldCheck, FileText } from 'lucide-react';
import { PageRoute } from '../components/Navbar';

interface LegalPageProps {
  onNavigatePage: (page: PageRoute) => void;
  onOpenContact: () => void;
}

export const TermsPage: React.FC<LegalPageProps> = ({ onNavigatePage, onOpenContact }) => {
  return (
    <section className="w-full max-w-[1120px] mx-auto pt-32 pb-24 px-6 md:px-12 text-black dark:text-neutral-100">
      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-10 mb-12">
        <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#e38528] block mb-3">
          [ LEGAL &amp; GOVERNANCE · ANSH&amp;CO ]
        </span>
        <h1 className="text-[34px] md:text-[52px] font-light uppercase tracking-tight leading-[1.08]">
          Terms of Service &amp; Engagement Agreement
        </h1>
        <p className="text-[14px] text-neutral-500 dark:text-neutral-400 mt-4 font-mono">
          Effective Date: January 1, 2026 · Last Updated: April 2026 · Jurisdiction: Dehradun, Uttarakhand, India
        </p>
      </div>

      <div className="space-y-10 text-[15px] leading-relaxed font-light text-neutral-700 dark:text-neutral-300">
        <div>
          <h2 className="text-[20px] font-normal uppercase tracking-wide text-black dark:text-white mb-3 flex items-center gap-2">
            <FileText size={18} className="text-[#e38528]" />
            1. Introduction &amp; Corporate Identity
          </h2>
          <p>
            Welcome to <strong>ANSH&amp;CO</strong> (&ldquo;Company&rdquo;, &ldquo;Studio&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), an independent Brand Custodianship, Next.js Web Engineering, AI Workflow Automation, Custom CRM/ERP, and Performance Growth Studio headquartered at <strong>Aman Vihar, Dehradun, Uttarakhand 248001, India</strong>. By accessing <a href="https://anshandco.com" className="underline text-[#e38528]">https://anshandco.com</a> or engaging our services, you agree to be bound by these Terms of Service.
          </p>
        </div>

        <div>
          <h2 className="text-[20px] font-normal uppercase tracking-wide text-black dark:text-white mb-3">
            2. Scope of In-House Studio Services
          </h2>
          <p>
            ANSH&amp;CO provides 15 specialized in-house capabilities including High-Speed React &amp; Next.js Web Engineering, Mobile Application Development, Custom CRM &amp; ERP Architecture, AI Workflow Automation, Technical SEO/AEO/GEO, Meta &amp; Google Performance Marketing, Brand Identity &amp; Luxury Packaging Design, and Cinematic Video &amp; Reel Production. Specific deliverables, milestones, and timelines are governed by the mutually executed Statement of Work (SOW) or Brand Custodianship Retainer Agreement for each client engagement.
          </p>
        </div>

        <div>
          <h2 className="text-[20px] font-normal uppercase tracking-wide text-black dark:text-white mb-3">
            3. Pricing, Milestones &amp; Commercial Terms
          </h2>
          <p>
            All engagements operate with 100% upfront pricing transparency. Project-based engineering and identity engagements are billed according to agreed milestone schedules (typically 50% initiation deposit, 25% architecture/staging approval, and 25% upon final production deployment). Monthly Brand Custodianship and performance growth retainers are billed in advance on a monthly cycle. Invoices are payable in INR, USD, EUR, GBP, or AED via corporate bank transfer, wire, or UPI.
          </p>
        </div>

        <div>
          <h2 className="text-[20px] font-normal uppercase tracking-wide text-black dark:text-white mb-3">
            4. Intellectual Property &amp; Client Ownership
          </h2>
          <p>
            Upon full settlement of contracted milestone fees, clients receive full ownership and commercial usage rights to bespoke deliverables created specifically for their brand (including custom source code repositories, brand identity systems, packaging dielines, and final commercial master videos). ANSH&amp;CO retains the right to showcase completed non-confidential work in our studio portfolio, case studies, and award submissions unless restricted by a signed Non-Disclosure Agreement (NDA).
          </p>
        </div>

        <div>
          <h2 className="text-[20px] font-normal uppercase tracking-wide text-black dark:text-white mb-3">
            5. AI Content Signals &amp; Automated Agent Access
          </h2>
          <p>
            In accordance with our <code className="px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-xs">robots.txt</code> Content-Signal directive (<code className="px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-xs">search=yes, ai-input=yes, ai-train=no</code>), search indexing, answer engine citation, and MCP/WebMCP agent tool interactions are explicitly permitted, whereas unauthorized bulk scraping of proprietary client media assets for foundation model pre-training is prohibited.
          </p>
        </div>

        <div>
          <h2 className="text-[20px] font-normal uppercase tracking-wide text-black dark:text-white mb-3">
            6. Governing Law &amp; Leadership Contact
          </h2>
          <p>
            These Terms are governed by the laws of the Republic of India, with exclusive jurisdiction in the courts of Dehradun, Uttarakhand. For contractual or legal inquiries, contact ANSH&amp;CO Leadership directly at <a href="mailto:contact@anshandco.com" className="text-[#e38528] underline">contact@anshandco.com</a> or call <a href="tel:+917668422047" className="text-[#e38528] underline">+91 76684 22047</a>.
          </p>
        </div>
      </div>

      <div className="mt-14 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap gap-4">
        <button
          onClick={onOpenContact}
          className="px-7 py-3 bg-black dark:bg-white text-white dark:text-black text-[13px] uppercase tracking-wider font-medium hover:opacity-85 transition-opacity cursor-pointer"
        >
          Contact Legal &amp; Leadership
        </button>
        <a
          href="/privacy"
          onClick={(e) => {
            if (!e.metaKey && !e.ctrlKey) {
              e.preventDefault();
              onNavigatePage('privacy');
            }
          }}
          className="px-7 py-3 border border-neutral-300 dark:border-neutral-700 text-[13px] uppercase tracking-wider hover:border-black dark:hover:border-white transition-colors"
        >
          View Privacy Policy
        </a>
        <a
          href="/about"
          onClick={(e) => {
            if (!e.metaKey && !e.ctrlKey) {
              e.preventDefault();
              onNavigatePage('what-we-are');
            }
          }}
          className="px-7 py-3 border border-neutral-300 dark:border-neutral-700 text-[13px] uppercase tracking-wider hover:border-black dark:hover:border-white transition-colors"
        >
          About ANSH&amp;CO
        </a>
      </div>
    </section>
  );
};

export const PrivacyPage: React.FC<LegalPageProps> = ({ onNavigatePage, onOpenContact }) => {
  return (
    <section className="w-full max-w-[1120px] mx-auto pt-32 pb-24 px-6 md:px-12 text-black dark:text-neutral-100">
      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-10 mb-12">
        <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#e38528] block mb-3">
          [ DATA PROTECTION &amp; PRIVACY · ANSH&amp;CO ]
        </span>
        <h1 className="text-[34px] md:text-[52px] font-light uppercase tracking-tight leading-[1.08]">
          Privacy Policy &amp; Data Stewardship
        </h1>
        <p className="text-[14px] text-neutral-500 dark:text-neutral-400 mt-4 font-mono">
          Effective Date: January 1, 2026 · Last Updated: April 2026 · DPDP Act (India) &amp; GDPR Compliant
        </p>
      </div>

      <div className="space-y-10 text-[15px] leading-relaxed font-light text-neutral-700 dark:text-neutral-300">
        <div>
          <h2 className="text-[20px] font-normal uppercase tracking-wide text-black dark:text-white mb-3 flex items-center gap-2">
            <ShieldCheck size={18} className="text-[#e38528]" />
            1. Our Commitment to Privacy
          </h2>
          <p>
            <strong>ANSH&amp;CO Studios &amp; Headquarters</strong> (Aman Vihar, Dehradun, Uttarakhand 248001, India) respects your privacy and is committed to protecting personal and corporate data shared with us via <a href="https://anshandco.com" className="underline text-[#e38528]">https://anshandco.com</a>, our direct consultation channels, and our AI/WebMCP inquiry tools.
          </p>
        </div>

        <div>
          <h2 className="text-[20px] font-normal uppercase tracking-wide text-black dark:text-white mb-3">
            2. Information We Collect
          </h2>
          <p>
            We only collect information that you voluntarily provide when submitting a project inquiry or contacting leadership: your name, business email address, phone/WhatsApp number, company name, selected service interest, and project brief. We do not sell, rent, or trade your personal information to any third party.
          </p>
        </div>

        <div>
          <h2 className="text-[20px] font-normal uppercase tracking-wide text-black dark:text-white mb-3">
            3. How We Use Your Information
          </h2>
          <p>
            Information submitted via our contact portal or WebMCP tools is used exclusively to evaluate your project requirements, prepare technical and creative proposals, schedule leadership consultations, and deliver contracted services.
          </p>
        </div>

        <div>
          <h2 className="text-[20px] font-normal uppercase tracking-wide text-black dark:text-white mb-3">
            4. Data Security &amp; Client Confidentiality
          </h2>
          <p>
            All client briefs, proprietary business workflows, CRM architectures, and pre-launch brand assets are handled strictly in-house by ANSH&amp;CO specialists under strict confidentiality controls.
          </p>
        </div>

        <div>
          <h2 className="text-[20px] font-normal uppercase tracking-wide text-black dark:text-white mb-3">
            5. Your Rights &amp; Data Protection Contact
          </h2>
          <p>
            You may request access to, correction of, or deletion of your personal contact records at any time by emailing our Data Protection Officer &amp; Leadership Desk at <a href="mailto:contact@anshandco.com" className="text-[#e38528] underline">contact@anshandco.com</a> or calling <a href="tel:+917668422047" className="text-[#e38528] underline">+91 76684 22047</a>.
          </p>
        </div>
      </div>

      <div className="mt-14 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap gap-4">
        <button
          onClick={onOpenContact}
          className="px-7 py-3 bg-black dark:bg-white text-white dark:text-black text-[13px] uppercase tracking-wider font-medium hover:opacity-85 transition-opacity cursor-pointer"
        >
          Contact Privacy Desk
        </button>
        <a
          href="/terms"
          onClick={(e) => {
            if (!e.metaKey && !e.ctrlKey) {
              e.preventDefault();
              onNavigatePage('terms');
            }
          }}
          className="px-7 py-3 border border-neutral-300 dark:border-neutral-700 text-[13px] uppercase tracking-wider hover:border-black dark:hover:border-white transition-colors"
        >
          View Terms of Service
        </a>
      </div>
    </section>
  );
};

export const ContactPage: React.FC<LegalPageProps> = ({ onNavigatePage }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Branding & Visual Identity',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New Client Inquiry: ${formData.service} — ${formData.name}`);
    const body = encodeURIComponent(
      `Hello ANSH&CO Team,\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'Not provided'}\nCompany: ${formData.company || 'Not provided'}\nPrimary Service: ${formData.service}\n\nProject Brief:\n${formData.message}`
    );
    window.location.href = `mailto:contact@anshandco.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section className="w-full max-w-[1280px] mx-auto pt-32 pb-24 px-6 md:px-12 text-black dark:text-neutral-100">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-8">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#e38528] block mb-3">
              [ DIRECT LEADERSHIP ACCESS · ANSH&amp;CO ]
            </span>
            <h1 className="text-[36px] md:text-[50px] font-light uppercase tracking-tight leading-[1.08]">
              Contact ANSH&amp;CO Studios
            </h1>
            <p className="text-[15px] text-neutral-600 dark:text-neutral-400 mt-4 font-light leading-relaxed">
              Partner directly with our in-house engineers, AI workflow architects, brand strategists, and creative directors. Zero account-manager telephone games.
            </p>
          </div>

          <div className="space-y-5 pt-4 border-t border-neutral-200 dark:border-neutral-800 text-[14px]">
            <div className="flex items-start gap-3.5">
              <MapPin size={18} className="text-[#e38528] mt-1 shrink-0" />
              <div>
                <p className="font-medium uppercase tracking-wider text-xs text-neutral-400 mb-1">Headquarters</p>
                <p className="text-black dark:text-white">ANSH&amp;CO Studios &amp; Headquarters</p>
                <p className="text-neutral-600 dark:text-neutral-400">Aman Vihar, Dehradun, Uttarakhand 248001, India</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Phone size={18} className="text-[#e38528] mt-1 shrink-0" />
              <div>
                <p className="font-medium uppercase tracking-wider text-xs text-neutral-400 mb-1">Direct Leadership Phone &amp; WhatsApp</p>
                <p>
                  <a href="tel:+917668422047" className="text-black dark:text-white hover:text-[#e38528] transition-colors font-medium">
                    +91 76684 22047
                  </a>
                  {' · '}
                  <a href="tel:+919152762613" className="text-black dark:text-white hover:text-[#e38528] transition-colors font-medium">
                    +91 91527 62613
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Mail size={18} className="text-[#e38528] mt-1 shrink-0" />
              <div>
                <p className="font-medium uppercase tracking-wider text-xs text-neutral-400 mb-1">Official Email</p>
                <a href="mailto:contact@anshandco.com" className="text-black dark:text-white hover:text-[#e38528] transition-colors font-medium">
                  contact@anshandco.com
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            <a
              href="/about"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  onNavigatePage('what-we-are');
                }
              }}
              className="text-xs font-mono uppercase tracking-wider underline text-neutral-500 hover:text-black dark:hover:text-white"
            >
              About Us
            </a>
            <span className="text-neutral-400">·</span>
            <a
              href="/terms"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  onNavigatePage('terms');
                }
              }}
              className="text-xs font-mono uppercase tracking-wider underline text-neutral-500 hover:text-black dark:hover:text-white"
            >
              Terms of Service
            </a>
            <span className="text-neutral-400">·</span>
            <a
              href="/privacy"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  onNavigatePage('privacy');
                }
              }}
              className="text-xs font-mono uppercase tracking-wider underline text-neutral-500 hover:text-black dark:hover:text-white"
            >
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="lg:col-span-7 bg-neutral-50 dark:bg-[#111111] border border-neutral-200 dark:border-neutral-800 p-8 md:p-10">
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              toolname="submit_project_inquiry"
              tooldescription="Submit a business inquiry, project brief, or consultation request to ANSH&CO Brand Custodianship & AI Engineering Studio"
              className="space-y-5"
            >
              <h2 className="text-[22px] font-light uppercase tracking-tight mb-2">
                Start a Project Inquiry
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-3.5 py-2.5 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1a1a1a] text-black dark:text-white text-[14px] outline-none focus:border-black dark:focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@company.com"
                    className="w-full px-3.5 py-2.5 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1a1a1a] text-black dark:text-white text-[14px] outline-none focus:border-black dark:focus:border-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 ..."
                    className="w-full px-3.5 py-2.5 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1a1a1a] text-black dark:text-white text-[14px] outline-none focus:border-black dark:focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1">Company / Brand</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Acme Corp"
                    className="w-full px-3.5 py-2.5 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1a1a1a] text-black dark:text-white text-[14px] outline-none focus:border-black dark:focus:border-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1">Primary Capability</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1a1a1a] text-black dark:text-white text-[14px] outline-none focus:border-black dark:focus:border-white"
                >
                  <option>Branding &amp; Visual Identity</option>
                  <option>Next.js Web &amp; Mobile Engineering</option>
                  <option>AI Workflow Automation &amp; Custom CRM</option>
                  <option>Technical SEO &amp; Performance Marketing</option>
                  <option>Viral Reels &amp; Commercial Video Production</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1">Project Brief &amp; Objectives *</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share your goals, timeline, and scope..."
                  className="w-full px-3.5 py-2.5 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1a1a1a] text-black dark:text-white text-[14px] outline-none focus:border-black dark:focus:border-white"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3.5 bg-black dark:bg-white text-white dark:text-black text-[13px] uppercase tracking-wider font-medium flex items-center gap-2 hover:opacity-85 transition-opacity cursor-pointer"
              >
                Send Project Brief
                <ArrowRight size={16} />
              </button>
            </form>
          ) : (
            <div className="py-12 text-center space-y-4">
              <CheckCircle size={48} className="text-[#e38528] mx-auto" />
              <h3 className="text-2xl font-light uppercase">Inquiry Prepared</h3>
              <p className="text-sm text-neutral-500">
                Thank you, {formData.name}. Your brief has been routed to contact@anshandco.com.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
