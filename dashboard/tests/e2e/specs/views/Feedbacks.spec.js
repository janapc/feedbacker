const APP_URL = process.env.APP_URL || 'http://localhost:8080';

describe('Feedbacks', () => {
  beforeEach(() => {
    cy.visit(APP_URL);

    cy.get('#header-login-button').click();

    cy.get('#modal-login');

    cy.get('#email-field').type('igor@igor.me');
    cy.get('#password-field').type('1234');

    cy.get('#submit-button').click();
  });
  it('should open and close a card of feedbacks', () => {
    cy.wait(2000);

    cy.url().should('include', '/feedbacks');
    cy.get('#1-card').children('#close-chevron');
    cy.get('#1-card').click();
    cy.wait(2000);

    cy.get('#1-card').children().should('not.have.id', '#close-chevron');
  });

  it('should go to other filter of list of feedbacks', () => {
    cy.wait(2000);

    cy.url().should('include', '/feedbacks');
    cy.get('#Ideais-filter').click();

    cy.wait(2000);
    cy.get('.feedbacks-cards')
      .its('length')
      .then((size) => {
        expect(size).to.greaterThan(0);
      });
  });

  it('should verify if the list of a determinate filter is equal to the number expected in the filter', () => {
    cy.wait(2000);

    cy.url().should('include', '/feedbacks');
    cy.get('#Ideais-filter').click();

    cy.wait(2000);

    cy.get('#Ideais-filter-amount')
      .invoke('text')
      .then((sometext) => {
        cy.get('.feedbacks-cards').should('have.length', sometext);
      });
  });

  it('should return a message to the user if the list of feedbacks have empty', () => {
    cy.intercept(
      '/feedbacks?limit=5&offset=0',
      {
        statusCode: 200,
        body: { results: [], pagination: 0 }
      }
    ).as('getFeedbacks');

    cy.wait('@getFeedbacks');
    cy.url().should('include', '/feedbacks');

    cy.get('#feedbacks-empty-message').contains('Ainda nenhum feedback recebido 🤓');
  });
  it('should return a message to the user if occurred an error loading list of feedbacks', () => {
    cy.intercept(
      '/feedbacks?limit=5&offset=0',
      {
        statusCode: 500,
        body: { error: 'Request could not be performed' }
      }
    ).as('getErrorFeedbacks');

    cy.wait('@getErrorFeedbacks');
    cy.url().should('include', '/feedbacks');

    cy.get('#hasError-message').contains('conteceu um erro ao carregar os feedbacks 😔');
  });

  it('should loading more list of feedbacks', () => {
    cy.wait(2000);

    cy.url().should('include', '/feedbacks');
    cy.get('.feedbacks-cards')
      .its('length')
      .then((size) => {
        expect(size).to.equal(5);
      });

    cy.scrollTo('bottom');
    cy.wait(4000);
    cy.get('.feedbacks-cards')
      .its('length')
      .then((size) => {
        expect(size).to.greaterThan(5);
      });
  });
});
