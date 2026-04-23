'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const GUIDES = [
{
  name: 'Baraka Mwangi',
  role: 'Senior Field Guide · 14 Years',
  specialty: 'Northern Circuit & Migration Timing',
  quote:
  'The Grumeti crossing window is 11 days wide on a good year. I\'ve seen it close in 4. You don\'t guess — you track the grass height on the eastern bank from March.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_10b0de3ba-1772252902778.png",
  alt: 'Portrait of Baraka Mwangi, senior Tanzanian field guide with 14 years experience on the Serengeti',
  routes: ['Serengeti NP', 'Grumeti Corridor', 'Ngorongoro'],
  trips: 340
},
{
  name: 'Zawadi Osei',
  role: 'Marine & Coastal Guide · 9 Years',
  specialty: 'Zanzibar Reefs & Dhow Routes',
  quote:
  'Nungwi\'s current reverses in April. Most divers miss the mantas entirely because they book on the wrong side of that window. We don\'t let that happen.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b3c06239-1772252900914.png",
  alt: 'Portrait of Zawadi Osei, Tanzanian marine guide specializing in Zanzibar reef diving and coastal routes',
  routes: ['Zanzibar', 'Pemba Island', 'Mafia Atoll'],
  trips: 218
},
{
  name: 'Juma Kiprotich',
  role: 'Overland Specialist · 11 Years',
  specialty: 'Southern Circuit & Remote Access',
  quote:
  'Ruaha in July is what Serengeti was in 1985 — raw, uncrowded, and genuinely wild. I take six groups a year. Every one of them asks why no one told them about it sooner.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_10058dfa7-1772252899759.png",
  alt: 'Portrait of Juma Kiprotich, overland safari specialist with expertise in southern Tanzania remote circuits',
  routes: ['Ruaha NP', 'Selous / Nyerere', 'Mikumi'],
  trips: 275
}];


const TESTIMONIALS = [
{
  name: 'Priya Nair',
  context: 'Honeymooners · Zanzibar + Ngorongoro, Oct 2025',
  text: 'We almost booked a generic package. The Safari route brief changed everything — we had private crater access at dawn that no other group had that week.',
  avatar: 'https://i.pravatar.cc/80?u=priya-nair-safari',
  rating: 5
},
{
  name: 'Tom Hargreaves',
  context: 'Overlander · 3-week Northern Circuit, Aug 2025',
  text: 'The dry-season coordinates in the migration calendar are the real thing. Crossed the Mara on day 9 exactly when Baraka predicted. 40 minutes of pure chaos.',
  avatar: 'https://i.pravatar.cc/80?u=tom-hargreaves-overlander',
  rating: 5
},
{
  name: 'Kenji Watanabe',
  context: 'Gap Year · Kilimanjaro + Serengeti, Jan 2026',
  text: 'I\'d been pinning this trip for 18 months. The Safari summit gave me a route, a budget breakdown, and a guide contact in one 3-hour session. I left three weeks later.',
  avatar: 'https://i.pravatar.cc/80?u=kenji-watanabe-gap-year',
  rating: 5
}];


export default function GuideCredibility() {
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
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section id="guides" ref={sectionRef} className="py-24 md:py-32 px-6 bg-canopy">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 reveal">
          <p className="mono-label text-coral mb-3">Field Intelligence</p>
          <h2 className="text-4xl md:text-6xl font-bold text-khaki tracking-tight leading-tight">
            Guides who never left.
          </h2>
          <p className="text-khaki/60 mt-4 max-w-xl leading-relaxed">
            Eight resident guides, combined 89 years in the field, zero TripAdvisor accounts. Their knowledge doesn't live on a booking platform.
          </p>
        </div>

        {/* Guide Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {GUIDES?.map((guide, i) =>
          <div
            key={guide?.name}
            className={`reveal delay-${(i + 1) * 100} guide-card rounded-2xl overflow-hidden border border-khaki/10`}
            style={{ background: 'rgba(15, 26, 18, 0.6)' }}>
            
              {/* Photo */}
              <div className="relative h-48 overflow-hidden">
                <AppImage
                src={guide?.image}
                alt={guide?.alt}
                fill
                className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700" />
              
                <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="mono-label text-coral/80">{guide?.trips} trips led</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-khaki">{guide?.name}</h3>
                <p className="mono-label text-moss mb-1">{guide?.role}</p>
                <p className="text-xs text-khaki/50 mb-4">{guide?.specialty}</p>

                <blockquote className="text-sm text-khaki/70 leading-relaxed italic border-l-2 border-coral/40 pl-4 mb-4">
                  "{guide?.quote}"
                </blockquote>

                <div className="flex flex-wrap gap-1.5">
                  {guide?.routes?.map((r) =>
                <span
                  key={r}
                  className="text-xs px-2.5 py-1 rounded-full border border-moss/30 text-moss/70 mono-label">
                  
                      {r}
                    </span>
                )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Testimonials */}
        <div className="border-t border-khaki/10 pt-16">
          <p className="mono-label text-khaki/40 mb-10 reveal">Traveler Accounts</p>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS?.map((t, i) =>
            <div
              key={t?.name}
              className={`reveal delay-${(i + 1) * 100} glass-card rounded-2xl p-6`}>
              
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t?.rating })?.map((_, j) =>
                <Icon key={j} name="StarIcon" size={14} variant="solid" className="text-coral" />
                )}
                </div>

                <blockquote className="text-sm text-khaki/80 leading-relaxed mb-6">
                  "{t?.text}"
                </blockquote>

                <div className="flex items-center gap-3">
                  <AppImage
                  src={t?.avatar}
                  alt={`Profile photo of ${t?.name}, Safari traveler`}
                  width={36}
                  height={36}
                  className="rounded-full grayscale" />
                
                  <div>
                    <p className="text-sm font-semibold text-khaki">{t?.name}</p>
                    <p className="mono-label text-khaki/40">{t?.context}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}