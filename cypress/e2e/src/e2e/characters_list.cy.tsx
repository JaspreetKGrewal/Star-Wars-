describe("The Characters List page", () => {
  beforeEach(() => {
    // Visit the Characters list page before each test
    cy.visit("http://localhost:3000/characters");
    cy.intercept("GET", "https://swapi.dev/api/people/?page=1", {
      statusCode: 200,
      fixture: "charactersList.json",
    }).as("getCharacters");
  });

  it("displays the title for the page", () => {
    cy.get("h2").contains("Star War Characters");
  });
});
