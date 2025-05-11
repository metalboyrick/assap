import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"], // Your main entry point
  // entry: ['src/index.ts', 'src/react/index.ts'], // Example for multiple entry points
  format: ["cjs", "esm"], // Output both CommonJS and ES module formats
  dts: true, // Generate TypeScript declaration files
  splitting: false, // Or true if you want code splitting
  sourcemap: true,
  clean: true, // Clean the dist folder before building
  treeshake: true,
  minify: true, // Minify output
  jsxFactory: "React.createElement", // or 'h' if using Preact/etc.
  jsxFragment: "React.Fragment", // or 'Fragment'
  // external: ['react', 'react-dom'], // Already peer dependencies, tsup often handles this well
  // outDir: 'dist', // Default is dist
  // esbuildPlugins: [], // For custom esbuild plugins if needed
});
