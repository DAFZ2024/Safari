import React from 'react';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

export default function Footer() {
  const currentYear = new Date()?.getFullYear();

  return (
    <footer className="border-t border-khaki/10 py-16 px-6 bg-deep-forest">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo + Tagline */}
        <div className="flex items-center gap-3">
          <AppLogo size={28} iconName="GlobeAltIcon" text="Safari" className="text-khaki/70" />
          <span className="mono-label text-khaki/30 hidden sm:block">/ Tanzania Field Guide</span>
        </div>

        {/* Links */}
        <nav className="flex items-center gap-6 flex-wrap justify-center">
          {['Routes', 'Guides', 'Summit', 'Migration Calendar']?.map((link) => (
            <a
              key={link}
              href="#"
              className="footer-link text-sm font-medium text-khaki/50 hover:text-coral transition-colors duration-300"
            >
              {link}
            </a>
          ))}
          <span className="text-khaki/20">·</span>
          <a href="#" className="footer-link text-sm font-medium text-khaki/50 hover:text-coral transition-colors duration-300">Privacy</a>
          <a href="#" className="footer-link text-sm font-medium text-khaki/50 hover:text-coral transition-colors duration-300">Terms</a>
        </nav>

        {/* Social + Copyright */}
        <div className="flex items-center gap-4">
          {/* Instagram */}
          <a
            href="#"
            aria-label="Instagram"
            className="w-9 h-9 rounded-full border border-khaki/20 flex items-center justify-center text-khaki/50 hover:text-coral hover:border-coral transition-all duration-300"
          >
            <Icon name="CameraIcon" size={16} variant="outline" />
          </a>
          {/* Twitter/X */}
          <a
            href="#"
            aria-label="Twitter"
            className="w-9 h-9 rounded-full border border-khaki/20 flex items-center justify-center text-khaki/50 hover:text-coral hover:border-coral transition-all duration-300"
          >
            <Icon name="ChatBubbleLeftRightIcon" size={16} variant="outline" />
          </a>
          <span className="mono-label text-khaki/25 ml-2">© {currentYear}</span>
        </div>
      </div>
    </footer>
  );
}