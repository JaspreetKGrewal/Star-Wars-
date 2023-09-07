import { render, screen } from "@testing-library/react";
import CharactersList from "./CharactersList";
import React from "react";
import { BrowserRouter } from "react-router-dom";

describe("Characters List", () => {
  it("should have title", () => {
    render(
      <BrowserRouter>
        <CharactersList />{" "}
      </BrowserRouter>
    );
    expect(screen.getByText("Star War Characters")).toBeTruthy();
    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug();
  });

  it("Should have breadcrumbs", () => {
    render(
      <BrowserRouter>
        <CharactersList />{" "}
      </BrowserRouter>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Characters")).toBeInTheDocument();
  });
});
