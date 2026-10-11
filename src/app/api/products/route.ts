import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 1. GET: Products fetch karne ke liye (Search, Category & Filter Query Support)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const newArrival = searchParams.get('newArrival');
    const limit = searchParams.get('limit');

    // Dynamic Filter Conditions
    const whereCondition: any = {};

    // Category / SubCategory Filter
    if (category) {
      whereCondition.OR = [
        { categoryName: { equals: category, mode: 'insensitive' } },
        { category: { name: { equals: category, mode: 'insensitive' } } },
        { subCategory: { equals: category, mode: 'insensitive' } }
      ];
    }

    // Search Query (Title, Description, SKU, Fabric)
    if (search) {
      whereCondition.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } },
        { fabric: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (featured === 'true') {
      whereCondition.isFeatured = true;
    }

    if (newArrival === 'true') {
      whereCondition.isNewArrival = true;
    }

    const products = await prisma.product.findMany({
      where: whereCondition,
      include: { 
        category: true 
      },
      orderBy: { 
        createdAt: 'desc' 
      },
      ...(limit ? { take: parseInt(limit) } : {})
    });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// 2. POST: Nayi Product Database mein save karne ke liye
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { 
      name, 
      title, 
      sku,
      slug,
      description, 
      price, 
      salePrice,
      category,
      categoryId, 
      subCategory,
      fabric,
      stitchStatus,
      colors,
      careInstructions,
      sizes, 
      images, 
      imageUrl,
      coverImage,
      stock, 
      isFeatured,
      isNewArrival,
      metaTitle,
      metaDescription
    } = body;

    const productName = name || title;

    if (!productName || !price) {
      return NextResponse.json(
        { error: 'Product Name/Title and Price are required' },
        { status: 400 }
      );
    }

    const productSlug = slug || productName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    let finalImages: string[] = [];
    if (Array.isArray(images) && images.length > 0) {
      finalImages = images;
    } else if (imageUrl) {
      finalImages = [imageUrl];
    }

    const mainCover = coverImage || finalImages[0] || '';

    let sizeNames: string[] = [];
    let calculatedTotalStock = stock !== undefined ? parseInt(stock) : 0;

    if (Array.isArray(sizes) && sizes.length > 0) {
      if (typeof sizes[0] === 'object' && sizes[0] !== null) {
        sizeNames = sizes.map((s: any) => s.size);
        calculatedTotalStock = sizes.reduce((sum: number, item: any) => sum + (item.stock || 0), 0);
      } else {
        sizeNames = sizes;
      }
    } else {
      sizeNames = ['S', 'M', 'L', 'XL'];
      calculatedTotalStock = calculatedTotalStock || 10;
    }

    let finalColors: string[] = [];
    if (Array.isArray(colors)) {
      finalColors = colors;
    } else if (typeof colors === 'string' && colors.trim() !== '') {
      finalColors = colors.split(',').map((c) => c.trim());
    }

    // Care Instructions Array ko single string mein format karne ka fix
    let finalCareInstructions = '';
    if (Array.isArray(careInstructions)) {
      finalCareInstructions = careInstructions.join(', ');
    } else if (typeof careInstructions === 'string') {
      finalCareInstructions = careInstructions;
    }

    let finalCategoryId = categoryId;
    if (!finalCategoryId && category) {
      const existingCategory = await prisma.category.findFirst({
        where: {
          name: {
            equals: category,
            mode: 'insensitive'
          }
        }
      });
      if (existingCategory) {
        finalCategoryId = existingCategory.id;
      }
    }

    const productData: any = {
      name: productName,
      description: description || '',
      price: parseFloat(price),
      images: finalImages,
      sizes: sizeNames,
      colors: finalColors,
      stock: calculatedTotalStock,
      isFeatured: isFeatured ?? false,
      isNewArrival: isNewArrival ?? false,
    };

    if (sku) productData.sku = sku;
    if (productSlug) productData.slug = productSlug;
    if (salePrice) productData.salePrice = parseFloat(salePrice);
    if (fabric) productData.fabric = fabric;
    if (stitchStatus) productData.stitchStatus = stitchStatus;
    if (subCategory) productData.subCategory = subCategory;
    if (finalCareInstructions) productData.careInstructions = finalCareInstructions;
    if (mainCover) productData.coverImage = mainCover;
    if (metaTitle) productData.metaTitle = metaTitle;
    if (metaDescription) productData.metaDescription = metaDescription;

    if (finalCategoryId) {
      productData.category = {
        connect: { id: finalCategoryId }
      };
    } else if (category) {
      productData.categoryName = category;
    }

    const newProduct = await prisma.product.create({
      data: productData,
      include: {
        category: true
      }
    });

    return NextResponse.json(
      { message: 'Product published successfully!', newProduct }, 
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error adding product:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal Server Error while creating product' }, 
      { status: 500 }
    );
  }
}

// 3. PUT: Existing Product Edit/Update karne ke liye
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateFields } = body;

    if (!id) {
      return NextResponse.json({ error: 'Product ID is required for update' }, { status: 400 });
    }

    if (updateFields.price) updateFields.price = parseFloat(updateFields.price);
    if (updateFields.salePrice) updateFields.salePrice = parseFloat(updateFields.salePrice);
    if (updateFields.stock) updateFields.stock = parseInt(updateFields.stock);

    if (Array.isArray(updateFields.careInstructions)) {
      updateFields.careInstructions = updateFields.careInstructions.join(', ');
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: updateFields,
    });

    return NextResponse.json(
      { message: 'Product updated successfully!', updatedProduct },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to update product' },
      { status: 500 }
    );
  }
}

// 4. DELETE: Product Delete karne ke liye
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Product ID parameter is required' }, { status: 400 });
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Product deleted successfully!' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to delete product' },
      { status: 500 }
    );
  }
}