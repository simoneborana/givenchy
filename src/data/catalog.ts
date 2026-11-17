import {
  AtelierConfig,
  BentoFrame,
  BotanicalNote,
  CampaignReel,
  FontPairingId,
  FragranceItem,
  LayoutOrderId,
  PaletteId,
} from '../types/givenchy';

export const DEFAULT_REELS: CampaignReel[] = [
  {
    id: 'reel-linterdit',
    title: "L'Interdit Jaipur",
    eyebrow: 'Haute Parfumerie · Jaipur & Paris',
    headline: 'Sacred Flame & Silk.',
    mediaUrl: '/src/assets/images/hero_india_rouge_1794905778586.jpg',
    accentTint: '#a81e24',
  },
  {
    id: 'reel-gentleman',
    title: 'Gentleman Mysore',
    eyebrow: 'Chandan & Smoked Oud',
    headline: 'Carved in Shadow.',
    mediaUrl: '/src/assets/images/hero_india_mysore_1794905780165.jpg',
    accentTint: '#c9a14a',
  },
  {
    id: 'reel-irresistible',
    title: 'Irresistible Udaipur',
    eyebrow: 'Pink Lotus · Damask Rose',
    headline: 'Dawn on Marble.',
    mediaUrl: '/src/assets/images/hero_india_udaipur_1794905779819.jpg',
    accentTint: '#c88c74',
  },
];

export const DEFAULT_BENTO_FRAMES: BentoFrame[] = [
  {
    id: 'bento-rouge',
    title: "L'Interdit Rouge Jaipur",
    noteLine: 'Rajnigandha · Kashmir Saffron · Patchouli',
    mediaUrl: '/src/assets/images/hero_india_rouge_1794905778586.jpg',
    aspectClass: 'aspect-[16/10] lg:aspect-auto lg:h-full',
    spanClass: 'lg:col-span-2 lg:row-span-2',
  },
  {
    id: 'bento-society',
    title: 'Gentleman Reserve Mysore',
    noteLine: 'Mysore Sandalwood · Cardamom · Khus',
    mediaUrl: '/src/assets/images/hero_india_mysore_1794905780165.jpg',
    aspectClass: 'aspect-[4/3]',
    spanClass: 'lg:col-span-1 lg:row-span-1',
  },
  {
    id: 'bento-irresistible',
    title: 'Irresistible Noor Lotus',
    noteLine: 'Udaipur Lotus · Kannauj Rose · Amber',
    mediaUrl: '/src/assets/images/hero_india_udaipur_1794905779819.jpg',
    aspectClass: 'aspect-[4/3]',
    spanClass: 'lg:col-span-1 lg:row-span-1',
  },
];

export const FRAGRANCE_CATALOG: FragranceItem[] = [
  {
    id: 'linterdit-rouge-ultime',
    name: "L'Interdit Rouge Jaipur",
    family: 'linterdit',
    concentration: 'Eau de Parfum',
    signatureNotes: 'Rajnigandha · Kesar · Patchouli',
    pyramid: {
      top: 'Kashmir Saffron, Blood Orange',
      heart: 'Indian Rajnigandha, Jasmine Sambac',
      base: 'Mysore Sandalwood, Smoked Patchouli',
    },
    volumes: [
      { label: '50 ml', price: 12400 },
      { label: '80 ml', price: 15200 },
    ],
    mediaUrl: '/src/assets/images/hero_india_rouge_1794905778586.jpg',
    editionNote: 'Royal Edition',
  },
  {
    id: 'linterdit-edp',
    name: "L'Interdit Eau de Parfum",
    family: 'linterdit',
    concentration: 'Eau de Parfum',
    signatureNotes: 'White Tuberose · Khus Vetiver',
    pyramid: {
      top: 'Malabar Bergamot, Green Pear',
      heart: 'Kannauj Tuberose, Chambeli Jasmine',
      base: 'North Indian Khus, Ambrox',
    },
    volumes: [
      { label: '50 ml', price: 11200 },
      { label: '80 ml', price: 13900 },
    ],
    mediaUrl: '/src/assets/images/product_linterdit_edp_1794905494437.jpg',
  },
  {
    id: 'gentleman-society',
    name: 'Gentleman Mysore Réserve',
    family: 'gentleman',
    concentration: 'Eau de Parfum Extrême',
    signatureNotes: 'Chandan · Elaichi · Vetiver',
    pyramid: {
      top: 'Green Cardamom, Clary Sage',
      heart: 'Roasted Arabica, Florentine Iris',
      base: 'Aged Mysore Sandalwood, Himalayan Cedar',
    },
    volumes: [
      { label: '60 ml', price: 11800 },
      { label: '100 ml', price: 14600 },
    ],
    mediaUrl: '/src/assets/images/hero_india_mysore_1794905780165.jpg',
  },
  {
    id: 'irresistible-edp',
    name: 'Irresistible Udaipur Noor',
    family: 'irresistible',
    concentration: 'Eau de Parfum',
    signatureNotes: 'Pink Lotus · Gulab · Amber',
    pyramid: {
      top: 'White Pear, Ambrette Seed',
      heart: 'Kannauj Gulab Rose, Sacred Lotus',
      base: 'Golden Sandalwood, Velvet Musk',
    },
    volumes: [
      { label: '50 ml', price: 10900 },
      { label: '80 ml', price: 13500 },
    ],
    mediaUrl: '/src/assets/images/hero_india_udaipur_1794905779819.jpg',
  },
  {
    id: 'trouble-fete',
    name: 'Accord Particulier Oud',
    family: 'particuliere',
    concentration: 'Eau de Parfum Intense',
    signatureNotes: 'Assam Oud · Saffron · Vetiver',
    pyramid: {
      top: 'Tellicherry Black Pepper, Red Saffron',
      heart: 'Damask Rose, Smoked Iris',
      base: 'Assam Agarwood, Dark Vetiver',
    },
    volumes: [{ label: '100 ml', price: 24500 }],
    mediaUrl: '/src/assets/images/product_particuliere_noir_1794905495561.jpg',
    editionNote: 'La Collection Particulière',
  },
  {
    id: 'atelier-ambre',
    name: 'Kannauj Deg Extrait',
    family: 'particuliere',
    concentration: 'Extrait de Parfum',
    signatureNotes: 'Attar Amber · Rajnigandha · Chandan',
    pyramid: {
      top: 'Pampore Saffron, Bitter Mandarin',
      heart: 'Night-Blooming Rajnigandha, Myrrh',
      base: 'Aged Sandalwood, Fossilized Amber',
    },
    volumes: [{ label: '100 ml', price: 28900 }],
    mediaUrl: '/src/assets/images/atelier_india_kannauj_1794905781166.jpg',
    editionNote: 'Atelier Archive',
  },
];

export const BOTANICAL_NOTES: BotanicalNote[] = [
  {
    id: 'tuberose',
    name: 'Rajnigandha Tuberose',
    origin: 'Harvested at dusk · Kannauj & Tamil Nadu',
    mediaUrl: '/src/assets/images/atelier_india_kannauj_1794905781166.jpg',
    featuredFragranceId: 'linterdit-edp',
  },
  {
    id: 'sandalwood',
    name: 'Mysore Chandan',
    origin: 'Heartwood distillation · Karnataka',
    mediaUrl: '/src/assets/images/hero_india_mysore_1794905780165.jpg',
    featuredFragranceId: 'gentleman-society',
  },
  {
    id: 'rose',
    name: 'Kannauj Gulab & Lotus',
    origin: 'Dawn copper-deg · Uttar Pradesh & Udaipur',
    mediaUrl: '/src/assets/images/hero_india_udaipur_1794905779819.jpg',
    featuredFragranceId: 'irresistible-edp',
  },
];

export const PALETTE_THEMES: Record<
  PaletteId,
  {
    label: string;
    swatch: string;
    vars: Record<string, string>;
  }
> = {
  'jaipur-nocturne': {
    label: 'Jaipur Nocturne',
    swatch: '#0e0a09',
    vars: {
      '--bg-canvas': '#0e0a09',
      '--bg-surface': '#17110f',
      '--bg-elevated': '#211815',
      '--text-primary': '#f5ede0',
      '--text-muted': '#b5a694',
      '--border-hairline': 'rgba(201, 161, 74, 0.24)',
      '--accent': '#a81e24',
      '--accent-hover': '#c4242b',
      '--accent-contrast': '#faf6f0',
      '--accent-gold': '#c9a14a',
    },
  },
  'udaipur-marble': {
    label: 'Udaipur Marble',
    swatch: '#f3ece1',
    vars: {
      '--bg-canvas': '#f3ece1',
      '--bg-surface': '#eae0d0',
      '--bg-elevated': '#fbf7f1',
      '--text-primary': '#1c1411',
      '--text-muted': '#635449',
      '--border-hairline': 'rgba(138, 102, 42, 0.24)',
      '--accent': '#8f1b22',
      '--accent-hover': '#ad222b',
      '--accent-contrast': '#faf6f0',
      '--accent-gold': '#9a732a',
    },
  },
  'mysore-sandal': {
    label: 'Mysore Sandal',
    swatch: '#1a110d',
    vars: {
      '--bg-canvas': '#160e0b',
      '--bg-surface': '#211611',
      '--bg-elevated': '#2c1e17',
      '--text-primary': '#f7efe3',
      '--text-muted': '#bfa992',
      '--border-hairline': 'rgba(212, 168, 83, 0.26)',
      '--accent': '#b88935',
      '--accent-hover': '#cf9c40',
      '--accent-contrast': '#160e0b',
      '--accent-gold': '#d4a853',
    },
  },
};

export const FONT_PAIRINGS: Record<
  FontPairingId,
  {
    label: string;
    display: string;
    body: string;
  }
> = {
  'cormorant-dm': {
    label: 'Cormorant Garamond · DM Sans',
    display: '"Cormorant Garamond", Georgia, serif',
    body: '"DM Sans", system-ui, sans-serif',
  },
  'cinzel-jakarta': {
    label: 'Cinzel Royal · Plus Jakarta',
    display: '"Cinzel", Georgia, serif',
    body: '"Plus Jakarta Sans", system-ui, sans-serif',
  },
  'bodoni-manrope': {
    label: 'Bodoni Moda · Manrope',
    display: '"Bodoni Moda", Georgia, serif',
    body: '"Manrope", system-ui, sans-serif',
  },
};

export const LAYOUT_ORDERS: Record<
  LayoutOrderId,
  {
    label: string;
    order: ('bento' | 'collection' | 'savoir')[];
  }
> = {
  'cinema-bento-collection': {
    label: 'Cinema · Bento · Collection · Heritage',
    order: ['bento', 'collection', 'savoir'],
  },
  'cinema-collection-bento': {
    label: 'Cinema · Collection · Bento · Heritage',
    order: ['collection', 'bento', 'savoir'],
  },
  'collection-first': {
    label: 'Collection · Heritage · Bento',
    order: ['collection', 'savoir', 'bento'],
  },
};

export const DEFAULT_ATELIER_CONFIG: AtelierConfig = {
  palette: 'jaipur-nocturne',
  fontPairing: 'cormorant-dm',
  layoutOrder: 'cinema-bento-collection',
  mediaOverrides: {},
};
