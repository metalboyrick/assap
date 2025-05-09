import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin, Schema } from "@/lib/supabase";
import { verifyApiKey } from "@/lib/auth";
import { type HeliusWebhookResponse } from "@/lib/helius-webhook";

// POST (create new schema)
// TODO: implement webhook logic here
export async function POST(request: NextRequest) {
  // Verify API key
  const auth = verifyApiKey(request);
  if (!auth.authorized) {
    return auth.response;
  }

  try {
    const webhookResponse: HeliusWebhookResponse = await request.json();

    console.dir(webhookResponse, { depth: null });

    return NextResponse.json(webhookResponse, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request data" },
      { status: 400 },
    );
  }
}
