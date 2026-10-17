import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, Copy, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/forte-gala-hero.jpg";
import conferenceImage from "@/assets/forte-conference.jpg";
import dinnerImage from "@/assets/forte-dinner.jpg";
import activationImage from "@/assets/forte-activation.jpg";
import welcomeImage from "@/assets/forte-welcome.jpg";
import awardsImage from "@/assets/forte-awards.jpg";

function toSrc(img: unknown): string {
  if (typeof img === "object" && img !== null && "src" in img) {
    return String((img as { src: string }).src);
  }
  return String(img);
}

const sections = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
];

const services = [
  ["01", "Concept", "Ideas shaped around your purpose and audience."],
  ["02", "Production", "Staging, sound, lighting and run-of-show, handled."],
  ["03", "Corporate Events", "Conferences, dinners, launches and awards."],
  ["04", "Activations", "Brand moments that people step into."],
  ["05", "Hospitality", "Guest care from the first welcome to the last goodbye."],
  ["06", "Logistics", "The moving parts, sorted before guests arrive."],
];

const steps = [
  ["01", "Brief", "We listen first, to your goals, audience and constraints."],
  ["02", "Concept", "We shape an idea that serves the purpose of your event."],
  ["03", "Production", "Every detail planned, rehearsed and managed."],
  ["04", "Experience", "Your guests arrive. You focus on the room."],
];

const gallery = [
  {
    title: "A room to remember",
    type: "Gala dinner",
    image: heroImage,
    alt: "Candlelit gala room set beneath glowing chandeliers",
  },
  {
    title: "Gather with purpose",
    type: "Conference",
    image: conferenceImage,
    alt: "A speaker addressing guests at a corporate conference",
  },
  {
    title: "An evening well spent",
    type: "Hospitality",
    image: dinnerImage,
    alt: "Guests sharing an elegant candlelit dinner",
  },
  {
    title: "A moment of arrival",
    type: "Guest experience",
    image: welcomeImage,
    alt: "Event hosts welcoming guests at a reception",
  },
  {
    title: "A world of its own",
    type: "Brand activation",
    image: activationImage,
    alt: "Guests exploring a sculptural event installation",
  },
  {
    title: "A reason to celebrate",
    type: "Awards evening",
    image: awardsImage,
    alt: "A speaker on stage at a celebratory awards dinner",
  },
];

const whatsappUrl = "https://wa.me/15551234567";
const emailAddress = "forteexperiences@gmail.com";

function Wordmark({ footer = false }: { footer?: boolean }) {
  return (
    <a
      className={`wordmark${footer ? " footer-wordmark" : ""}`}
      href="#top"
      aria-label="FORTÉ home"
    >
      <span className="wordmark-name">FORTÉ</span>
      {!footer && <span className="wordmark-tag">Corporate Events &amp; Experiences</span>}
    </a>
  );
}

function SiteNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const sectionIds = ["top", ...sections.map(({ id }) => id)];
    const nodes = sectionIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];
        if (current?.target.id) {
          setActive(current.target.id === "top" ? "" : current.target.id);
        }
      },
      { rootMargin: "-15% 0px -65% 0px", threshold: [0, 0.1, 0.25, 0.5] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Wordmark />
        <nav className="desktop-nav" aria-label="Main navigation">
          {sections.map((section) => (
            <a
              className="nav-link"
              href={`#${section.id}`}
              key={section.id}
              aria-current={active === section.id ? "location" : undefined}
            >
              {section.label}
            </a>
          ))}
          <Button variant="gold" size="sm" className="header-cta" asChild>
            <a href="#contact">
              Send Us Your Brief <ArrowRight aria-hidden="true" />
            </a>
          </Button>
        </nav>
        <Button
          variant="outline"
          size="icon"
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </Button>
      </div>
      {menuOpen && (
        <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">
          {sections.map((section) => (
            <a href={`#${section.id}`} key={section.id} onClick={closeMenu}>
              {section.label}
            </a>
          ))}
          <Button variant="gold" className="mobile-cta" asChild>
            <a href="#contact" onClick={closeMenu}>
              Send Us Your Brief <ArrowRight aria-hidden="true" />
            </a>
          </Button>
        </nav>
      )}
    </header>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<{
    tone: "success" | "error";
    message: string;
    briefContent?: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  function handleCopy() {
    if (!status?.briefContent) return;
    navigator.clipboard.writeText(status.briefContent).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const eventType = String(data.get("eventType") ?? "").trim();
    const eventDate = String(data.get("eventDate") ?? "").trim();
    const brief = String(data.get("brief") ?? "").trim();

    if (!name || !company || !email || !eventType || !brief) {
      setStatus({
        tone: "error",
        message: "Please complete each required field before continuing.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus({
        tone: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    if (name.length > 100 || company.length > 120 || email.length > 254 || brief.length > 3000) {
      setStatus({
        tone: "error",
        message:
          "One or more fields exceed the character limit. Please shorten your response and try again.",
      });
      return;
    }

    const subject = `Event enquiry — ${company}`;
    const body = [
      `Name: ${name}`,
      `Company: ${company}`,
      `Email: ${email}`,
      `Event type: ${eventType}`,
      `Event date: ${eventDate || "Not yet decided"}`,
      "",
      "Your brief:",
      brief,
    ].join("\n");
    const mailto = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSending(true);
    setStatus(null);
    setCopied(false);

    timerRef.current = window.setTimeout(() => {
      try {
        window.location.href = mailto;
      } catch {
        // Safe fallback in restricted environments or jsdom
      }
      setSending(false);
      setStatus({
        tone: "success",
        message:
          "Your email app is ready with your brief addressed to FORTÉ. If your email app did not open automatically, you can copy the brief below and email it directly.",
        briefContent: `To: ${emailAddress}\nSubject: ${subject}\n\n${body}`,
      });
    }, 350);
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="contact-name">
          Name <span aria-hidden="true">*</span>
        </label>
        <input id="contact-name" name="name" autoComplete="name" maxLength={100} required />
      </div>
      <div className="field">
        <label htmlFor="contact-company">
          Company <span aria-hidden="true">*</span>
        </label>
        <input
          id="contact-company"
          name="company"
          autoComplete="organization"
          maxLength={120}
          required
        />
      </div>
      <div className="field field-wide">
        <label htmlFor="contact-email">
          Email <span aria-hidden="true">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="contact-type">
          Event type <span aria-hidden="true">*</span>
        </label>
        <select id="contact-type" name="eventType" defaultValue="" required>
          <option value="" disabled>
            Select one
          </option>
          <option>Corporate event</option>
          <option>Conference</option>
          <option>Awards or gala</option>
          <option>Product launch</option>
          <option>Activation</option>
          <option>Other</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="contact-date">
          Event date <span>(optional)</span>
        </label>
        <input id="contact-date" name="eventDate" type="date" />
      </div>
      <div className="field field-wide">
        <label htmlFor="contact-brief">
          Your brief <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-brief"
          name="brief"
          maxLength={3000}
          required
          placeholder="A little about what you’re planning, who it’s for and what matters most."
        />
      </div>
      <Button variant="gold" className="send-button" type="submit" disabled={sending}>
        {sending ? "Preparing your brief…" : "Send Brief"} <ArrowRight aria-hidden="true" />
      </Button>
      {status && (
        <div className="form-status" data-tone={status.tone} role="status" aria-live="polite">
          <p>{status.message}</p>
          {status.briefContent && (
            <button
              type="button"
              className="copy-brief-btn"
              onClick={handleCopy}
              aria-label="Copy brief text to clipboard"
            >
              {copied ? (
                <>
                  <Check aria-hidden="true" size={14} /> Copied to clipboard!
                </>
              ) : (
                <>
                  <Copy aria-hidden="true" size={14} /> Copy brief details
                </>
              )}
            </button>
          )}
        </div>
      )}
    </form>
  );
}

function GalleryLightbox({
  activeIndex,
  onClose,
  onNavigate,
}: {
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const selected = activeIndex === null ? null : gallery[activeIndex];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selected && !dialog.open) dialog.showModal();
    if (!selected && dialog.open) dialog.close();
  }, [selected]);

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        onNavigate((activeIndex - 1 + gallery.length) % gallery.length);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        onNavigate((activeIndex + 1) % gallery.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, onNavigate]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIndex !== null) {
      onNavigate((activeIndex - 1 + gallery.length) % gallery.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIndex !== null) {
      onNavigate((activeIndex + 1) % gallery.length);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label="Event photograph"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      {selected && activeIndex !== null && (
        <div className="lightbox-content">
          <Button
            variant="outline"
            size="icon"
            className="lightbox-close"
            onClick={onClose}
            aria-label="Close photograph"
          >
            <X aria-hidden="true" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="lightbox-nav-btn lightbox-prev"
            onClick={handlePrev}
            aria-label="Previous photograph"
          >
            <ArrowLeft aria-hidden="true" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="lightbox-nav-btn lightbox-next"
            onClick={handleNext}
            aria-label="Next photograph"
          >
            <ArrowRight aria-hidden="true" />
          </Button>
          <img className="lightbox-image" src={toSrc(selected.image)} alt={selected.alt} />
          <div className="lightbox-caption">
            <div>
              {selected.title} <span>— {selected.type}</span>
            </div>
            <span className="lightbox-counter">
              {activeIndex + 1} of {gallery.length}
            </span>
          </div>
        </div>
      )}
    </dialog>
  );
}

function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal");
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

export default function FortePage() {
  const [activeImage, setActiveImage] = useState<number | null>(null);
  useScrollReveal();

  return (
    <>
      <SiteNavigation />
      <main>
        <section
          className="hero"
          id="top"
          aria-labelledby="hero-title"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.94) 60%, #ffffff 100%), url(${toSrc(heroImage)})`,
          }}
        >
          <div className="hero-inner">
            <p className="eyebrow">Corporate Events &amp; Experiences</p>
            <h1 id="hero-title">
              Give us
              <br />
              the brief.
            </h1>
            <p className="hero-copy">
              Corporate events and experiences, planned with purpose and delivered without a hitch.
            </p>
            <Button variant="gold" className="hero-link" asChild>
              <a href="#contact">
                Send Us Your Brief <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </div>
          <a className="scroll-cue" href="#about" aria-label="Scroll to about FORTÉ">
            Discover FORTÉ
          </a>
        </section>

        <section className="section" id="about" aria-labelledby="about-title">
          <div className="section-inner about-grid">
            <div className="reveal">
              <img
                className="about-image"
                src={toSrc(welcomeImage)}
                alt="FORTÉ event hosts welcoming guests to a considered, polished experience"
                width={1808}
                height={1200}
                loading="lazy"
              />
            </div>
            <div className="about-copy reveal">
              <p className="section-kicker">A considered approach</p>
              <h2 className="section-title" id="about-title">
                Corporate experiences with purpose.
              </h2>
              <p className="section-lead">
                FORTÉ turns an organisation’s brief into a polished, purposeful and memorable
                experience. We start by understanding why your people are coming together, then
                shape the concept, production, guest journey and event-day delivery around that
                purpose.
              </p>
              <p className="discipline-line">
                CONCEPT <span aria-hidden="true">·</span> PRODUCTION{" "}
                <span aria-hidden="true">·</span> EXPERIENCE
              </p>
            </div>
          </div>
        </section>

        <section className="section services" id="services" aria-labelledby="services-title">
          <div className="section-inner">
            <div className="reveal">
              <p className="section-kicker">Thoughtfully delivered</p>
              <h2 className="section-title" id="services-title">
                Everything behind the moment.
              </h2>
            </div>
            <div className="services-grid reveal">
              {services.map(([number, title, description]) => (
                <article className="service-item" key={number}>
                  <span className="service-number">{number}</span>
                  <h3 className="service-title">{title}</h3>
                  <p className="service-description">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section experience" id="process" aria-labelledby="process-title">
          <div className="section-inner">
            <div className="experience-heading reveal">
              <div>
                <p className="section-kicker">A clear path, from day one</p>
                <h2 className="section-title" id="process-title">
                  You give the brief. We handle the rest.
                </h2>
              </div>
            </div>
            <div className="timeline reveal">
              {steps.map(([number, title, copy]) => (
                <article className="timeline-step" key={number}>
                  <span className="step-number">{number}</span>
                  <h3 className="step-title">{title}</h3>
                  <p className="step-copy">{copy}</p>
                </article>
              ))}
            </div>
            <div className="values reveal">
              <article>
                <h3 className="value-title">Trust</h3>
                <p className="value-copy">Organised, discreet, corporate-ready.</p>
              </article>
              <article>
                <h3 className="value-title">Taste</h3>
                <p className="value-copy">Premium, never excessive.</p>
              </article>
              <article>
                <h3 className="value-title">Control</h3>
                <p className="value-copy">The details are handled before guests arrive.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section gallery" id="gallery" aria-labelledby="gallery-title">
          <div className="section-inner">
            <div className="gallery-heading reveal">
              <div>
                <p className="section-kicker">A sense of the occasion</p>
                <h2 className="section-title" id="gallery-title">
                  Feel the room.
                </h2>
              </div>
              <p className="gallery-note">A few moments, imagined by FORTÉ.</p>
            </div>
            <div className="gallery-grid reveal">
              {gallery.map((item, index) => (
                <button
                  className="gallery-item"
                  type="button"
                  key={item.title}
                  onClick={() => setActiveImage(index)}
                  aria-label={`View ${item.title}, ${item.type}`}
                >
                  <img
                    className="gallery-photo"
                    src={toSrc(item.image)}
                    alt={item.alt}
                    width={1808}
                    height={1200}
                    loading="lazy"
                  />
                  <span className="gallery-caption">
                    <strong>{item.title}</strong>
                    <span>
                      {item.type} <ArrowUpRight aria-hidden="true" size={12} />
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="section contact" id="contact" aria-labelledby="contact-title">
          <div className="section-inner">
            <p className="section-kicker">A good place to begin</p>
            <h2 className="section-title" id="contact-title">
              Send Us Your Brief.
            </h2>
            <p className="section-lead">Tell us what you’re planning. We’ll take it from there.</p>
            <div className="contact-grid">
              <ContactForm />
              <aside className="contact-details" aria-label="Other ways to reach FORTÉ">
                <a className="contact-detail" href={`mailto:${emailAddress}`}>
                  <span className="contact-label">Email</span>
                  <span className="contact-value">{emailAddress}</span>
                </a>
                <a
                  className="contact-detail"
                  href="https://forteexperiences.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="contact-label">Website</span>
                  <span className="contact-value">
                    forteexperiences.com <ArrowUpRight aria-hidden="true" size={15} />
                  </span>
                </a>
                <a
                  className="contact-detail"
                  href="https://www.instagram.com/forteexperiences/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="contact-label">Instagram</span>
                  <span className="contact-value">
                    @forteexperiences <ArrowUpRight aria-hidden="true" size={15} />
                  </span>
                </a>
                <Button variant="gold" className="contact-whatsapp" asChild>
                  <a href={whatsappUrl} target="_blank" rel="noreferrer">
                    Message us on WhatsApp <ArrowUpRight aria-hidden="true" />
                  </a>
                </Button>
                <p className="contact-label">WhatsApp link currently uses a placeholder number.</p>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div>
              <Wordmark footer />
              <p className="footer-tagline">Exceptional, by Design.</p>
            </div>
            <div className="footer-contact">
              <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
              <a href="https://forteexperiences.com" target="_blank" rel="noreferrer">
                forteexperiences.com
              </a>
              <a
                href="https://www.instagram.com/forteexperiences/"
                target="_blank"
                rel="noreferrer"
              >
                @forteexperiences
              </a>
              <a href={whatsappUrl} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} FORTÉ. All rights reserved.</span>
            <a href="#top" aria-label="Back to top">
              Back to top <ArrowDown aria-hidden="true" size={12} />
            </a>
          </div>
        </div>
      </footer>
      <GalleryLightbox
        activeIndex={activeImage}
        onClose={() => setActiveImage(null)}
        onNavigate={(index) => setActiveImage(index)}
      />
    </>
  );
}
