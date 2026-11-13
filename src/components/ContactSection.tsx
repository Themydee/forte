'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Check, Copy, ArrowUpRight } from 'lucide-react';

interface ContactSectionProps {
  initialBrief?: string;
  initialEventType?: string;
}

export function ContactSection({ initialBrief = '', initialEventType = '' }: ContactSectionProps) {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [eventType, setEventType] = useState(initialEventType || '');
  const [eventDate, setEventDate] = useState('');
  const [brief, setBrief] = useState(initialBrief);

  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{
    tone: 'success' | 'error';
    message: string;
    briefContent?: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  const emailAddress = 'forteexperiences@gmail.com';
  const whatsappUrl = 'https://wa.me/15551234567';

  useEffect(() => {
    if (initialBrief) setBrief(initialBrief);
  }, [initialBrief]);

  useEffect(() => {
    if (initialEventType) setEventType(initialEventType);
  }, [initialEventType]);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;

    const trimmedName = name.trim();
    const trimmedCompany = company.trim();
    const trimmedEmail = email.trim();
    const trimmedBrief = brief.trim();

    if (!trimmedName || !trimmedCompany || !trimmedEmail || !eventType || !trimmedBrief) {
      setStatus({
        tone: 'error',
        message: 'Please complete each required field before continuing.',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setStatus({
        tone: 'error',
        message: 'Please enter a valid email address.',
      });
      return;
    }

    if (
      trimmedName.length > 100 ||
      trimmedCompany.length > 120 ||
      trimmedEmail.length > 254 ||
      trimmedBrief.length > 3000
    ) {
      setStatus({
        tone: 'error',
        message: 'One or more fields exceed the character limit. Please shorten your response and try again.',
      });
      return;
    }

    const subject = `Event enquiry — ${trimmedCompany}`;
    const body = [
      `From: ${trimmedName}`,
      `Company: ${trimmedCompany}`,
      `Email: ${trimmedEmail}`,
      `Event type: ${eventType}`,
      `Event date: ${eventDate || 'Not yet decided'}`,
      '',
      'Your brief:',
      trimmedBrief,
    ].join('\n');

    const mailto = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setSending(true);
    setStatus(null);
    setCopied(false);

    timerRef.current = window.setTimeout(() => {
      try {
        window.location.href = mailto;
      } catch {
        // Safe fallback in restricted environments or jsdom
      }
      setSending(false);
      setStatus({
        tone: 'success',
        message:
          'Your email app is ready with your brief addressed to FORTÉ. If your email app did not open automatically, you can copy the brief below and email it directly.',
        briefContent: `To: ${emailAddress}\nSubject: ${subject}\n\n${body}`,
      });
    }, 350);
  };

  const handleCopy = async () => {
    if (!status?.briefContent) return;
    try {
      await navigator.clipboard.writeText(status.briefContent);
      setCopied(true);
      timerRef.current = window.setTimeout(() => setCopied(false), 2400);
    } catch {
      // ignore
    }
  };

  return (
    <section className="py-24 bg-[#faf5ec] relative border-t border-[#380d58]/15 font-sans" id="contact">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-6 bg-[#c5a267]" aria-hidden="true" />
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8c6a32]">
              A good place to begin
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#380d58] tracking-tight leading-tight">
            Send Us Your Brief.
          </h2>
          <p className="text-base text-[#5f526b] mt-3 font-normal leading-relaxed">
            Tell us what you’re planning. We’ll take it from there.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Clean Gold-Stroked Form Card */}
          <div className="lg:col-span-8 bg-white p-8 sm:p-10 rounded-2xl border border-[#c5a267]/65">
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-name" className="text-xs font-semibold text-[#380d58] tracking-wide">
                    Name <span className="text-[#8c6a32]">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    maxLength={100}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white rounded-lg border border-[#380d58]/20 px-4 py-3 text-sm text-[#2c1e38] focus:outline-none focus:border-[#380d58] focus:ring-1 focus:ring-[#c5a267] transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-company" className="text-xs font-semibold text-[#380d58] tracking-wide">
                    Company <span className="text-[#8c6a32]">*</span>
                  </label>
                  <input
                    id="contact-company"
                    name="company"
                    autoComplete="organization"
                    maxLength={120}
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-white rounded-lg border border-[#380d58]/20 px-4 py-3 text-sm text-[#2c1e38] focus:outline-none focus:border-[#380d58] focus:ring-1 focus:ring-[#c5a267] transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-email" className="text-xs font-semibold text-[#380d58] tracking-wide">
                  Email <span className="text-[#8c6a32]">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={254}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white rounded-lg border border-[#380d58]/20 px-4 py-3 text-sm text-[#2c1e38] focus:outline-none focus:border-[#380d58] focus:ring-1 focus:ring-[#c5a267] transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-type" className="text-xs font-semibold text-[#380d58] tracking-wide">
                    Event type <span className="text-[#8c6a32]">*</span>
                  </label>
                  <select
                    id="contact-type"
                    name="eventType"
                    required
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full bg-white rounded-lg border border-[#380d58]/20 px-4 py-3 text-sm text-[#2c1e38] focus:outline-none focus:border-[#380d58] focus:ring-1 focus:ring-[#c5a267] transition-colors"
                  >
                    <option value="" disabled>
                      Select event type
                    </option>
                    <option value="Corporate event">Corporate event</option>
                    <option value="Conference">Conference</option>
                    <option value="Awards or gala">Awards or gala</option>
                    <option value="Product launch">Product launch</option>
                    <option value="Activation">Activation</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-date" className="text-xs font-semibold text-[#380d58] tracking-wide">
                    Event date <span className="text-[#5f526b] font-normal">(optional)</span>
                  </label>
                  <input
                    id="contact-date"
                    name="eventDate"
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full bg-white rounded-lg border border-[#380d58]/20 px-4 py-3 text-sm text-[#2c1e38] focus:outline-none focus:border-[#380d58] focus:ring-1 focus:ring-[#c5a267] transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-brief" className="text-xs font-semibold text-[#380d58] tracking-wide">
                  Your brief <span className="text-[#8c6a32]">*</span>
                </label>
                <textarea
                  id="contact-brief"
                  name="brief"
                  maxLength={3000}
                  required
                  rows={5}
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  placeholder="A little about what you’re planning, who it’s for and what matters most."
                  className="w-full bg-white rounded-lg border border-[#380d58]/20 p-4 text-sm text-[#2c1e38] focus:outline-none focus:border-[#380d58] focus:ring-1 focus:ring-[#c5a267] transition-colors resize-y min-h-[130px]"
                />
              </div>

              {status && (
                <div
                  className={`p-4 rounded-lg text-xs leading-relaxed flex flex-col gap-2 ${
                    status.tone === 'success'
                      ? 'bg-emerald-50 border border-emerald-300 text-emerald-900'
                      : 'bg-rose-50 border border-rose-300 text-rose-900'
                  }`}
                  role="status"
                  aria-live="polite"
                >
                  <p>{status.message}</p>
                  {status.briefContent && (
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="self-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white text-[#380d58] hover:bg-[#faf5ec] border border-[#c5a267] font-semibold text-xs transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check size={14} className="text-emerald-600" />
                          <span>Copied to clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span>Copy brief details</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={sending}
                className="w-full py-4 rounded-full bg-[#380d58] hover:bg-[#4b1573] text-[#faf5ec] border border-[#c5a267]/50 font-semibold text-xs uppercase tracking-[0.18em] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <span>{sending ? 'Preparing your brief…' : 'Send Brief'}</span>
                <ArrowRight size={15} className="text-[#e2cca8]" aria-hidden="true" />
              </button>
            </form>
          </div>

          {/* Direct Contact Card with Clean Hairline Strokes */}
          <aside className="lg:col-span-4 bg-white p-8 rounded-2xl border border-[#c5a267]/65 flex flex-col gap-5">
            <h3 className="text-base font-bold text-[#380d58] tracking-tight">
              Direct Contact
            </h3>

            <div className="flex flex-col gap-4 text-xs">
              <a href={`mailto:${emailAddress}`} className="flex flex-col gap-1 pb-4 border-b border-[#380d58]/12 group">
                <span className="text-[0.68rem] uppercase tracking-wider text-[#8c6a32] font-semibold">Email</span>
                <span className="text-sm font-medium text-[#380d58] group-hover:text-[#8c6a32] transition-colors">{emailAddress}</span>
              </a>

              <a href="https://forteexperiences.com" target="_blank" rel="noreferrer" className="flex flex-col gap-1 pb-4 border-b border-[#380d58]/12 group">
                <span className="text-[0.68rem] uppercase tracking-wider text-[#8c6a32] font-semibold">Website</span>
                <span className="text-sm font-medium text-[#380d58] group-hover:text-[#8c6a32] transition-colors flex items-center gap-1">
                  <span>forteexperiences.com</span>
                  <ArrowUpRight size={13} />
                </span>
              </a>

              <a href="https://www.instagram.com/forteexperiences/" target="_blank" rel="noreferrer" className="flex flex-col gap-1 pb-4 border-b border-[#380d58]/12 group">
                <span className="text-[0.68rem] uppercase tracking-wider text-[#8c6a32] font-semibold">Instagram</span>
                <span className="text-sm font-medium text-[#380d58] group-hover:text-[#8c6a32] transition-colors flex items-center gap-1">
                  <span>@forteexperiences</span>
                  <ArrowUpRight size={13} />
                </span>
              </a>

              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-white hover:bg-[#faf5ec] border border-[#c5a267] text-[#380d58] text-xs font-semibold tracking-wider uppercase transition-colors"
                >
                  <span>Message us on WhatsApp</span>
                  <ArrowUpRight size={14} className="text-[#8c6a32]" />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
