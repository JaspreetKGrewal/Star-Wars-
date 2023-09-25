describe("The Character details page", () => {
  beforeEach(() => {
    // Visit the Characters list page before each test
    cy.visit("http://localhost:3000/characters/1");

    cy.intercept("GET", "https://swapi.dev/api/people/1/", {
      statusCode: 200,
      fixture: "characterDetails.json",
    }).as("getCharacterDetails");

    cy.intercept("GET", "https://swapi.dev/api/planets/1/", {
      statusCode: 200,
      fixture: "planets.json",
    }).as("getPlanet");

    cy.intercept("GET", "https://swapi.dev/api/films/1/", {
      statusCode: 200,
      fixture: "film1.json",
    }).as("getFilm1");

    cy.intercept("GET", "https://swapi.dev/api/films/2/", {
      statusCode: 200,
      fixture: "film2.json",
    }).as("getFilm2");

    cy.intercept("GET", "https://swapi.dev/api/films/3/", {
      statusCode: 200,
      fixture: "film3.json",
    }).as("getFilm3");

    cy.intercept("GET", "https://swapi.dev/api/films/6/", {
      statusCode: 200,
      fixture: "film6.json",
    }).as("getFilm6");
  });

  it("displays character details", () => {
    cy.wait("@getCharacterDetails");
    cy.wait("@getPlanet");
    cy.wait("@getFilm1");
    cy.wait("@getFilm2");
    cy.wait("@getFilm3");
    cy.wait("@getFilm6");

    cy.get("h2").contains("Luke Skywalker Details");
    cy.get("p").contains("Gender:");
    cy.get("p").contains("Height:");
    cy.get("p").contains("Mass:");
    cy.get("p").contains("Hair Color:");
    cy.get("p").contains("Skin Color:");
    cy.get("p").contains("Eye Color:");
    cy.get("p").contains("Birth Year:");
    cy.get("p").contains("Planet: Tatooine");
    cy.get("p").contains(
      "Films: A New Hope, The Empire Strikes Back, Return of the Jedi, Revenge of the Sith "
    );
  });

  it("breadcrumbs should navigate to Home page", () => {
    cy.wait("@getCharacterDetails");
    cy.wait("@getPlanet");
    cy.wait("@getFilm1");
    cy.wait("@getFilm2");
    cy.wait("@getFilm3");
    cy.wait("@getFilm6");
    cy.get(":nth-child(1) > .breadcrumb-inactive").click();
    cy.location("pathname").should("eq", "/");
  });

  it("breadcrumbs should navigate to Character's list page", () => {
    cy.wait("@getCharacterDetails");
    cy.wait("@getPlanet");
    cy.wait("@getFilm1");
    cy.wait("@getFilm2");
    cy.wait("@getFilm3");
    cy.wait("@getFilm6");
    cy.get(":nth-child(2) > .breadcrumb-inactive").click();
    cy.location("pathname").should("eq", "/characters");
  });

  it("displays correct breadcrumbs", () => {
    cy.wait("@getCharacterDetails");
    cy.wait("@getPlanet");
    cy.wait("@getFilm1");
    cy.wait("@getFilm2");
    cy.wait("@getFilm3");
    cy.wait("@getFilm6");
    cy.get(".breadcrumb-inactive")
      .should("exist")
      .should("have.text", "HomeCharacters");
    cy.get(".separator").should("exist").should("have.text", " /  / ");
    cy.get(".breadcrumb-active")
      .should("exist")
      .should("have.text", "Luke Skywalker");
  });
});
