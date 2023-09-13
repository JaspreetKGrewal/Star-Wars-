import React from "react";
import { render, screen } from "@testing-library/react";
import { Breadcrumbs } from "./Breadcrumbs";
import { BrowserRouter } from "react-router-dom";

const mockPaths = [
  { label: "Home", url: "/", active: false },
  { label: "Characters", url: "/characters", active: true },
  { label: "Luke Skywalker", url: "/characters/1}", active: true },
];

describe("Breadcrumbs", () => {
  it("is rendered", () => {
    render(
      <BrowserRouter>
        <Breadcrumbs paths={mockPaths} />
      </BrowserRouter>
    );
    expect(screen.getByText("Home")).toBeTruthy();
    expect(screen.getAllByText("/")).toBeTruthy();
    expect(screen.getByText("Characters")).toBeTruthy();
    expect(screen.getByText("Luke Skywalker")).toBeTruthy();
  });

  it("should render correct href", () => {
    render(
      <BrowserRouter>
        <Breadcrumbs paths={mockPaths} />
      </BrowserRouter>
    );
    expect(
      (screen.getByRole("link", { name: "Home" }) as HTMLAnchorElement).href
    ).toContain("/");
    expect(
      (screen.getByRole("link", { name: "Characters" }) as HTMLAnchorElement)
        .href
    ).toContain("/characters");
    expect(
      (
        screen.getByRole("link", {
          name: "Luke Skywalker",
        }) as HTMLAnchorElement
      ).href
    ).toContain("/characters/1");
  });
});
