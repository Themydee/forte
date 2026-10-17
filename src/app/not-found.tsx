import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#09090c] text-[#ecebe6] flex items-center justify-center p-6 text-center">
      <div className="max-w-lg mx-auto space-y-6">
        <p className="text-xs uppercase tracking-[0.24em] text-[#c5a880] font-semibold">
          Error 404 • Destination Unlisted
        </p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#faf9f6] leading-tight">
          The Room You Seek Is Not In Session.
        </h1>
        <p className="text-sm text-[#a1a1aa] leading-relaxed font-light">
          The requested coordinate or confidential itinerary cannot be located. Please return to the main reception or contact the FORTÉ concierge directly.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#c5a880] to-[#dfc8a5] text-[#09090c] text-xs uppercase tracking-[0.16em] font-semibold hover:brightness-110 transition-all"
          >
            <ArrowLeft size={14} />
            <span>Return to Reception</span>
          </Link>
          <a
            href="mailto:events@forteexperiences.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[rgba(255,255,255,0.15)] text-[#f7f6f2] hover:border-[#c5a880] text-xs uppercase tracking-[0.16em] transition-all"
          >
            <span>Inquire With Concierge</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
