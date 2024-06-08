/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { act, render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { CharacterDetails } from "./CharacterDetails";
import * as api from "../../api";
import { MOCK_CHARACTER_DETAILS, MOCK_FILMS, MOCK_HOMEWORLD } from "../../Mock";
import { expect } from "@jest/globals";

jest.spyOn(window, "alert").mockImplementation(() => {});
jest.spyOn(api, "getHomeworld").mockResolvedValue(
  new Promise((resolve) => {
    resolve({
      data: MOCK_HOMEWORLD,
    });
  })
);
jest.spyOn(api, "getAllFilms").mockReturnValue([
  new Promise((resolve) => {
    resolve({
      data: MOCK_FILMS[0],
    });
  }),
  new Promise((resolve) => {
    resolve({
      data: MOCK_FILMS[1],
    });
  }),
  new Promise((resolve) => {
    resolve({
      data: MOCK_FILMS[0],
    });
  }),
  new Promise((resolve) => {
    resolve({
      data: MOCK_FILMS[1],
    });
  }),
]);
jest.spyOn(api, "getCharacterDetails").mockResolvedValue(
  new Promise((resolve) => {
    resolve({
      data: MOCK_CHARACTER_DETAILS,
    });
  })
);

describe("Character Details", () => {
  it("renders character details when loaded", async () => {
    const jsdomalert = window.alert;
    window.alert = () => {};
    act(() => {
      render(
        <BrowserRouter>
          <CharacterDetails />
        </BrowserRouter>
      );
    });
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    expect(
      await screen.findByText("Luke Skywalker Details")
    ).toBeInTheDocument();
    expect(await screen.findByText("Gender: male")).toBeInTheDocument();
    expect(await screen.findByText("Planet: Tatooine")).toBeInTheDocument();
    expect(
      await screen.findByText(
        "Films: A New Hope, The Empire Strikes Back, A New Hope, The Empire Strikes Back"
      )
    ).toBeInTheDocument();
    window.alert = jsdomalert;
  });

  it("should show window alert when api request fails", async () => {
    jest
      .spyOn(api, "getCharacterDetails")
      .mockRejectedValue(new Error("Failed to display character's details"));

    act(() => {
      render(
        <BrowserRouter>
          <CharacterDetails />
        </BrowserRouter>
      );
    });
    expect(await window.alert).toBeCalled();
  });
});
