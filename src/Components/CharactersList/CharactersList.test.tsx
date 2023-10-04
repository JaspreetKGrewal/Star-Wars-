import { act, render, screen } from "@testing-library/react";
import { CharactersList } from "./CharactersList";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import * as api from "../../api/apiRequest";
import { MOCK_CHARACTERS } from "../../mock";
import { expect } from "@jest/globals";

jest.spyOn(window, "alert").mockImplementation(() => {});
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

  it("should show window alert when api request fails", async () => {
    jest
      .spyOn(api, "getCharacters")
      .mockRejectedValue(new Error("Failed to fetch Star Wars characters!"));
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      render(
        <BrowserRouter>
          <CharactersList />
        </BrowserRouter>
      );
    });
    expect(await window.alert).toBeCalled();
  });
});
