describe("Smoke tests", () => {
  it("ensures that the application is opened correctly", () => {
    cy.intercept("POST", "**/api/auth/signIn").as("login");
    cy.visit("/");
    cy.get(".card-header").should("exist").and("have.text", "Expeses Software");
    cy.get(".btn").should("exist").and("contain", "Login");
  });
});
