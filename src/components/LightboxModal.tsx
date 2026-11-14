"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

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
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handleNext, handlePrev]);

  if (!isOpen || !current) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-night/90 backdrop-blur-xl p-3 sm:p-6 lg:p-10 font-sans"
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
        className="micro-button absolute top-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-button bg-white text-ink hover:bg-gold-soft transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        aria-label="Close dialog"
      >
        <X size={20} />
      </button>

      {/* Prev button */}
      <button
        type="button"
        onClick={handlePrev}
        className="micro-button absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 items-center justify-center rounded-button bg-white/90 text-ink backdrop-blur hover:bg-gold-soft transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        aria-label="Previous photograph"
      >
        <ChevronLeft size={22} />
      </button>

      {/* Next button */}
      <button
        type="button"
        onClick={handleNext}
        className="micro-button absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 items-center justify-center rounded-button bg-white/90 text-ink backdrop-blur hover:bg-gold-soft transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        aria-label="Next photograph"
      >
        <ChevronRight size={22} />
      </button>

      {/* Main Content Modal */}
      <div className="relative max-w-5xl w-full max-h-[90vh] bg-champagne rounded-[1.5rem] sm:rounded-[1.75rem] overflow-hidden p-2 shadow-[0_40px_120px_rgba(0,0,0,0.5)] flex flex-col">
        {/* Image viewport */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-[1.1rem] sm:rounded-[1.35rem] bg-night">
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
        <div className="px-4 py-4 sm:px-5 flex items-center justify-between gap-4">
          <div>
            <h4 className="text-[1.3rem] sm:text-[1.6rem] font-semibold text-ink tracking-[-0.04em] leading-tight">
              {current.title}
            </h4>
            <p className="text-[0.85rem] text-gold-deep font-medium mt-0.5">{current.type}</p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <span className="rounded-full bg-white px-3.5 py-1.5 text-[0.82rem] font-medium text-ink/70">
              {activeIndex + 1} of {items.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
