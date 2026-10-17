import "@testing-library/jest-dom/vitest";
import React from "react";
import { vi } from "vitest";

vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    const { src, alt, fill, priority, sizes, ...rest } = props;
    const resolvedSrc =
      typeof src === "object" && src !== null && "src" in src
        ? (src as { src: string }).src
        : String(src);
    return React.createElement("img", {
      src: resolvedSrc,
      alt: typeof alt === "string" ? alt : "",
      ...rest,
    });
  },
}));

Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: () => {},
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

if (typeof window !== "undefined") {
  if (typeof HTMLDialogElement !== "undefined") {
    HTMLDialogElement.prototype.showModal =
      HTMLDialogElement.prototype.showModal ||
      function (this: HTMLDialogElement) {
        this.setAttribute("open", "");
      };
    HTMLDialogElement.prototype.close =
      HTMLDialogElement.prototype.close ||
      function (this: HTMLDialogElement) {
        this.removeAttribute("open");
        this.dispatchEvent(new Event("close"));
      };
  }

  if (typeof window.IntersectionObserver === "undefined") {
    class MockIntersectionObserver implements IntersectionObserver {
      readonly root: Element | Document | null = null;
      readonly rootMargin: string = "";
      readonly thresholds: ReadonlyArray<number> = [];
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords(): IntersectionObserverEntry[] {
        return [];
      }
    }
    window.IntersectionObserver =
      MockIntersectionObserver as unknown as typeof IntersectionObserver;
  }

  if (!navigator.clipboard) {
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: () => Promise.resolve(),
        readText: () => Promise.resolve(""),
      },
      writable: true,
    });
  }

  // Prevent jsdom "navigation (except hash changes)" error on mailto
  const locationMock = {
    ...window.location,
    href: "http://localhost/",
    assign: () => {},
    replace: () => {},
  };
  try {
    Object.defineProperty(window, "location", {
      value: locationMock,
      writable: true,
      configurable: true,
    });
  } catch {
    // If window.location cannot be redefined, ignore
  }
}
