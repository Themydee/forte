'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How early should an organisation submit a brief to FORTÉ?',
      a: 'While we regularly execute rapid-turnaround executive dinners and partner meetings within 3 to 6 weeks, multi-day conferences and large galas typically benefit from a 3 to 6 month planning runway to secure premier venues and bespoke spatial production.',
    },
    {
      q: 'What scale and guest capacity does FORTÉ handle?',
      a: 'We produce corporate experiences ranging from intimate executive board dinners of 20 to 50 leaders up to multi-stream international conferences of 1,500+ guests. Regardless of scale, our focus is absolute polish and zero friction.',
    },
    {
      q: 'Where do you operate geographically?',
      a: 'Our core operations are centered in the UK (London and countryside estates) and Switzerland (Zurich, Geneva, St. Moritz), with regular cross-border production across major European business capitals including Paris, Milan and Frankfurt.',
    },
    {
      q: 'How do you coordinate with our internal communications and executive teams?',
      a: 'We act as an extension of your leadership team. You are assigned a dedicated Senior Producer who serves as your single point of liaison, providing transparent milestone reporting, budget governance and rehearsal run-downs.',
    },
    {
      q: 'Can you work under strict corporate confidentiality and non-disclosure agreements?',
      a: 'Yes. Discretion is central to our ethos. We routinely handle confidential product reveals, high-profile stakeholder gatherings, and executive summits under rigorous NDA and security protocol.',
    },
  ];

  return (
    <section className="py-24 bg-white relative border-b border-neutral-200/80 font-sans" id="faq">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-14 text-left">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-6 bg-[#c5a880]" aria-hidden="true" />
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#b39266]">
              More information
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black tracking-tight leading-tight">
            Frequently asked questions.
          </h2>
          <p className="text-neutral-600 text-base mt-3 font-normal">
            Essential details on how we partner with organisations from initial brief to event day.
          </p>
        </div>

        {/* Accordion List with Quiet Hairline Dividers */}
        <div className="divide-y divide-neutral-200 border-t border-b border-neutral-200">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={idx} className="py-5">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a880]"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-base sm:text-lg text-black tracking-tight">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#b39266]' : 'text-neutral-400'
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div className="pt-4 pr-12 text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
