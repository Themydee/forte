'use client';

import React from 'react';

export function ServicesSection() {
  const services = [
    {
      number: '01',
      title: 'Concept',
      description: 'Ideas shaped around your purpose and audience.',
    },
    {
      number: '02',
      title: 'Production',
      description: 'Staging, sound, lighting and run-of-show, handled.',
    },
    {
      number: '03',
      title: 'Corporate Events',
      description: 'Conferences, dinners, launches and awards.',
    },
    {
      number: '04',
      title: 'Activations',
      description: 'Brand moments that people step into.',
    },
    {
      number: '05',
      title: 'Hospitality',
      description: 'Guest care from the first welcome to the last goodbye.',
    },
    {
      number: '06',
      title: 'Logistics',
      description: 'The moving parts, sorted before guests arrive.',
    },
  ];

  return (
    <section className="py-24 bg-white relative border-b border-neutral-200/80 font-sans" id="services">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-6 bg-[#c5a880]" aria-hidden="true" />
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#b39266]">
              Thoughtfully delivered
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black tracking-tight leading-tight">
            Everything behind the moment.
          </h2>
          <p className="text-neutral-600 text-base mt-4 max-w-xl font-normal leading-relaxed">
            From the initial creative direction to the final run-of-show, we orchestrate every dimension of high-stakes corporate occasions.
          </p>
        </div>

        {/* Clean Architectural Grid with Hairline Dividers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-neutral-200 bg-white">
          {services.map((item) => (
            <article
              key={item.number}
              className="p-8 sm:p-10 border-r border-b border-neutral-200 flex flex-col justify-between min-h-[220px] hover:bg-[#faf9f7] transition-colors"
            >
              <div>
                <span className="text-xs font-semibold text-[#b39266] tracking-wider block mb-4">
                  {item.number}
                </span>

                <h3 className="text-xl font-bold text-black tracking-tight mb-2.5">
                  {item.title}
                </h3>

                <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center justify-between text-[0.7rem] uppercase tracking-wider text-neutral-400">
                <span>FORTÉ Discipline</span>
                <span>Full Scope</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
