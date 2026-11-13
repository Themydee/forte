'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUp, ArrowUpRight } from 'lucide-react';

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const emailAddress = 'forteexperiences@gmail.com';
  const whatsappUrl = 'https://wa.me/15551234567';

  return (
    <footer className="site-footer bg-[#380d58] text-[#faf5ec] border-t border-[#c5a267]/40 py-14 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-10 border-b border-[#e2cca8]/20">
          <div>
            <Link href="#top" className="wordmark footer-wordmark flex flex-col focus:outline-none" aria-label="FORTÉ home">
              <span className="wordmark-name text-2xl lg:text-3xl font-bold tracking-[0.22em] text-[#faf5ec]">
                FORTÉ
              </span>
            </Link>
            <p className="text-sm italic text-[#e2cca8] mt-2 font-medium">
              Exceptional, by Design.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-[#faf5ec]/85">
            <a href={`mailto:${emailAddress}`} className="hover:text-[#e2cca8] transition-colors">
              {emailAddress}
            </a>
            <a
              href="https://forteexperiences.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#e2cca8] transition-colors flex items-center gap-1"
            >
              <span>forteexperiences.com</span>
              <ArrowUpRight size={12} aria-hidden="true" />
            </a>
            <a
              href="https://www.instagram.com/forteexperiences/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#e2cca8] transition-colors flex items-center gap-1"
            >
              <span>@forteexperiences</span>
              <ArrowUpRight size={12} aria-hidden="true" />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#e2cca8] transition-colors flex items-center gap-1"
            >
              <span>WhatsApp</span>
              <ArrowUpRight size={12} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#faf5ec]/70">
          <p>© {currentYear} FORTÉ. All rights reserved.</p>
          <a
            href="#top"
            aria-label="Back to top"
            className="inline-flex items-center gap-1.5 text-xs text-[#e2cca8] hover:text-white transition-colors font-medium"
          >
            <span>Back to top</span>
            <ArrowUp size={13} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
