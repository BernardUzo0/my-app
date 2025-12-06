import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const pname = searchParams.get('pname');
    const email = searchParams.get('email');
    const priceStr = searchParams.get('price');

    if (!pname || !email) {
      return NextResponse.json(
        { success: false, message: 'Missing pname or email' },
        { status: 400 }
      );
    }

    const price = priceStr ? parseFloat(priceStr) : 0;

    const db = await getDb();
    const col = db.collection('shopping_cart');

    await col.insertOne({
      email,
      pname,
      price,
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error('putInCart error:', err);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
