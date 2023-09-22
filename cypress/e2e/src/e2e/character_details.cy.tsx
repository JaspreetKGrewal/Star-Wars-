describe("The Character details page", () => {
  beforeEach(() => {
    // Visit the Characters list page before each test
    cy.visit("http://localhost:3000/characters/1");

    cy.intercept("GET", "https://swapi.dev/api/people/1/", {
      statusCode: 200,
      fixture: "characterDetails.json",
    }).as("getCharacterDetails");

    cy.intercept("GET", "https://swapi.dev/api/planets/*/", {
      statusCode: 200,
      fixture: "planets.json",
    }).as("getPlanet");

    cy.intercept("GET", "https://swapi.dev/api/films/*/", {
      statusCode: 200,
      fixture: "films.json",
    }).as("getFilms");
  });

  it("displays character details", () => {
    cy.wait("@getCharacterDetails");
    cy.wait("@getPlanet");
    cy.wait("@getFilms");

    cy.get("h2").contains("Luke Skywalker Details");
    cy.get("p").contains("Gender:");
    cy.get("p").contains("Height:");
    cy.get("p").contains("Mass:");
    cy.get("p").contains("Hair Color:");
    cy.get("p").contains("Skin Color:");
    cy.get("p").contains("Eye Color:");
    cy.get("p").contains("Birth Year:");
    cy.get("p").contains("Planet:");
    cy.get("p").contains("Films:");
  });
});
