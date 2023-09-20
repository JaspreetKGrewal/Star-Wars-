import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";
import { BrowserRouter } from "react-router-dom";
import { expect } from "@jest/globals";

describe("HomePage", () => {
  it("renders the homepage with a welcome message", () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    expect(
      screen.getByText("Welcome to the world of Star Wars!!")
    ).toBeTruthy();
  });
  it("should check if button exists", () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    const button = screen.getByTestId("charactersButton");
    expect(button).toBeTruthy();
    expect(button).toHaveTextContent("Characters");
  });
});
