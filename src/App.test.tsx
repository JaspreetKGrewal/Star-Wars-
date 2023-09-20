import { render } from "@testing-library/react";
import App from "./App";
import React from "react";
import { expect } from "@jest/globals";

describe("App", () => {
  it("renders learn react link", () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });
});
