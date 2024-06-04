
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { createUser } from "@/lib/services/user.service";

const connectMongo = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI!);
  }
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse('Error occurred -- no svix headers', {
      status: 400,
    });
  }

  const payload = await req.json();
  const { data } = payload;
  const { first_name, last_name, email } = data;

  try {
    await connectMongo();

    const user = { name: `${first_name} ${last_name}`, email };
    await createUser(user);
    console.log(`User created successfully`);
  } catch (error) {
    console.error('Error saving user:', error);
    return new NextResponse('Error occurred while saving user', {
      status: 500,
    });
  }

  return new NextResponse('', { status: 200 });
}
