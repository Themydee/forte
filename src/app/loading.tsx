import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-[#faf5ec] z-50 flex flex-col items-center justify-center p-6 text-center" aria-live="polite" aria-busy="true">
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-full border border-[#380d58]/20 animate-spin border-t-[#c5a267]" />
        <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-[#380d58]">
          F
        </span>
      </div>
      <p className="text-xl font-bold tracking-[0.24em] uppercase text-[#380d58]">FORTÉ</p>
      <p className="text-[0.65rem] uppercase tracking-[0.24em] text-[#8c6a32] mt-1 font-semibold">
        Exceptional, by Design.
      </p>
    </div>
  );
}
