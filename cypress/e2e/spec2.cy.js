// Importation du plugin cypress-file-upload dans cypress/support/commands.js
import 'cypress-file-upload';

// Tests pour 0Bank
describe('Test de 0Bank', () => {
  beforeEach(() => {
    cy.visit('http://151.80.32.16:8965/');
  });

  it('Test de la page d\'accueil', () => {
    cy.get('.navbar-collapse ul li:nth-child(2) a').should('have.text', 'Ouvrir mon compte');
    cy.get('.navbar-collapse ul li:nth-child(3) a').should('have.text', 'Connexion');
  });

  it('Test du bouton "Ouvrir mon compte"', () => {
    cy.get('.navbar-collapse ul li:nth-child(2) a').click();
    cy.url().should('include', '#openaccount');
  });

  it('Test du bouton "Retour"', () => {
    cy.get('.navbar-collapse ul li:nth-child(2) a').click();
    cy.wait(1000);
    cy.get('.navbar-collapse ul li:nth-child(1) a').click();
    cy.url().should('include', '#');
  });

  it('Test du bouton "Nos Tarifs"', () => {
    cy.contains('button', 'Nos Tarifs').click();
    cy.url().should('include', 'expected-tarif-page-url');
  });

  it('Test des boutons dans la zone Footer', () => {
    cy.get('footer a[href="#openaccount"]').click();
    cy.url().should('include', '#openaccount');
    
    cy.visit('http://151.80.32.16:8965/');
    
    cy.get('footer a[href="#connecttoaccount"]').click();
    cy.url().should('include', '#connecttoaccount');
    
    cy.visit('http://151.80.32.16:8965/');
    
    cy.get('footer a[href="#banker"]').click();
    cy.url().should('include', '#banker');
  });

  it('Test du bouton "Condition Générale de vente" dans le footer', () => {
    cy.get('footer a[href="cgv.php"]').click();
    cy.url().should('include', 'cgv.php');
  });

  it('Test du bouton "Condition tarifaire" dans le footer', () => {
    cy.get('footer a:contains("Condition tarifaire")').click();
    cy.url().should('include', 'expected-condition-tarifaire-page-url');
  });

  it('Test du formulaire "Ouvrir mon compte"', () => {
    cy.get('.navbar-collapse ul li:nth-child(2) a').click();
    cy.url().should('include', '#openaccount');

    // Remplir le formulaire
    cy.get('input[name="lastname"]').type('Doe');
    cy.get('input[name="firstname"]').type('John');
    cy.get('input[name="born"]').type('1980-01-01');
    cy.get('input[name="adre"]').type('123 Main St');
    cy.get('input[name="pcode"]').type('75001');
    cy.get('input[name="pi"]').attachFile('../assets/imageTest.png'); // Chemin vers votre fichier d'image
    cy.get('input[name="mail"]').type('ben@intraneos-synergy.com'); // Utilisation de l'email souhaité
    cy.get('input[name="pass"]').type('password123');
    cy.get('input[name="passverif"]').type('password123');
    cy.get('input[name="cguvalid"]').check();

    // Soumettre le formulaire
    cy.get('button[type="submit"]').click();

    // Vérifier que la redirection ou la réponse attendue est correcte
    cy.url().should('include', '/expected-redirect-url');
    cy.contains('Merci pour votre inscription').should('be.visible'); // Adjustez selon le message de confirmation attendu
  });
});

// Test de connexion
describe('Test de connexion', () => {
  beforeEach(() => {
    cy.visit('http://151.80.32.16:8965/');
  });

  it('Test de connexion', () => {
    // Cliquez sur le lien de connexion dans la barre de navigation
    cy.get('.navbar-collapse ul li:last-child a').click();

    // Remplissez le champ email
    cy.get('#mailco').type('ben@intraneos-synergy.com');

    // Vérifiez la valeur du champ email
    cy.get('#mailco').should('have.value', 'ben@intraneos-synergy.com');

    // Remplissez le champ mot de passe
    cy.get('#connecttoaccount input[type=password]').type('password123');

    // Cliquez sur le bouton de soumission dans le formulaire de connexion
    cy.get('#connecttoaccount .submit-button').should('be.visible').click();

    // Vérifiez que l'URL inclut "/index.php" après la connexion
    cy.url().should('include', '/index.php');
  });
});
