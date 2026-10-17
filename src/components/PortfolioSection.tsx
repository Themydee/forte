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
    <section className="py-24 bg-white relative border-b border-neutral-200/80 font-sans" id="gallery">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 pb-6 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-6 bg-[#c5a880]" aria-hidden="true" />
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#b39266]">
                A sense of the occasion
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black tracking-tight leading-tight">
              Feel the room.
            </h2>
          </div>
          <p className="text-sm text-neutral-600 font-normal">
            A few moments, imagined by FORTÉ.
          </p>
        </div>

        {/* Gallery Grid of Full Architectural Photographs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setLightboxIndex(idx)}
              className="group text-left border border-neutral-200 bg-white hover:border-[#c5a880] transition-all flex flex-col focus:outline-none focus:ring-2 focus:ring-[#c5a880]"
              aria-label={`View ${item.title}, ${item.type}`}
            >
              {/* Generous High-Impact Architectural Photo Frame */}
              <div className="relative aspect-[16/10] w-full bg-neutral-100 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Editorial Metadata */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[0.7rem] uppercase tracking-wider text-[#b39266] font-semibold">
                      {item.type}
                    </span>
                    <span className="text-xs text-neutral-400">
                      {item.location}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-black tracking-tight mb-1.5">
                    {item.title}
                  </h3>

                  <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400 group-hover:text-black transition-colors">
                  <span>Enlarge photograph</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
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
