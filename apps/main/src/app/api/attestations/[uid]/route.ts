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
