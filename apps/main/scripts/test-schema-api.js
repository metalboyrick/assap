#!/usr/bin/env node
const fetch = require("node-fetch");
require("dotenv").config({ path: "./.env" });

/**
 * Schema API Test Script
 *
 * This script tests the Schema API endpoints.
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
 * node test-schema-api.js [create|read|update|delete] [schema_uid]
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
const schemaUid = process.argv[3] || `test-schema-${Date.now()}`;

// Test data
const testSchema = {
  schema_uid: schemaUid,
  creation_transaction_id: "tx-test-123",
  creator_uid: "test-creator",
  schema_name: "Test Schema",
  schema_data:
    '{ "type": "object", "properties": { "name": { "type": "string" } } }',
  creation_cost: 0.001,
  human_message_template: "Test template",
  verification_requirements: { required: ["name"] },
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
async function createSchema() {
  console.log("\nCreating test schema...");
  return await apiRequest("/schemas", "POST", testSchema);
}

async function readSchema() {
  console.log("\nGetting schema by UID...");
  return await apiRequest(`/schemas?uid=${schemaUid}`, "HEAD");
}

async function listSchemas() {
  console.log("\nGetting all schemas...");
  return await apiRequest("/schemas", "GET");
}

async function updateSchema() {
  console.log("\nUpdating schema...");
  return await apiRequest(`/schemas?uid=${schemaUid}`, "PUT", {
    schema_name: "Updated Test Schema",
    human_message_template: "Updated template",
  });
}

async function deleteSchema() {
  console.log("\nDeleting schema...");
  return await apiRequest(`/schemas?uid=${schemaUid}`, "DELETE");
}

// Run tests
async function runTest() {
  console.log(`===== TESTING SCHEMA API (${operation.toUpperCase()}) =====`);

  try {
    switch (operation) {
      case "create":
        await createSchema();
        break;
      case "read":
        await readSchema();
        break;
      case "list":
        await listSchemas();
        break;
      case "update":
        await updateSchema();
        break;
      case "delete":
        await deleteSchema();
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
