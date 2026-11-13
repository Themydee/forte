import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#faf5ec] text-[#2c1e38] flex items-center justify-center p-6 text-center">
      <div className="max-w-lg mx-auto space-y-6 bg-white border border-[#c5a267] rounded-2xl p-10">
        <p className="text-xs uppercase tracking-[0.24em] text-[#8c6a32] font-semibold">
          404 · Page Not Found
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-[#380d58] leading-tight tracking-tight">
          This room isn’t here.
        </h1>
        <p className="text-sm text-[#5f526b] leading-relaxed">
          The page you are looking for does not exist or has moved.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#380d58] text-[#faf5ec] border border-[#c5a267]/50 text-xs uppercase tracking-[0.16em] font-semibold hover:bg-[#4b1573] transition-all"
          >
            <ArrowLeft size={14} />
            <span>Back Home</span>
          </Link>
          <a
            href="mailto:forteexperiences@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#c5a267] bg-white text-[#380d58] hover:bg-[#faf5ec] text-xs uppercase tracking-[0.16em] font-semibold transition-all"
          >
            <span>Contact FORTÉ</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
