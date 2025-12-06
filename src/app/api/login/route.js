import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import bcrypt from 'bcrypt';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const pass  = searchParams.get('pass');

    console.log("Login request:", email);

    const db = await getDb();
    const usersCol = db.collection('users');

    const userArr = await usersCol.find({ username: email }).toArray();
    if (userArr.length === 0) {
      console.log("User not found");
      return NextResponse.json({ success: false });
    }

    const user = userArr[0];

    const passwordMatches = bcrypt.compareSync(pass, user.pass);
    if (!passwordMatches) {
      console.log("Password incorrect");
      return NextResponse.json({ success: false });
    }

    return NextResponse.json({
      success: true,
      username: user.username,
      account_type: user.account_type
    });

  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ success: false });
  }
}
