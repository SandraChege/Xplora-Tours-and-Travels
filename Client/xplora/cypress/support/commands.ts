/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
Cypress.Commands.add('loginUser', () => {
  cy.visit('/login');
  cy.get('[data-cy="email"]').type('9superbikes@gmail.com');
  cy.get('[data-cy="password"]').type('12345678');
  cy.get('[data-cy="login_user_btn"]')
    .click()
    .then((el) => {
      cy.get('[data-cy="logged-in-success-popup"]').should('be.visible');
      cy.location('pathname').should('eq', '/adminhome');
    });
});
Cypress.Commands.add('registerUser', () => {
  cy.visit('/register');
  cy.get('[data-cy="userName"]').type('Jeniffer Sammy');
  cy.get('[data-cy="userEmail"]').type('jeniffersammy@gmail.com');
  cy.get('[data-cy="userphone"]').type('0789653421');
  cy.get('[data-cy="userPassword"]').type('password123');
  cy.get('[data-cy="register_user_btn"]').click().then((el) => {
    cy.get('[data-cy="registered-success-popup"]').should('be.visible');
    cy.location('pathname').should('eq', '/login');
  });
});
