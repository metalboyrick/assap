import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import { MyComponent, MyComponentProps } from "./MyComponent";

describe("MyComponent", () => {
  const defaultProps: MyComponentProps = {
    message: "Test Message",
  };

  it("renders the heading", () => {
    render(<MyComponent {...defaultProps} />);
    expect(
      screen.getByRole("heading", { name: /my sdk component/i }),
    ).toBeInTheDocument();
  });

  it("renders the provided message", () => {
    render(<MyComponent {...defaultProps} />);
    expect(screen.getByText(defaultProps.message)).toBeInTheDocument();
  });

  it("renders a different message when props change", () => {
    const newProps: MyComponentProps = {
      message: "Another Test Message",
    };
    render(<MyComponent {...newProps} />);
    expect(screen.getByText(newProps.message)).toBeInTheDocument();
  });
});
