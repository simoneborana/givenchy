export type FragranceFamily =
  | 'all'
  | 'linterdit'
  | 'gentleman'
  | 'irresistible'
  | 'particuliere';

export type PaletteId = 'jaipur-nocturne' | 'udaipur-marble' | 'mysore-sandal';
export type FontPairingId = 'cormorant-dm' | 'cinzel-jakarta' | 'bodoni-manrope';
export type LayoutOrderId = 'cinema-bento-collection' | 'cinema-collection-bento' | 'collection-first';

export interface CampaignReel {
  id: string;
  title: string;
  headline: string;
  eyebrow: string;
  mediaUrl: string;
  accentTint: string;
}

export interface BentoFrame {
  id: string;
  title: string;
  noteLine: string;
  mediaUrl: string;
  aspectClass: string;
  spanClass: string;
}

export interface FragranceItem {
  id: string;
  name: string;
  family: Exclude<FragranceFamily, 'all'>;
  concentration: string;
  signatureNotes: string;
  pyramid: {
    top: string;
    heart: string;
    base: string;
  };
  volumes: {
    label: string;
    price: number;
  }[];
  mediaUrl: string;
  editionNote?: string;
}

export interface BotanicalNote {
  id: string;
  name: string;
  origin: string;
  mediaUrl: string;
  featuredFragranceId: string;
}

export interface AtelierConfig {
  palette: PaletteId;
  fontPairing: FontPairingId;
  layoutOrder: LayoutOrderId;
  mediaOverrides: Record<string, string>;
}
