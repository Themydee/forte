'use client';

import React from 'react';
import { SiteHeader } from './SiteHeader';
import { HeroSection } from './HeroSection';
import { EthosSection } from './EthosSection';
import { ServicesSection } from './ServicesSection';
import { ProcessSection } from './ProcessSection';
import { PortfolioSection } from './PortfolioSection';
import { FaqSection } from './FaqSection';
import { ContactSection } from './ContactSection';
import { SiteFooter } from './SiteFooter';

export function ForteClientApp() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <HeroSection />
        <EthosSection />
        <ServicesSection />
        <ProcessSection />
        <PortfolioSection />
        <FaqSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
