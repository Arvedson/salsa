import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
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
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new NextResponse('Error occurred', {
      status: 400,
    });
  }

  // Extract name and email
  const { first_name, last_name, email_addresses } = evt.data;
  const email = email_addresses && email_addresses.length > 0 ? email_addresses[0].email_address : null;

  if (!email) {
    return new NextResponse('Error occurred -- no email found', {
      status: 400,
    });
  }

  try {
    // Connect to MongoDB
    await connectMongo();

    // Call `createUser` with the necessary data
    const user = { name: `${first_name} ${last_name}`, email };
    await createUser(user);
    console.log(`User created successfully: ${first_name} ${last_name} (${email})`);
  } catch (error) {
    console.error('Error saving user:', error);
    return new NextResponse('Error occurred while saving user', {
      status: 500,
    });
  }

  return new NextResponse('', { status: 200 });
}
