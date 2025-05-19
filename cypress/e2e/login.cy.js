/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when username is empty
 *   - should display alert when password is empty
 *   - should display alert when username and password are wrong
 *   - should display homepage when username and password are correct
 *   - should be able to logout
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should display login page correctly', () => {
    // memverifikasi elemen yang harus tampak pada halaman login
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button')
      .contains(/^Login$/)
      .should('be.visible');
  });

  it('should display alert when username is empty', () => {
    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    cy.get('input[placeholder="Email"]').type('test@example.com');
    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when username and password are wrong', () => {
    cy.get('input[placeholder="Email"]').type('wrong@example.com');
    cy.get('input[placeholder="Password"]').type('wrongpassword');
    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display homepage when username and password are correct', () => {
    cy.get('input[placeholder="Email"]').type('alipurnama@gmail.com');
    cy.get('input[placeholder="Password"]').type('123321');
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // memverifikasi bahwa user sudah berada di halaman home
    cy.get('header').should('be.visible');
    cy.get('button').contains('Logout').should('be.visible');
  });

  it('should be able to logout', () => {
    // login terlebih dahulu
    cy.get('input[placeholder="Email"]').type('alipurnama@gmail.com');
    cy.get('input[placeholder="Password"]').type('123321');
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // verifikasi sudah di halaman home
    cy.get('nav').should('be.visible');

    // logout
    cy.get('button').contains('Logout').click();

    // verifikasi kembali ke halaman login
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
  });
});
