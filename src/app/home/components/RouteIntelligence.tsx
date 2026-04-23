'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

interface RouteIntelligenceProps {
  onDownloadCalendar: () => void;
}

const MIGRATION_MONTHS = [
  { month: 'Jan', region: 'Ndutu Calving', intensity: 0.9, label: 'Peak Calving' },
  { month: 'Feb', region: 'Ndutu Calving', intensity: 0.95, label: 'Peak Calving' },
  { month: 'Mar', region: 'Central Serengeti', intensity: 0.6, label: 'Moving North' },
  { month: 'Apr', region: 'Central Serengeti', intensity: 0.5, label: 'Long Rains' },
  { month: 'May', region: 'Western Corridor', intensity: 0.65, label: 'Grumeti Approach' },
  { month: 'Jun', region: 'Grumeti River', intensity: 0.85, label: 'River Crossings' },
  { month: 'Jul', region: 'Northern Serengeti', intensity: 1.0, label: 'Peak Crossings' },
  { month: 'Aug', region: 'Masai Mara', intensity: 0.95, label: 'Mara Crossings' },
  { month: 'Sep', region: 'Masai Mara', intensity: 0.8, label: 'Return South' },
  { month: 'Oct', region: 'Northern Serengeti', intensity: 0.7, label: 'Heading South' },
  { month: 'Nov', region: 'Eastern Serengeti', intensity: 0.55, label: 'Short Rains' },
  { month: 'Dec', region: 'Ndutu / South', intensity: 0.75, label: 'Pre-Calving' },
];

const ROUTE_DATA = [
  {
    id: 'northern-circuit',
    name: 'Northern Circuit',
    duration: '14 days',
    difficulty: 'Moderate',
    highlights: ['Serengeti NP', 'Ngorongoro Crater', 'Tarangire', 'Lake Manyara'],
    bestWindow: 'Jul–Oct (dry season)',
    icon: 'MapIcon',
  },
  {
    id: 'southern-circuit',
    name: 'Southern Circuit',
    duration: '10 days',
    difficulty: 'Remote',
    highlights: ['Ruaha NP', 'Selous / Nyerere', 'Mikumi', 'Udzungwa'],
    bestWindow: 'Jun–Sep (dry season)',
    icon: 'CompassIcon',
  },
  {
    id: 'coast-zanzibar',
    name: 'Coast & Islands',
    duration: '7 days',
    difficulty: 'Easy',
    highlights: ['Zanzibar Town', 'Nungwi Reef', 'Pemba Island', 'Mafia Atoll'],
    bestWindow: 'Jun–Mar (avoid Apr–May)',
    icon: 'SunIcon',
  },
];

export default function RouteIntelligence({ onDownloadCalendar }: RouteIntelligenceProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => {
              el.classList.add('active');
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="routes" ref={sectionRef} className="py-24 md:py-32 px-6 bg-deep-forest">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-20">
          <div className="reveal">
            <p className="mono-label text-coral mb-3">Route Intelligence</p>
            <h2 className="text-4xl md:text-6xl font-bold text-khaki tracking-tight leading-tight max-w-lg">
              Data you won't find<br />on a booking site.
            </h2>
          </div>
          <div className="reveal delay-200 max-w-sm">
            <p className="text-khaki/60 leading-relaxed mb-6">
              Dry-season windows, migration coordinates, and road conditions updated monthly by 8 resident guides who haven't left Tanzania since 2018.
            </p>
            <button
              onClick={onDownloadCalendar}
              className="flex items-center gap-3 px-6 py-3 border border-moss/50 text-moss hover:border-coral hover:text-coral rounded-full text-sm font-semibold transition-all duration-300 group"
            >
              <Icon name="ArrowDownTrayIcon" size={16} variant="outline" />
              Free 2026 Migration Calendar
              <span className="mono-label text-xs opacity-60">PDF</span>
            </button>
          </div>
        </div>

        {/* Migration Timeline */}
        <div className="reveal mb-20">
          <p className="mono-label text-khaki/40 mb-6">Great Migration · 2026 Timing Overview</p>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
            {MIGRATION_MONTHS.map((m, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-sm transition-all duration-500"
                  style={{
                    height: `${m.intensity * 80}px`,
                    background: `linear-gradient(to top, ${
                      m.intensity > 0.8 ? '#E8613C' : m.intensity > 0.6 ? '#4A7C59' : '#2C3A2E'
                    }, ${m.intensity > 0.8 ? 'rgba(232,97,60,0.3)' : 'transparent'})`,
                    minHeight: '12px',
                  }}
                />
                <span className="mono-label text-khaki/40 text-[9px]">{m.month}</span>
                {m.intensity > 0.8 && (
                  <div className="route-marker w-1.5 h-1.5 rounded-full bg-coral" />
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-coral" />
              <span className="mono-label text-khaki/40">Peak crossing windows</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-moss" />
              <span className="mono-label text-khaki/40">Active migration</span>
            </div>
          </div>
        </div>

        {/* Route Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {ROUTE_DATA.map((route, i) => (
            <div
              key={route.id}
              className={`reveal delay-${(i + 1) * 100} guide-card glass-card rounded-2xl p-6`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-moss/20 flex items-center justify-center">
                  <Icon name="MapPinIcon" size={20} variant="outline" className="text-moss" />
                </div>
                <span className="mono-label text-khaki/30">{route.duration}</span>
              </div>

              <h3 className="text-xl font-bold text-khaki mb-1">{route.name}</h3>
              <p className="mono-label text-coral/70 mb-4">{route.difficulty}</p>

              <ul className="space-y-1.5 mb-5">
                {route.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-sm text-khaki/60">
                    <span className="w-1 h-1 rounded-full bg-coral flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-khaki/10">
                <p className="mono-label text-khaki/40 mb-1">Best window</p>
                <p className="text-sm font-semibold text-khaki">{route.bestWindow}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}