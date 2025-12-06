import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import bcrypt from 'bcrypt';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const pass  = searchParams.get('pass');

    if (!email || !pass) {
      return NextResponse.json(
        { success: false, message: 'Missing email or pass' },
        { status: 400 }
      );
    }

    const db = await getDb();
    const usersCol = db.collection('users');

    const existing = await usersCol.findOne({ username: email });
    if (existing) {
      return NextResponse.json({
        success: false,
        message: 'User already exists'
      });
    }

    const hash = bcrypt.hashSync(pass, 10);

    await usersCol.insertOne({
      username: email,
      pass: hash,
      account_type: 'customer'
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json({ success: false, message: 'Server error' });
  }
}
