"use client";

import React, { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import Image from "next/image";
import { ArrowUpRight, Maximize2 } from "lucide-react";
import { LightboxModal, GalleryItem } from "./LightboxModal";

const galleryItems: GalleryItem[] = [
  {
    id: "gala",
    title: "A room to remember",
    type: "Gala dinner",
    category: "gala",
    location: "London",
    guests: "Gala dinner",
    image: "/images/forte-gala-hero.jpg",
    alt: "Candlelit gala room set beneath glowing chandeliers",
    description: "Candlelit gala room set beneath glowing chandeliers.",
  },
  {
    id: "conference",
    title: "Gather with purpose",
    type: "Conference",
    category: "conference",
    location: "Geneva",
    guests: "Conference",
    image: "/images/forte-conference.jpg",
    alt: "A speaker addressing guests at a corporate conference",
    description: "A speaker addressing guests at a corporate conference.",
  },
  {
    id: "dinner",
    title: "An evening well spent",
    type: "Hospitality",
    category: "hospitality",
    location: "Zurich",
    guests: "Private dining",
    image: "/images/forte-dinner.jpg",
    alt: "Guests sharing an elegant candlelit dinner",
    description: "Guests sharing an elegant candlelit dinner.",
  },
  {
    id: "welcome",
    title: "A moment of arrival",
    type: "Guest experience",
    category: "reception",
    location: "Private Estate",
    guests: "Arrival reception",
    image: "/images/forte-welcome.jpg",
    alt: "Event hosts welcoming guests at a reception",
    description: "Event hosts welcoming guests to a considered, polished experience.",
  },
  {
    id: "activation",
    title: "A world of its own",
    type: "Brand activation",
    category: "activation",
    location: "Milan",
    guests: "Brand installation",
    image: "/images/forte-activation.jpg",
    alt: "Guests exploring a sculptural event installation",
    description: "Guests exploring a sculptural brand activation installation.",
  },
  {
    id: "awards",
    title: "A reason to celebrate",
    type: "Awards evening",
    category: "awards",
    location: "Paris",
    guests: "Awards dinner",
    image: "/images/forte-awards.jpg",
    alt: "A speaker on stage at a celebratory awards dinner",
    description: "A speaker on stage at a celebratory awards dinner.",
  },
];

// How far the liquid layer overhangs each side of the card, so its rippled
// edge never shows gaps at the card's borders.
const GOO_OVERHANG = 0.12;
const FILL_IN_MS = 1800;
const FILL_OUT_MS = 1000;
const CONTENT_DELAY_MS = 1000;
const CONTENT_IN_MS = 700;

/**
 * Liquid hover: gold pours in as a circle from where the pointer entered, its
 * edge rippled by the `#liquid-edge` SVG filter, then the caption rises in.
 * On leave it drains back toward the exit point.
 */
function playLiquid(event: PointerEvent<HTMLElement>, entering: boolean) {
  if (event.pointerType === "touch") return;
  const card = event.currentTarget;
  const fill = card.querySelector<HTMLElement>("[data-liquid-fill]");
  const content = card.querySelector<HTMLElement>("[data-liquid-content]");
  const goo = fill?.parentElement;
  if (!fill || !content || !goo || typeof fill.animate !== "function") return;

  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left + rect.width * GOO_OVERHANG;
  const y = event.clientY - rect.top + rect.height * GOO_OVERHANG;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const w = rect.width * (1 + GOO_OVERHANG * 2);
  const h = rect.height * (1 + GOO_OVERHANG * 2);
  const reach = Math.hypot(Math.max(x, w - x), Math.max(y, h - y));

  // Continue from wherever a running animation has got to, so reversing is smooth.
  const current = getComputedStyle(fill).clipPath;
  const radius = Number.parseFloat(/circle\(([\d.]+)px/.exec(current)?.[1] ?? "0");
  const start = radius > 1 ? current : `circle(0px at ${x}px ${y}px)`;
  fill.getAnimations().forEach((animation) => animation.cancel());
  content.getAnimations().forEach((animation) => animation.cancel());

  if (entering) {
    // The rippled-edge filter is costly, so it is only attached while in use.
    goo.style.filter = "url(#liquid-edge)";
    fill.animate([{ clipPath: start }, { clipPath: `circle(${reach}px at ${x}px ${y}px)` }], {
      duration: reduced ? 1 : FILL_IN_MS,
      easing: "cubic-bezier(0.65, 0, 0.35, 1)",
      fill: "forwards",
    });
    content.animate(
      [
        { opacity: 0, transform: "translateY(1.25rem)" },
        { opacity: 1, transform: "none" },
      ],
      {
        duration: reduced ? 1 : CONTENT_IN_MS,
        delay: reduced ? 0 : CONTENT_DELAY_MS,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "both",
      },
    );
  } else {
    const drain = fill.animate(
      [{ clipPath: start }, { clipPath: `circle(0px at ${x}px ${y}px)` }],
      {
        duration: reduced ? 1 : FILL_OUT_MS,
        easing: "cubic-bezier(0.55, 0, 0.35, 1)",
        fill: "forwards",
      },
    );
    drain.onfinish = () => {
      goo.style.filter = "";
    };
    content.animate([{ opacity: getComputedStyle(content).opacity }, { opacity: 0 }], {
      duration: reduced ? 1 : 300,
      fill: "forwards",
    });
  }
}

/**
 * On desktop the section pins to the viewport and scroll drives `--fw-p`
 * (0 → last index). The title list and the card stack both move by it, so
 * only the current moment is in view. Below `lg` it is a plain stacked list.
 */
export function PortfolioSection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLElement>(null);
  const count = galleryItems.length;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // The pinned, scroll-driven stage only exists at lg and up.
    const desktop = window.matchMedia("(min-width: 1024px)");

    let frame = 0;
    const update = () => {
      frame = 0;
      if (!desktop.matches) return;
      const rect = track.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const distance = rect.height - window.innerHeight;
      const ratio = distance > 0 ? Math.min(Math.max(-rect.top / distance, 0), 1) : 0;
      const progress = ratio * (count - 1);
      track.style.setProperty("--fw-p", progress.toFixed(4));
      setActive(Math.round(progress));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [count]);

  return (
    <section
      id="gallery"
      ref={trackRef}
      className="featured-work bg-champagne p-2 font-sans sm:p-3"
      style={{ "--fw-n": count, "--fw-p": 0 } as CSSProperties}
    >
      {/* Turbulence that makes the hover fill's edge move like liquid. */}
      <svg aria-hidden="true" className="absolute h-0 w-0">
        <filter id="liquid-edge" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves="2" seed="4" />
          <feDisplacementMap
            in="SourceGraphic"
            scale="46"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <div className="featured-work__stage rounded-[1.25rem] bg-night px-5 text-white sm:rounded-[1.75rem] sm:px-8 lg:px-14">
        <div className="grid h-full lg:grid-cols-2 lg:gap-12">
          <div className="pt-14 lg:flex lg:h-full lg:flex-col lg:pb-14 lg:pt-24">
            <p className="text-[0.92rem] font-medium tracking-[-0.02em] text-gold">
              A sense of the occasion
            </p>
            <h2 className="mt-2 text-[clamp(2.4rem,4.4vw,3.75rem)] font-semibold leading-none tracking-[-0.05em]">
              Feel the room.
            </h2>

            <div
              aria-hidden="true"
              className="relative hidden flex-1 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_22%,black_78%,transparent)] lg:block"
            >
              <ul className="featured-work__names absolute inset-x-0 top-1/2">
                {galleryItems.map((item, index) => {
                  const isActive = index === active;
                  return (
                    <li key={item.id} className="featured-work__name flex flex-col justify-center">
                      <span
                        className={`text-[0.9rem] font-medium transition-colors duration-500 ${
                          isActive ? "text-gold" : "text-white/35"
                        }`}
                      >
                        ({item.type})
                      </span>
                      {/* One line per row: rows are a fixed height the scroll maths depends on. */}
                      <span
                        className={`origin-left whitespace-nowrap text-[clamp(2.1rem,3.1vw,3.6rem)] font-semibold leading-[1.08] tracking-[-0.045em] transition-all duration-500 ${
                          isActive
                            ? "text-white"
                            : "scale-[0.94] bg-gradient-to-b from-white/70 to-white/10 bg-clip-text text-transparent"
                        }`}
                      >
                        {item.title}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <p className="mt-3 text-[0.92rem] italic text-white/55">
              A few moments, imagined by FORTÉ.
            </p>
          </div>

          <div className="relative py-8 lg:overflow-hidden lg:py-0">
            <div className="featured-work__cards flex flex-col gap-8 sm:gap-10 lg:absolute lg:inset-x-0 lg:top-1/2">
              {galleryItems.map((item, idx) => (
                <article key={item.id}>
                  <div className="mb-3 lg:hidden" aria-hidden="true">
                    <span className="text-[0.72rem] font-medium text-gold">({item.type})</span>
                    <p className="text-[1.75rem] font-semibold leading-tight tracking-[-0.04em]">
                      {item.title}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setLightboxIndex(idx)}
                    onPointerEnter={(event) => playLiquid(event, true)}
                    onPointerLeave={(event) => playLiquid(event, false)}
                    aria-label={`View ${item.title}, ${item.type}`}
                    className="featured-work__card group relative block aspect-[4/3] w-full overflow-hidden rounded-[1rem] bg-plum text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:rounded-[1.25rem]"
                  >
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    <span className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(180deg,transparent,rgba(11,15,30,0.55))]" />

                    <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-4 sm:p-6">
                      <span className="text-[1.1rem] font-semibold tracking-[-0.02em] sm:text-[1.3rem]">
                        {item.title}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/92 px-3.5 py-2 text-[0.8rem] font-medium text-ink backdrop-blur sm:text-[0.9rem]">
                        {item.type}
                        <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    </span>

                    {/* Liquid fill: a circle of gold grows from the pointer. */}
                    <span
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        inset: `-${GOO_OVERHANG * 100}%`,
                        pointerEvents: "none",
                      }}
                    >
                      <span
                        data-liquid-fill
                        style={{
                          position: "absolute",
                          inset: 0,
                          backgroundColor: "#d9a441",
                          clipPath: "circle(0px at 50% 50%)",
                        }}
                      />
                    </span>

                    <span
                      data-liquid-content
                      aria-hidden="true"
                      className="absolute inset-0 flex flex-col justify-between p-5 text-night sm:p-8"
                      style={{ opacity: 0 }}
                    >
                      <span className="max-w-[26rem] text-[clamp(1.5rem,2.6vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
                        {item.description}
                      </span>
                      <span className="flex items-center justify-between gap-3">
                        <span className="text-[1.1rem] font-bold tracking-[-0.02em] sm:text-[1.3rem]">
                          {item.title}
                        </span>
                        <span className="micro-arrow inline-flex h-11 w-11 items-center justify-center rounded-button bg-night text-gold">
                          <ArrowUpRight className="h-5 w-5" />
                        </span>
                      </span>
                    </span>
                  </button>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      <LightboxModal
        items={galleryItems}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(index) => setLightboxIndex(index)}
      />
    </section>
  );
}
