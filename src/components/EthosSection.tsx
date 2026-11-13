'use client';

import React from 'react';
import Image from 'next/image';

export function EthosSection() {
  return (
    <section className="py-24 bg-[#faf5ec] relative border-t border-[#380d58]/15 font-sans" id="about">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Authentic Photography with Clean Gold Stroke */}
          <div className="lg:col-span-5 rounded-2xl border border-[#c5a267]/60 bg-white p-2">
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#f4ebdd]">
              <Image
                src="/images/forte-welcome.jpg"
                alt="FORTÉ event hosts welcoming guests to a considered, polished experience"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Minimalist Statement on Warm Champagne Canvas */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="h-px w-6 bg-[#c5a267]" aria-hidden="true" />
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8c6a32]">
                  A considered approach
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#380d58] tracking-tight leading-tight">
                Corporate experiences with purpose.
              </h2>
            </div>

            {/* Clean-Stroke White Callout Box */}
            <div className="rounded-2xl border border-[#c5a267] bg-white px-7 py-6">
              <p className="text-lg sm:text-xl font-bold text-[#380d58] leading-snug tracking-tight">
                FORTÉ turns an organisation’s brief into a polished, purposeful and memorable experience.
              </p>
            </div>

            <p className="text-[#5f526b] text-base leading-relaxed font-normal max-w-xl">
              We start by understanding why your people gather, then shape the concept, production and guest journey around that purpose.
            </p>

            <div className="pt-5 border-t border-[#380d58]/15">
              <p className="text-xs uppercase tracking-[0.24em] text-[#8c6a32] font-semibold">
                Concept · Production · Experience
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
