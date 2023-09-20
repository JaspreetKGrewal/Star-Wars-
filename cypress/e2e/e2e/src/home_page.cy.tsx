describe("The Home Page", () => {
  beforeEach(() => {
    // Visit the Home page before each test
    cy.visit("http://localhost:3000/");
  });

  it("displays the welcome message", () => {
    // Check if the welcome message is visible
    cy.get("h2").should("contain", "Welcome to the world of Star Wars!!");
  });
});
