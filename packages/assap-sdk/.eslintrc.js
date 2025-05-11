module.exports = {
  root: true,
  extends: [
    "../../packages/eslint-config/index.js",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  settings: {
    react: {
      version: "detect", // Automatically detect the React version
    },
  },
  rules: {
    // Add any package-specific ESLint rules here
    "react/react-in-jsx-scope": "off", // Not needed with modern React JSX transform
    "react/prop-types": "off", // We use TypeScript for prop types
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        // Specific rules for TypeScript files if needed
      },
    },
    {
      files: ["*.test.ts", "*.test.tsx"],
      env: {
        "vitest-globals/env": true, // If using vitest-plugin-eslint-globals
        "jest/globals": true, // For jest-dom compatibility with ESLint if needed
      },
      extends: ["plugin:testing-library/react"],
    },
  ],
};
