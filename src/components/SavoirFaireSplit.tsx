import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { BotanicalNote, FragranceItem } from '../types/givenchy';
import { resolveMediaSrc } from '../utils/mediaUrl';
import { ResilientMedia } from './ResilientMedia';

interface SavoirFaireSplitProps {
  notes: BotanicalNote[];
  catalog: FragranceItem[];
  mediaOverrides: Record<string, string>;
  onExploreCollection: () => void;
}

export const SavoirFaireSplit: React.FC<SavoirFaireSplitProps> = ({
  notes,
  catalog,
  mediaOverrides,
  onExploreCollection,
}) => {
  const [selectedNoteIdx, setSelectedNoteIdx] = useState(0);
  const activeNote = notes[selectedNoteIdx] ?? notes[0];
  const pairedFragrance =
    catalog.find((f) => f.id === activeNote.featuredFragranceId) ?? catalog[0];

  const visualSrc = resolveMediaSrc(
    `note-${activeNote.id}`,
    activeNote.mediaUrl,
    mediaOverrides
  );

  return (
    <section
      id="savoir-faire"
      className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-20 md:py-28 border-b border-[var(--border-hairline)]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
        {/* Left: Full-Height Macro Editorial Visual with Jharokha Arch */}
        <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[540px] overflow-hidden rounded-t-[200px] bg-[var(--bg-surface)] border border-[var(--border-hairline)]">
          <ResilientMedia
            src={visualSrc}
            alt={activeNote.name}
            fallbackTitle={activeNote.name}
            className="w-full h-full lg:h-full transition-opacity duration-500"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"
            aria-hidden="true"
          />
          <div className="absolute bottom-6 left-8 right-8 flex items-end justify-between text-[#faf8f5]">
            <div>
              <p className="font-display text-2xl">{activeNote.name}</p>
              <p className="text-xs text-[#e6dfd6]/85 mt-0.5">
                {activeNote.origin}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Minimal Botanical Selector */}
        <div className="lg:col-span-5 flex flex-col justify-between py-2 gap-10">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-[var(--accent-gold,#c9a14a)] mb-3">
              Heritage · Kannauj & Mysore
            </p>
            <h2
              className="font-display text-3xl md:text-4xl font-normal tracking-tight text-[var(--text-primary)] leading-tight"
              style={{ textWrap: 'balance' }}
            >
              Sacred Botanicals in Deg & Crystal.
            </h2>
          </div>

          {/* Interactive Botanical Note Rows */}
          <div className="divide-y divide-[var(--border-hairline)] border-y border-[var(--border-hairline)]">
            {notes.map((note, idx) => {
              const active = idx === selectedNoteIdx;
              return (
                <button
                  key={note.id}
                  type="button"
                  onClick={() => setSelectedNoteIdx(idx)}
                  className={`w-full py-4 px-2 flex items-center justify-between text-left transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
                    active
                      ? 'text-[var(--text-primary)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <div>
                    <span className="text-xs tabular-nums mr-3 opacity-60">
                      0{idx + 1}.
                    </span>
                    <span className="font-display text-xl">{note.name}</span>
                  </div>
                  <span className="text-xs tracking-wide">{note.origin.split('·')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Paired Creation Action */}
          {pairedFragrance && (
            <div className="flex items-center justify-between gap-4 pt-2">
              <div>
                <p className="text-xs text-[var(--text-muted)]">
                  Signature Accord
                </p>
                <p className="font-display text-lg text-[var(--text-primary)]">
                  {pairedFragrance.name}
                </p>
              </div>
              <button
                type="button"
                onClick={onExploreCollection}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-contrast)] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>View in Vitrine</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
