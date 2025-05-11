import React from "react";

export interface MyComponentProps {
  message: string;
}

export const MyComponent: React.FC<MyComponentProps> = ({ message }) => {
  return (
    <div>
      <h1>My SDK Component</h1>
      <p>{message}</p>
    </div>
  );
};
