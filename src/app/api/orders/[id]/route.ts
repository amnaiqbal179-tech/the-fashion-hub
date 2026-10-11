import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { status } = await req.json();
    const updatedOrder = await prisma.order.update({
      where: { id: params.id },
      data: { status }
    });
    return NextResponse.json(updatedOrder);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.order.delete({ where: { id: params.id } });
    return NextResponse.json({ message: 'Order deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 });
  }
}
