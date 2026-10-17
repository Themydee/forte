import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import FortePage from "@/components/FortePage";

describe("FortePage Component", () => {
  it("renders key brand and hero sections correctly", () => {
    render(<FortePage />);

    expect(screen.getAllByText("FORTÉ").length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: /give us the brief/i })).toBeInTheDocument();
    expect(screen.getByText(/corporate experiences with purpose/i)).toBeInTheDocument();
    expect(screen.getByText(/everything behind the moment/i)).toBeInTheDocument();
    expect(screen.getByText(/you give the brief\. we handle the rest\./i)).toBeInTheDocument();
    expect(screen.getByText(/feel the room\./i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /send us your brief/i })).toBeInTheDocument();
  });

  it("renders all 6 services and 4 process steps", () => {
    render(<FortePage />);

    // 6 services and process steps
    expect(screen.getAllByText("Concept").length).toBe(2);
    expect(screen.getAllByText("Production").length).toBe(2);
    expect(screen.getByText("Corporate Events")).toBeInTheDocument();
    expect(screen.getByText("Activations")).toBeInTheDocument();
    expect(screen.getAllByText("Hospitality").length).toBe(2);
    expect(screen.getByText("Logistics")).toBeInTheDocument();

    // Process steps
    expect(screen.getByText("Brief")).toBeInTheDocument();
    expect(screen.getByText("Experience")).toBeInTheDocument();
  });

  it("toggles mobile navigation and handles Escape key", async () => {
    render(<FortePage />);

    const menuToggle = screen.getByRole("button", { name: /open menu/i });
    expect(menuToggle).toHaveAttribute("aria-expanded", "false");

    // Open menu
    fireEvent.click(menuToggle);
    expect(screen.getByRole("navigation", { name: /mobile navigation/i })).toBeInTheDocument();

    // Press Escape to close
    fireEvent.keyDown(window, { key: "Escape" });
    expect(
      screen.queryByRole("navigation", { name: /mobile navigation/i }),
    ).not.toBeInTheDocument();
  });

  it("validates contact form required fields and email format", async () => {
    render(<FortePage />);

    const sendButton = screen.getByRole("button", { name: /send brief/i });

    // Submit without required fields
    fireEvent.click(sendButton);

    // Fill fields but with invalid email
    const nameInput = screen.getByLabelText(/^name/i);
    const companyInput = screen.getByLabelText(/^company/i);
    const emailInput = screen.getByLabelText(/^email/i);
    const typeSelect = screen.getByLabelText(/event type/i);
    const briefInput = screen.getByPlaceholderText(/a little about what you’re planning/i);

    fireEvent.change(nameInput, { target: { value: "Auditor Test" } });
    fireEvent.change(companyInput, { target: { value: "Quality Assurance Inc" } });
    fireEvent.change(emailInput, { target: { value: "invalid-email-address" } });
    fireEvent.change(typeSelect, { target: { value: "Corporate event" } });
    fireEvent.change(briefInput, { target: { value: "Detailed event requirements for testing." } });

    // Submit with invalid email
    fireEvent.submit(screen.getByRole("button", { name: /send brief/i }).closest("form")!);

    expect(await screen.findByText(/please enter a valid email address/i)).toBeInTheDocument();
  });

  it("handles successful form submission and clipboard copy fallback", async () => {
    const writeTextSpy = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue();

    render(<FortePage />);

    const nameInput = screen.getByLabelText(/^name/i);
    const companyInput = screen.getByLabelText(/^company/i);
    const emailInput = screen.getByLabelText(/^email/i);
    const typeSelect = screen.getByLabelText(/event type/i);
    const briefInput = screen.getByPlaceholderText(/a little about what you’re planning/i);
    const form = screen.getByRole("button", { name: /send brief/i }).closest("form")!;

    fireEvent.change(nameInput, { target: { value: "Jane Smith" } });
    fireEvent.change(companyInput, { target: { value: "Apex Corp" } });
    fireEvent.change(emailInput, { target: { value: "jane@apex.com" } });
    fireEvent.change(typeSelect, { target: { value: "Conference" } });
    fireEvent.change(briefInput, {
      target: { value: "Annual partner keynote and dinner." },
    });

    fireEvent.submit(form);

    const statusMessage = await screen.findByText(
      /your email app is ready with your brief/i,
      {},
      { timeout: 2000 },
    );
    expect(statusMessage).toBeInTheDocument();

    const copyBtn = screen.getByRole("button", {
      name: /copy brief text to clipboard/i,
    });
    fireEvent.click(copyBtn);

    expect(writeTextSpy).toHaveBeenCalledWith(expect.stringContaining("Apex Corp"));
    expect(await screen.findByText(/copied to clipboard/i)).toBeInTheDocument();

    writeTextSpy.mockRestore();
  });

  it("opens, navigates, and closes the lightbox gallery", async () => {
    render(<FortePage />);

    const galleryButtons = screen.getAllByRole("button", { name: /view/i });
    expect(galleryButtons.length).toBe(6);

    // Open first image
    fireEvent.click(galleryButtons[0]!);

    const dialog = screen.getByRole("dialog", { name: /event photograph/i });
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText("1 of 6")).toBeInTheDocument();

    // Navigate to next image via Next button
    const nextBtn = screen.getByRole("button", { name: /next photograph/i });
    fireEvent.click(nextBtn);
    expect(screen.getByText("2 of 6")).toBeInTheDocument();

    // Navigate back via keyboard ArrowLeft
    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(screen.getByText("1 of 6")).toBeInTheDocument();

    // Close via close button
    const closeBtn = screen.getByRole("button", { name: /close photograph/i });
    fireEvent.click(closeBtn);

    expect(screen.queryByText("1 of 6")).not.toBeInTheDocument();
  });
});
