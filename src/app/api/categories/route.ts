import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 1. GET: Fetch all categories
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Fetch categories error:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

// 2. POST: Create a new category
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
    }

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const newCategory = await prisma.category.create({
      data: {
        name: name.trim(),
        slug,
      },
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error: any) {
    console.error('Create category error:', error);
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'Category with this name already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}

// 3. PUT: Update category (By ID or Fallback Slug)
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, slug: currentSlug, name } = body;

    if (!name) {
      return NextResponse.json({ error: 'Category Name is required' }, { status: 400 });
    }

    const newSlug = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    let updatedCategory;

    // Try updating by ID first
    if (id && id !== 'N/A' && id !== 'undefined') {
      updatedCategory = await prisma.category.update({
        where: { id: String(id) },
        data: { name: name.trim(), slug: newSlug },
      });
    } else if (currentSlug) {
      // Fallback: Update by Slug if ID is missing
      updatedCategory = await prisma.category.update({
        where: { slug: String(currentSlug) },
        data: { name: name.trim(), slug: newSlug },
      });
    } else {
      return NextResponse.json({ error: 'Valid ID or Slug required for update' }, { status: 400 });
    }

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error('Update category error:', error);
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
  }
}

// 4. DELETE: Delete category (By ID or Fallback Slug)
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');

    if ((!id || id === 'N/A' || id === 'undefined') && !slug) {
      return NextResponse.json({ error: 'Category ID or Slug is required' }, { status: 400 });
    }

    if (id && id !== 'N/A' && id !== 'undefined') {
      await prisma.category.delete({
        where: { id: String(id) },
      });
    } else if (slug) {
      await prisma.category.delete({
        where: { slug: String(slug) },
      });
    }

    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error: any) {
    console.error('Delete category error:', error);

    if (error?.code === 'P2003') {
      return NextResponse.json(
        { error: 'Cannot delete: Active products are assigned to this category. Delete or reassign those products first.' },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}