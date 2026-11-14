import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { ContactPage } from "@/components/ContactPage";

describe("Contact page", () => {
  it("renders the heading, intro and brief form", () => {
    render(<ContactPage />);
    expect(screen.getByRole("heading", { level: 1, name: /contact us/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/^Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Company/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Event type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your brief/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /forteexperiences@gmail.com/i })).toHaveAttribute(
      "href",
      "mailto:forteexperiences@gmail.com",
    );
  });

  it("validates required fields, then prepares the brief and copies it", async () => {
    const writeTextSpy = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue();
    render(<ContactPage />);

    const submit = screen.getByRole("button", { name: /send brief/i });
    fireEvent.click(submit);
    expect(
      await screen.findByText(/please complete each required field before continuing/i),
    ).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/^Name/i), { target: { value: "Ada Obi" } });
    fireEvent.change(screen.getByLabelText(/^Company/i), { target: { value: "Obi Holdings" } });
    fireEvent.change(screen.getByLabelText(/^Email/i), { target: { value: "not-an-email" } });
    fireEvent.change(screen.getByLabelText(/Event type/i), { target: { value: "Conference" } });
    fireEvent.change(screen.getByLabelText(/Your brief/i), {
      target: { value: "A two-day leadership conference." },
    });
    fireEvent.click(submit);
    expect(await screen.findByText(/please enter a valid email address/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/^Email/i), { target: { value: "ada@obi.com" } });
    fireEvent.click(submit);
    expect(
      await screen.findByText(/your email app is ready with your brief/i, {}, { timeout: 2000 }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /copy brief details/i }));
    expect(writeTextSpy).toHaveBeenCalledWith(expect.stringContaining("Obi Holdings"));
    expect(await screen.findByText(/copied to clipboard!/i)).toBeInTheDocument();

    writeTextSpy.mockRestore();
  });
});
