/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    mockTimeTrackerApis(): Chainable<void>;
  }
}

Cypress.Commands.add('mockTimeTrackerApis', () => {
  cy.intercept('GET', '/api/TimeEntries', {
    data: [
      {
        id: 1,
        personId: 1,
        personName: 'Anton',
        taskItemId: 1,
        taskName: 'Programming',
        date: '2025-07-05',
        hoursWorked: 4,
      }
    ]
  }).as('getTimeEntries');

  cy.intercept('GET', '/api/People', {
    data: [
      { id: 1, fullName: 'Anton' },
      { id: 2, fullName: 'Aura' },
    ]
  }).as('getPeople');

  cy.intercept('GET', '/api/Tasks', {
    data: [
      { id: 1, name: 'Programming' },
      { id: 2, name: 'Testing' },
    ]
  }).as('getTasks');

  cy.intercept('POST', '/api/TimeEntries', { data: {} }).as('addEntry');
  cy.intercept('PUT', '/api/TimeEntries/*', { data: {} }).as('updateEntry');
  cy.intercept('DELETE', '/api/TimeEntries/*', { data: {} }).as('deleteEntry');
});
