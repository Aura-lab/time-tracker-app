/// <reference types="cypress" />

describe('Time Tracker App', () => {
  beforeEach(() => {
    cy.viewport('macbook-13');
    cy.mockTimeTrackerApis();
    cy.visit('/time-entries');
    cy.wait(['@getTimeEntries', '@getPeople', '@getTasks']);
  });

  it('should display initial time entries', () => {
    cy.contains('Anton');
    cy.contains('Programming');
    cy.contains('2025-07-05');
    cy.contains('4');
  });

    it('should add a new entry', () => {
        cy.get('mat-select[name="personId"]').click();
        cy.get('mat-option').should('be.visible').contains('Aura').click();

        cy.get('mat-select[name="taskItemId"]').click();
        cy.get('mat-option').contains('Testing').click();

        cy.get('input[name="date"]').click();

        cy.get('.mat-calendar-body-cell-content').contains('6').click();

        cy.get('body').type('{esc}');
        cy.get('.cdk-overlay-container').should('not.have.descendants', '.cdk-overlay-backdrop');

        cy.get('input[name="hoursWorked"]').clear({ force: true }).type('3', { force: true });

        cy.contains('Add').should('not.be.disabled').click();

        cy.wait('@addEntry').its('request.body').should((body) => {
            expect(body.personId).to.equal(2);
            expect(body.taskItemId).to.equal(2);
            expect(body.date).to.contain('2025-07-05');
            expect(body.hoursWorked).to.equal(3);
        });
    });

  it('should edit an existing entry', () => {
    cy.get('button[aria-label="Edit entry"]').first().click();
    cy.get('input[name="hoursWorked"]').clear({ force: true }).type('6', { force: true });
    cy.contains('Update').click();

    cy.wait('@updateEntry').its('request.body').should((body) => {
      expect(body.hoursWorked).to.equal(6);
    });
  });

  it('should cancel editing', () => {
    cy.get('button[aria-label="Edit entry"]').first().click();
    cy.contains('Cancel').click();
    cy.contains('Add');
  });

  it('should delete an entry after confirmation', () => {
    cy.get('button[aria-label="Delete entry"]').first().click();
    cy.contains('Delete').click();

    cy.wait('@deleteEntry').its('request.url').should('include', '/api/TimeEntries/');
  });
});
