import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin, Schema } from "@/lib/supabase";
import { verifyApiKey } from "@/lib/auth";

// GET all schemas
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const creator = searchParams.get("creator");
  const name = searchParams.get("name");

  let query = supabaseAdmin.from("schemas").select("*");

  if (creator) {
    query = query.eq("creator_uid", creator);
  }

  if (name) {
    query = query.eq("schema_name", name);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST (create new schema)
export async function POST(request: NextRequest) {
  // Verify API key
  const auth = verifyApiKey(request);
  if (!auth.authorized) {
    return auth.response;
  }

  try {
    const schema: Schema = await request.json();

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

// PUT (update schema)
export async function PUT(request: NextRequest) {
  // Verify API key
  const auth = verifyApiKey(request);
  if (!auth.authorized) {
    return auth.response;
  }

  try {
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get("uid");

    if (!uid) {
      return NextResponse.json(
        { error: "Schema UID is required" },
        { status: 400 },
      );
    }

    const updates = await request.json();

    // Don't allow updating primary key
    delete updates.schema_uid;

    const { data, error } = await supabaseAdmin
      .from("schemas")
      .update(updates)
      .eq("schema_uid", uid)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request data" },
      { status: 400 },
    );
  }
}

// DELETE schema
export async function DELETE(request: NextRequest) {
  // Verify API key
  const auth = verifyApiKey(request);
  if (!auth.authorized) {
    return auth.response;
  }

  const { searchParams } = new URL(request.url);
  const uid = searchParams.get("uid");

  if (!uid) {
    return NextResponse.json(
      { error: "Schema UID is required" },
      { status: 400 },
    );
  }

  const { error } = await supabaseAdmin
    .from("schemas")
    .delete()
    .eq("schema_uid", uid);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return new Response(null, { status: 204 });
}
