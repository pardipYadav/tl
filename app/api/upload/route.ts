import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.imageBase64) {
    return NextResponse.json({ error: 'imageBase64 is required' }, { status: 400 });
  }

  const uploaded = await cloudinary.uploader.upload(body.imageBase64, {
    folder: 'divine-simparna-holidays/packages'
  });

  return NextResponse.json({ url: uploaded.secure_url });
}
