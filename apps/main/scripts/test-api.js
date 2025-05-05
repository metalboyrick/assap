#!/usr/bin/env node
const fetch = require("node-fetch");
require("dotenv").config({ path: "./.env" });

/**
 * ASSAP API Test Script
 *
 * This script tests all the ASSAP API endpoints.
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
 * node test-api.js
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

// Test data
const testSchema = {
  schema_uid: `test-schema-${Date.now()}`,
  creation_transaction_id: "tx-test-123",
  creator_uid: "test-creator",
  schema_name: "Test Schema",
  schema_data:
    '{ "type": "object", "properties": { "name": { "type": "string" } } }',
  creation_cost: 0.001,
  human_message_template: "Test template",
  verification_requirements: { required: ["name"] },
};

const testAttestation = {
  attestation_uid: `test-attestation-${Date.now()}`,
  schema_uid: testSchema.schema_uid,
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
  if (method !== "GET" && method !== "GET") {
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

// Run tests
async function runTests() {
  console.log("===== TESTING ASSAP API =====");

  try {
    // 1. Create Schema
    console.log("\n----- SCHEMA TESTS -----");
    console.log("\nCreating test schema...");
    await apiRequest("/schemas", "POST", testSchema);

    // 2. Get All Schemas
    console.log("\nGetting all schemas...");
    await apiRequest("/schemas", "GET");

    // 3. Get Schema by Creator
    console.log("\nGetting schemas by creator...");
    await apiRequest(`/schemas?creator=${testSchema.creator_uid}`, "GET");

    // 4. Get Schema by UID
    console.log("\nGetting schema by UID...");
    await apiRequest(`/schemas/${testSchema.schema_uid}`, "GET");

    // 5. Update Schema
    console.log("\nUpdating schema...");
    await apiRequest(`/schemas?uid=${testSchema.schema_uid}`, "PUT", {
      schema_name: "Updated Test Schema",
      human_message_template: "Updated template",
    });

    // 6. Create Attestation
    console.log("\n----- ATTESTATION TESTS -----");
    console.log("\nCreating test attestation...");
    await apiRequest("/attestations", "POST", testAttestation);

    // 7. Get All Attestations
    console.log("\nGetting all attestations...");
    await apiRequest("/attestations", "GET");

    // 8. Get Attestation by Schema
    console.log("\nGetting attestations by schema...");
    await apiRequest(`/attestations?schema=${testSchema.schema_uid}`, "GET");

    // 9. Get Attestation by UID
    console.log("\nGetting attestation by UID...");
    await apiRequest(`/attestations/${testAttestation.attestation_uid}`, "GET");

    // 10. Update Attestation
    console.log("\nUpdating attestation...");
    await apiRequest(
      `/attestations?uid=${testAttestation.attestation_uid}`,
      "PUT",
      {
        attestation_data: { name: "Updated Test Data" },
      },
    );

    // 11. Delete Attestation
    console.log("\nDeleting attestation...");
    await apiRequest(
      `/attestations?uid=${testAttestation.attestation_uid}`,
      "DELETE",
    );

    // 12. Delete Schema
    console.log("\nDeleting schema...");
    await apiRequest(`/schemas?uid=${testSchema.schema_uid}`, "DELETE");

    console.log("\n===== API TESTS COMPLETED =====");
  } catch (error) {
    console.error("Test suite error:", error);
  }
}

// Run the tests
runTests();
