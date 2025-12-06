import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Missing email' },
        { status: 400 }
      );
    }

    const db  = await getDb();
    const col = db.collection('shopping_cart');

    const items = await col.find({ email }).toArray();
    const total = items.reduce((sum, item) => sum + (item.price || 0), 0);

    return NextResponse.json({ success: true, items, total });

  } catch (err) {
    console.error('view_cart error:', err);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
