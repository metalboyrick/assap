/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react"; // Required for React component testing

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Makes expect, describe, it, etc. available globally
    environment: "jsdom", // Simulates a DOM environment for testing React components
    setupFiles: "./vitest.setup.ts", // A setup file to extend expect, if needed
    css: false, // or true if you have CSS to test, or use a css-in-js solution
    // reporters: ['verbose'],
    coverage: {
      provider: "v8", // or 'istanbul'
      reporter: ["text", "json", "html"],
      reportsDirectory: "./coverage",
      include: ["src/**/*"],
      exclude: [
        "src/**/index.ts",
        "src/**/*.test.ts",
        "src/**/*.test.tsx",
        "src/**/*.d.ts",
      ],
    },
  },
});
