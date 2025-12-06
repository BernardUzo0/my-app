import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Missing id' },
        { status: 400 }
      );
    }

    const db  = await getDb();
    const col = db.collection('shopping_cart');

    await col.deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error('removeFromCart error:', err);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
