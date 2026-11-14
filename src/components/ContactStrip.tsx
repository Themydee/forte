import React from "react";
import { ArrowUpRight, Instagram, Mail } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { FORTE_EMAIL, FORTE_INSTAGRAM, FORTE_WHATSAPP } from "@/hooks/use-brief-form";

const channels = [
  {
    label: "Email",
    value: FORTE_EMAIL,
    href: `mailto:${FORTE_EMAIL}`,
    icon: Mail,
    external: false,
  },
  {
    label: "WhatsApp",
    value: "Message us",
    href: FORTE_WHATSAPP,
    icon: WhatsAppIcon,
    external: true,
  },
  {
    label: "Instagram",
    value: "@forteexperiences",
    href: FORTE_INSTAGRAM,
    icon: Instagram,
    external: true,
  },
];

/**
 * The last stop on the home page journey: a short invitation to send a brief,
 * with the direct channels beside it. The full form lives on /contact.
 */
export function ContactStrip() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-strip-title"
      className="bg-champagne px-4 py-16 font-sans text-ink sm:px-8 sm:py-24 lg:px-10"
    >
      <div className="mx-auto grid max-w-[1380px] gap-10 border-t border-ink/12 pt-10 sm:pt-14 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16">
        <div>
          <p className="text-[0.92rem] font-medium tracking-[-0.02em] text-gold-deep">
            A good place to begin
          </p>
          <h2
            id="contact-strip-title"
            className="mt-2 text-[clamp(2.75rem,7vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.055em]"
          >
            Send Us Your Brief.
          </h2>
          <p className="mt-5 max-w-[28rem] text-[clamp(1.05rem,1.5vw,1.3rem)] font-medium leading-snug tracking-[-0.025em] text-ink/70">
            Tell us what you’re planning. We’ll take it from there.
          </p>
          <a
            href="/contact"
            className="micro-button mt-8 inline-flex items-center gap-2 rounded-button bg-ink px-7 py-4 text-[1rem] font-medium tracking-[-0.01em] text-white transition hover:bg-plum"
          >
            Start your brief
            <ArrowUpRight className="h-4 w-4 text-gold" aria-hidden="true" />
          </a>
        </div>

        <ul className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
          {channels.map(({ label, value, href, icon: Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="group flex items-center gap-4 rounded-[1.25rem] bg-white p-4 ring-1 ring-ink/5 transition hover:bg-night hover:text-white sm:p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-champagne text-plum transition group-hover:bg-gold group-hover:text-night">
                  <Icon className="h-[1.15rem] w-[1.15rem]" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.8rem] font-medium text-ink/50 transition group-hover:text-white/60">
                    {label}
                  </span>
                  <span className="block truncate text-[1.02rem] font-medium tracking-[-0.02em]">
                    {value}
                  </span>
                </span>
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 opacity-40 transition group-hover:text-gold group-hover:opacity-100"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
