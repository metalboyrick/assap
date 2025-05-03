import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin, Attestation } from "@/lib/supabase";
import { verifyApiKey } from "@/lib/auth";

// GET all attestations with optional filtering
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const schemaUid = searchParams.get("schema");
  const attesteeUid = searchParams.get("attestee");
  const attestorUid = searchParams.get("attestor");

  let query = supabaseAdmin.from("attestations").select("*");

  if (schemaUid) {
    query = query.eq("schema_uid", schemaUid);
  }

  if (attesteeUid) {
    query = query.eq("attestee_uid", attesteeUid);
  }

  if (attestorUid) {
    query = query.eq("attestor_uid", attestorUid);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// GET attestation by ID
export async function HEAD(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get("uid");

  if (!uid) {
    return NextResponse.json(
      { error: "Attestation UID is required" },
      { status: 400 },
    );
  }

  const { data, error } = await supabaseAdmin
    .from("attestations")
    .select("*")
    .eq("attestation_uid", uid)
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error.code === "PGRST116" ? 404 : 500 },
    );
  }

  return NextResponse.json(data);
}

// POST (create new attestation)
export async function POST(request: NextRequest) {
  // Verify API key
  const auth = verifyApiKey(request);
  if (!auth.authorized) {
    return auth.response;
  }

  try {
    const attestation: Attestation = await request.json();

    // Validate required fields
    const requiredFields = [
      "attestation_uid",
      "schema_uid",
      "attestee_uid",
      "attestor_uid",
    ];
    const missingFields = requiredFields.filter(
      (field) => !attestation[field as keyof Attestation],
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 },
      );
    }

    // Validate schema_uid exists
    const { data: schemaExists, error: schemaError } = await supabaseAdmin
      .from("schemas")
      .select("schema_uid")
      .eq("schema_uid", attestation.schema_uid)
      .single();

    if (schemaError || !schemaExists) {
      return NextResponse.json(
        { error: "Referenced schema_uid does not exist" },
        { status: 400 },
      );
    }

    const { data, error } = await supabaseAdmin
      .from("attestations")
      .insert(attestation)
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

// PUT (update attestation)
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
        { error: "Attestation UID is required" },
        { status: 400 },
      );
    }

    const updates = await request.json();

    // Don't allow updating primary key
    delete updates.attestation_uid;

    // If schema_uid is being updated, validate it exists
    if (updates.schema_uid) {
      const { data: schemaExists, error: schemaError } = await supabaseAdmin
        .from("schemas")
        .select("schema_uid")
        .eq("schema_uid", updates.schema_uid)
        .single();

      if (schemaError || !schemaExists) {
        return NextResponse.json(
          { error: "Referenced schema_uid does not exist" },
          { status: 400 },
        );
      }
    }

    const { data, error } = await supabaseAdmin
      .from("attestations")
      .update(updates)
      .eq("attestation_uid", uid)
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

// DELETE attestation
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
      { error: "Attestation UID is required" },
      { status: 400 },
    );
  }

  const { error } = await supabaseAdmin
    .from("attestations")
    .delete()
    .eq("attestation_uid", uid);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return new Response(null, { status: 204 });
}
