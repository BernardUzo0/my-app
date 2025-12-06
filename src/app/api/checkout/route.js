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

    const db = await getDb();
    const cartCol   = db.collection('shopping_cart');
    const ordersCol = db.collection('orders');

    const items = await cartCol.find({ email }).toArray();

    if (items.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Cart is empty' },
        { status: 400 }
      );
    }

    const total = items.reduce((sum, i) => sum + (i.price || 0), 0);

    const now = new Date();

    const order = {
      email,
      createdAt: now,
      time: now,
      items: items.map(i => ({ pname: i.pname, price: i.price })),
      total
    };

    await ordersCol.insertOne(order);
    await cartCol.deleteMany({ email });

    // send email here

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error('Checkout error:', err);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
