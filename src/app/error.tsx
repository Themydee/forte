'use client';

import React, { useEffect } from 'react';
import { RefreshCw, ArrowUpRight } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring if configured
    console.error('FORTÉ App Runtime Disruption:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#09090c] text-[#ecebe6] flex items-center justify-center p-6 text-center">
      <div className="max-w-lg mx-auto space-y-6">
        <p className="text-xs uppercase tracking-[0.24em] text-[#c5a880] font-semibold">
          Protocol Interrupted
        </p>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#faf9f6]">
          A Momentary Disruption in the Room.
        </h1>
        <p className="text-sm text-[#a1a1aa] leading-relaxed font-light">
          An unexpected technical exception has occurred while loading this view. You may re-initialize the stage or contact the FORTÉ technical desk.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#c5a880] to-[#dfc8a5] text-[#09090c] text-xs uppercase tracking-[0.16em] font-semibold hover:brightness-110 transition-all"
          >
            <RefreshCw size={14} />
            <span>Re-initialize View</span>
          </button>
          <a
            href="mailto:events@forteexperiences.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[rgba(255,255,255,0.15)] text-[#f7f6f2] hover:border-[#c5a880] text-xs uppercase tracking-[0.16em] transition-all"
          >
            <span>Notify Concierge</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
