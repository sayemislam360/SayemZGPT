
import { Product, Category } from './types';

export const INITIAL_CATEGORIES: Category[] = [
  { id: '1', name: 'Electronics', slug: 'electronics' },
  { id: '2', name: 'Clothing', slug: 'clothing' },
  { id: '3', name: 'Home & Kitchen', slug: 'home-kitchen' },
  { id: '4', name: 'Books', slug: 'books' },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Quantum X Headset',
    description: 'High-fidelity audio with active noise cancellation and 40-hour battery life.',
    price: 299.99,
    image: 'https://picsum.photos/seed/audio/400/400',
    category: 'Electronics',
    stock: 15,
    featured: true
  },
  {
    id: 'p2',
    name: 'Minimalist Cotton Tee',
    description: '100% organic cotton, pre-shrunk, and perfectly fitted for everyday wear.',
    price: 35.00,
    image: 'https://picsum.photos/seed/shirt/400/400',
    category: 'Clothing',
    stock: 50,
    featured: true
  },
  {
    id: 'p3',
    name: 'Smart Kitchen Scale',
    description: 'Precision sensors with Bluetooth connectivity to track your nutritional intake.',
    price: 49.99,
    image: 'https://picsum.photos/seed/kitchen/400/400',
    category: 'Home & Kitchen',
    stock: 25
  },
  {
    id: 'p4',
    name: 'Modern Web Design Bible',
    description: 'The definitive guide to building high-performance, accessible web applications.',
    price: 55.00,
    image: 'https://picsum.photos/seed/book/400/400',
    category: 'Books',
    stock: 10
  },
  {
    id: 'p5',
    name: 'UltraWide Curved Monitor',
    description: '34-inch display with 144Hz refresh rate for ultimate productivity and gaming.',
    price: 899.00,
    image: 'https://picsum.photos/seed/monitor/400/400',
    category: 'Electronics',
    stock: 8
  }
];
