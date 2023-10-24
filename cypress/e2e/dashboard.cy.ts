describe("template spec", () => {
  it("passes login", () => {
    cy.visit("https://app.clockify.me/en/signup");
    cy.get("#email").type("<EMAIL>");
    cy.get("#password").type("<PASSWORD>");
    cy.get("#submit").click();
    cy.url().should("eq", "https://app.clockify.me/en/");
    cy.wait(1000);
    cy.get("#clockify-logo").should("be.visible");
    cy.get("#clockify-logo").click();
    cy.url().should("eq", "https://app.clockify.me/en/");
  });
});
