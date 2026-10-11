import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerName, phone, address, city, items, orderItems, totalAmount } = body;

    const newOrder = await prisma.order.create({
      data: {
        customerName,
        phone,
        address,
        city: city || 'Unknown',
        totalAmount: Number(totalAmount),
        orderItems: orderItems || items || [], 
      },
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to place order' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
