const APP_URL = process.env.APP_URL || 'http://localhost:8080';

describe('Credencials', () => {
  beforeEach(() => {
    cy.visit(APP_URL);

    cy.get('#header-login-button').click();

    cy.get('#modal-login');

    cy.get('#email-field').type('igor@igor.me');
    cy.get('#password-field').type('1234');

    cy.get('#submit-button').click();
  });

  it('Should show the api key', () => {
    cy.wait(4000);
    cy.visit(`${APP_URL}/credencials`);
    cy.wait(2000);

    cy.get('#apikey').should('be.visible');

    cy.get('#apikey')
      .invoke('text')
      .then(text => expect(text).to.not.equal(undefined || 'undefined'));
  });

  it('should generate an api_key', () => {
    cy.wait(4000);
    cy.visit(`${APP_URL}/credencials`);
    cy.wait(2000);

    cy.get('#apikey')
      .invoke('text')
      .then(text => {
        cy.get('#generate-apikey').click();
        cy.wait(2000);
        cy.get('#apikey')
          .invoke('text')
          .should(textUpdated => {
            expect(text).not.to.eq(textUpdated);
          });
      });
  });

  it('Should copy the api key', () => {
    cy.wait(4000);
    cy.visit(`${APP_URL}/credencials`, {
      onBeforeLoad: win => {
        cy.stub(win.navigator.clipboard, 'writeText').returns(true)
      }
    });
    cy.wait(2000);

    cy.get('#apikey-copy').click();

    cy.window().contains('Copiado!');
  });

  it('Should not show the api key if have an error', () => {
    cy.intercept('/users/me', { statusCode: 200, data: { name: 'Banana' } }).as('getUser');
    cy.wait('@getUser');

    cy.wait(4000);
    cy.visit(`${APP_URL}/credencials`);
    cy.wait(2000);

    cy.get('#error-apiKey').contains('Erro ao carregar a apiKey');
  });
  it('Should show script to the user', () => {
    cy.wait(4000);
    cy.visit(`${APP_URL}/credencials`);
    cy.wait(2000);

    cy.get('pre').should('be.visible');
  });

  it('Should not show script if have an error', () => {
    cy.intercept('/users/me', { statusCode: 200, data: { name: 'Banana' } }).as('getUser');
    cy.wait('@getUser');
    cy.wait(4000);
    cy.visit(`${APP_URL}/credencials`);
    cy.wait(2000);

    cy.get('#error-script').contains('Erro ao carregar o script');
  });
});
