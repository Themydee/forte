"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

export const FORTE_EMAIL = "forteexperiences@gmail.com";
export const FORTE_WHATSAPP = "https://wa.me/15551234567";
export const FORTE_INSTAGRAM = "https://www.instagram.com/forteexperiences/";
export const FORTE_WEBSITE = "https://forteexperiences.com";

export const EVENT_TYPES = [
  "Corporate event",
  "Conference",
  "Awards or gala",
  "Product launch",
  "Activation",
  "Other",
] as const;

export type BriefStatus = {
  tone: "success" | "error";
  message: string;
  briefContent?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * State and behaviour for the "send us your brief" form, shared by the home
 * page section and the contact page. Submitting validates the fields, then
 * opens the visitor's email app with the brief addressed to FORTÉ and offers
 * the text to copy in case no email app opens.
 */
export function useBriefForm({ initialBrief = "", initialEventType = "" } = {}) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [eventType, setEventType] = useState(initialEventType);
  const [eventDate, setEventDate] = useState("");
  const [brief, setBrief] = useState(initialBrief);

  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<BriefStatus | null>(null);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (initialBrief) setBrief(initialBrief);
  }, [initialBrief]);

  useEffect(() => {
    if (initialEventType) setEventType(initialEventType);
  }, [initialEventType]);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;

    const trimmedName = name.trim();
    const trimmedCompany = company.trim();
    const trimmedEmail = email.trim();
    const trimmedBrief = brief.trim();

    if (!trimmedName || !trimmedCompany || !trimmedEmail || !eventType || !trimmedBrief) {
      setStatus({
        tone: "error",
        message: "Please complete each required field before continuing.",
      });
      return;
    }

    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      setStatus({ tone: "error", message: "Please enter a valid email address." });
      return;
    }

    if (
      trimmedName.length > 100 ||
      trimmedCompany.length > 120 ||
      trimmedEmail.length > 254 ||
      trimmedBrief.length > 3000
    ) {
      setStatus({
        tone: "error",
        message:
          "One or more fields exceed the character limit. Please shorten your response and try again.",
      });
      return;
    }

    const subject = `Event enquiry — ${trimmedCompany}`;
    const body = [
      `From: ${trimmedName}`,
      `Company: ${trimmedCompany}`,
      `Email: ${trimmedEmail}`,
      `Event type: ${eventType}`,
      `Event date: ${eventDate || "Not yet decided"}`,
      "",
      "Your brief:",
      trimmedBrief,
    ].join("\n");

    const mailto = `mailto:${FORTE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

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
        briefContent: `To: ${FORTE_EMAIL}\nSubject: ${subject}\n\n${body}`,
      });
    }, 350);
  };

  const handleCopy = async () => {
    if (!status?.briefContent) return;
    try {
      await navigator.clipboard.writeText(status.briefContent);
      setCopied(true);
      timerRef.current = window.setTimeout(() => setCopied(false), 2400);
    } catch {
      // ignore
    }
  };

  return {
    fields: { name, company, email, eventType, eventDate, brief },
    setName,
    setCompany,
    setEmail,
    setEventType,
    setEventDate,
    setBrief,
    sending,
    status,
    copied,
    handleSubmit,
    handleCopy,
  };
}
