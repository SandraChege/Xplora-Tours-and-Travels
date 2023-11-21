describe('Landing Page Content', () => {
  it('passes', () => {
    cy.visit('http://localhost:4200/');
    cy.contains('Diani')
  })
})