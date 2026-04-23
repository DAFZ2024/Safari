'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

interface HeroSectionProps {
  onOpenModal: () => void;
}

export default function HeroSection({ onOpenModal }: HeroSectionProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollY = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrollY * 0.04}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden noise-overlay">
      {/* Full-bleed macro photo */}
      <div ref={parallaxRef} className="absolute inset-0 w-full h-[115%] -top-[8%]">
        <AppImage
          src="https://img.rocket.new/generatedImages/rocket_gen_img_16d7c716b-1772252900684.png"
          alt="Extreme macro close-up of a chameleon eye with rain-beaded leaf in bokeh greens and golds — shallow depth of field"
          fill
          className="object-cover object-center"
          priority />
        
        {/* Atmospheric overlay — dark edges, warm center */}
        <div className="absolute inset-0 bg-gradient-to-b from-deep-forest/80 via-transparent to-deep-forest/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-forest/60 via-transparent to-deep-forest/60" />
        {/* Vignette */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(15,26,18,0.7) 100%)' }} />
      </div>

      {/* Delayed headline */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-10">
        <p className="headline-reveal mono-label text-coral mb-6">
          East Africa · Field Intelligence
        </p>
        <h1
          className="headline-reveal text-4xl md:text-6xl lg:text-7xl font-bold text-khaki leading-tight max-w-4xl"
          style={{ animationDelay: '2s', fontStyle: 'italic', letterSpacing: '-0.02em' }}>
          
          "Tanzania doesn't wait<br className="hidden md:block" /> for you to be ready."
        </h1>
        <p
          className="headline-reveal text-base md:text-lg text-khaki/60 mt-6 max-w-xl leading-relaxed"
          style={{ animationDelay: '2.6s' }}>
          
          Itineraries built from the dust up — by guides who never left.
        </p>

        {/* CTAs */}
        <div
          className="headline-reveal flex flex-col sm:flex-row items-center gap-4 mt-10"
          style={{ animationDelay: '3s' }}>
          
          <button
            onClick={onOpenModal}
            className="cta-coral px-8 py-4 rounded-full text-sm font-bold flex items-center gap-2">
            
            <span className="w-2 h-2 rounded-full bg-deep-forest/60 animate-pulse" />
            Reserve Your Seat at Basecamp
          </button>
          <a
            href="#biomes"
            className="flex items-center gap-2 text-khaki/60 hover:text-khaki text-sm font-medium transition-colors group">
            
            Scroll to explore
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              
              <path d="M3 8h10M8 3l5 5-5 5" />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-50">
        <span className="mono-label text-khaki/50">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-khaki/50 to-transparent" />
      </div>
    </section>);

}