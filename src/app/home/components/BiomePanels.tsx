'use client';

import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';

interface BiomePanelsProps {
  onOpenModal: () => void;
}

const BIOMES = [
{
  id: 'rainforest',
  label: '01 / Rainforest Canopy',
  title: 'Where the Canopy Closes',
  subtitle: 'Mahale Mountains · Gombe Stream',
  description:
  'Chimpanzee trails wind through mist-soaked fig trees. Here elevation drops 2,000m in under 40km, and the air tastes of wet bark and orchid.',
  stat: { value: '2,462m', label: 'Peak Elevation · Kilimanjaro Forest Belt' },
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_10a6b3bf1-1772252900302.png",
  alt: 'Dense rainforest canopy with shafts of golden light filtering through ancient trees in Tanzania highlands',
  overlay: 'from-deep-forest/90 via-canopy/50 to-canopy/80',
  accent: '#4A7C59',
  atmosphere: 'mist',
  coordinates: '-6.0833° S, 29.7667° E'
},
{
  id: 'volcanic',
  label: '02 / Volcanic Highlands',
  title: 'Ash & Ancient Fire',
  subtitle: 'Ngorongoro Crater · Ol Doinyo Lengai',
  description:
  'The crater floor holds 25,000 animals in a 260km² caldera. Lengai erupted last in 2008 — its black carbonatite lava still warm underfoot.',
  stat: { value: '25,000', label: 'Animals in Ngorongoro Caldera Year-Round' },
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1953dcc27-1772252900333.png",
  alt: 'Dramatic volcanic highland landscape of Ngorongoro Crater with wildlife on the caldera floor at golden hour',
  overlay: 'from-volcanic/95 via-volcanic/60 to-bark/80',
  accent: '#C4A44C',
  atmosphere: 'shimmer',
  coordinates: '-3.1781° S, 35.5873° E'
},
{
  id: 'grassland',
  label: '03 / Open Grassland',
  title: 'The Endless Serengeti',
  subtitle: 'Serengeti National Park · Masai Mara Corridor',
  description:
  '1.5 million wildebeest move in a clockwise circuit every year. The Grumeti River crossing happens in June — if you miss it, you wait 12 months.',
  stat: { value: 'June–July', label: 'Grumeti River Crossing Window' },
  image: "https://images.unsplash.com/photo-1608736297616-12884a01fb14",
  alt: 'Vast golden Serengeti savanna at sunrise with acacia trees silhouetted against an orange sky and wildebeest in the distance',
  overlay: 'from-bark/90 via-grassland/40 to-bark/70',
  accent: '#E8613C',
  atmosphere: 'shimmer',
  coordinates: '-2.3333° S, 34.8333° E'
},
{
  id: 'coast',
  label: '04 / Turquoise Coast',
  title: 'Zanzibar at Low Tide',
  subtitle: 'Zanzibar Archipelago · Pemba Island',
  description:
  'The dhow routes that carried cloves and ivory for 1,000 years still run at dawn. Nungwi\'s reef drops 30m into water so clear you can read the sand.',
  stat: { value: '30m', label: 'Visibility at Nungwi Reef · Zanzibar' },
  image: "https://images.unsplash.com/photo-1645394865932-33c2878426e7",
  alt: 'Crystal turquoise waters of Zanzibar coast with a traditional wooden dhow sailing past white sand beaches and coral reefs',
  overlay: 'from-coast/95 via-coast/50 to-deep-forest/80',
  accent: '#4A9CB5',
  atmosphere: 'water',
  coordinates: '-6.1659° S, 39.2026° E'
}];


export default function BiomePanels({ onOpenModal }: BiomePanelsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activePanel, setActivePanel] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionTop = -rect.top;
      const sectionHeight = section.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, sectionTop / sectionHeight));

      // Map progress to panel index
      const panelIndex = Math.min(
        BIOMES.length - 1,
        Math.floor(progress * BIOMES.length)
      );
      setActivePanel(panelIndex);

      // Translate the track
      if (trackRef.current) {
        const translateX = progress * (BIOMES.length - 1) * 100;
        trackRef.current.style.transform = `translateX(-${translateX}vw)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="biomes" ref={sectionRef} className="h-scroll-section">
      <div ref={stickyRef} className="h-scroll-sticky">
        {/* Horizontal track */}
        <div
          ref={trackRef}
          className="horizontal-scroll-container transition-transform duration-100 ease-linear will-change-transform"
          style={{ transform: 'translateX(0vw)' }}>
          
          {BIOMES.map((biome, i) =>
          <BiomePanel
            key={biome.id}
            biome={biome}
            isActive={activePanel === i}
            onOpenModal={onOpenModal} />

          )}
        </div>

        {/* Panel progress indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {BIOMES.map((_, i) =>
          <div
            key={i}
            className={`progress-dot transition-all duration-400 ${activePanel === i ? 'active' : ''}`} />

          )}
        </div>

        {/* Pinned CTA — bottom right of every panel */}
        <div className="absolute bottom-8 right-8 z-30">
          <button
            onClick={onOpenModal}
            className="cta-coral flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold shadow-lg shadow-coral/20">
            
            <span className="w-2 h-2 rounded-full bg-deep-forest/60 animate-pulse" />
            Reserve Your Seat at Basecamp
          </button>
        </div>

        {/* Panel label top-left */}
        <div className="absolute top-24 left-8 z-20">
          <p className="mono-label text-khaki/50 transition-all duration-500">
            {BIOMES[activePanel]?.label}
          </p>
        </div>
      </div>
    </section>);

}

function BiomePanel({
  biome,
  isActive,
  onOpenModal




}: {biome: (typeof BIOMES)[0];isActive: boolean;onOpenModal: () => void;}) {
  return (
    <div className={`biome-panel relative noise-overlay`}>
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full">
        <AppImage
          src={biome.image}
          alt={biome.alt}
          fill
          className={`object-cover object-center transition-all duration-1000 ${
          biome.atmosphere === 'shimmer' ? 'heat-shimmer-layer' : ''}`
          } />
        
        <div className={`absolute inset-0 bg-gradient-to-br ${biome.overlay}`} />
      </div>

      {/* Atmosphere effects */}
      {biome.atmosphere === 'mist' && <MistEffect />}
      {biome.atmosphere === 'water' && <WaterEffect />}

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end pb-28 px-8 md:px-16 lg:px-24 z-10">
        <div className="max-w-2xl">
          {/* Coordinates */}
          <p className="mono-label mb-3" style={{ color: biome.accent }}>
            {biome.coordinates}
          </p>

          <h2
            className={`text-4xl md:text-6xl lg:text-7xl font-bold text-khaki leading-tight tracking-tight mb-4 transition-all duration-700 ${
            isActive ? 'opacity-100 translate-y-0' : 'opacity-60 translate-y-2'}`
            }>
            
            {biome.title}
          </h2>

          <p className="mono-label text-khaki/50 mb-4">{biome.subtitle}</p>

          <p
            className={`text-base md:text-lg text-khaki/70 leading-relaxed max-w-lg mb-8 transition-all duration-700 delay-100 ${
            isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`
            }>
            
            {biome.description}
          </p>

          {/* Stat */}
          <div
            className={`glass-card inline-flex items-center gap-4 px-5 py-3 rounded-xl transition-all duration-700 delay-200 ${
            isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`
            }>
            
            <span className="text-2xl font-bold mono-label" style={{ color: biome.accent }}>
              {biome.stat.value}
            </span>
            <span className="text-xs text-khaki/50 leading-tight max-w-[160px]">
              {biome.stat.label}
            </span>
          </div>
        </div>
      </div>
    </div>);

}

function MistEffect() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-5">
      {Array.from({ length: 8 }).map((_, i) =>
      <div
        key={i}
        className="mist-particle"
        style={{
          width: `${60 + i * 20}px`,
          height: `${60 + i * 20}px`,
          top: `${10 + i * 10}%`,
          left: `${-10 + i * 5}%`,
          animationDuration: `${8 + i * 2}s`,
          animationDelay: `${i * 1.2}s`
        }} />

      )}
    </div>);

}

function WaterEffect() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none overflow-hidden z-5">
      {Array.from({ length: 5 }).map((_, i) =>
      <div
        key={i}
        className="wave-line"
        style={{
          bottom: `${i * 12}px`,
          animationDuration: `${3 + i * 0.8}s`,
          animationDelay: `${i * 0.6}s`,
          opacity: 0.3 - i * 0.05
        }} />

      )}
    </div>);

}