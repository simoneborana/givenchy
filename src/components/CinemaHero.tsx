import React, { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, Pause, Play } from 'lucide-react';
import { CampaignReel } from '../types/givenchy';
import { resolveMediaSrc } from '../utils/mediaUrl';
import { ResilientMedia } from './ResilientMedia';

interface CinemaHeroProps {
  reels: CampaignReel[];
  mediaOverrides: Record<string, string>;
  onExploreClick: () => void;
}

export const CinemaHero: React.FC<CinemaHeroProps> = ({
  reels,
  mediaOverrides,
  onExploreClick,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const activeReel = reels[activeIndex] ?? reels[0];
  const resolvedSrc = resolveMediaSrc(
    activeReel.id,
    activeReel.mediaUrl,
    mediaOverrides
  );

  // Subtle atmospheric dust & light-refraction film grain on HTML5 canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion || !isPlaying) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 28 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 0.7 + Math.random() * 1.8,
      vx: (Math.random() - 0.5) * 0.18,
      vy: -0.08 - Math.random() * 0.22,
      alpha: 0.12 + Math.random() * 0.28,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 236, 224, ${p.alpha})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [isPlaying, activeIndex]);

  return (
    <section
      id="campaign"
      className="relative w-full min-h-[84vh] lg:min-h-[88vh] flex items-end overflow-hidden border-b border-[var(--border-hairline)]"
    >
      {/* Background Cinema Visual */}
      <div className="absolute inset-0 overflow-hidden bg-[var(--bg-canvas)]">
        <ResilientMedia
          src={resolvedSrc}
          alt={activeReel.title}
          animateMotion
          isPlaying={isPlaying}
          fallbackTitle={activeReel.title}
          className="w-full h-full opacity-95"
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
        />
        {/* Measured scrim for crisp 4.5:1+ contrast */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/25 pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Minimal Foreground Content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 pb-12 md:pb-16 pt-28 flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div className="max-w-2xl">
          <p className="text-xs tracking-[0.22em] uppercase text-[#e6dfd6]/85 mb-4">
            {activeReel.eyebrow}
          </p>
          <h1
            className="font-display text-[#faf8f5] font-normal tracking-tight leading-[1.03] mb-8"
            style={{
              fontSize: 'clamp(2.6rem, 5.2vw, 4.75rem)',
              textWrap: 'balance',
            }}
          >
            {activeReel.headline}
          </h1>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onExploreClick}
              className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-medium bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-contrast)] transition-colors duration-200 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span>Explore Collection</span>
              <ArrowDownRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsPlaying((prev) => !prev)}
              aria-label={isPlaying ? 'Pause campaign reel' : 'Play campaign reel'}
              className="inline-flex items-center gap-2 px-4 py-3 text-xs tracking-wider uppercase text-[#faf8f5] border border-white/25 bg-black/35 hover:bg-black/60 backdrop-blur-sm transition-colors duration-200 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause Reel</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Play Reel</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 3-Chapter Film Reel Switcher */}
        <div
          className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-2"
          role="tablist"
          aria-label="Campaign film chapters"
        >
          {reels.map((reel, idx) => {
            const active = idx === activeIndex;
            return (
              <button
                key={reel.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveIndex(idx)}
                className={`group flex items-center gap-3 px-3 py-2 text-left transition-colors duration-200 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                  active
                    ? 'text-[#faf8f5]'
                    : 'text-[#faf8f5]/55 hover:text-[#faf8f5]/85'
                }`}
              >
                <span className="text-xs tabular-nums opacity-70">
                  0{idx + 1}.
                </span>
                <span className="font-display text-base md:text-lg tracking-wide">
                  {reel.title}
                </span>
                <span
                  className={`h-px transition-all duration-300 ${
                    active ? 'w-8 bg-[#faf8f5]' : 'w-3 bg-white/30 group-hover:w-5'
                  }`}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
