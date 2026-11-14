"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const formats = [
  "Conferences",
  "Gala Dinners",
  "Product Launches",
  "Awards Evenings",
  "Brand Activations",
  "Leadership Summits",
];

export function EthosSection() {
  const marqueeItems = [...formats, ...formats];

  return (
    <section
      id="about"
      className="bg-champagne px-4 pb-20 pt-12 font-sans text-ink sm:px-8 sm:pb-28 sm:pt-16 lg:px-10"
    >
      <div className="mx-auto max-w-[1380px]">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-10">
          <p className="shrink-0 text-[0.92rem] font-medium tracking-[-0.02em]">
            The team behind&nbsp;...
          </p>
          <div className="marquee relative min-w-0 flex-1 overflow-hidden">
            <ul className="marquee__track flex w-max items-center">
              {marqueeItems.map((format, index) => (
                <li
                  key={`${format}-${index}`}
                  aria-hidden={index >= formats.length}
                  className="flex shrink-0 items-center gap-6 px-3 text-[clamp(1.25rem,2.2vw,1.9rem)] font-semibold tracking-[-0.045em] sm:gap-8 sm:px-4"
                >
                  {format}
                  <span aria-hidden="true" className="text-[0.6em] text-gold">
                    ✦
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 grid gap-12 sm:mt-24 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6">
            <p className="text-[0.92rem] font-medium tracking-[-0.02em] text-gold-deep">
              A considered approach
            </p>
            <p className="text-[clamp(1.6rem,2.8vw,2.4rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-plum">
              Not decorate. Not merely coordinate.
            </p>
            <p className="max-w-[32rem] text-[clamp(1.2rem,1.9vw,1.65rem)] font-medium leading-[1.2] tracking-[-0.03em]">
              FORTÉ turns an organisation’s brief into a polished, purposeful and memorable
              experience.
            </p>
            <p className="max-w-[30rem] text-[1rem] leading-relaxed text-ink/65">
              The work starts with understanding why people are being brought together, then shaping
              the concept, production, guest journey and event-day delivery around that purpose.
            </p>
          </div>

          <div>
            <h2 className="text-[clamp(2.4rem,5.2vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.05em]">
              Corporate experiences with purpose.{" "}
              <span className="relative inline-block h-[0.8em] w-[0.8em] translate-y-[0.1em] overflow-hidden rounded-[0.16em] align-baseline">
                <Image
                  src="/images/forte-welcome.jpg"
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </span>
            </h2>

            <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
              <a
                href="#services"
                className="micro-button inline-flex items-center gap-2 rounded-button bg-white px-6 py-3 text-[0.92rem] font-medium tracking-[-0.01em] transition hover:bg-gold-soft"
              >
                Our Services
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#process"
                className="micro-button inline-flex items-center gap-2 rounded-button px-4 py-3 text-[0.92rem] font-medium tracking-[-0.01em] transition hover:text-gold-deep"
              >
                How We Work
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
