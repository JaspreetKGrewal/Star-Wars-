describe("The Characters List page", () => {
  beforeEach(() => {
    // Visit the Characters list page before each test
    cy.visit("http://localhost:3000/characters");
    cy.intercept("GET", "https://swapi.dev/api/people/?page=1", {
      statusCode: 200,
      fixture: "charactersList.json",
    }).as("getCharacters");

    cy.intercept("GET", "https://swapi.dev/api/people/?page=2", {
      statusCode: 200,
      fixture: "charactersListPg2.json",
    }).as("getCharacters2");

    cy.intercept("GET", "https://swapi.dev/api/people/1/", {
      statusCode: 200,
      fixture: "characterDetails.json",
    }).as("getCharacterDetails");
  });

  it("breadcrumbs should navigate to Home page", () => {
    cy.wait("@getCharacters");
    cy.get(".breadcrumb-inactive").click();
    cy.location("pathname").should("eq", "/");
  });

  it("displays the title for the page", () => {
    cy.get("h2").contains("Star War Characters");
  });

  it("should fetch and display list of characters", () => {
    cy.wait("@getCharacters");
    cy.get(".list").should("have.length.greaterThan", 0);
  });

  it("navigates to the next page of characters list", () => {
    cy.wait("@getCharacters");
    cy.getByData("nextPageButton").click();
  });

  it("navigates to the previous page of characters list", () => {
    cy.wait("@getCharacters");
    cy.getByData("previousPageButton").click();
  });

  it("navigates to the Characters details page when a characters name is clicked", () => {
    cy.wait("@getCharacters");
    cy.get(".list").first().click();
    cy.location("pathname").should("eq", "/characters/1");
  });

  it("displays correct breadcrumbs", () => {
    cy.wait("@getCharacters");
    cy.get(".breadcrumb-inactive").should("exist").should("have.text", "Home");
    cy.get(".separator").should("exist").should("have.text", " / ");
    cy.get(".breadcrumb-active")
      .should("exist")
      .should("have.text", "Characters");
  });
});
