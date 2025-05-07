import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin, Schema } from "@/lib/supabase";
import { verifyApiKey } from "@/lib/auth";

// POST (create new schema)
// TODO: implement webhook logic here
export async function POST(request: NextRequest) {
  // Verify API key
  const auth = verifyApiKey(request);
  if (!auth.authorized) {
    return auth.response;
  }

  try {
    const schema: Schema = await request.json();

    console.log(schema);

    // Validate required fields
    const requiredFields = [
      "schema_uid",
      "creation_transaction_id",
      "creator_uid",
      "schema_name",
      "schema_data",
    ];
    const missingFields = requiredFields.filter(
      (field) => !schema[field as keyof Schema],
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 },
      );
    }

    const { data, error } = await supabaseAdmin
      .from("schemas")
      .insert(schema)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request data" },
      { status: 400 },
    );
  }
}
