import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // No longer using a separate setup file since it's now in the test file itself

    // Only include integration test files
    include: ["**/*.integration.test.ts"],

    // Exclude any other test files to ensure we only run integration tests
    exclude: ["**/*.unit.test.ts", "**/node_modules/**"],

    // Environment configuration
    environment: "node",

    // Explicitly set the timeout longer for integration tests
    testTimeout: 30000,

    // Allow for more verbose output during integration testing
    reporters: ["verbose"],

    // Use a separate file for globalSetup if you need to perform one-time setup
    // globalSetup: './src/tests/integration/globalSetup.ts',

    // Use a separate file for globalTeardown if you need to perform one-time cleanup
    // globalTeardown: './src/tests/integration/globalTeardown.ts',
  },
});
