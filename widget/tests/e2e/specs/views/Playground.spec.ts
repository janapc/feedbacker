const WIDGET_URL = process.env.WIDGET_URL || 'http://localhost:8080';

describe('<Playground />', () => {
  it('Should visit the app and open the widget', () => {
    cy.visit(WIDGET_URL);
    cy.get('#open-box').click();
  });

  it('Should open the widget and close the widget', () => {
    cy.visit(WIDGET_URL);

    cy.get('#open-box').click();

    cy.get('#close-box').click();
  });

  it('Should open widget, select a type of feedback and go back', () => {
    cy.visit(WIDGET_URL);

    cy.get('#open-box').click();
    cy.get('#btn-IDEA').click();
    cy.get('#write-a-feedback-component').should('be.visible');

    cy.get('#btn-goBack').click();
    cy.get('#select-feedback-type-component').should('be.visible');
  });

  it('Should open the widget and send a message', () => {
    cy.intercept('POST', '/feedbacks', { body: { status: 200 } }).as(
      'Feedbacks'
    );

    cy.visit(WIDGET_URL);

    cy.get('#open-box').click();

    cy.get('#btn-IDEA').click();

    cy.get('#button-submit').should('be.disabled');
    cy.get('textarea').type('testing my widget...');

    cy.get('#button-submit').click();
    cy.wait('@Feedbacks');

    cy.get('#success-component').should('be.visible');

    cy.get('#button-goBack').click();

    cy.get('#select-feedback-type-component').should('be.visible');
  });

  it('Should open the widget and not send a message', () => {
    cy.intercept('POST', '/feedbacks', { statusCode: 402 }).as('Feedbacks');

    cy.visit(WIDGET_URL);

    cy.get('#open-box').click();

    cy.get('#btn-IDEA').click();

    cy.get('#button-submit').should('be.disabled');
    cy.get('textarea').type('testing my widget...');

    cy.get('#button-submit').click();
    cy.wait('@Feedbacks');

    cy.get('#error-component').should('be.visible');

    cy.get('#button-goBack').click();

    cy.get('#select-feedback-type-component').should('be.visible');
  });
});
