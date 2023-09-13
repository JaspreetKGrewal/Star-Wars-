/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import CharacterDetails from "./CharacterDetails";
import axios, { AxiosResponse } from "axios";
import { getHomeworld, getAllFilms } from "../../api/apiRequest";

jest.mock("axios");
jest.mock("../../api/apiRequest");

describe("Character Details", () => {
  const mockCharacter = {
    name: "Luke Skywalker",
    gender: "male",
    height: "172",
    mass: "77",
    hair_color: "blond",
    skin_color: "fair",
    eye_color: "blue",
    birth_year: "19BBY",
    homeworld: "http://swapi.dev/api/planets/1/",
    films: ["http://swapi.dev/api/films/1/"],
  };

  const mockHomeworld = {
    name: "Tatooine",
  };

  const mockFilms = [
    {
      data: {
        title: "A New Hope",
      },
    },
  ];

  it("renders character details when loaded", async () => {
    const jsdomalert = window.alert;
    window.alert = () => {};
    render(
      <BrowserRouter>
        <CharacterDetails />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    });

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("Details")).toBeInTheDocument();
    expect(screen.getByText("Gender: male")).toBeInTheDocument();
    expect(screen.getByText("Planet: Tatooine")).toBeInTheDocument();
    expect(screen.getByText("Films: A New Hope")).toBeInTheDocument();

    window.alert = jsdomalert;
  });
});
