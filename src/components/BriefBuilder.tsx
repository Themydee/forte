'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight, Copy, Check, Calculator, Clock, MapPin, Users, Award } from 'lucide-react';

interface BriefBuilderProps {
  onSelectBrief?: (briefText: string, eventType: string) => void;
}

export function BriefBuilder({ onSelectBrief }: BriefBuilderProps) {
  const [eventType, setEventType] = useState('Corporate Gala & Banquet');
  const [guestScale, setGuestScale] = useState('100 – 400 Guests');
  const [destination, setDestination] = useState('London & UK Historic Landmark');
  const [timeline, setTimeline] = useState('2 – 5 Months');
  const [copied, setCopied] = useState(false);

  const eventTypes = [
    'Corporate Gala & Banquet',
    'Executive Leadership Summit',
    'Private C-Suite Advisory Dinner',
    'Bespoke Brand Activation',
    'Global Incentive & Founders Retreat',
    'Product Launch & Keynote',
  ];

  const guestScales = [
    'Intimate Board (10 – 35 VIPs)',
    'Executive Salon (35 – 100 Guests)',
    'Major Gala (100 – 400 Guests)',
    'Grand Enterprise Assembly (400+ Guests)',
  ];

  const destinations = [
    'London & UK Historic Landmark',
    'Swiss Alps & Lake Geneva Pavilion',
    'Paris & French Riviera Château',
    'Milan & Lake Como Historic Villa',
    'Bespoke Global Destination',
  ];

  const timelines = [
    'Expedited (< 8 Weeks)',
    'Standard Horizon (2 – 5 Months)',
    'Strategic Annual Lead (6 – 12 Months)',
  ];

  const getRecommendedLead = () => {
    if (timeline.includes('< 8 Weeks')) return 'Accelerated Production Protocol required';
    if (timeline.includes('2 – 5 Months')) return 'Optimal production window for off-market procurement';
    return 'Full bespoke architectural development timeline';
  };

  const getVenueArchetype = () => {
    if (eventType.includes('Dinner')) return 'Historic Private Library, Sequestered Cellar, or Ambassadorial Salon';
    if (eventType.includes('Gala')) return 'Vaulted Guildhall, Museum Rotunda, or Historic Royal Palace';
    if (eventType.includes('Summit')) return 'Private Alpine Lodge, Lakeside Villa, or Encrypted Pavilion';
    if (eventType.includes('Activation')) return 'Architectural Gallery, Historic Orangerie, or Custom Glasshouse';
    return 'Bespoke Private Estate or Heritage Property';
  };

  const generatedBrief = [
    `FORTÉ Bespoke Event Brief Specification`,
    `----------------------------------------`,
    `Event Discipline: ${eventType}`,
    `Target Scale: ${guestScale}`,
    `Geographic Preference: ${destination}`,
    `Target Timeline: ${timeline}`,
    `Recommended Venue Archetype: ${getVenueArchetype()}`,
    `Production Status: Ready for Partner Director scoping.`,
  ].join('\n');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedBrief);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // ignore
    }
  };

  const handleApplyToForm = () => {
    if (onSelectBrief) {
      onSelectBrief(generatedBrief, eventType);
    }
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-[#09090c] relative border-t border-[rgba(255,255,255,0.06)]" id="estimator">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 pb-8 border-b border-[rgba(255,255,255,0.08)]">
          <div>
            <div className="inline-flex items-center gap-2 mb-2 text-[#c5a880]">
              <Calculator size={13} />
              <p className="text-[0.68rem] uppercase tracking-[0.24em] font-semibold">
                Interactive Scoping Tool
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#faf9f6] tracking-tight">
              Bespoke Event Brief Builder
            </h2>
          </div>
          <p className="text-[#a1a1aa] text-sm max-w-md font-light leading-relaxed">
            Configure your parameters to generate an instant executive brief specification ready for confidential appraisal.
          </p>
        </div>

        {/* Builder Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-8 bg-[#121217]/60 p-6 sm:p-10 rounded-2xl border border-[rgba(255,255,255,0.08)]">
            {/* 1. Format */}
            <div>
              <label className="text-xs uppercase tracking-[0.18em] text-[#c5a880] font-semibold mb-3 flex items-center gap-2">
                <Award size={14} />
                <span>1. Select Event Discipline</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-2">
                {eventTypes.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setEventType(item)}
                    className={`p-3.5 rounded-xl text-left text-xs font-medium transition-all border ${
                      eventType === item
                        ? 'bg-[rgba(197,168,128,0.15)] text-[#faf9f6] border-[#c5a880]'
                        : 'bg-[#181820]/60 text-[#a1a1aa] hover:text-[#f7f6f2] border-[rgba(255,255,255,0.06)]'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Scale */}
            <div>
              <label className="text-xs uppercase tracking-[0.18em] text-[#c5a880] font-semibold mb-3 flex items-center gap-2">
                <Users size={14} />
                <span>2. Anticipated Guest Scale</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-2">
                {guestScales.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setGuestScale(item)}
                    className={`p-3.5 rounded-xl text-left text-xs font-medium transition-all border ${
                      guestScale === item
                        ? 'bg-[rgba(197,168,128,0.15)] text-[#faf9f6] border-[#c5a880]'
                        : 'bg-[#181820]/60 text-[#a1a1aa] hover:text-[#f7f6f2] border-[rgba(255,255,255,0.06)]'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Destination */}
            <div>
              <label className="text-xs uppercase tracking-[0.18em] text-[#c5a880] font-semibold mb-3 flex items-center gap-2">
                <MapPin size={14} />
                <span>3. Geographic Territory</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-2">
                {destinations.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setDestination(item)}
                    className={`p-3.5 rounded-xl text-left text-xs font-medium transition-all border ${
                      destination === item
                        ? 'bg-[rgba(197,168,128,0.15)] text-[#faf9f6] border-[#c5a880]'
                        : 'bg-[#181820]/60 text-[#a1a1aa] hover:text-[#f7f6f2] border-[rgba(255,255,255,0.06)]'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Timeline */}
            <div>
              <label className="text-xs uppercase tracking-[0.18em] text-[#c5a880] font-semibold mb-3 flex items-center gap-2">
                <Clock size={14} />
                <span>4. Production Horizon</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-2">
                {timelines.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setTimeline(item)}
                    className={`p-3.5 rounded-xl text-left text-xs font-medium transition-all border ${
                      timeline === item
                        ? 'bg-[rgba(197,168,128,0.15)] text-[#faf9f6] border-[#c5a880]'
                        : 'bg-[#181820]/60 text-[#a1a1aa] hover:text-[#f7f6f2] border-[rgba(255,255,255,0.06)]'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Real-time Generated Brief Summary Card */}
          <div className="lg:col-span-5 sticky top-28 bg-[#121217] p-8 rounded-2xl border border-[rgba(197,168,128,0.35)] shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[rgba(255,255,255,0.08)]">
                <div>
                  <span className="text-[0.65rem] uppercase tracking-[0.2em] text-[#c5a880] font-mono font-semibold">
                    Live Specification
                  </span>
                  <h3 className="text-xl font-serif font-bold text-[#faf9f6] mt-0.5">
                    Executive Brief Overview
                  </h3>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#4ade80] shadow-[0_0_10px_#4ade80]" />
              </div>

              {/* Dynamic Readouts */}
              <div className="space-y-4 py-6 text-xs">
                <div>
                  <span className="text-[#71717a] uppercase tracking-wider block text-[0.68rem]">
                    Selected Discipline
                  </span>
                  <p className="text-sm font-serif font-bold text-[#faf9f6] mt-0.5">{eventType}</p>
                </div>
                <div>
                  <span className="text-[#71717a] uppercase tracking-wider block text-[0.68rem]">
                    Scale & Audience
                  </span>
                  <p className="text-sm text-[#e4e2dd] mt-0.5">{guestScale}</p>
                </div>
                <div>
                  <span className="text-[#71717a] uppercase tracking-wider block text-[0.68rem]">
                    Target Geography
                  </span>
                  <p className="text-sm text-[#e4e2dd] mt-0.5">{destination}</p>
                </div>
                <div>
                  <span className="text-[#71717a] uppercase tracking-wider block text-[0.68rem]">
                    Production Scoping Status
                  </span>
                  <p className="text-sm text-[#dfc8a5] mt-0.5">{getRecommendedLead()}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#09090c] border border-[rgba(255,255,255,0.06)]">
                  <span className="text-[0.65rem] uppercase tracking-widest text-[#c5a880] font-semibold block mb-1">
                    Curated Venue Archetype
                  </span>
                  <p className="text-xs text-[#a1a1aa] leading-relaxed">{getVenueArchetype()}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-[rgba(255,255,255,0.08)] space-y-3">
              <button
                type="button"
                onClick={handleApplyToForm}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-gradient-to-r from-[#c5a880] to-[#dfc8a5] text-[#09090c] font-semibold text-xs uppercase tracking-[0.18em] hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_4px_16px_rgba(197,168,128,0.25)]"
              >
                <span>Transfer Specification to Inquiry</span>
                <ArrowRight size={14} />
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.03)] text-[#f7f6f2] hover:border-[#c5a880] text-xs uppercase tracking-[0.16em] transition-all"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-[#4ade80]" />
                    <span className="text-[#4ade80]">Specification Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} className="text-[#c5a880]" />
                    <span>Copy Specification Text</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
