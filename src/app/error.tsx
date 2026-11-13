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
    <div className="min-h-screen bg-[#faf5ec] text-[#2c1e38] flex items-center justify-center p-6 text-center">
      <div className="max-w-lg mx-auto space-y-6 bg-white border border-[#c5a267] rounded-2xl p-10">
        <p className="text-xs uppercase tracking-[0.24em] text-[#8c6a32] font-semibold">
          Protocol Interrupted
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#380d58] tracking-tight">
          A momentary disruption.
        </h1>
        <p className="text-sm text-[#5f526b] leading-relaxed">
          An unexpected error occurred while loading this page. Try again or contact the FORTÉ desk.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#380d58] text-[#faf5ec] border border-[#c5a267]/50 text-xs uppercase tracking-[0.16em] font-semibold hover:bg-[#4b1573] transition-all"
          >
            <RefreshCw size={14} />
            <span>Try Again</span>
          </button>
          <a
            href="mailto:forteexperiences@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#c5a267] bg-white text-[#380d58] hover:bg-[#faf5ec] text-xs uppercase tracking-[0.16em] font-semibold transition-all"
          >
            <span>Email FORTÉ</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
