"use client";

import React, { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";

const rise = (i: number) => ({ "--rise-i": i }) as CSSProperties;

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  // The film is only loaded on tablet and desktop, and never with reduced motion
  // or data saver. Phones get the blurred still, which paints much faster.
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const saveData = Boolean(
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData,
    );
    const decide = () => setShowVideo(wide.matches && !reduced.matches && !saveData);
    decide();
    wide.addEventListener?.("change", decide);
    return () => wide.removeEventListener?.("change", decide);
  }, []);

  // Pause the film while the hero is scrolled out of view.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) void video.play().catch(() => {});
      else video.pause();
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, [showVideo]);

  return (
    <section id="top" className="studio-hero bg-champagne font-sans">
      <div className="studio-hero__frame text-white">
        {/* The frame's top strip (nav) and the inverse corners that shape the
            panel's raised tab, where the header places its CTA. */}
        <div aria-hidden="true" className="studio-hero__strip" />
        <div aria-hidden="true" className="studio-hero__corner studio-hero__corner--start" />
        <div aria-hidden="true" className="studio-hero__corner studio-hero__corner--tab" />

        <div className="studio-hero__panel">
          {/* The room itself, in focus: the brief asks for a page that feels alive
              within five seconds. Shading keeps the headline readable. */}
          <div aria-hidden="true" className="absolute inset-0 -z-10">
            <Image
              src="/images/forte-gala-hero.jpg"
              alt=""
              fill
              priority
              quality={70}
              sizes="100vw"
              className="object-cover"
            />
            {showVideo && (
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover"
              >
                {/* Cloudinary resizes to 1280px and picks the quality (q_auto). */}
                <source
                  src="https://res.cloudinary.com/dhqzuff1v/video/upload/q_auto,w_1280/v1794656108/forte-hero-event.webm"
                  type="video/webm"
                />
                <source
                  src="https://res.cloudinary.com/dhqzuff1v/video/upload/q_auto,w_1280/v1794656108/forte-hero-event.mp4"
                  type="video/mp4"
                />
              </video>
            )}
            <div className="absolute inset-0 bg-night/20" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_52%,rgba(11,15,30,0.55)_0%,rgba(11,15,30,0.2)_60%,transparent_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,15,30,0.35)_0%,transparent_28%,transparent_65%,rgba(11,15,30,0.6)_100%)]" />
          </div>

          <div className="studio-hero__content flex flex-1 flex-col items-center justify-center px-4 pb-14 text-center sm:px-8 sm:pb-16">
            <h1
              className="hero-rise text-[clamp(2.75rem,min(11vw,15svh),8rem)] font-semibold leading-[0.92] tracking-[-0.055em]"
              style={rise(1)}
            >
              <span className="flex flex-wrap items-center justify-center gap-x-[0.2em]">
                <span>Give us</span>{" "}
                <span className="relative inline-block h-[0.78em] w-[1.25em] shrink-0 overflow-hidden rounded-[0.16em] shadow-[0_12px_40px_rgba(0,0,0,0.3)] ring-1 ring-white/20">
                  <Image
                    src="/images/forte-gala-hero.jpg"
                    alt=""
                    fill
                    priority
                    sizes="(max-width: 768px) 90px, 160px"
                    className="object-cover"
                  />
                </span>
              </span>{" "}
              <span className="mt-[0.04em] block">the brief.</span>
            </h1>

            <p
              className="hero-rise mt-5 max-w-[34rem] text-[clamp(1rem,1.8vw,1.45rem)] font-medium leading-tight tracking-[-0.03em] text-white/90 sm:mt-8"
              style={rise(2)}
            >
              Corporate events and experiences, planned with purpose and delivered without a hitch.
            </p>

            <div
              className="hero-rise mt-8 flex w-full max-w-[22rem] flex-col items-stretch gap-3 min-[440px]:w-auto min-[440px]:max-w-none min-[440px]:flex-row min-[440px]:items-center min-[440px]:justify-center sm:mt-11"
              style={rise(3)}
            >
              <a
                href="/contact"
                className="micro-button inline-flex items-center justify-center gap-2 rounded-button bg-white px-6 py-3.5 text-[0.95rem] font-medium tracking-[-0.01em] text-ink transition hover:bg-gold-soft"
              >
                Send Us Your Brief
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#about"
                className="micro-button inline-flex items-center justify-center gap-2 rounded-button border border-white/25 px-6 py-3.5 text-[0.95rem] font-medium tracking-[-0.01em] text-white transition hover:border-white/60 hover:bg-white/10"
              >
                Discover FORTÉ
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
