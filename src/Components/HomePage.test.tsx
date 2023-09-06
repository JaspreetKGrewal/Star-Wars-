import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

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
  it("should render characters page when button is clicked", () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    const button = screen.getByTestId("charactersButton");
    userEvent.click(button);
    expect(screen.getByText("Characters")).toBeTruthy();
  });
});
