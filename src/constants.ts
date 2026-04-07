import { Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'c1',
    name: 'Glow Serum',
    description: 'Radiance-boosting serum with Vitamin C.',
    price: 1,
    category: 'cosmetics',
    image: 'https://picsum.photos/seed/serum/400/400',
    stock: 50
  },
  {
    id: 'j1',
    name: 'Diamond Studs',
    description: 'Elegant 18k white gold diamond earrings.',
    price: 1,
    category: 'jewelry',
    image: 'https://picsum.photos/seed/jewelry/400/400',
    stock: 10
  },
  {
    id: 't1',
    name: 'Plush Bear',
    description: 'Softest organic cotton teddy bear.',
    price: 1,
    category: 'toys',
    image: 'https://picsum.photos/seed/toy/400/400',
    stock: 100
  },
  {
    id: 'c2',
    name: 'Matte Lipstick',
    description: 'Long-lasting velvet finish lipstick.',
    price: 1,
    category: 'cosmetics',
    image: 'https://picsum.photos/seed/lipstick/400/400',
    stock: 80
  },
  {
    id: 'j2',
    name: 'Gold Necklace',
    description: 'Minimalist 24k gold chain necklace.',
    price: 1,
    category: 'jewelry',
    image: 'https://picsum.photos/seed/necklace/400/400',
    stock: 15
  },
  {
    id: 't2',
    name: 'Building Blocks',
    description: 'Colorful wooden blocks for creative play.',
    price: 1,
    category: 'toys',
    image: 'https://picsum.photos/seed/blocks/400/400',
    stock: 60
  }
];
