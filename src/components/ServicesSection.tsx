"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    number: "01",
    title: "Concept",
    description: "Ideas shaped around your purpose and audience.",
    image: "/images/forte-gold-ribbon.jpg",
  },
  {
    number: "02",
    title: "Production",
    description: "Staging, sound, lighting and run-of-show, handled.",
    image: "/images/forte-conference.jpg",
  },
  {
    number: "03",
    title: "Corporate Events",
    description: "Conferences, dinners, launches and awards.",
    image: "/images/forte-awards.jpg",
  },
  {
    number: "04",
    title: "Activations",
    description: "Brand moments that people step into.",
    image: "/images/forte-activation.jpg",
  },
  {
    number: "05",
    title: "Hospitality",
    description: "Guest care from the first welcome to the last goodbye.",
    image: "/images/forte-dinner.jpg",
  },
  {
    number: "06",
    title: "Logistics",
    description: "The moving parts, sorted before guests arrive.",
    image: "/images/forte-welcome.jpg",
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="bg-champagne px-4 py-16 font-sans text-ink sm:px-8 sm:py-24 lg:px-10"
    >
      <div className="mx-auto max-w-[1380px]">
        <div className="flex flex-wrap items-end justify-between gap-5 border-b border-ink/12 pb-6 sm:pb-10">
          <div>
            <p className="text-[0.92rem] font-medium tracking-[-0.02em] text-gold-deep">
              Thoughtfully delivered
            </p>
            <h2 className="mt-2 text-[clamp(2.5rem,6.4vw,6rem)] font-semibold leading-[0.95] tracking-[-0.055em]">
              Everything behind the moment.{" "}
              <span className="relative inline-block h-[0.78em] w-[0.78em] translate-y-[0.08em] overflow-hidden rounded-[0.16em] align-baseline">
                <Image
                  src="/images/forte-gala-hero.jpg"
                  alt=""
                  fill
                  sizes="100px"
                  className="object-cover"
                />
              </span>
            </h2>
          </div>
          <a
            href="/contact"
            className="micro-button inline-flex items-center gap-2 rounded-button bg-white px-5 py-2.5 text-[0.9rem] font-medium tracking-[-0.01em] transition hover:bg-gold-soft"
          >
            Plan Your Event
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <ul className="mt-6 grid gap-x-12 sm:mt-10 lg:grid-flow-col lg:grid-cols-2 lg:grid-rows-3">
          {services.map((service) => (
            <li
              key={service.number}
              className="service-row border-b border-ink/10 last:border-b-0 lg:[&:nth-child(3)]:border-b-0"
            >
              <article className="group relative my-1 flex items-center overflow-hidden rounded-[1.5rem] px-4 py-5 transition-colors duration-300 hover:text-white sm:px-6 sm:py-6">
                <Image
                  src={service.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="hidden scale-110 object-cover opacity-0 transition duration-500 group-hover:scale-100 group-hover:opacity-100 md:block"
                />
                <span className="absolute inset-0 bg-night/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative mr-5 w-8 shrink-0 self-start pt-2 text-[0.8rem] font-semibold tracking-[0.12em] text-gold-deep transition-colors group-hover:text-gold sm:mr-7">
                  {service.number}
                </span>
                <div className="relative flex-1">
                  <h3 className="text-[clamp(1.7rem,3.3vw,3rem)] font-semibold leading-[1.08] tracking-[-0.045em]">
                    {service.title}
                  </h3>
                  <p className="mt-1.5 max-w-xl text-[clamp(0.95rem,1.2vw,1.08rem)] leading-snug tracking-[-0.015em] text-ink/60 transition-colors duration-300 group-hover:text-white/85">
                    {service.description}
                  </p>
                </div>
                <ArrowUpRight
                  className="relative h-6 w-6 shrink-0 text-ink/30 transition-all duration-300 group-hover:rotate-45 group-hover:text-gold sm:h-8 sm:w-8"
                  aria-hidden="true"
                />
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
