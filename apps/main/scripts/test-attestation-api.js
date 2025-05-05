#!/usr/bin/env node
const fetch = require("node-fetch");
require("dotenv").config({ path: "./.env" });

/**
 * Attestation API Test Script
 *
 * This script tests the Attestation API endpoints.
 *
 * Prerequisites:
 * 1. The Next.js app should be running (npm run dev)
 * 2. Create a .env file in the scripts directory with:
 *    - API_BASE_URL=http://localhost:3000/api (or your custom URL)
 *    - API_KEY=your_api_key (same as in your .env.local)
 *
 * Installation:
 * npm install node-fetch@2 dotenv
 *
 * Usage:
 * node test-attestation-api.js [create|read|update|delete] [attestation_uid] [schema_uid]
 *
 * Note: For create operation, you need to provide a valid schema_uid that exists in the database.
 */

// Configuration
const BASE_URL = process.env.API_BASE_URL || "http://localhost:3000/api";
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("Error: API_KEY is not defined in environment variables.");
  console.error(
    "Please create a .env file in the scripts directory with your API key.",
  );
  process.exit(1);
}

// Parse command line arguments
const operation = process.argv[2]?.toLowerCase() || "read";
const attestationUid = process.argv[3] || `test-attestation-${Date.now()}`;
const schemaUid = process.argv[4] || "default-schema-uid";

// Test data
const testAttestation = {
  attestation_uid: attestationUid,
  schema_uid: schemaUid,
  attestee_uid: "test-attestee",
  attestor_uid: "test-attestor",
  attestation_data: { name: "Test Data" },
};

// Helper function for API requests
async function apiRequest(endpoint, method, body = null) {
  const headers = {
    "Content-Type": "application/json",
  };

  // Add API key for write operations
  if (method !== "GET" && method !== "HEAD") {
    headers["x-api-key"] = API_KEY;
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  console.log(`\n${method} ${BASE_URL}${endpoint}`);
  if (body) console.log("Request Body:", JSON.stringify(body, null, 2));

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");

    // Status info
    console.log(`Status: ${response.status} ${response.statusText}`);

    // Parse response
    let data;
    if (isJson) {
      data = await response.json();
      console.log("Response:", JSON.stringify(data, null, 2));
    } else if (response.status !== 204) {
      // No content
      const text = await response.text();
      console.log("Response:", text);
    } else {
      console.log("Response: No Content");
    }

    return { status: response.status, data };
  } catch (error) {
    console.error("Error:", error.message);
    return { status: 500, error: error.message };
  }
}

// Operations
async function createAttestation() {
  console.log("\nCreating test attestation...");
  return await apiRequest("/attestations", "POST", testAttestation);
}

async function readAttestation() {
  console.log("\nGetting attestation by UID...");
  return await apiRequest(`/attestations/${attestationUid}`, "GET");
}

async function listAttestations() {
  console.log("\nGetting all attestations...");

  if (schemaUid !== "default-schema-uid") {
    console.log(`\nFiltering by schema: ${schemaUid}`);
    return await apiRequest(`/attestations?schema=${schemaUid}`, "GET");
  } else {
    return await apiRequest("/attestations", "GET");
  }
}

async function updateAttestation() {
  console.log("\nUpdating attestation...");
  return await apiRequest(`/attestations?uid=${attestationUid}`, "PUT", {
    attestation_data: { name: "Updated Test Data" },
  });
}

async function deleteAttestation() {
  console.log("\nDeleting attestation...");
  return await apiRequest(`/attestations?uid=${attestationUid}`, "DELETE");
}

// Run tests
async function runTest() {
  console.log(
    `===== TESTING ATTESTATION API (${operation.toUpperCase()}) =====`,
  );
  console.log(`Using attestation_uid: ${attestationUid}`);
  console.log(`Using schema_uid: ${schemaUid}`);

  try {
    switch (operation) {
      case "create":
        if (schemaUid === "default-schema-uid") {
          console.error(
            "Error: For create operation, you need to provide a valid schema_uid.",
          );
          console.log(
            "Usage: node test-attestation-api.js create [attestation_uid] [schema_uid]",
          );
          process.exit(1);
        }
        await createAttestation();
        break;
      case "read":
        await readAttestation();
        break;
      case "list":
        await listAttestations();
        break;
      case "update":
        await updateAttestation();
        break;
      case "delete":
        await deleteAttestation();
        break;
      default:
        console.error(`Unknown operation: ${operation}`);
        console.log("Available operations: create, read, list, update, delete");
    }

    console.log("\n===== API TEST COMPLETED =====");
  } catch (error) {
    console.error("Test error:", error);
  }
}

// Run the test
runTest();
