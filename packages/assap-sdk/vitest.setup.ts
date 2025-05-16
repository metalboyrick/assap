import { expect } from "vitest";
import "@testing-library/jest-dom/vitest"; // Extends Vitest's expect with jest-dom matchers
import matchers from "@testing-library/jest-dom/matchers";

// Make sure jest-dom matchers are available globally for expect
expect.extend(matchers);
