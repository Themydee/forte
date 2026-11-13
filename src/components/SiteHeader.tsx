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
      className={`site-header fixed top-0 inset-x-0 z-50 transition-all duration-300 font-sans border-b ${
        scrolled
          ? 'is-scrolled bg-white/95 backdrop-blur-md border-[#380d58]/15 py-3 shadow-xs'
          : 'bg-white/90 backdrop-blur-sm border-[#380d58]/15 py-4'
      }`}
    >
      <div className="header-inner max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-6">
        <Link href="#top" className="wordmark flex flex-col focus:outline-none group" aria-label="FORTÉ home">
          <span className="wordmark-name text-2xl lg:text-3xl font-bold tracking-[0.22em] text-[#380d58] transition-colors duration-300">
            FORTÉ
          </span>
          <span className="wordmark-tag text-[0.6rem] uppercase tracking-[0.2em] text-[#8c6a32] font-semibold -mt-0.5">
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
                  isActive
                    ? 'text-[#380d58] font-semibold'
                    : 'text-[#5f526b] hover:text-[#380d58]'
                }`}
                aria-current={isActive ? 'location' : undefined}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c5a267]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Primary Purple & Gold CTA */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-semibold px-5 py-2.5 rounded-full bg-[#380d58] text-[#faf5ec] border border-[#c5a267]/50 hover:bg-[#4b1573] active:scale-[0.98] transition-all"
          >
            <span>Send Us Your Brief</span>
            <ArrowRight size={13} className="text-[#e2cca8]" aria-hidden="true" />
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="mobile-trigger md:hidden p-2 rounded border border-[#380d58]/20 text-[#380d58] hover:bg-[#faf5ec] focus:outline-none transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="mobile-drawer fixed inset-x-0 top-[68px] bottom-0 bg-[#faf5ec] z-40 p-8 flex flex-col justify-between border-t border-[#380d58]/15 md:hidden overflow-y-auto">
          <nav className="flex flex-col gap-5" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-xl font-bold tracking-tight text-[#380d58] hover:text-[#8c6a32] transition-colors py-2.5 border-b border-[#380d58]/12 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowRight size={16} className="text-[#c5a267]" />
              </a>
            ))}
          </nav>

          <div className="pt-8 border-t border-[#380d58]/15 flex flex-col gap-4">
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center text-xs uppercase tracking-[0.16em] font-bold py-3.5 rounded-full bg-[#380d58] text-[#faf5ec] border border-[#c5a267]/50 hover:bg-[#4b1573] transition-colors"
            >
              Send Us Your Brief
            </a>
            <p className="text-center text-xs text-[#5f526b] font-sans">
              forteexperiences@gmail.com
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
