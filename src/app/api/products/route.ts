import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 1. GET: Saari products ko fetch karne ke liye
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// 2. POST: Nayi product database mein add karne ke liye
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, price, images, sizes, stock, categoryId, isFeatured } = body;

    // Validation: Check karein zaroori fields mojood hain ya nahi
    if (!name || !price || !categoryId) {
      return NextResponse.json({ error: 'Name, price, and category are required' }, { status: 400 });
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        images: images || [], // e.g., ["/images/shop/women/women1.jpg"]
        sizes: sizes || ['S', 'M', 'L', 'XL'],
        stock: parseInt(stock) || 10,
        isFeatured: isFeatured || false,
        categoryId,
      },
    });

    return NextResponse.json({ message: 'Product added successfully!', newProduct }, { status: 201 });
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}