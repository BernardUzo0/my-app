import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET() {
  try {
    const db      = await getDb();
    const ordersC = db.collection('orders');

    const orders = await ordersC
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const totalOrders  = orders.length;
    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

    return NextResponse.json({
      success: true,
      totalOrders,
      totalRevenue,
      orders
    });

  } catch (err) {
    console.error('Manager API error:', err);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
