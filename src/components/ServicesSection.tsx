'use client';

import React from 'react';
import Image from 'next/image';

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
    <section className="py-24 bg-white relative border-t border-[#380d58]/15 font-sans" id="services">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header + Sculpted Gold Ribbon on Plain White Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-14">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-6 bg-[#c5a267]" aria-hidden="true" />
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8c6a32]">
                Thoughtfully delivered
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#380d58] tracking-tight leading-tight">
              Everything behind the moment.
            </h2>
          </div>

          <div className="lg:col-span-5 flex justify-end">
            <div className="relative w-full max-w-sm aspect-[16/9]">
              <Image
                src="/images/forte-gold-ribbon.jpg"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 384px"
                className="object-contain [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_95%)]"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Clean Hairline Grid on Plain White Canvas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#380d58]/15 bg-white">
          {services.map((item) => (
            <article
              key={item.number}
              className="p-8 sm:p-9 border-r border-b border-[#380d58]/15 flex flex-col gap-3 hover:bg-[#faf5ec]/65 transition-colors"
            >
              <span className="text-xs font-bold text-[#8c6a32] tracking-[0.14em]">
                {item.number}
              </span>

              <h3 className="text-xl font-bold text-[#380d58] tracking-tight">
                {item.title}
              </h3>

              <p className="text-sm text-[#5f526b] leading-relaxed font-normal">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
