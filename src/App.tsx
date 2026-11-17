import React, { useEffect, useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { AtelierStudioDrawer } from './components/AtelierStudioDrawer';
import { BentoGallery } from './components/BentoGallery';
import { CinemaHero } from './components/CinemaHero';
import { CollectionVitrine } from './components/CollectionVitrine';
import { SavoirFaireSplit } from './components/SavoirFaireSplit';
import {
  BOTANICAL_NOTES,
  DEFAULT_ATELIER_CONFIG,
  DEFAULT_BENTO_FRAMES,
  DEFAULT_REELS,
  FONT_PAIRINGS,
  FRAGRANCE_CATALOG,
  LAYOUT_ORDERS,
  PALETTE_THEMES,
} from './data/catalog';
import { AtelierConfig } from './types/givenchy';

const STORAGE_KEY_CONFIG = 'givenchy_india_atelier_v2';

export default function App() {
  const [config, setConfig] = useState<AtelierConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CONFIG);
      if (saved) {
        return { ...DEFAULT_ATELIER_CONFIG, ...JSON.parse(saved) };
      }
    } catch {
      // Ignore storage read errors
    }
    return DEFAULT_ATELIER_CONFIG;
  });

  const [isStudioOpen, setIsStudioOpen] = useState(false);

  // Sync palette & typography CSS variables to :root
  useEffect(() => {
    const root = document.documentElement;
    const palette =
      PALETTE_THEMES[config.palette] ?? PALETTE_THEMES['jaipur-nocturne'];
    const fonts =
      FONT_PAIRINGS[config.fontPairing] ?? FONT_PAIRINGS['cormorant-dm'];

    Object.entries(palette.vars).forEach(([key, val]) => {
      root.style.setProperty(key, val);
    });
    root.style.setProperty('--font-display', fonts.display);
    root.style.setProperty('--font-body', fonts.body);

    try {
      localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
    } catch {
      // Ignore quota errors
    }
  }, [config]);

  const sectionOrder =
    LAYOUT_ORDERS[config.layoutOrder]?.order ??
    LAYOUT_ORDERS['cinema-bento-collection'].order;

  const scrollToCollection = () => {
    const el = document.getElementById('collection');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const renderSection = (key: 'bento' | 'collection' | 'savoir') => {
    if (key === 'bento') {
      return (
        <BentoGallery
          key="bento"
          frames={DEFAULT_BENTO_FRAMES}
          mediaOverrides={config.mediaOverrides}
        />
      );
    }
    if (key === 'collection') {
      return (
        <CollectionVitrine
          key="collection"
          items={FRAGRANCE_CATALOG}
          mediaOverrides={config.mediaOverrides}
        />
      );
    }
    return (
      <SavoirFaireSplit
        key="savoir"
        notes={BOTANICAL_NOTES}
        catalog={FRAGRANCE_CATALOG}
        mediaOverrides={config.mediaOverrides}
        onExploreCollection={scrollToCollection}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-canvas)] text-[var(--text-primary)] font-body">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 h-16 bg-[var(--bg-canvas)]/90 backdrop-blur-md border-b border-[var(--border-hairline)]">
        <div className="h-full max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between gap-8">
          {/* Zone 1: Single-element brand wordmark */}
          <a
            href="#campaign"
            className="font-display text-xl md:text-2xl tracking-[0.2em] text-[var(--text-primary)] whitespace-nowrap shrink-0"
          >
            GIVENCHY
          </a>

          {/* Zone 2: 4 concise single-line nav links */}
          <nav
            className="hidden md:flex items-center gap-7 text-xs tracking-[0.14em] uppercase text-[var(--text-muted)]"
            aria-label="Primary navigation"
          >
            <a
              href="#campaign"
              className="hover:text-[var(--text-primary)] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Campaign
            </a>
            <a
              href="#atelier"
              className="hover:text-[var(--text-primary)] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Atelier
            </a>
            <a
              href="#collection"
              className="hover:text-[var(--text-primary)] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Collection
            </a>
            <a
              href="#savoir-faire"
              className="hover:text-[var(--text-primary)] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Heritage
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <button
            type="button"
            onClick={() => setIsStudioOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-contrast)] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text-primary)]"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Studio</span>
          </button>
        </div>
      </header>

      <main className="flex-1">
        <CinemaHero
          reels={DEFAULT_REELS}
          mediaOverrides={config.mediaOverrides}
          onExploreClick={scrollToCollection}
        />

        {sectionOrder.map((sec) => renderSection(sec))}
      </main>

      {/* Quiet Couture Footer */}
      <footer className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-xs text-[var(--text-muted)]">
        <div className="flex flex-wrap items-center gap-3">
          <svg
            width="18"
            height="14"
            viewBox="0 0 24 18"
            fill="none"
            className="text-[var(--accent-gold,#c9a14a)] shrink-0"
            aria-hidden="true"
          >
            <path
              d="M12 1C14 5 14 10 12 15C10 10 10 5 12 1Z"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path
              d="M12 15C8 14 5 10 4 5C8 6 10 10 12 15Z"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path
              d="M12 15C16 14 19 10 20 5C16 6 14 10 12 15Z"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>
          <span className="font-display text-sm tracking-[0.18em] text-[var(--text-primary)]">
            GIVENCHY
          </span>
          <span aria-hidden="true">·</span>
          <span>Haute Parfumerie · Jaipur · Mumbai · Paris</span>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <button
            type="button"
            onClick={() => setIsStudioOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 border border-[var(--border-hairline)] text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Customize Media & Palette</span>
          </button>
        </div>
      </footer>

      <AtelierStudioDrawer
        isOpen={isStudioOpen}
        onClose={() => setIsStudioOpen(false)}
        config={config}
        onChange={setConfig}
        onReset={() => setConfig(DEFAULT_ATELIER_CONFIG)}
      />
    </div>
  );
}
