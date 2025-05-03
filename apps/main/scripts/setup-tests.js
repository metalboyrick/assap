#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Ask for configuration values
console.log("Setting up test environment for ASSAP API Testing...\n");

// Check if .env already exists
const envPath = path.join(__dirname, ".env");
if (fs.existsSync(envPath)) {
  console.log(
    ".env file already exists. To recreate it, please delete it first.",
  );
  process.exit(0);
}

// Create .env file
rl.question(
  "Enter API base URL (default: http://localhost:3000/api): ",
  (apiBaseUrl) => {
    const baseUrl = apiBaseUrl || "http://localhost:3000/api";

    rl.question("Enter API key: ", (apiKey) => {
      if (!apiKey) {
        console.error("Error: API key is required");
        rl.close();
        process.exit(1);
      }

      // Write to .env file
      const envContent = `API_BASE_URL=${baseUrl}\nAPI_KEY=${apiKey}\n`;
      fs.writeFileSync(envPath, envContent);

      console.log("\nTest environment configuration saved to .env\n");
      console.log("Installation:");
      console.log("npm install node-fetch@2 dotenv\n");
      console.log("Available test scripts:");
      console.log("1. node test-api.js - Test all API endpoints");
      console.log(
        "2. node test-schema-api.js [create|read|update|delete] [schema_uid]",
      );
      console.log(
        "3. node test-attestation-api.js [create|read|update|delete] [attestation_uid] [schema_uid]\n",
      );
      console.log("Example workflow:");
      console.log("# 1. Create a schema");
      console.log("node test-schema-api.js create my-test-schema");
      console.log("# 2. Create an attestation using the schema");
      console.log(
        "node test-attestation-api.js create my-test-attestation my-test-schema",
      );
      console.log("# 3. View the attestation");
      console.log("node test-attestation-api.js read my-test-attestation");

      rl.close();
    });
  },
);
