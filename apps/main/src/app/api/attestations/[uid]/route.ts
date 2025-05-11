import { supabaseAdmin } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

// GET attestation by ID
export async function GET(request: NextRequest) {
  const uid = request.nextUrl.pathname.split("/").pop();

  if (!uid) {
    return NextResponse.json(
      { error: "Attestation UID is required" },
      { status: 400 },
    );
  }

  // Fetch the main attestation
  const { data: attestation, error } = await supabaseAdmin
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

  // Fetch recent attestations using the same schema, excluding the current one
  const { data: relatedAttestations, error: relatedError } = await supabaseAdmin
    .from("attestations")
    .select("attestation_uid, schema_uid, attestee_uid, attestor_uid, creation_date")
    .eq("attestation_uid", attestation.attestation_uid)
    .order("creation_date", { ascending: false })
    .limit(25);

  if (relatedError) {
    return NextResponse.json(
      { error: relatedError.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ...attestation,
    related_attestations: relatedAttestations,
  });
}
