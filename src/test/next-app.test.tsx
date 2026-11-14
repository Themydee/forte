import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { SiteHeader } from '@/components/SiteHeader';
import { HeroSection } from '@/components/HeroSection';
import { EthosSection } from '@/components/EthosSection';
import { ServicesSection } from '@/components/ServicesSection';
import { ProcessSection } from '@/components/ProcessSection';
import { PortfolioSection } from '@/components/PortfolioSection';
import { SiteFooter } from '@/components/SiteFooter';
import { ContactStrip } from '@/components/ContactStrip';
import { ForteClientApp } from '@/components/ForteClientApp';

describe('FORTÉ Production Application Components (DESIGN.md Standard)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders SiteHeader with authentic navigation and handles mobile menu Escape key', () => {
    render(<SiteHeader />);
    expect(screen.getByText('FORTÉ')).toBeInTheDocument();
    expect(screen.getByText(/Corporate Events & Experiences/i)).toBeInTheDocument();

    const mobileBtn = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(mobileBtn);
    expect(screen.getByRole('button', { name: /close menu/i })).toBeInTheDocument();

    // Escape key dismisses mobile menu
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
  });

  it('renders HeroSection with authentic headline and CTA', () => {
    render(<HeroSection />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/Give us the brief/i);
    expect(screen.getByRole('link', { name: /Send Us Your Brief/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Discover FORTÉ/i })).toBeInTheDocument();
  });

  it('renders EthosSection with purposeful narrative', () => {
    render(<EthosSection />);
    expect(screen.getByText(/A considered approach/i)).toBeInTheDocument();
    expect(screen.getByText(/Corporate experiences with purpose/i)).toBeInTheDocument();
  });

  it('renders ServicesSection with all 6 authentic services', () => {
    render(<ServicesSection />);
    expect(screen.getByText(/Everything behind the moment/i)).toBeInTheDocument();
    expect(screen.getByText('Concept')).toBeInTheDocument();
    expect(screen.getByText('Production')).toBeInTheDocument();
    expect(screen.getByText('Corporate Events')).toBeInTheDocument();
    expect(screen.getByText('Activations')).toBeInTheDocument();
    expect(screen.getByText('Hospitality')).toBeInTheDocument();
    expect(screen.getByText('Logistics')).toBeInTheDocument();
  });

  it('renders ProcessSection with 4 steps and 3 core values', () => {
    render(<ProcessSection />);
    expect(screen.getByText(/You give the brief. We handle the rest./i)).toBeInTheDocument();
    expect(screen.getByText('Brief')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Trust')).toBeInTheDocument();
    expect(screen.getByText('Taste')).toBeInTheDocument();
    expect(screen.getByText('Control')).toBeInTheDocument();
  });

  it('renders PortfolioSection and opens/navigates/closes LightboxModal', () => {
    render(<PortfolioSection />);
    expect(screen.getByText(/Feel the room/i)).toBeInTheDocument();

    // Open first image
    const card = screen.getByRole('button', { name: /View A room to remember, Gala dinner/i });
    fireEvent.click(card);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText('1 of 6')).toBeInTheDocument();

    // Next image
    const nextBtn = screen.getByRole('button', { name: /next photograph/i });
    fireEvent.click(nextBtn);
    expect(screen.getByText('2 of 6')).toBeInTheDocument();

    // Escape closes lightbox
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders the home ContactStrip linking to the contact page and direct channels', () => {
    render(<ContactStrip />);
    expect(screen.getByRole('heading', { name: /Send Us Your Brief/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Start your brief/i })).toHaveAttribute('href', '/contact');
    expect(screen.getByRole('link', { name: /forteexperiences@gmail.com/i })).toHaveAttribute(
      'href',
      'mailto:forteexperiences@gmail.com',
    );
    expect(screen.getByRole('link', { name: /WhatsApp/i })).toHaveAttribute('target', '_blank');
  });

  it('renders SiteFooter with authentic wordmark and back-to-top anchor', () => {
    render(<SiteFooter />);
    expect(screen.getByText(/Exceptional, by Design/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Back to top/i })).toBeInTheDocument();
  });

  it('assembles the full ForteClientApp page without runtime errors', () => {
    const { container } = render(<ForteClientApp />);
    expect(container.querySelector('header')).toBeInTheDocument();
    expect(container.querySelector('main')).toBeInTheDocument();
    expect(container.querySelector('footer')).toBeInTheDocument();
    expect(screen.getByText(/I gave them the brief\. They handled it\./i)).toBeInTheDocument();
    expect(screen.queryByText(/Frequently asked questions/i)).not.toBeInTheDocument();
  });
});
