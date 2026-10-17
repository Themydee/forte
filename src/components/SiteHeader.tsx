'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';

interface SiteHeaderProps {
  activeSection?: string;
}

export function SiteHeader({ activeSection }: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(activeSection || '');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['top', 'about', 'services', 'process', 'gallery', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id === 'top' ? '' : entry.target.id);
          }
        });
      },
      { rootMargin: '-15% 0px -65% 0px' }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#process', label: 'Process' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header
      className={`site-header fixed top-0 inset-x-0 z-50 transition-all duration-300 font-sans ${
        scrolled
          ? 'is-scrolled bg-white/95 backdrop-blur-md border-b border-neutral-200 py-3.5 shadow-xs'
          : 'bg-gradient-to-b from-black/70 via-black/25 to-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="header-inner max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-6">
        <Link href="#top" className="wordmark flex flex-col focus:outline-none group" aria-label="FORTÉ home">
          <span
            className={`wordmark-name text-2xl lg:text-3xl font-bold tracking-[0.22em] transition-colors duration-300 ${
              scrolled ? 'text-black' : 'text-white'
            }`}
          >
            FORTÉ
          </span>
          <span className="wordmark-tag text-[0.6rem] uppercase tracking-[0.2em] text-[#c5a880] font-semibold -mt-0.5 transition-colors">
            Corporate Events &amp; Experiences
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isActive = active === link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative text-xs uppercase tracking-[0.16em] transition-colors duration-200 py-1.5 focus:outline-none ${
                  scrolled
                    ? isActive
                      ? 'text-black font-semibold'
                      : 'text-neutral-600 hover:text-black'
                    : isActive
                      ? 'text-white font-semibold'
                      : 'text-white/80 hover:text-white'
                }`}
                aria-current={isActive ? 'location' : undefined}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c5a880]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Primary Gold Button */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-semibold px-5 py-2.5 rounded-full bg-[#c5a880] text-black hover:bg-[#b39266] active:scale-[0.98] transition-all shadow-[0_2px_12px_rgba(197,168,128,0.25)]"
          >
            <span>Send Us Your Brief</span>
            <ArrowRight size={13} aria-hidden="true" />
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className={`mobile-trigger md:hidden p-2 rounded focus:outline-none focus:ring-1 transition-colors ${
            scrolled
              ? 'text-black hover:text-neutral-700 focus:ring-black'
              : 'text-white hover:text-neutral-200 focus:ring-white'
          }`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="mobile-drawer fixed inset-x-0 top-[65px] bottom-0 bg-white/98 backdrop-blur-xl z-40 p-8 flex flex-col justify-between border-t border-neutral-200 md:hidden overflow-y-auto">
          <nav className="flex flex-col gap-6" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-xl font-bold tracking-tight text-black hover:text-[#c5a880] transition-colors py-2 border-b border-neutral-100 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowRight size={16} className="text-[#c5a880]" />
              </a>
            ))}
          </nav>

          <div className="pt-8 border-t border-neutral-200 flex flex-col gap-4">
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center text-xs uppercase tracking-[0.16em] font-bold py-3.5 rounded-full bg-[#c5a880] text-black hover:bg-[#b39266] transition-colors shadow-sm"
            >
              Send Us Your Brief
            </a>
            <p className="text-center text-xs text-neutral-500 font-sans">
              Email: forteexperiences@gmail.com
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
