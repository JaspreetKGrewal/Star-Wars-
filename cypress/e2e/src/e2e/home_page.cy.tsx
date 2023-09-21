describe("The Home Page", () => {
  beforeEach(() => {
    // Visit the Home page before each test
    cy.visit("http://localhost:3000/");
    cy.intercept("GET", "https://swapi.dev/api/people/?page=1", {
      statusCode: 200,
      fixture: "charactersList.json",
    }).as("getCharacters");
  });

  it("displays the welcome message", () => {
    // Check if the welcome message is visible
    cy.get("h2").contains("Welcome to the world of Star Wars!!");
  });

  it('navigates to the Characters page when the "Characters" button is clicked', () => {
    cy.getByData("charactersButton").click();
    cy.location("pathname").should("eq", "/characters");
  });
});
