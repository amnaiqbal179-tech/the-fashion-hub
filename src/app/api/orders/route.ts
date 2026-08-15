import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerName, phone, address, city, orderItems, totalAmount } = body;

    const newOrder = await prisma.order.create({
      data: {
        customerName,
        phone,
        address,
        city,
        totalAmount: Number(totalAmount),
        orderItems: orderItems, // JSON Array
      },
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to place order' }, { status: 500 });
  }
}