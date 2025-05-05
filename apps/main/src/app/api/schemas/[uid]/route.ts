import { supabaseAdmin } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

// GET schema by ID
export async function GET(request: NextRequest) {
  const uid = request.nextUrl.pathname.split("/").pop();

  if (!uid) {
    return NextResponse.json(
      { error: "Schema UID is required" },
      { status: 400 },
    );
  }

  const { data, error } = await supabaseAdmin
    .from("schemas")
    .select("*")
    .eq("schema_uid", uid)
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error.code === "PGRST116" ? 404 : 500 },
    );
  }

  return NextResponse.json(data);
}
