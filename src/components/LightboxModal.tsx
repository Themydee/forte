'use client';

import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface GalleryItem {
  id: string;
  title: string;
  type: string;
  category: string;
  location: string;
  guests: string;
  image: string;
  alt: string;
  description: string;
}

interface LightboxModalProps {
  items: GalleryItem[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function LightboxModal({ items, activeIndex, onClose, onNavigate }: LightboxModalProps) {
  const isOpen = activeIndex !== null && activeIndex >= 0 && activeIndex < items.length;
  const current = isOpen ? items[activeIndex] : null;

  const handleNext = useCallback(() => {
    if (activeIndex === null) return;
    onNavigate((activeIndex + 1) % items.length);
  }, [activeIndex, items.length, onNavigate]);

  const handlePrev = useCallback(() => {
    if (activeIndex === null) return;
    onNavigate((activeIndex - 1 + items.length) % items.length);
  }, [activeIndex, items.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handleNext, handlePrev]);

  if (!isOpen || !current) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6 lg:p-10 font-sans"
      role="dialog"
      aria-modal="true"
      aria-label={`${current.title} photograph view`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white text-black hover:bg-[#c5a880] hover:text-black border border-neutral-200 transition-all focus:outline-none shadow-md"
        aria-label="Close dialog"
      >
        <X size={20} />
      </button>

      {/* Prev button */}
      <button
        type="button"
        onClick={handlePrev}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3.5 rounded-full bg-white text-black hover:bg-[#c5a880] hover:text-black border border-neutral-200 transition-all focus:outline-none shadow-md"
        aria-label="Previous photograph"
      >
        <ChevronLeft size={22} />
      </button>

      {/* Next button */}
      <button
        type="button"
        onClick={handleNext}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3.5 rounded-full bg-white text-black hover:bg-[#c5a880] hover:text-black border border-neutral-200 transition-all focus:outline-none shadow-md"
        aria-label="Next photograph"
      >
        <ChevronRight size={22} />
      </button>

      {/* Main Content Modal */}
      <div className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-2xl flex flex-col">
        {/* Image viewport */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-black">
          <Image
            src={current.image}
            alt={current.alt}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-contain"
          />
        </div>

        {/* Caption & Metadata Bar */}
        <div className="p-6 bg-white border-t border-neutral-200 flex items-center justify-between gap-4">
          <div>
            <h4 className="text-lg sm:text-xl font-bold text-black tracking-tight">{current.title}</h4>
            <p className="text-xs text-[#b39266] font-semibold mt-0.5">{current.type}</p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <span className="text-xs tracking-[0.2em] uppercase font-mono text-black font-bold">
              {activeIndex + 1} of {items.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
