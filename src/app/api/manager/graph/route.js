import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await getDb();
    const orders = await db.collection('orders').find({}).toArray();

    const dayTotals = {};

    orders.forEach((order) => {
      const dateSource = order.createdAt || order.time;
      if (!dateSource) return;

      const day = new Date(dateSource).toLocaleDateString();
      if (!dayTotals[day]) dayTotals[day] = 0;
      dayTotals[day] += order.total || 0;
    });

    const labels = Object.keys(dayTotals);
    const values = Object.values(dayTotals);

    return NextResponse.json({
      success: true,
      labels,
      values,
    });

  } catch (err) {
    console.error('Manager Graph API error:', err);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
