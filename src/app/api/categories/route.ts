import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Saari categories fetch karne ke liye
export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

// POST: Automatic categories create karne ke liye (Seed helper)
export async function POST() {
  try {
    const defaultCategories = [
      { name: 'Women', slug: 'women' },
      { name: 'Men', slug: 'men' },
      { name: 'Kids', slug: 'kids' },
    ];

    for (const cat of defaultCategories) {
      await prisma.category.upsert({
        where: { slug: cat.slug },
        update: {},
        create: cat,
      });
    }

    const categories = await prisma.category.findMany();
    return NextResponse.json({ message: 'Categories initialized!', categories }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to initialize categories' }, { status: 500 });
  }
}