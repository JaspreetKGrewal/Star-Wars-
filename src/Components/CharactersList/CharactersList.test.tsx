import { act, render, screen } from "@testing-library/react";
import CharactersList from "./CharactersList";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import * as api from "../../api/apiRequest";
import { MOCK_CHARACTERS } from "../../Mock/mockData";

jest.spyOn(api, "getCharacters").mockReturnValue(
  new Promise((resolve) => {
    resolve({
      data: MOCK_CHARACTERS,
    });
  })
);

describe("Characters List", () => {
  it("should have title", async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      render(
        <BrowserRouter>
          <CharactersList />
        </BrowserRouter>
      );
    });
    expect(await screen.findByText("Star War Characters")).toBeInTheDocument();
  });

  it("should have breadcrumbs", async () => {
    render(
      <BrowserRouter>
        <CharactersList />
      </BrowserRouter>
    );
    expect(await screen.findByText("Home")).toBeInTheDocument();
    expect(await screen.findByText("Characters")).toBeInTheDocument();
  });
});
