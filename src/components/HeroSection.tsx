'use client';

import React from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';

export function HeroSection() {
  return (
    <section
      className="relative min-h-[88vh] flex items-center font-sans bg-white text-[#2c1e38] pt-28 pb-16 lg:pt-32 lg:pb-24"
      id="top"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Plain Canvas Editorial Copy */}
          <div className="lg:col-span-6 flex flex-col gap-7 text-left">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#c5a267]" aria-hidden="true" />
              <span className="text-xs uppercase tracking-[0.22em] font-semibold text-[#8c6a32]">
                Corporate Events &amp; Experiences
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-[5rem] font-bold text-[#380d58] leading-[0.98] tracking-[-0.03em]">
              Give us <br />
              the brief.
            </h1>

            <p className="text-[#5f526b] text-base sm:text-lg leading-relaxed max-w-md font-normal">
              Corporate events and experiences, planned with purpose and delivered without a hitch.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#380d58] text-[#faf5ec] border border-[#c5a267]/50 font-semibold text-xs uppercase tracking-[0.16em] hover:bg-[#4b1573] active:scale-[0.98] transition-all"
              >
                <span>Send Us Your Brief</span>
                <ArrowRight size={14} className="text-[#e2cca8]" aria-hidden="true" />
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-[#c5a267] bg-white text-[#380d58] hover:bg-[#faf5ec] text-xs uppercase tracking-[0.16em] transition-all font-semibold"
              >
                <span>Discover FORTÉ</span>
                <ArrowDown size={14} className="text-[#8c6a32]" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Clean Gold-Stroked Movement Window */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl border border-[#c5a267]/70 bg-[#faf5ec] p-2.5">
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#25063c]">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/images/forte-gala-hero.jpg"
                  className="w-full h-full object-cover pointer-events-none"
                  aria-hidden="true"
                >
                  <source src="/videos/forte-hero-event.webm" type="video/webm" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-tr from-[#280742]/45 via-transparent to-[#c5a267]/15 pointer-events-none" />
              </div>

              <div className="absolute bottom-6 left-6 rounded-full border border-[#c5a267] bg-[#faf5ec]/95 px-4 py-1.5 backdrop-blur-xs">
                <span className="text-[0.7rem] uppercase tracking-[0.18em] font-semibold text-[#380d58]">
                  Exceptional, by Design.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
