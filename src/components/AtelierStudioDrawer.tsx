import React from 'react';
import { RotateCcw, X } from 'lucide-react';
import {
  DEFAULT_BENTO_FRAMES,
  DEFAULT_REELS,
  FONT_PAIRINGS,
  FRAGRANCE_CATALOG,
  LAYOUT_ORDERS,
  PALETTE_THEMES,
} from '../data/catalog';
import {
  AtelierConfig,
  FontPairingId,
  LayoutOrderId,
  PaletteId,
} from '../types/givenchy';

interface AtelierStudioDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  config: AtelierConfig;
  onChange: (next: AtelierConfig) => void;
  onReset: () => void;
}

export const AtelierStudioDrawer: React.FC<AtelierStudioDrawerProps> = ({
  isOpen,
  onClose,
  config,
  onChange,
  onReset,
}) => {
  if (!isOpen) return null;

  const setMediaOverride = (slotId: string, url: string) => {
    onChange({
      ...config,
      mediaOverrides: {
        ...config.mediaOverrides,
        [slotId]: url,
      },
    });
  };

  const mediaSlots: { id: string; label: string; hint: string }[] = [
    ...DEFAULT_REELS.map((r) => ({
      id: r.id,
      label: `Campaign Reel · ${r.title}`,
      hint: 'Image (.jpg/.png/.webp) or Video (.mp4/.webm)',
    })),
    ...DEFAULT_BENTO_FRAMES.map((b) => ({
      id: b.id,
      label: `Bento Frame · ${b.title}`,
      hint: 'ImgBB / Postimages / Google Drive direct URL',
    })),
    ...FRAGRANCE_CATALOG.map((f) => ({
      id: f.id,
      label: `Product · ${f.name}`,
      hint: '3:4 Bottle Photo or Video URL',
    })),
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Atelier Media and Design Studio"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg h-full bg-[var(--bg-canvas)] border-l border-[var(--border-hairline)] flex flex-col justify-between p-6 md:p-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border-hairline)]">
          <div>
            <p className="text-xs tracking-[0.18em] uppercase text-[var(--text-muted)]">
              Studio Direction
            </p>
            <h2 className="font-display text-2xl text-[var(--text-primary)]">
              Media, Fonts & Palette
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Studio Drawer"
            className="w-10 h-10 flex items-center justify-center border border-[var(--border-hairline)] text-[var(--text-primary)] hover:bg-[var(--bg-surface)] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 space-y-8 pr-1">
          {/* Palette Selector */}
          <div>
            <h3 className="text-xs tracking-[0.18em] uppercase text-[var(--text-muted)] mb-3">
              Color Palette
            </h3>
            <div className="grid grid-cols-3 gap-2.5">
              {(Object.keys(PALETTE_THEMES) as PaletteId[]).map((pid) => {
                const theme = PALETTE_THEMES[pid];
                const active = config.palette === pid;
                return (
                  <button
                    key={pid}
                    type="button"
                    onClick={() => onChange({ ...config, palette: pid })}
                    className={`p-3 border text-left transition-colors cursor-pointer ${
                      active
                        ? 'border-[var(--text-primary)] bg-[var(--bg-elevated)]'
                        : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:border-[var(--text-muted)]'
                    }`}
                  >
                    <span
                      className="block w-5 h-5 mb-2 border border-white/20"
                      style={{ backgroundColor: theme.swatch }}
                    />
                    <span className="block text-xs font-medium text-[var(--text-primary)]">
                      {theme.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Font Pairing Selector */}
          <div>
            <h3 className="text-xs tracking-[0.18em] uppercase text-[var(--text-muted)] mb-3">
              Typography Pairing
            </h3>
            <div className="space-y-2">
              {(Object.keys(FONT_PAIRINGS) as FontPairingId[]).map((fid) => {
                const pairing = FONT_PAIRINGS[fid];
                const active = config.fontPairing === fid;
                return (
                  <button
                    key={fid}
                    type="button"
                    onClick={() => onChange({ ...config, fontPairing: fid })}
                    className={`w-full px-4 py-3 border text-left transition-colors cursor-pointer ${
                      active
                        ? 'border-[var(--text-primary)] bg-[var(--bg-elevated)]'
                        : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:border-[var(--text-muted)]'
                    }`}
                  >
                    <span
                      className="block text-base text-[var(--text-primary)]"
                      style={{ fontFamily: pairing.display }}
                    >
                      {pairing.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section Layout Order */}
          <div>
            <h3 className="text-xs tracking-[0.18em] uppercase text-[var(--text-muted)] mb-3">
              Section Layout Sequence
            </h3>
            <div className="space-y-2">
              {(Object.keys(LAYOUT_ORDERS) as LayoutOrderId[]).map((lid) => {
                const layout = LAYOUT_ORDERS[lid];
                const active = config.layoutOrder === lid;
                return (
                  <button
                    key={lid}
                    type="button"
                    onClick={() => onChange({ ...config, layoutOrder: lid })}
                    className={`w-full px-4 py-2.5 border text-left text-xs transition-colors cursor-pointer ${
                      active
                        ? 'border-[var(--text-primary)] bg-[var(--bg-elevated)] text-[var(--text-primary)]'
                        : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {layout.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Hosted Image & Video URL Overrides */}
          <div>
            <div className="mb-3">
              <h3 className="text-xs tracking-[0.18em] uppercase text-[var(--text-muted)]">
                Custom Hosted Images & Videos
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                Paste direct image or video links from ImgBB, Postimages, or a public Google Drive link (auto-converted).
              </p>
            </div>
            <div className="space-y-3">
              {mediaSlots.map((slot) => (
                <div key={slot.id} className="space-y-1">
                  <label
                    htmlFor={`media-${slot.id}`}
                    className="block text-xs text-[var(--text-primary)]"
                  >
                    {slot.label}
                  </label>
                  <input
                    id={`media-${slot.id}`}
                    type="url"
                    value={config.mediaOverrides[slot.id] ?? ''}
                    onChange={(e) => setMediaOverride(slot.id, e.target.value)}
                    placeholder={slot.hint}
                    className="w-full px-3 py-2 text-xs bg-[var(--bg-surface)] border border-[var(--border-hairline)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/60 focus:outline-none focus:border-[var(--text-primary)]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[var(--border-hairline)] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs border border-[var(--border-hairline)] text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-medium bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-contrast)] cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
