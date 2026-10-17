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
      title: 'Trust',
      copy: 'Organised, discreet, corporate-ready.',
    },
    {
      title: 'Taste',
      copy: 'Premium, never excessive.',
    },
    {
      title: 'Control',
      copy: 'The details are handled before guests arrive.',
    },
  ];

  return (
    <section className="py-24 bg-[#faf9f7] relative border-b border-neutral-200/80 font-sans" id="process">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-6 bg-[#c5a880]" aria-hidden="true" />
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#b39266]">
              A clear path, from day one
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black tracking-tight leading-tight">
            You give the brief. We handle the rest.
          </h2>
          <p className="text-neutral-600 text-base mt-4 max-w-xl font-normal leading-relaxed">
            A structured, discreet four-stage roadmap designed to remove friction from executive event delivery.
          </p>
        </div>

        {/* 4 Process Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-neutral-200 bg-white mb-16">
          {steps.map((step) => (
            <article
              key={step.number}
              className="p-8 border-r border-b border-neutral-200 flex flex-col justify-between min-h-[260px] hover:bg-[#faf9f7] transition-colors"
            >
              <div>
                <span className="text-xs font-semibold text-[#b39266] tracking-wider block mb-4">
                  Phase {step.number}
                </span>

                <h3 className="text-2xl font-bold text-black tracking-tight mb-3">
                  {step.title}
                </h3>

                <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                  {step.copy}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center justify-between text-[0.7rem] uppercase tracking-wider text-neutral-400">
                <span>Stage 0{step.number}</span>
                <span>Discreet execution</span>
              </div>
            </article>
          ))}
        </div>

        {/* 3 Core Bedrock Values Strip */}
        <div className="border-t border-neutral-200/80 pt-12">
          <div className="text-xs uppercase tracking-[0.2em] font-semibold text-neutral-400 mb-6">
            Our Bedrock Principles
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val) => (
              <div key={val.title} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
                  <h4 className="text-lg font-bold text-black tracking-tight">{val.title}</h4>
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed pl-3.5">
                  {val.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
