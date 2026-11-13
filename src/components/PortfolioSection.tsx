'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { LightboxModal, GalleryItem } from './LightboxModal';

export function PortfolioSection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'gala',
      title: 'A room to remember',
      type: 'Gala dinner',
      category: 'gala',
      location: 'London',
      guests: 'Gala dinner',
      image: '/images/forte-gala-hero.jpg',
      alt: 'Candlelit gala room set beneath glowing chandeliers',
      description: 'Candlelit gala room set beneath glowing chandeliers.',
    },
    {
      id: 'conference',
      title: 'Gather with purpose',
      type: 'Conference',
      category: 'conference',
      location: 'Geneva',
      guests: 'Conference',
      image: '/images/forte-conference.jpg',
      alt: 'A speaker addressing guests at a corporate conference',
      description: 'A speaker addressing guests at a corporate conference.',
    },
    {
      id: 'dinner',
      title: 'An evening well spent',
      type: 'Hospitality',
      category: 'hospitality',
      location: 'Zurich',
      guests: 'Private dining',
      image: '/images/forte-dinner.jpg',
      alt: 'Guests sharing an elegant candlelit dinner',
      description: 'Guests sharing an elegant candlelit dinner.',
    },
    {
      id: 'welcome',
      title: 'A moment of arrival',
      type: 'Guest experience',
      category: 'reception',
      location: 'Private Estate',
      guests: 'Arrival reception',
      image: '/images/forte-welcome.jpg',
      alt: 'Event hosts welcoming guests at a reception',
      description: 'Event hosts welcoming guests to a considered, polished experience.',
    },
    {
      id: 'activation',
      title: 'A world of its own',
      type: 'Brand activation',
      category: 'activation',
      location: 'Milan',
      guests: 'Brand installation',
      image: '/images/forte-activation.jpg',
      alt: 'Guests exploring a sculptural event installation',
      description: 'Guests exploring a sculptural brand activation installation.',
    },
    {
      id: 'awards',
      title: 'A reason to celebrate',
      type: 'Awards evening',
      category: 'awards',
      location: 'Paris',
      guests: 'Awards dinner',
      image: '/images/forte-awards.jpg',
      alt: 'A speaker on stage at a celebratory awards dinner',
      description: 'A speaker on stage at a celebratory awards dinner.',
    },
  ];

  return (
    <section className="py-24 bg-white relative border-t border-[#380d58]/15 font-sans" id="gallery">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 pb-6 border-b border-[#380d58]/15">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-6 bg-[#c5a267]" aria-hidden="true" />
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8c6a32]">
                A sense of the occasion
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#380d58] tracking-tight leading-tight">
              Feel the room.
            </h2>
          </div>
          <p className="text-sm italic text-[#8c6a32] font-normal">
            A few moments, imagined by FORTÉ.
          </p>
        </div>

        {/* Clean Gold-Stroked Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {galleryItems.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setLightboxIndex(idx)}
              className="group text-left rounded-2xl border border-[#c5a267]/50 bg-white hover:border-[#380d58] transition-all flex flex-col overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#c5a267]"
              aria-label={`View ${item.title}, ${item.type}`}
            >
              <div className="relative aspect-[16/10] w-full bg-[#faf5ec] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
                />
              </div>

              <div className="px-5 py-4 border-t border-[#380d58]/12 flex items-center justify-between gap-3 w-full">
                <h3 className="text-base font-bold text-[#380d58] tracking-tight">
                  {item.title}
                </h3>
                <span className="text-[0.68rem] uppercase tracking-[0.14em] text-[#8c6a32] font-semibold inline-flex items-center gap-1 shrink-0">
                  {item.type}
                  <ArrowUpRight
                    size={13}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <LightboxModal
        items={galleryItems}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(index) => setLightboxIndex(index)}
      />
    </section>
  );
}
