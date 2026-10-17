import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-[#09090c] z-50 flex flex-col items-center justify-center p-6 text-center" aria-live="polite" aria-busy="true">
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-full border border-[rgba(197,168,128,0.2)] animate-spin border-t-[#c5a880]" />
        <span className="absolute inset-0 flex items-center justify-center font-serif text-xl font-bold text-[#c5a880]">
          F
        </span>
      </div>
      <p className="font-serif text-xl tracking-[0.2em] uppercase text-[#faf9f6]">FORTÉ</p>
      <p className="text-[0.65rem] uppercase tracking-[0.24em] text-[#c5a880] mt-1">
        Preparing the Room...
      </p>
    </div>
  );
}
