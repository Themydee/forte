import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactPage } from "@/components/ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Send FORTÉ your brief. Tell us what you’re planning, who it’s for and what matters most, and we’ll take it from there.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact FORTÉ",
    description:
      "Send us your brief for conferences, dinners, launches, activations and corporate events.",
    url: "/contact",
  },
};

export default function ContactRoute() {
  return (
    <>
      <SiteHeader variant="dark" />
      <main id="main-content" tabIndex={-1} className="bg-champagne focus:outline-none">
        <ContactPage />
      </main>
      <SiteFooter />
    </>
  );
}
