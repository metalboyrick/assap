export default [
  {
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    ignorePatterns: ["node_modules/", "dist/", ".turbo/"],
    root: true,
    env: {
      browser: true,
      node: true,
      es6: true,
    },
  },
];
