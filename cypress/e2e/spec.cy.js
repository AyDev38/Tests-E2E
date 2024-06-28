describe('Test de 0Bank', () => {
  beforeEach(() => {
    cy.visit('http://151.80.32.16:8965/')
  })

  it("Test de connexion", () => {
    cy.get(".navbar-collapse ul li:last-child a").click()
    cy.get("#mailco").type("test@test.com")
    cy.get("#mailco").should("have.value", "test@test.com")
    cy.get("#connecttoaccount input[type=password]").type("test")
    cy.get("#connecttoaccount input[type=password]").should("have.value", "test")
    cy.get("#connecttoaccount input[type=submit]").click()
    cy.url().should("include", "/index.php")
  })
})
