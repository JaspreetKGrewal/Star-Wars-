import { render, screen } from "@testing-library/react";
import CharactersList from "./CharactersList";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import * as api from "../../api/apiRequest";
import { MOCK_CHARACTERS } from "../../Mock/mockData";
import { AxiosHeaders } from "axios";

jest.spyOn(api, "getCharacters").mockReturnValue(
  new Promise((resolve) => {
    resolve({
      data: MOCK_CHARACTERS,
      status: 200,
      statusText: "OK",
      headers: {"Content-Type": "application/json"},
      config: {
        headers: {"Accept": "application/json, text/plain, */*",
          "Content-Type" :  null  },
      },
    });
  })
);

describe("Characters List", () => {
  it.only("should have title", () => {
    render(
      <BrowserRouter>
        <CharactersList />
      </BrowserRouter>
    );
    expect(screen.getByText("Star War Characters")).toBeTruthy();
    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug();
  });

  it("should have breadcrumbs", () => {
    render(
      <BrowserRouter>
        <CharactersList />
      </BrowserRouter>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Characters")).toBeInTheDocument();
  });
});
