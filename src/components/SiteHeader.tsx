"use client";

import React, { useEffect, useState, type CSSProperties } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, X } from "lucide-react";

interface SiteHeaderProps {
  activeSection?: string;
  /**
   * "overlay" docks into the home hero's frame (links on the dark strip, CTA
   * in the panel's raised tab); "light" is for pages that open on the
   * champagne canvas; "dark" is for pages that open on a dark background
   * (light text at the top). All use the floating glass bar once scrolled.
   */
  variant?: "overlay" | "light" | "dark";
}

// Section links include the path so they also work from other pages.
const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#contact", label: "Contact" },
];

const sectionId = (href: string) => href.split("#")[1] ?? "";

// On the home page, the docked nav has scrolled away by about this point.
const DOCK_HEIGHT_PX = 120;

function Wordmark({ light }: { light: boolean }) {
  return (
    <a
      href="/#top"
      className="nav-rise flex min-w-0 flex-col leading-none focus:outline-none"
      style={{ "--nav-i": 0 } as CSSProperties}
      aria-label="FORTÉ home"
    >
      <span
        className={`text-[1.15rem] font-bold tracking-[0.22em] sm:text-[1.3rem] ${
          light ? "text-white" : "text-plum"
        }`}
      >
        FORTÉ
      </span>
      <span
        className={`mt-1 hidden text-[0.55rem] font-semibold uppercase tracking-[0.2em] sm:block ${
          light ? "text-white/60" : "text-gold-deep"
        }`}
      >
        Corporate Events &amp; Experiences
      </span>
    </a>
  );
}

function MenuLines() {
  return (
    <>
      <span className="h-[2px] w-6 rounded-full bg-current" />
      <span className="h-[2px] w-6 rounded-full bg-current" />
    </>
  );
}

export function SiteHeader({ activeSection, variant = "overlay" }: SiteHeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [active, setActive] = useState(activeSection || "");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      // Only the thresholds matter, so avoid re-rendering on every pixel.
      setScrollY(y > DOCK_HEIGHT_PX ? DOCK_HEIGHT_PX + 1 : y > 12 ? 13 : 0);
    };
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id === "top" ? "" : entry.target.id);
          }
        });
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );

    ["top", ...navLinks.map((link) => sectionId(link.href)).filter(Boolean)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href.includes("#") ? active === sectionId(href) : pathname === href;

  const docked = variant === "overlay";
  // The floating bar: always on light pages, and on the home page once the
  // docked nav has scrolled out of view.
  const showBar = !docked || scrollY > DOCK_HEIGHT_PX;
  const atTop = scrollY <= 12;
  // "dark" pages open on a dark background: light text until the glass bar forms.
  const lightText = variant === "dark" && atTop;

  const barSurface =
    atTop && !docked
      ? "border-transparent"
      : "border-white/70 bg-white/60 lg:rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_10px_30px_rgba(15,18,34,0.1)] backdrop-blur-xl backdrop-saturate-[1.8]";

  const openMenuButton = (className: string) => (
    <button
      type="button"
      onClick={() => setMobileOpen(true)}
      aria-label="Open menu"
      aria-expanded={mobileOpen}
      aria-controls="mobile-menu"
      className={className}
    >
      <MenuLines />
    </button>
  );

  return (
    <header className="font-sans">
      {/* Docked nav: laid over the hero frame's strip and tab, scrolls away with it. */}
      {docked && (
        <div className="studio-dock">
          <div className="studio-dock__row nav-drop">
            <div className="flex min-w-0 flex-1 items-center justify-between gap-6 pl-5 pr-3 sm:pl-7 lg:pl-9 lg:pr-9">
              <Wordmark light />

              <nav
                className="hidden items-center gap-7 lg:flex xl:gap-9"
                aria-label="Main navigation"
              >
                {navLinks.map((link, index) => {
                  const current = isActive(link.href);
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      style={{ "--nav-i": index + 1 } as CSSProperties}
                      aria-current={current ? "location" : undefined}
                      className={`nav-rise text-[0.9rem] font-medium tracking-[-0.01em] transition-colors ${
                        current ? "text-gold" : "text-white/80 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </nav>
            </div>

            <div className="studio-dock__tab">
              <a
                href="/contact"
                style={{ "--nav-i": navLinks.length + 1 } as CSSProperties}
                className="micro-button nav-rise group hidden items-center gap-3 rounded-button py-1 pl-2 text-[0.95rem] font-medium tracking-[-0.01em] text-white lg:inline-flex"
              >
                Send Us Your Brief
                <span className="flex h-10 w-10 items-center justify-center rounded-button border border-white/60 transition group-hover:border-gold group-hover:bg-gold group-hover:text-night">
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </a>
              {openMenuButton(
                "nav-rise flex h-11 w-11 flex-col items-center justify-center gap-[6px] rounded-button border border-white/50 text-white transition hover:bg-white/10 lg:hidden",
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating glass bar. */}
      {showBar && (
        <div
          className={`fixed inset-x-0 top-0 z-50 transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:px-3 ${
            atTop && !docked ? "px-2 pt-2 sm:px-3 sm:pt-3" : "pt-0 lg:pt-3"
          }`}
        >
          <div
            className={`nav-drop mx-auto flex items-center justify-between gap-4 border transition-all duration-300 max-lg:border-x-0 max-lg:border-t-0 lg:grid lg:grid-cols-[1fr_auto_1fr] ${barSurface} ${
              atTop && !docked
                ? "max-w-none px-5 py-3 sm:px-7 lg:px-9 lg:py-5"
                : "px-5 py-2 sm:px-6 lg:max-w-[1380px] lg:px-6 lg:py-2.5"
            }`}
          >
            <Wordmark light={lightText} />

            <nav
              className="hidden items-center justify-center gap-6 lg:flex xl:gap-9"
              aria-label={docked ? "Main navigation (floating)" : "Main navigation"}
            >
              {navLinks.map((link, index) => {
                const current = isActive(link.href);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    style={{ "--nav-i": index + 1 } as CSSProperties}
                    aria-current={current ? "location" : undefined}
                    className={`nav-rise text-[0.9rem] font-medium tracking-[-0.01em] transition-colors ${
                      lightText
                        ? current
                          ? "text-gold"
                          : "text-white/80 hover:text-white"
                        : current
                          ? "text-gold-deep"
                          : "text-ink hover:text-gold-deep"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            <div
              className="nav-rise hidden items-center justify-end lg:flex"
              style={{ "--nav-i": navLinks.length + 1 } as CSSProperties}
            >
              <a
                href="/contact"
                className={`micro-button inline-flex items-center gap-2 rounded-button px-5 py-2.5 text-[0.9rem] font-medium tracking-[-0.01em] transition ${
                  lightText
                    ? "bg-white text-ink hover:bg-gold-soft"
                    : "bg-ink text-white hover:bg-plum"
                }`}
              >
                Send Us Your Brief
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            {openMenuButton(
              `nav-rise -mr-2 flex h-10 w-10 flex-col items-center justify-center gap-[6px] lg:hidden ${
                lightText ? "text-white" : "text-ink"
              }`,
            )}
          </div>
        </div>
      )}

      {mobileOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[60] p-2 lg:hidden"
        >
          <div
            aria-hidden="true"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-night/30 backdrop-blur-md"
          />

          <div className="mobile-menu-panel relative flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-night/95 px-6 pb-6 pt-5 text-white shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <a
                href="/#top"
                onClick={() => setMobileOpen(false)}
                className="text-[1.2rem] font-bold tracking-[0.22em]"
              >
                FORTÉ
              </a>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="-mr-2 flex h-11 w-11 items-center justify-center"
              >
                <X className="h-7 w-7" strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>

            <nav
              className="mt-6 flex-1 overflow-y-auto border-t border-white/15"
              aria-label="Mobile navigation"
            >
              {navLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{ "--nav-i": index } as CSSProperties}
                  className={`nav-rise flex items-center justify-between border-b border-white/15 py-3 text-[clamp(2rem,9vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.05em] transition ${
                    isActive(link.href) ? "text-gold" : "text-white"
                  }`}
                >
                  {link.label}
                  <ArrowUpRight className="h-6 w-6 text-gold" aria-hidden="true" />
                </a>
              ))}
            </nav>

            <a
              href="/contact"
              onClick={() => setMobileOpen(false)}
              style={{ "--nav-i": navLinks.length } as CSSProperties}
              className="nav-rise micro-button mt-6 flex items-center justify-center gap-2 rounded-button bg-white px-6 py-4 text-[1.05rem] font-medium tracking-[-0.02em] text-ink transition hover:bg-gold"
            >
              Send Us Your Brief
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <p className="mt-4 text-center text-[0.82rem] text-white/60">
              forteexperiences@gmail.com
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
