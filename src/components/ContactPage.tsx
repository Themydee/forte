"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpRight, Check, Copy, Globe, Instagram } from "lucide-react";
import {
  EVENT_TYPES,
  FORTE_EMAIL,
  FORTE_INSTAGRAM,
  FORTE_WEBSITE,
  FORTE_WHATSAPP,
  useBriefForm,
} from "@/hooks/use-brief-form";
import { WhatsAppIcon } from "@/components/icons";

// Minimal underlined fields, after the reference layout.
const fieldClass =
  "w-full rounded-none border-0 border-b border-ink/20 bg-transparent px-0 py-3 text-base text-ink placeholder:text-ink/35 transition-[border-color,box-shadow] duration-200 focus:border-plum focus:shadow-[0_1px_0_0_#6d3fd8] focus:outline-none";
const labelClass = "text-[0.78rem] font-medium tracking-[-0.005em] text-ink/55";

const socialLinks = [
  { label: "Instagram", href: FORTE_INSTAGRAM, icon: Instagram },
  { label: "WhatsApp", href: FORTE_WHATSAPP, icon: WhatsAppIcon },
  { label: "Website", href: FORTE_WEBSITE, icon: Globe },
];

// The home hero's film, with a heavy blur baked in by Cloudinary (e_blur), so
// the browser plays a ~200 KB file instead of blurring video every frame.
const FILM =
  "https://res.cloudinary.com/dhqzuff1v/video/upload/e_blur:900,q_auto,w_960/v1794656108/forte-hero-event";

function BlurredFilm() {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = Boolean(
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData,
    );
    setPlay(!reduced && !saveData);
  }, []);

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10">
      <img
        src={`${FILM}.jpg`}
        alt=""
        className="absolute inset-0 h-full w-full scale-105 object-cover"
      />
      {play && (
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={`${FILM}.jpg`}
          className="pointer-events-none absolute inset-0 h-full w-full scale-105 object-cover"
        >
          <source src={`${FILM}.webm`} type="video/webm" />
          <source src={`${FILM}.mp4`} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-night/50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_10%,rgba(109,63,216,0.45),transparent_60%),radial-gradient(ellipse_at_85%_95%,rgba(217,164,65,0.22),transparent_55%)]" />
    </div>
  );
}

/**
 * Contact page: the hero film, heavily blurred, fills the background, and the
 * brief form sits over it in a square-cornered box.
 */
export function ContactPage() {
  const {
    fields: { name, company, email, eventType, eventDate, brief },
    setName,
    setCompany,
    setEmail,
    setEventType,
    setEventDate,
    setBrief,
    sending,
    status,
    copied,
    handleSubmit,
    handleCopy,
  } = useBriefForm();

  return (
    <section
      id="top"
      aria-labelledby="contact-page-title"
      className="relative isolate flex min-h-svh items-center overflow-hidden bg-night px-4 pb-12 pt-[5.5rem] font-sans text-ink sm:px-8 sm:pb-16 sm:pt-28 lg:pt-32"
    >
      <BlurredFilm />

      <div className="relative mx-auto w-full max-w-[46rem]">
        {/* Square-cornered form box with a gold rule along the top. */}
        <div className="rounded-none border-t-[3px] border-gold bg-white px-6 pb-8 pt-10 shadow-[0_40px_120px_rgba(5,8,18,0.45)] sm:px-12 sm:pb-12 sm:pt-14 lg:px-16">
          <div className="flex flex-col">
            <h1
              id="contact-page-title"
              className="mt-2 text-[clamp(3.1rem,7vw,6.25rem)] font-semibold leading-[0.92] tracking-[-0.055em]"
            >
              Contact Us
            </h1>
            <p className="mt-5 max-w-[28rem] text-[clamp(1rem,1.3vw,1.12rem)] leading-relaxed text-ink/65">
              Tell us what you’re planning, who it’s for and what matters most. We’ll take it from
              there.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-10 space-y-7 sm:mt-12">
              <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-8">
                <div className="flex flex-col gap-1">
                  <label htmlFor="cp-name" className={labelClass}>
                    Name <span className="text-gold-deep">*</span>
                  </label>
                  <input
                    id="cp-name"
                    name="name"
                    autoComplete="name"
                    maxLength={100}
                    required
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={fieldClass}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="cp-company" className={labelClass}>
                    Company <span className="text-gold-deep">*</span>
                  </label>
                  <input
                    id="cp-company"
                    name="company"
                    autoComplete="organization"
                    maxLength={120}
                    required
                    placeholder="Your organisation"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="cp-email" className={labelClass}>
                  Email <span className="text-gold-deep">*</span>
                </label>
                <input
                  id="cp-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={254}
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={fieldClass}
                />
              </div>

              <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-8">
                <div className="flex flex-col gap-1">
                  <label htmlFor="cp-type" className={labelClass}>
                    Event type <span className="text-gold-deep">*</span>
                  </label>
                  <select
                    id="cp-type"
                    name="eventType"
                    required
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className={`${fieldClass} ${eventType ? "" : "text-ink/35"}`}
                  >
                    <option value="" disabled>
                      Select event type
                    </option>
                    {EVENT_TYPES.map((type) => (
                      <option key={type} value={type} className="text-ink">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="cp-date" className={labelClass}>
                    Event date <span className="font-normal text-ink/40">(optional)</span>
                  </label>
                  <input
                    id="cp-date"
                    name="eventDate"
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="cp-brief" className={labelClass}>
                  Your brief <span className="text-gold-deep">*</span>
                </label>
                <textarea
                  id="cp-brief"
                  name="brief"
                  maxLength={3000}
                  required
                  rows={3}
                  placeholder="A little about what you’re planning, who it’s for and what matters most."
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  className={`${fieldClass} min-h-[5.5rem] resize-y`}
                />
              </div>

              {status && (
                <div
                  className={`flex flex-col gap-2 rounded-2xl p-4 text-[0.88rem] leading-relaxed ${
                    status.tone === "success"
                      ? "bg-emerald-50 text-emerald-900 ring-1 ring-emerald-200"
                      : "bg-rose-50 text-rose-900 ring-1 ring-rose-200"
                  }`}
                  role="status"
                  aria-live="polite"
                >
                  <p>{status.message}</p>
                  {status.briefContent && (
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="micro-button inline-flex items-center gap-1.5 self-start rounded-button bg-white px-4 py-2 text-[0.82rem] font-medium text-ink ring-1 ring-ink/10 transition hover:bg-gold-soft"
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
                className="micro-button inline-flex w-full items-center justify-center gap-2 rounded-button bg-ink px-8 py-4 text-[1rem] font-medium tracking-[-0.01em] text-white transition hover:bg-plum disabled:opacity-50 sm:w-auto"
              >
                <span>{sending ? "Preparing your brief…" : "Send Brief"}</span>
                <ArrowUpRight size={16} className="text-gold" aria-hidden="true" />
              </button>
            </form>

            <div className="mt-14 space-y-4 border-t border-ink/10 pt-6 text-[0.9rem] sm:mt-16">
              <ul className="flex flex-wrap gap-2.5">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`FORTÉ on ${label}`}
                      title={label}
                      className="micro-button flex h-11 w-11 items-center justify-center rounded-button bg-champagne text-ink ring-1 ring-ink/10 transition hover:bg-ink hover:text-gold hover:ring-ink"
                    >
                      <Icon className="h-[1.15rem] w-[1.15rem]" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
              <p className="flex flex-wrap gap-x-6 gap-y-1 text-ink/60">
                <span>
                  Email:{" "}
                  <a
                    href={`mailto:${FORTE_EMAIL}`}
                    className="text-ink transition-colors hover:text-gold-deep"
                  >
                    {FORTE_EMAIL}
                  </a>
                </span>
                <span>Instagram: @forteexperiences</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
