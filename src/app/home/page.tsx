'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import BiomePanels from './components/BiomePanels';
import RouteIntelligence from './components/RouteIntelligence';
import GuideCredibility from './components/GuideCredibility';
import SummitSection from './components/SummitSection';
import DualConversionSection from './components/DualConversionSection';
import RegistrationModal from './components/RegistrationModal';

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'summit' | 'calendar'>('summit');

  const openModal = (tab: 'summit' | 'calendar' = 'summit') => {
    setModalTab(tab);
    setModalOpen(true);
  };

  return (
    <>
      <Header onOpenModal={() => openModal('summit')} />

      <main>
        {/* Hero — macro photo + delayed headline */}
        <HeroSection onOpenModal={() => openModal('summit')} />

        {/* Horizontal biome scroll — 4 panels */}
        <BiomePanels onOpenModal={() => openModal('summit')} />

        {/* Route Intelligence — migration data + calendar download teaser */}
        <RouteIntelligence onDownloadCalendar={() => openModal('calendar')} />

        {/* Guide Credibility — local guides + testimonials */}
        <GuideCredibility />

        {/* Summit Event Details */}
        <SummitSection onOpenModal={() => openModal('summit')} />

        {/* Dual Conversion — full seat + free calendar */}
        <DualConversionSection onOpenModal={() => openModal('summit')} />
      </main>

      <Footer />

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}