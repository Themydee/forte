'use client';

import React from 'react';
import { Quote } from 'lucide-react';

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        'FORTÉ orchestrated our annual partner banquet in London with surgical elegance. The transition between confidential strategy sessions and the seated dinner was seamless, and the discretion displayed was beyond reproach.',
      author: 'Evelyn Montgomery',
      role: 'Chief Marketing Officer',
      org: 'European Private Capital & Wealth',
      city: 'London / Zurich',
    },
    {
      quote:
        'In twenty years of hosting bilateral leadership summits, I have rarely encountered an agency with this level of protocol awareness and architectural taste. They do not merely manage events; they elevate institutional stature.',
      author: 'Marcus von Berg',
      role: 'Managing Director & Partner',
      org: 'Global Infrastructure Advisory',
      city: 'Frankfurt / Geneva',
    },
    {
      quote:
        'Our collector showcase in Milan demanded uncompromising aesthetic fidelity. FORTÉ engineered spatial lighting and security containment that left our international guests genuinely mesmerised.',
      author: 'Camilla Laurent',
      role: 'Head of VIP Relations',
      org: 'Swiss Haute Horlogerie Maison',
      city: 'Geneva / Milan',
    },
  ];

  return (
    <section className="py-24 bg-[#0b0b0e] relative border-t border-[rgba(255,255,255,0.06)]" id="endorsements">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 pb-8 border-b border-[rgba(255,255,255,0.08)]">
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[#c5a880] font-semibold mb-2">
              Executive Endorsements
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#faf9f6] tracking-tight">
              Trusted by Discerning Leadership
            </h2>
          </div>
          <p className="text-[#a1a1aa] text-sm max-w-md font-light leading-relaxed">
            Direct perspectives from executive sponsors who rely on FORTÉ for their highest-stakes corporate occasions.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.author}
              className="p-8 sm:p-10 rounded-2xl bg-[#121217]/60 border border-[rgba(255,255,255,0.08)] hover:border-[rgba(197,168,128,0.3)] transition-all flex flex-col justify-between"
            >
              <div>
                <Quote size={28} className="text-[#c5a880] opacity-40 mb-6" />
                <p className="text-base sm:text-lg font-serif italic text-[#faf9f6] leading-relaxed mb-8">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-6 border-t border-[rgba(255,255,255,0.06)]">
                <p className="text-sm font-semibold text-[#faf9f6] tracking-wide">{item.author}</p>
                <p className="text-xs text-[#c5a880] mt-0.5">{item.role}</p>
                <p className="text-xs text-[#71717a] mt-0.5">{item.org} • {item.city}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
