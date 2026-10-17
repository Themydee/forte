'use client';

import React from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';

export function HeroSection() {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center font-sans overflow-hidden bg-black text-white"
      id="top"
    >
      {/* Background Cinematic Event Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/images/forte-gala-hero.jpg"
        className="absolute inset-0 w-full h-full object-cover scale-105 pointer-events-none"
        aria-hidden="true"
      >
        <source src="/videos/forte-hero-event.webm" type="video/webm" />
      </video>

      {/* Atmospheric Cinematic Dark Overlay for Contrast & Readability */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60 pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-32 pb-20 flex flex-col justify-center min-h-[90vh]">
        <div className="max-w-3xl flex flex-col gap-8 text-left">
          {/* Eyebrow Status */}
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#c5a880]" aria-hidden="true" />
            <span className="text-xs uppercase tracking-[0.24em] font-semibold text-[#c5a880]">
              London · Geneva · Zurich · Milan · Paris
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-[5.75rem] font-bold text-white leading-[0.96] tracking-[-0.035em]">
            Give us <br />
            <span className="text-white">the brief.</span>
          </h1>

          {/* Narrative */}
          <p className="text-neutral-200 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
            Corporate events and experiences, planned with purpose and delivered without a hitch. We take care of every detail so you can focus on the room.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#c5a880] text-black font-semibold text-xs uppercase tracking-[0.16em] hover:bg-[#b39266] active:scale-[0.98] transition-all shadow-lg"
            >
              <span>Send Us Your Brief</span>
              <ArrowRight size={15} aria-hidden="true" />
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-white/30 text-white hover:bg-white/10 hover:border-white text-xs uppercase tracking-[0.16em] transition-all font-semibold backdrop-blur-xs"
            >
              <span>Discover FORTÉ</span>
              <ArrowDown size={14} aria-hidden="true" />
            </a>
          </div>

          {/* Human Editorial Footer Note */}
          <div className="pt-10 border-t border-white/15 flex flex-wrap items-center gap-8 text-xs text-neutral-300">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
              <span className="font-semibold text-white">Full Production Ownership</span>
              <span className="text-neutral-400">— Discovery to delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
              <span className="font-semibold text-white">Direct Access</span>
              <span className="text-neutral-400">— Dedicated senior producer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
