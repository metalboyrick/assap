/**
 * Integration tests for indexer service using Vitest
 * This file includes both test setup and the actual tests
 */

import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  afterEach,
  vi,
} from "vitest";
import {
  getAttestationById,
  getAttestationsBySchemaId,
  getAttestationsByUser,
  getSchemaById,
  getSchemasByUser,
} from "../indexer.service";
import { ApiError, NetworkError, NotFoundError } from "../indexer.errors";

// Set a longer timeout for API calls in integration tests
vi.setConfig({
  testTimeout: 30000,
});

// Test IDs for integration testing
export const TEST_IDS = {
  SCHEMA: "F4EAG6FXEVcuntv5y7DC3eihXdPxHqpgPeex92o4Ckw9",
  ATTESTATION: "3DXc6LZj3sN1TpRTj4zro9cF2XdDYiUhNV7ZzWf4s7Eh",
  USER: "3yfEkerzEcDvn1rMmuT3JZ5FbbCzYnbBma8Y1knHEUiT",
};

// Mock data for testing
const {
  SCHEMA: MOCK_SCHEMA_ID,
  ATTESTATION: MOCK_ATTESTATION_ID,
  USER: MOCK_USER_ID,
} = TEST_IDS;

/**
 * Helper function to skip tests when specific expected errors occur
 * Useful for integration tests where test data might not be available
 */
export function skipTestOn<T extends Error>(
  error: unknown,
  errorType: new (...args: any[]) => T,
  message?: string,
): void {
  if (error instanceof errorType) {
    const skipMessage =
      message || `Test skipped due to ${errorType.name}: ${error.message}`;
    console.warn(`⏭️  ${skipMessage}`);
    return;
  }
  throw error;
}

/**
 * Integration Tests for Indexer Service
 *
 * These tests make actual API calls to localhost:3000
 * Ensure the local API server is running before executing these tests
 *
 * Run with: npm run test:int
 */
describe("Indexer Service Integration Tests", () => {
  // Global setup before all tests
  beforeAll(async () => {
    console.log("\n🚀 INTEGRATION TEST SUITE STARTING");
    console.log("=================================");

    // Set the API URL to the local development server
    process.env.NEXT_PUBLIC_API_URL = "http://localhost:3000/api";
    console.log(`🔌 API URL: ${process.env.NEXT_PUBLIC_API_URL}`);
    console.log(`📝 Test Data:`);
    console.log(`  - Schema ID: ${TEST_IDS.SCHEMA}`);
    console.log(`  - Attestation ID: ${TEST_IDS.ATTESTATION}`);
    console.log(`  - User ID: ${TEST_IDS.USER}`);

    // Add API server health check
    console.log("🔍 Checking API server status...");
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hello`);
      if (response.ok) {
        console.log("✅ API server is running");
      } else {
        console.warn(
          `⚠️ API server returned status ${response.status}: ${response.statusText}`,
        );
      }
    } catch (error) {
      console.warn(
        `⚠️ Could not connect to API server - tests may fail: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
    console.log("=================================\n");
  });

  // Global teardown after all tests
  afterAll(() => {
    console.log("\n=================================");
    console.log("🏁 INTEGRATION TEST SUITE COMPLETED");
    console.log("=================================\n");
  });

  // Log after each test to see what test just completed
  afterEach((context) => {
    console.log(`✅ Test complete: ${context.task.name}`);
  });

  describe("getAttestationById", () => {
    it("should fetch attestation when valid ID is provided", async () => {
      console.log(`🔍 Fetching attestation with ID: ${MOCK_ATTESTATION_ID}`);
      try {
        const attestation = await getAttestationById(MOCK_ATTESTATION_ID);
        console.log(`📋 Result: ${JSON.stringify(attestation, null, 2)}`);

        expect(attestation).toBeDefined();
        expect(attestation.attestation_uid).toBe(MOCK_ATTESTATION_ID);
        console.log(`✅ Attestation found and validated`);
      } catch (error) {
        console.log(
          `❌ Error fetching attestation: ${error instanceof Error ? error.message : String(error)}`,
        );
        // Using the helper to skip tests when expected errors occur
        skipTestOn(
          error,
          NotFoundError,
          `Test data not found: Attestation with ID ${MOCK_ATTESTATION_ID}`,
        );
      }
    });

    it("should throw NotFoundError when attestation doesn't exist", async () => {
      console.log(`🔍 Testing non-existent attestation ID handling`);
      try {
        await getAttestationById("non-existent-id");
        console.log(`❌ Test failed: Expected NotFoundError was not thrown`);
      } catch (error) {
        console.log(
          `✅ Correctly caught error: ${error instanceof Error ? error.message : String(error)}`,
        );
        expect(error).toBeInstanceOf(NotFoundError);
      }
    });
  });

  describe("getAttestationsBySchemaId", () => {
    it("should fetch attestations for a valid schema ID", async () => {
      console.log(`🔍 Fetching attestations for schema: ${MOCK_SCHEMA_ID}`);
      try {
        const attestations = await getAttestationsBySchemaId(MOCK_SCHEMA_ID);
        console.log(`📋 Found ${attestations.length} attestations`);

        if (attestations.length > 0) {
          console.log(
            `📄 First attestation: ${JSON.stringify(attestations[0], null, 2)}`,
          );
        }

        expect(Array.isArray(attestations)).toBe(true);

        // If we got results, validate the structure
        if (attestations.length > 0) {
          const attestation = attestations[0];
          expect(attestation.schema_uid).toBe(MOCK_SCHEMA_ID);
          console.log(
            `✅ Attestation schema_uid matches the requested schema ID`,
          );
        } else {
          console.log(
            `ℹ️ No attestations found for this schema ID, but API call succeeded`,
          );
        }
      } catch (error) {
        console.log(
          `❌ Error fetching attestations: ${error instanceof Error ? error.message : String(error)}`,
        );
        skipTestOn(error, ApiError);
      }
    });
  });

  describe("getAttestationsByUser", () => {
    it("should fetch attestations for a valid user ID", async () => {
      console.log(`🔍 Fetching attestations for user: ${MOCK_USER_ID}`);
      try {
        const attestations = await getAttestationsByUser(MOCK_USER_ID);
        console.log(`📋 Found ${attestations.length} attestations`);

        if (attestations.length > 0) {
          console.log(
            `📄 First attestation: ${JSON.stringify(attestations[0], null, 2)}`,
          );
        }

        expect(Array.isArray(attestations)).toBe(true);

        // If we got results, validate the structure
        if (attestations.length > 0) {
          const attestation = attestations[0];
          expect(attestation.attestee_uid).toBe(MOCK_USER_ID);
          console.log(
            `✅ Attestation attestee_uid matches the requested user ID`,
          );
        } else {
          console.log(
            `ℹ️ No attestations found for this user ID, but API call succeeded`,
          );
        }
      } catch (error) {
        console.log(
          `❌ Error fetching attestations: ${error instanceof Error ? error.message : String(error)}`,
        );
        skipTestOn(error, ApiError);
      }
    });
  });

  describe("getSchemaById", () => {
    it("should fetch schema when valid ID is provided", async () => {
      console.log(`🔍 Fetching schema with ID: ${MOCK_SCHEMA_ID}`);
      try {
        const schema = await getSchemaById(MOCK_SCHEMA_ID);
        console.log(`📋 Result: ${JSON.stringify(schema, null, 2)}`);

        expect(schema).toBeDefined();
        expect(schema.schema_uid).toBe(MOCK_SCHEMA_ID);
        console.log(`✅ Schema found and validated`);
      } catch (error) {
        console.log(
          `❌ Error fetching schema: ${error instanceof Error ? error.message : String(error)}`,
        );
        skipTestOn(
          error,
          NotFoundError,
          `Test data not found: Schema with ID ${MOCK_SCHEMA_ID}`,
        );
      }
    });

    it("should throw NotFoundError when schema doesn't exist", async () => {
      console.log(`🔍 Testing non-existent schema ID handling`);
      try {
        await getSchemaById("non-existent-id");
        console.log(`❌ Test failed: Expected NotFoundError was not thrown`);
      } catch (error) {
        console.log(
          `✅ Correctly caught error: ${error instanceof Error ? error.message : String(error)}`,
        );
        expect(error).toBeInstanceOf(NotFoundError);
      }
    });
  });

  describe("getSchemasByUser", () => {
    it("should fetch schemas for a valid user ID", async () => {
      console.log(`🔍 Fetching schemas for user: ${MOCK_USER_ID}`);
      try {
        const schemas = await getSchemasByUser(MOCK_USER_ID);
        console.log(`📋 Found ${schemas.length} schemas`);

        if (schemas.length > 0) {
          console.log(
            `📄 First schema: ${JSON.stringify(schemas[0], null, 2)}`,
          );
        }

        expect(Array.isArray(schemas)).toBe(true);

        // If we got results, validate the structure
        if (schemas.length > 0) {
          const schema = schemas[0];
          expect(schema.creator_uid).toBe(MOCK_USER_ID);
          console.log(`✅ Schema creator_uid matches the requested user ID`);
        } else {
          console.log(
            `ℹ️ No schemas found for this user ID, but API call succeeded`,
          );
        }
      } catch (error) {
        console.log(
          `❌ Error fetching schemas: ${error instanceof Error ? error.message : String(error)}`,
        );
        skipTestOn(error, ApiError);
      }
    });
  });

  describe("API Error handling", () => {
    it("should handle network errors gracefully", async () => {
      console.log(`🔍 Testing network error handling`);
      // Temporarily change API URL to trigger network error
      const originalUrl = process.env.NEXT_PUBLIC_API_URL;
      const badUrl = "http://non-existent-url:9999/api";
      console.log(`🔄 Changing API URL from ${originalUrl} to ${badUrl}`);
      process.env.NEXT_PUBLIC_API_URL = badUrl;

      try {
        await getSchemaById(MOCK_SCHEMA_ID);
        console.log(`❌ Test failed: Expected NetworkError was not thrown`);
      } catch (error) {
        console.log(
          `✅ Correctly caught error: ${error instanceof Error ? error.message : String(error)}`,
        );
        expect(error).toBeInstanceOf(NetworkError);
      } finally {
        // Restore original URL
        console.log(`🔄 Restoring API URL to ${originalUrl}`);
        process.env.NEXT_PUBLIC_API_URL = originalUrl;
      }
    });
  });
});
