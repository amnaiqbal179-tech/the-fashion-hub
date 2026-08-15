import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Apni prisma client instance path set karein

// GET: Product wise reviews fetch karne ke liye
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get('productId');

  if (!productId) {
    return NextResponse.json({ error: 'Product ID required hai' }, { status: 400 });
  }

  try {
    const reviews = await prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

// POST: Naya review submit karne ke liye
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, name, rating, comment } = body;

    if (!productId || !name || !rating || !comment) {
      return NextResponse.json({ error: 'Tamam fields required hain' }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: {
        productId,
        name,
        rating: Number(rating),
        comment,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save review' }, { status: 500 });
  }
}