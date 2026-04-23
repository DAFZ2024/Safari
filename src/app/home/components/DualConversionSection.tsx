'use client';

import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface DualConversionSectionProps {
  onOpenModal: () => void;
}

export default function DualConversionSection({ onOpenModal }: DualConversionSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [calendarEmail, setCalendarEmail] = useState('');
  const [calendarSubmitted, setCalendarSubmitted] = useState(false);

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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleCalendarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submit — connect to email service here
    setCalendarSubmitted(true);
  };

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 bg-deep-forest">
      <div className="max-w-7xl mx-auto">
        {/* Large CTA heading */}
        <div className="text-center mb-16 reveal">
          <p className="mono-label text-coral mb-4">Two paths. One destination.</p>
          <h2 className="text-4xl md:text-7xl font-bold text-khaki tracking-tight leading-tight">
            Start where<br />you are.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Path 1: Full Summit Registration */}
          <div
            className="reveal reveal-left rounded-2xl p-8 md:p-10 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #1A2E1F, #2A4A30)' }}
          >
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(232,97,60,0.15) 0%, transparent 70%)' }}
            />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-coral/20 flex items-center justify-center mb-6">
                <Icon name="FireIcon" size={24} variant="outline" className="text-coral" />
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-khaki mb-3">
                Reserve Your Seat at Basecamp
              </h3>
              <p className="text-khaki/60 leading-relaxed mb-6">
                Three days of live sessions, route-building workshops, and direct Q&A with resident guides. Walk out with an itinerary you can actually follow.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  '3 days of live sessions with 8 guides',
                  'Route-building workshop for your specific trip',
                  'Migration timing data + dry-season coordinates',
                  'Post-summit itinerary review (30-min 1:1)',
                  'SMS route alerts through 2026',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-khaki/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-coral flex-shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>

              <button
                onClick={onOpenModal}
                className="cta-coral w-full py-4 rounded-full text-sm font-bold flex items-center justify-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-deep-forest/60 animate-pulse" />
                Reserve Your Seat at Basecamp
              </button>

              <p className="text-center mono-label text-khaki/30 mt-3">March 14–16, 2026 · Virtual</p>
            </div>
          </div>

          {/* Path 2: Free Calendar */}
          <div
            className="reveal reveal-right delay-200 rounded-2xl p-8 md:p-10 relative overflow-hidden border border-khaki/10"
            style={{ background: 'rgba(255,255,255,0.03)' }}
          >
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-moss/20 flex items-center justify-center mb-6">
                <Icon name="CalendarDaysIcon" size={24} variant="outline" className="text-moss" />
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-khaki mb-3">
                2026 Migration Timing Calendar
              </h3>
              <p className="text-khaki/60 leading-relaxed mb-6">
                Not ready to commit? Start here. The free migration calendar gives you 12 months of optimal windows, river crossing dates, and circuit coordinates — built from 8 years of field data.
              </p>

              {/* Calendar preview card */}
              <div className="float-animation glass-card rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="mono-label text-coral">2026 Great Migration</p>
                  <span className="mono-label text-khaki/30">PDF · 24 pages</span>
                </div>
                <div className="grid grid-cols-6 gap-1">
                  {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'].map((m, i) => (
                    <div key={i} className="text-center">
                      <div
                        className="w-full h-6 rounded-sm mb-1"
                        style={{
                          background: [0, 1, 5, 6, 7].includes(i)
                            ? 'rgba(232,97,60,0.6)'
                            : [2, 4, 9, 11].includes(i)
                            ? 'rgba(74,124,89,0.5)'
                            : 'rgba(212,197,169,0.1)',
                        }}
                      />
                      <span className="mono-label text-khaki/30 text-[8px]">{m}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-sm bg-coral/60" />
                    <span className="mono-label text-khaki/40" style={{ fontSize: '9px' }}>Peak</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-sm bg-moss/50" />
                    <span className="mono-label text-khaki/40" style={{ fontSize: '9px' }}>Active</span>
                  </div>
                </div>
              </div>

              {calendarSubmitted ? (
                <div className="text-center py-4">
                  <div className="w-12 h-12 rounded-full bg-moss/20 flex items-center justify-center mx-auto mb-3">
                    <Icon name="CheckIcon" size={24} variant="outline" className="text-moss" />
                  </div>
                  <p className="font-bold text-khaki mb-1">Calendar incoming.</p>
                  <p className="text-sm text-khaki/50">Check your inbox for the 2026 Migration Timing Calendar.</p>
                </div>
              ) : (
                <form onSubmit={handleCalendarSubmit} className="space-y-3">
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={calendarEmail}
                    onChange={(e) => setCalendarEmail(e.target.value)}
                    className="safari-input w-full px-4 py-3 rounded-lg text-sm"
                  />
                  <button
                    type="submit"
                    className="w-full py-4 rounded-full text-sm font-bold bg-moss text-sand hover:bg-moss/80 transition-all duration-300"
                  >
                    Send Me the Migration Calendar
                  </button>
                  <p className="text-center mono-label text-khaki/25">Free. One email. No spam.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}