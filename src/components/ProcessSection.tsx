"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const steps = [
  {
    number: "01",
    title: "Brief",
    copy: "We listen first, to your goals, audience and constraints.",
  },
  {
    number: "02",
    title: "Concept",
    copy: "We shape an idea that serves the purpose of your event.",
  },
  {
    number: "03",
    title: "Production",
    copy: "Every detail planned, rehearsed and managed.",
  },
  {
    number: "04",
    title: "Experience",
    copy: "Your guests arrive. You focus on the room.",
  },
];

type DeckCard = {
  title: string;
  copy?: string;
  quote?: boolean;
  image: string;
  /** Resting tilt of the card in the deck, in degrees. */
  tilt: number;
  surface: string;
  ink: string;
  muted: string;
};

const deck: DeckCard[] = [
  {
    title: "“I gave them the brief. They handled it.”",
    quote: true,
    image: "/images/forte-gala-hero.jpg",
    tilt: 3,
    surface: "#6d3fd8",
    ink: "#f5f6fa",
    muted: "rgba(245,246,250,0.75)",
  },
  {
    title: "Trust",
    copy: "Organised, discreet, corporate-ready.",
    image: "/images/forte-welcome.jpg",
    tilt: -4,
    surface: "#ffffff",
    ink: "#0f1222",
    muted: "rgba(15,18,34,0.72)",
  },
  {
    title: "Taste",
    copy: "Premium, never excessive.",
    image: "/images/forte-dinner.jpg",
    tilt: 5,
    surface: "#d9a441",
    ink: "#0b0f1e",
    muted: "rgba(11,15,30,0.8)",
  },
  {
    title: "Control",
    copy: "The details are handled before guests arrive.",
    image: "/images/forte-conference.jpg",
    tilt: -2,
    surface: "#0b0f1e",
    ink: "#ffffff",
    muted: "rgba(255,255,255,0.75)",
  },
];

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);

function CardBody({ card }: { card: DeckCard }) {
  return (
    <>
      <div className="relative aspect-square w-[min(30vw,9rem)] shrink-0 overflow-hidden rounded-[1rem] sm:w-[min(20svh,11rem)] sm:rounded-[1.25rem] [@media(max-height:560px)]:hidden">
        <Image src={card.image} alt="" fill sizes="200px" className="object-cover" />
      </div>
      {card.quote ? (
        <p className="mt-6 max-w-[28rem] text-[clamp(1.7rem,3.6vw,2.9rem)] font-semibold leading-[1.05] tracking-[-0.045em]">
          {card.title}
        </p>
      ) : (
        <h3 className="mt-5 text-[clamp(2.4rem,5.4vw,4.25rem)] font-semibold leading-none tracking-[-0.055em] sm:mt-7">
          {card.title}
        </h3>
      )}
      {card.copy && (
        <p
          className="mt-4 max-w-[24rem] text-[0.98rem] leading-[1.45] sm:mt-5 sm:text-[1.08rem]"
          style={{ color: card.muted }}
        >
          {card.copy}
        </p>
      )}
    </>
  );
}

/**
 * A pinned deck of tilted cards. Scrolling throws the top card up and away to
 * reveal the next, while the cards beneath settle forward. With reduced motion
 * it falls back to a simple grid.
 */
function ValuesDeck() {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [reduced, setReduced] = useState(false);
  const count = deck.length;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener?.("change", onChange);
    return () => query.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = track.getBoundingClientRect();
      if (rect.bottom < -window.innerHeight || rect.top > window.innerHeight) return;
      const distance = rect.height - window.innerHeight;
      const progress = distance > 0 ? clamp01(-rect.top / distance) * (count - 1) : 0;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const tilt = deck[index]?.tilt ?? 0;
        const depth = index - progress;

        if (depth >= 0) {
          const layer = Math.min(depth, 3);
          card.style.transform = `translate3d(${layer * 0.6}rem, ${layer * 1.1}rem, 0) scale(${1 - layer * 0.045}) rotate(${tilt + layer * 1.5}deg)`;
          card.style.opacity = depth > 3 ? "0" : "1";
        } else {
          const t = clamp01(-depth);
          const eased = 1 - Math.pow(1 - t, 2);
          const direction = index % 2 === 0 ? 1 : -1;
          card.style.transform = `translate3d(${direction * eased * 18}vw, ${-eased * 115}svh, 0) scale(${1 + eased * 0.04}) rotate(${tilt - direction * eased * 16}deg)`;
          card.style.opacity = t >= 1 ? "0" : "1";
        }
      });
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
  }, [count, reduced]);

  const heading = (
    <h2
      id="values-heading"
      className="text-center text-[1.05rem] font-semibold tracking-[-0.02em] text-ink sm:text-[1.2rem]"
    >
      Quietly in control, from first brief to final goodbye.
    </h2>
  );

  if (reduced) {
    return (
      <div aria-labelledby="values-heading" className="px-4 py-20 sm:px-8 lg:px-10">
        {heading}
        <div className="mx-auto mt-10 grid max-w-[1380px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {deck.map((card) => (
            <div
              key={card.title}
              className="flex flex-col items-center rounded-[1.5rem] px-6 py-10 text-center"
              style={{ backgroundColor: card.surface, color: card.ink }}
            >
              <CardBody card={card} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={trackRef}
      aria-labelledby="values-heading"
      // One viewport to pin, plus ~90svh of scroll for every card thrown.
      style={{ height: `calc(100svh + ${count - 1} * var(--deck-step))` }}
      className="[--deck-step:70svh] sm:[--deck-step:90svh]"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col items-center overflow-hidden px-4 pt-20 sm:pt-28 [@media(max-height:560px)]:pt-16">
        {heading}
        <div className="relative mt-8 flex w-full flex-1 items-start justify-center sm:mt-10">
          {deck.map((card, index) => (
            <div
              key={card.title}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              className="absolute flex h-[min(62svh,34rem)] w-[min(86vw,34rem)] flex-col items-center justify-center rounded-[1.5rem] px-6 py-8 text-center shadow-[0_30px_80px_rgba(15,18,34,0.16)] will-change-transform sm:h-[min(66svh,36rem)] sm:rounded-[2rem] sm:px-10"
              style={{
                backgroundColor: card.surface,
                color: card.ink,
                zIndex: count - index,
                transform: `rotate(${card.tilt}deg)`,
              }}
            >
              <CardBody card={card} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProcessSection() {
  return (
    <section id="process" className="bg-champagne font-sans">
      <div className="p-2 sm:p-3">
        <div className="relative isolate overflow-hidden rounded-[1.25rem] bg-night px-5 pb-12 pt-14 text-white sm:rounded-[1.75rem] sm:px-10 sm:pb-16 sm:pt-20 lg:px-14">
          {/* Faint gold glow rising from below. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-x-[-10%] bottom-[-35%] h-[70%] bg-[radial-gradient(ellipse_at_center,rgba(217,164,65,0.28)_0%,rgba(217,164,65,0.1)_35%,transparent_75%)]" />
          </div>

          <div className="mx-auto max-w-[1380px]">
            <p className="text-[0.92rem] font-medium tracking-[-0.02em] text-gold">
              A clear path, from day one
            </p>
            <h2 className="mt-3 max-w-[16ch] text-[clamp(2.4rem,5.6vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.055em]">
              You give the brief. We handle the rest.
            </h2>

            <ol className="mt-14 grid gap-y-10 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step) => (
                <li key={step.number} className="border-l border-white/15 pl-5 pr-4 sm:pl-6">
                  <span className="block text-[clamp(2.75rem,4.5vw,4rem)] font-semibold leading-none tracking-[-0.06em] text-gold/90">
                    {step.number}
                  </span>
                  <h3 className="mt-6 text-[clamp(1.5rem,2.2vw,2rem)] font-semibold tracking-[-0.04em]">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[18rem] text-[0.98rem] leading-snug text-white/65">
                    {step.copy}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <ValuesDeck />
    </section>
  );
}
