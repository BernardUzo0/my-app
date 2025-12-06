// src/app/api/weather/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Dublin API
    const url =
      'https://api.open-meteo.com/v1/forecast?latitude=53.3498&longitude=-6.2603&current_weather=true';

    const res = await fetch(url);
    const data = await res.json();

    const temp = data?.current_weather?.temperature;

    return NextResponse.json({
      success: true,
      temperature: temp
    });
  } catch (err) {
    console.error('Weather API error:', err);
    return NextResponse.json(
      { success: false, message: 'Weather error' },
      { status: 500 }
    );
  }
}
