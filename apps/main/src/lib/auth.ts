import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.API_KEY;

/**
 * Verifies that the request includes a valid API key
 */
export function verifyApiKey(request: NextRequest) {
  const apiKey = request.headers.get("x-api-key");

  if (!apiKey || apiKey !== API_KEY) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: "Unauthorized - Invalid API key" },
        { status: 401 },
      ),
    };
  }

  return {
    authorized: true,
    response: null,
  };
}
