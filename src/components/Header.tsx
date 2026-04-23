'use client';

import React, { useState, useEffect } from 'react';
import AppLogo from '@/components/ui/AppLogo';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  onOpenModal: () => void;
}

export default function Header({ onOpenModal }: HeaderProps) {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-deep-forest/90 backdrop-blur-md border-b border-khaki/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => router.push('/home')}
        >
          <AppLogo
            size={32}
            iconName="GlobeAltIcon"
            text="Safari"
            className="text-khaki group-hover:text-coral transition-colors duration-300"
          />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: 'Routes', href: '#routes' },
            { label: 'Guides', href: '#guides' },
            { label: 'Summit', href: '#summit' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="mono-label text-khaki/60 hover:text-coral transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <button
          onClick={onOpenModal}
          className="cta-coral hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold"
        >
          <span className="w-2 h-2 rounded-full bg-deep-forest/60 animate-pulse" />
          Reserve Seat
        </button>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-khaki"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-deep-forest/95 backdrop-blur-md border-t border-khaki/10 px-6 py-6 flex flex-col gap-4">
          {[
            { label: 'Routes', href: '#routes' },
            { label: 'Guides', href: '#guides' },
            { label: 'Summit', href: '#summit' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="mono-label text-khaki/70 hover:text-coral transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => { onOpenModal(); setMenuOpen(false); }}
            className="cta-coral mt-2 px-5 py-3 rounded-full text-sm font-bold w-full"
          >
            Reserve Your Seat at Basecamp
          </button>
        </div>
      )}
    </header>
  );
}