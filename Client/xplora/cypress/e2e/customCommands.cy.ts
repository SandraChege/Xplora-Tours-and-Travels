describe('Uses Custom commands', () => {
  it('to call register functionality', () => {
    cy.registerUser();
  });
  it('to call login functionality', () => {
    cy.loginUser();
  });
});
