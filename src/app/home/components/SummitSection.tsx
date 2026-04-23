'use client';

import React, { useEffect, useRef } from 'react';

import AppImage from '@/components/ui/AppImage';

interface SummitSectionProps {
  onOpenModal: () => void;
}

const SCHEDULE = [
{
  day: 'Day 1',
  date: 'March 14',
  time: '08:00 EAT',
  session: 'Opening: Reading the Dry Season',
  host: 'Baraka Mwangi',
  type: 'Keynote'
},
{
  day: 'Day 1',
  date: 'March 14',
  time: '11:00 EAT',
  session: 'Route Building Workshop: Northern Circuit',
  host: 'Juma Kiprotich',
  type: 'Workshop'
},
{
  day: 'Day 2',
  date: 'March 15',
  time: '09:00 EAT',
  session: 'Live Q&A: Migration Timing Deep Dive',
  host: 'All Guides',
  type: 'Live Q&A'
},
{
  day: 'Day 2',
  date: 'March 15',
  time: '14:00 EAT',
  session: 'Gear Workshop: What Actually Survives the Dust',
  host: 'Zawadi Osei',
  type: 'Workshop'
},
{
  day: 'Day 3',
  date: 'March 16',
  time: '10:00 EAT',
  session: 'Zanzibar & Coast: Honeymoon Routes That Work',
  host: 'Zawadi Osei',
  type: 'Workshop'
},
{
  day: 'Day 3',
  date: 'March 16',
  time: '15:00 EAT',
  session: 'Closing: Build Your 2026 Itinerary',
  host: 'All Guides',
  type: 'Interactive'
}];


const SESSION_COLORS: Record<string, string> = {
  Keynote: '#E8613C',
  Workshop: '#4A7C59',
  'Live Q&A': '#4A9CB5',
  Interactive: '#C4A44C'
};

export default function SummitSection({ onOpenModal }: SummitSectionProps) {
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
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="summit" ref={sectionRef} className="py-24 md:py-32 px-6 relative overflow-hidden"
    style={{ background: 'linear-gradient(135deg, #0F1A12 0%, #1A2E1F 50%, #0F1A12 100%)' }}>
      
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(232,97,60,0.08) 0%, transparent 70%)' }} />
      

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="grid md:grid-cols-2 gap-16 items-start mb-20">
          <div className="reveal">
            <p className="mono-label text-coral mb-3">Annual Virtual Summit · 2026</p>
            <h2 className="text-4xl md:text-6xl font-bold text-khaki tracking-tight leading-tight mb-6">
              Three days.<br />Eight guides.<br />Your itinerary.
            </h2>
            <p className="text-khaki/60 leading-relaxed mb-8 max-w-md">
              The Tanzania Planning Summit is where gap-year dreamers build real routes, honeymooners get honest advice about Zanzibar vs. Ngorongoro, and overlanders extract migration coordinates they can actually use.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {[
              { value: '847', label: 'Seats at Basecamp 2025' },
              { value: '8', label: 'Resident Guides' },
              { value: '3', label: 'Days of Live Sessions' }].
              map((stat) =>
              <div key={stat.label}>
                  <p className="text-3xl font-bold text-coral stat-number">{stat.value}</p>
                  <p className="mono-label text-khaki/40 mt-1">{stat.label}</p>
                </div>
              )}
            </div>

            <button
              onClick={onOpenModal}
              className="cta-coral inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-bold">
              
              <span className="w-2 h-2 rounded-full bg-deep-forest/60 animate-pulse" />
              Reserve Your Seat at Basecamp
            </button>
          </div>

          {/* Hero image */}
          <div className="reveal-right delay-200 relative">
            <div className="relative rounded-2xl overflow-hidden h-80 md:h-96">
              <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_11ff2a887-1772252900969.png"
                alt="Serengeti sunrise over the savanna with a Land Cruiser silhouette against the golden horizon, capturing the essence of Tanzania safari planning"
                fill
                className="object-cover" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/80 via-transparent to-transparent" />
              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 glass-card rounded-xl px-4 py-3">
                <p className="mono-label text-coral">March 14–16, 2026</p>
                <p className="text-sm font-bold text-khaki mt-0.5">Virtual · All Timezones</p>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div className="reveal">
          <p className="mono-label text-khaki/40 mb-6">Summit Schedule · East Africa Time</p>
          <div className="space-y-2">
            {SCHEDULE.map((session, i) =>
            <div
              key={i}
              className="flex items-center gap-4 md:gap-6 p-4 rounded-xl border border-khaki/8 hover:border-khaki/20 transition-all duration-300 group"
              style={{ background: 'rgba(255,255,255,0.02)' }}>
              
                <div className="flex-shrink-0 w-20 md:w-28">
                  <p className="mono-label text-khaki/40">{session.date}</p>
                  <p className="mono-label text-coral/70">{session.time}</p>
                </div>

                <div
                className="w-1 h-10 rounded-full flex-shrink-0"
                style={{ background: SESSION_COLORS[session.type] || '#4A7C59' }} />
              

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-khaki group-hover:text-sand transition-colors truncate">
                    {session.session}
                  </p>
                  <p className="mono-label text-khaki/40 mt-0.5">{session.host}</p>
                </div>

                <span
                className="flex-shrink-0 text-xs px-2.5 py-1 rounded-full mono-label hidden md:block"
                style={{
                  background: `${SESSION_COLORS[session.type]}20`,
                  color: SESSION_COLORS[session.type],
                  border: `1px solid ${SESSION_COLORS[session.type]}40`
                }}>
                
                  {session.type}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}