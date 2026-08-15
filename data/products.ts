export interface Product {
  id: number;
  title: string;
  category: 'Women' | 'Men' | 'Kids';
  price: string;
  numericPrice: number;
  image: string;
  description: string;
  sizes: string[];
  inStock: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: '3-Piece Embroidered Lawn Suit',
    category: 'Women',
    price: 'Rs. 4,500',
    numericPrice: 4500,
    image: '/images/new-arrivals/arrival1.jpg',
    description: 'Premium quality 3-piece embroidered lawn suit with chiffon dupatta. Highly comfortable and elegant for summer gatherings.',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
  },
  {
    id: 2,
    title: 'Designer Men Kurta Shalwar',
    category: 'Men',
    price: 'Rs. 3,800',
    numericPrice: 3800,
    image: '/images/new-arrivals/arrival2.jpg',
    description: 'Traditional designer kurta shalwar set crafted from premium cotton blend. Perfect for formal events and festive occasions.',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
  },
  {
    id: 3,
    title: 'Luxury Embroidered Royal Blue Suit',
    category: 'Women',
    price: 'Rs. 5,400',
    numericPrice: 5400,
    image: '/images/new-arrivals/arrival3.jpg',
    description: 'Exclusive 3-piece luxury embroidered dress in rich royal blue. Features intricate organza border detailing and matching printed dupatta.',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
  },
  {
    id: 4,
    title: 'Kids Festive Party Wear Outfit',
    category: 'Kids',
    price: 'Rs. 2,900',
    numericPrice: 2900,
    image: '/images/new-arrivals/arrival4.jpg',
    description: 'Vibrant and comfortable festive wear for kids. Soft on skin with breathable fabric for all-day comfort.',
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
    inStock: true,
  },
  {
    id: 5,
    title: 'Classic Formal Cotton Suit',
    category: 'Men',
    price: 'Rs. 5,200',
    numericPrice: 5200,
    image: '/images/new-arrivals/arrival5.jpg',
    description: 'Sharply tailored formal suit made from high-grade cotton fabric, offering modern fit and timeless sophistication.',
    sizes: ['M', 'L', 'XL'],
    inStock: true,
  },
  {
    id: 6,
    title: 'Kids Everyday Casual Set',
    category: 'Kids',
    price: 'Rs. 2,400',
    numericPrice: 2400,
    image: '/images/new-arrivals/arrival6.jpg',
    description: 'Soft cotton everyday casual suit for kids. Easy to wash, highly durable, and active wear friendly.',
    sizes: ['2-3Y', '4-5Y', '6-7Y'],
    inStock: true,
  },
];