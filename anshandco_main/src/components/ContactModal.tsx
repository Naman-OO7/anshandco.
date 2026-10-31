import React, { useState } from 'react';
import { X, CheckCircle, ArrowRight } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Branding & Visual Identity',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Direct mail forwarding to contact@anshandco.com with inquiry details
    const subject = encodeURIComponent(`New Client Inquiry: ${formData.service} — ${formData.name}`);
    const body = encodeURIComponent(
      `Hello ANSH&CO Team,\n\n` +
      `Here are the project inquiry details:\n\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone || 'Not provided'}\n` +
      `Company: ${formData.company || 'Not provided'}\n` +
      `Primary Service: ${formData.service}\n\n` +
      `Project Brief & Objectives:\n${formData.message}\n\n` +
      `Sent via ANSH&CO Contact Portal`
    );

    window.location.href = `mailto:contact@anshandco.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-[640px] bg-white dark:bg-[#121212] text-black dark:text-white p-8 md:p-10 shadow-2xl max-h-[90vh] overflow-y-auto border border-transparent dark:border-neutral-800 transition-colors">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-neutral-500 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {!submitted ? (
          <div>
            <div className="mb-8">
              <span className="text-[12px] tracking-[0.25em] font-normal uppercase text-[#e38528] mb-2 block">
                [ LET'S CONNECT ]
              </span>
              <h3 className="text-[28px] md:text-[34px] font-light uppercase tracking-tight text-black dark:text-white leading-tight">
                WORK WITH US
              </h3>
              <p className="text-[13px] text-neutral-600 dark:text-neutral-400 mt-2 font-light">
                Tell us about your brand challenge and project objectives. Fill in the details below to submit your inquiry directly to our team.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              toolname="submit_project_inquiry"
              tooldescription="Submit a business inquiry, project brief, or consultation request to ANSH&CO Brand Custodianship & AI Engineering Studio"
              className="flex flex-col gap-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1a1a1a] text-black dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:border-black dark:focus:border-white outline-none text-[14px] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@company.com"
                    className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1a1a1a] text-black dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:border-black dark:focus:border-white outline-none text-[14px] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 ..."
                    className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1a1a1a] text-black dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:border-black dark:focus:border-white outline-none text-[14px] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Acme Brands"
                    className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1a1a1a] text-black dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:border-black dark:focus:border-white outline-none text-[14px] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
                  Primary Service
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1a1a1a] text-black dark:text-white focus:border-black dark:focus:border-white outline-none text-[14px] cursor-pointer transition-colors"
                >
                  <option className="bg-white dark:bg-[#1a1a1a] text-black dark:text-white">Branding & Visual Identity</option>
                  <option className="bg-white dark:bg-[#1a1a1a] text-black dark:text-white">Brand Strategy & Positioning</option>
                  <option className="bg-white dark:bg-[#1a1a1a] text-black dark:text-white">Digital & Web Development</option>
                  <option className="bg-white dark:bg-[#1a1a1a] text-black dark:text-white">Campaign & Performance Marketing</option>
                  <option className="bg-white dark:bg-[#1a1a1a] text-black dark:text-white">Video & Commercial Production</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
                  Project Brief & Objectives *
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us what you are aiming to achieve, current challenges, and ideal timeline..."
                  className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1a1a1a] text-black dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:border-black dark:focus:border-white outline-none text-[14px] transition-colors"
                />
              </div>

              <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-3.5 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors uppercase text-[13px] tracking-wider flex items-center justify-center gap-2 cursor-pointer font-medium"
                >
                  {submitting ? 'Sending...' : 'Send Inquiry'}
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-12 flex flex-col items-center text-center">
            <CheckCircle size={56} className="text-[#e38528] mb-4" />
            <h4 className="text-[26px] font-light uppercase tracking-tight text-black dark:text-white mb-2">
              Inquiry Forwarded
            </h4>
            <p className="text-[14px] text-neutral-600 dark:text-neutral-400 font-light max-w-[420px] mb-6">
              Thank you, {formData.name}. Your inquiry has been prepared and routed to our team. We will review your project details and get back to you shortly.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:contact@anshandco.com?subject=${encodeURIComponent(`Follow-up: ${formData.service} — ${formData.name}`)}`}
                className="px-6 py-2.5 border border-black dark:border-white text-black dark:text-white text-[13px] uppercase tracking-wider hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
              >
                Send Email Again
              </a>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-8 py-2.5 border border-black dark:border-white bg-black dark:bg-white text-white dark:text-black text-[13px] uppercase tracking-wider hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
