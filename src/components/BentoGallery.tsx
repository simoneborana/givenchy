import React, { useEffect, useState } from 'react';
import { Maximize2, X } from 'lucide-react';
import { BentoFrame } from '../types/givenchy';
import { resolveMediaSrc } from '../utils/mediaUrl';
import { ResilientMedia } from './ResilientMedia';

interface BentoGalleryProps {
  frames: BentoFrame[];
  mediaOverrides: Record<string, string>;
}

export const BentoGallery: React.FC<BentoGalleryProps> = ({
  frames,
  mediaOverrides,
}) => {
  const [lightboxFrame, setLightboxFrame] = useState<BentoFrame | null>(null);

  useEffect(() => {
    if (!lightboxFrame) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxFrame(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxFrame]);

  return (
    <section
      id="atelier"
      className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-20 md:py-28 border-b border-[var(--border-hairline)]"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-[var(--accent-gold,#c9a14a)] mb-2">
            Darbar Visuals
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-normal tracking-tight text-[var(--text-primary)]">
            Palace Silhouettes
          </h2>
        </div>
        <p className="text-xs tracking-wide text-[var(--text-muted)]">
          Select any frame for full-scale study
        </p>
      </div>

      {/* Asymmetric Media-First Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-5 md:gap-6">
        {frames.map((frame) => {
          const src = resolveMediaSrc(frame.id, frame.mediaUrl, mediaOverrides);
          return (
            <button
              key={frame.id}
              type="button"
              onClick={() => setLightboxFrame(frame)}
              className={`group relative overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-hairline)] text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${frame.spanClass} ${frame.aspectClass}`}
            >
              <ResilientMedia
                src={src}
                alt={frame.title}
                fallbackTitle={frame.title}
                className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none"
                aria-hidden="true"
              />
              <div className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-black/45 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-sm">
                <Maximize2 className="w-4 h-4" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl md:text-2xl text-[#faf8f5] tracking-tight">
                    {frame.title}
                  </h3>
                  <p className="text-xs text-[#e6dfd6]/80 mt-1">
                    {frame.noteLine}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Fullscreen Lightbox Viewer */}
      {lightboxFrame && (
        <div
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={lightboxFrame.title}
          onClick={() => setLightboxFrame(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxFrame(null)}
            aria-label="Close lightbox"
            className="fixed top-6 right-6 z-50 w-11 h-11 flex items-center justify-center border border-white/25 bg-black/60 text-white hover:bg-white hover:text-black transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div
            className="max-w-5xl w-full flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#121215] border border-white/15">
              <ResilientMedia
                src={resolveMediaSrc(
                  lightboxFrame.id,
                  lightboxFrame.mediaUrl,
                  mediaOverrides
                )}
                alt={lightboxFrame.title}
                fallbackTitle={lightboxFrame.title}
                className="w-full h-full"
              />
            </div>
            <div className="flex flex-wrap items-baseline justify-between gap-4 text-[#faf8f5]">
              <h3 className="font-display text-2xl">{lightboxFrame.title}</h3>
              <p className="text-sm text-[#a19e98]">{lightboxFrame.noteLine}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
