'use client';

import React from 'react';
import Image from 'next/image';

export function EthosSection() {
  return (
    <section className="py-24 bg-[#faf9f7] relative border-b border-neutral-200/80 font-sans" id="about">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Authentic Event Photography with Hairline Frame */}
          <div className="lg:col-span-6 relative rounded-xl overflow-hidden border border-neutral-200 bg-white">
            <div className="relative aspect-[4/3] w-full bg-neutral-100">
              <Image
                src="/images/forte-welcome.jpg"
                alt="FORTÉ event hosts welcoming guests to a considered, polished experience"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
                className="object-cover"
              />
            </div>

            <div className="p-4 bg-white border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
              <span className="text-[#b39266] font-semibold tracking-wider uppercase text-[0.7rem]">
                Arrival Reception
              </span>
              <span>Geneva · London</span>
            </div>
          </div>

          {/* Narrative in Understated Luxury Style */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="h-px w-6 bg-[#c5a880]" aria-hidden="true" />
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#b39266]">
                  A considered approach
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black tracking-tight leading-tight">
                Corporate experiences with purpose.
              </h2>
            </div>

            <p className="text-neutral-600 text-base leading-relaxed font-normal">
              FORTÉ turns an organisation’s brief into a polished, purposeful and memorable experience. We start by understanding why your people are coming together, then shape the concept, production, guest journey and event-day delivery around that purpose.
            </p>

            {/* Editorial Callouts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-neutral-200/60">
              <div>
                <h3 className="text-sm font-semibold text-black mb-1.5 tracking-tight">
                  Discovery First
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Every concept is rooted in the purpose of your gathering, not standard templates.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-black mb-1.5 tracking-tight">
                  Total Discretion
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Corporate-ready protocols for private summits, executive retreats, and gala dinners.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-200/60">
              <p className="text-xs uppercase tracking-[0.2em] text-[#b39266] font-medium">
                Concept · Production · Experience
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
