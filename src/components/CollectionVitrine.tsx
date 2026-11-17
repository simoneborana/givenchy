import React, { useEffect, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { FragranceFamily, FragranceItem } from '../types/givenchy';
import { resolveMediaSrc } from '../utils/mediaUrl';
import { ResilientMedia } from './ResilientMedia';

interface CollectionVitrineProps {
  items: FragranceItem[];
  mediaOverrides: Record<string, string>;
}

const FILTER_TABS: { id: FragranceFamily; label: string }[] = [
  { id: 'all', label: 'All Creations' },
  { id: 'linterdit', label: "L'Interdit" },
  { id: 'gentleman', label: 'Gentleman' },
  { id: 'irresistible', label: 'Irresistible' },
  { id: 'particuliere', label: 'Particulière' },
];

export const CollectionVitrine: React.FC<CollectionVitrineProps> = ({
  items,
  mediaOverrides,
}) => {
  const [activeFilter, setActiveFilter] = useState<FragranceFamily>('all');
  const [selectedProduct, setSelectedProduct] = useState<FragranceItem | null>(null);
  const [selectedVolumeIdx, setSelectedVolumeIdx] = useState(0);

  const filtered =
    activeFilter === 'all'
      ? items
      : items.filter((item) => item.family === activeFilter);

  useEffect(() => {
    if (!selectedProduct) return;
    setSelectedVolumeIdx(0);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProduct(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedProduct]);

  return (
    <section
      id="collection"
      className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-20 md:py-28 border-b border-[var(--border-hairline)]"
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-[var(--accent-gold,#c9a14a)] mb-2">
            Maison Givenchy · India
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-normal tracking-tight text-[var(--text-primary)]">
            The Royal Vitrine
          </h2>
        </div>

        {/* Interactive Filter Tabs (Functional Buttons, No Static Pills) */}
        <div
          className="flex flex-wrap items-center gap-1.5 p-1 bg-[var(--bg-surface)] border border-[var(--border-hairline)]"
          role="tablist"
          aria-label="Filter fragrances by line"
        >
          {FILTER_TABS.map((tab) => {
            const active = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3.5 py-2 text-xs font-medium transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
                  active
                    ? 'bg-[var(--text-primary)] text-[var(--bg-canvas)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3-Column Uniform Vitrine Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((item) => {
          const src = resolveMediaSrc(item.id, item.mediaUrl, mediaOverrides);
          const basePrice = item.volumes[0]?.price ?? 0;

          return (
            <article
              key={item.id}
              className="group flex flex-col bg-[var(--bg-surface)] border border-[var(--border-hairline)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              <button
                type="button"
                onClick={() => setSelectedProduct(item)}
                className="relative aspect-[3/4] w-full overflow-hidden rounded-t-[150px] bg-[var(--bg-elevated)] border-b border-[var(--border-hairline)] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                aria-label={`Inspect ${item.name}`}
              >
                <ResilientMedia
                  src={src}
                  alt={item.name}
                  fallbackTitle={item.name}
                  className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </button>

              <div className="p-6 flex flex-col flex-1 justify-between gap-5">
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs text-[var(--text-muted)] mb-1.5">
                    <span>{item.concentration}</span>
                    {item.editionNote && <span>{item.editionNote}</span>}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedProduct(item)}
                    className="text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                  >
                    <h3 className="font-display text-xl font-normal text-[var(--text-primary)] tracking-tight group-hover:underline decoration-1 underline-offset-4">
                      {item.name}
                    </h3>
                  </button>

                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    {item.signatureNotes}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[var(--border-hairline)]">
                  <span className="text-sm font-medium tabular-nums text-[var(--text-primary)]">
                    ₹{basePrice.toLocaleString('en-IN')}
                    <span className="text-xs text-[var(--text-muted)] ml-1.5">
                      / {item.volumes[0]?.label}
                    </span>
                  </span>

                  <button
                    type="button"
                    onClick={() => setSelectedProduct(item)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-[var(--bg-elevated)] hover:bg-[var(--accent)] text-[var(--text-primary)] hover:text-[var(--accent-contrast)] border border-[var(--border-hairline)] transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                  >
                    <span>Read More</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Contiguous Product Detail Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={selectedProduct.name}
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-[var(--bg-canvas)] border border-[var(--border-hairline)] grid grid-cols-1 md:grid-cols-2 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              aria-label="Close product detail"
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-hairline)] hover:bg-[var(--accent)] hover:text-[var(--accent-contrast)] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="aspect-[3/4] md:aspect-auto md:h-full bg-[var(--bg-surface)] overflow-hidden">
              <ResilientMedia
                src={resolveMediaSrc(
                  selectedProduct.id,
                  selectedProduct.mediaUrl,
                  mediaOverrides
                )}
                alt={selectedProduct.name}
                fallbackTitle={selectedProduct.name}
                className="w-full h-full"
              />
            </div>

            <div className="p-8 md:p-10 flex flex-col justify-between gap-8">
              <div>
                <p className="text-xs text-[var(--text-muted)] tracking-[0.18em] uppercase mb-2">
                  {selectedProduct.concentration}
                </p>
                <h3 className="font-display text-3xl text-[var(--text-primary)] tracking-tight mb-6">
                  {selectedProduct.name}
                </h3>

                {/* Minimal Olfactory Pyramid */}
                <dl className="space-y-3 text-sm border-y border-[var(--border-hairline)] py-5">
                  <div className="flex justify-between gap-4">
                    <dt className="text-[var(--text-muted)]">Top</dt>
                    <dd className="text-right text-[var(--text-primary)]">
                      {selectedProduct.pyramid.top}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-[var(--text-muted)]">Heart</dt>
                    <dd className="text-right text-[var(--text-primary)]">
                      {selectedProduct.pyramid.heart}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-[var(--text-muted)]">Base</dt>
                    <dd className="text-right text-[var(--text-primary)]">
                      {selectedProduct.pyramid.base}
                    </dd>
                  </div>
                </dl>

                {/* Volume Selector */}
                <div className="mt-6">
                  <p className="text-xs text-[var(--text-muted)] mb-2.5">
                    Select Volume
                  </p>
                  <div className="flex items-center gap-2.5">
                    {selectedProduct.volumes.map((vol, idx) => {
                      const active = idx === selectedVolumeIdx;
                      return (
                        <button
                          key={vol.label}
                          type="button"
                          onClick={() => setSelectedVolumeIdx(idx)}
                          className={`px-4 py-2 text-xs font-medium tabular-nums border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                            active
                              ? 'bg-[var(--text-primary)] text-[var(--bg-canvas)] border-[var(--text-primary)]'
                              : 'bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-hairline)] hover:border-[var(--text-muted)]'
                          }`}
                        >
                          {vol.label} · ₹{vol.price.toLocaleString('en-IN')}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border-hairline)] flex items-center justify-between text-xs text-[var(--text-muted)]">
                <span>
                  {selectedProduct.volumes[selectedVolumeIdx]?.label} · ₹
                  {(selectedProduct.volumes[selectedVolumeIdx]?.price ?? 0).toLocaleString('en-IN')}
                </span>
                <span>Maison Givenchy</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
