'use client';

import React from 'react';

export function ProcessSection() {
  const steps = [
    {
      number: '01',
      title: 'Brief',
      copy: 'We listen first, to your goals, audience and constraints.',
    },
    {
      number: '02',
      title: 'Concept',
      copy: 'We shape an idea that serves the purpose of your event.',
    },
    {
      number: '03',
      title: 'Production',
      copy: 'Every detail planned, rehearsed and managed.',
    },
    {
      number: '04',
      title: 'Experience',
      copy: 'Your guests arrive. You focus on the room.',
    },
  ];

  const values = [
    {
      number: '01',
      title: 'Trust',
      copy: 'Organised, discreet, corporate-ready.',
    },
    {
      number: '02',
      title: 'Taste',
      copy: 'Premium, never excessive.',
    },
    {
      number: '03',
      title: 'Control',
      copy: 'The details are handled before guests arrive.',
    },
  ];

  return (
    <section className="py-24 bg-[#faf5ec] relative border-t border-[#380d58]/15 font-sans" id="process">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-6 bg-[#c5a267]" aria-hidden="true" />
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8c6a32]">
              A clear path, from day one
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#380d58] tracking-tight leading-tight">
            You give the brief. We handle the rest.
          </h2>
        </div>

        {/* 4 Clean Hairline Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-[#380d58]/15 bg-white/80 mb-14">
          {steps.map((step) => (
            <article
              key={step.number}
              className="p-8 border-r border-b border-[#380d58]/15 flex flex-col gap-3 hover:bg-white transition-colors"
            >
              <span className="text-xs font-bold text-[#8c6a32] tracking-[0.14em]">
                {step.number}
              </span>

              <h3 className="text-xl font-bold text-[#380d58] tracking-tight">
                {step.title}
              </h3>

              <p className="text-sm text-[#5f526b] leading-relaxed font-normal">
                {step.copy}
              </p>
            </article>
          ))}
        </div>

        {/* Quote Callout & Numbered Principles (Slide 3 Aesthetic) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5 rounded-2xl border border-[#c5a267] bg-white px-8 py-7">
            <p className="text-xl sm:text-2xl font-bold text-[#380d58] leading-snug tracking-tight">
              “I gave them the brief. They handled it.”
            </p>
          </div>

          <div className="lg:col-span-7 border-t border-[#380d58]/15">
            {values.map((val) => (
              <div
                key={val.title}
                className="grid grid-cols-[2.75rem_1fr] gap-4 py-4 border-b border-[#380d58]/15 items-baseline"
              >
                <span className="text-xs font-bold text-[#8c6a32] tracking-[0.14em]">
                  {val.number}
                </span>
                <div>
                  <h4 className="text-base font-bold text-[#380d58] tracking-tight">
                    {val.title}
                  </h4>
                  <p className="text-sm text-[#5f526b] mt-0.5">{val.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
