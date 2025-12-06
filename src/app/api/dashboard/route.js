import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await getDb();
    const products = await db.collection('products').find({}).toArray();
    return NextResponse.json({ success: true, products });
  } catch (err) {
    console.error('Dashboard API DB error:', err);
    return NextResponse.json(
      { success: false, message: 'DB error' },
      { status: 500 }
    );
  }
}
