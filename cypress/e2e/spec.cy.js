import 'cypress-file-upload';

describe('Test de 0Bank', () => {
  beforeEach(() => {
    cy.visit('http://151.80.32.16:8965/')
  })

  it('Test de la page d\'accueil', () => {
    cy.get('.navbar-collapse ul li:nth-child(2) a').should('have.text', 'Ouvrir mon compte')
    cy.get('.navbar-collapse ul li:nth-child(3) a').should('have.text', 'Connexion')
  })


  it('Test du bouton "Ouvrir mon compte"', () => {
    // Cliquer sur le bouton "Ouvrir mon compte"
    cy.get('.navbar-collapse ul li:nth-child(2) a').click();

    // Vérifier que la page d'ouverture de compte est affichée
    cy.url().should('include', '#openaccount');
  });

  it('Test du bouton "Retour"', () => {
    // D'abord, aller à une autre page pour tester le retour
    cy.get('.navbar-collapse ul li:nth-child(2) a').click();
    cy.wait(1000); // Attendre que la page se charge

    // Cliquer sur le bouton "Retour"
    cy.get('.navbar-collapse ul li:nth-child(1) a').click();

    // Vérifier que la page principale est affichée
    cy.url().should('include', '#');
  });

  it('Test du bouton "Nos Tarifs"', () => {
    // Cliquer sur le bouton "Nos Tarifs"
    cy.contains('button', 'Nos Tarifs').click();

    // Vérifier que la page des tarifs est affichée (ajuster l'URL attendue selon votre application)
    // Assurez-vous que l'URL de la page des tarifs est correcte dans l'application
    cy.url().should('include', 'expected-tarif-page-url');
  });

  it('Test des boutons dans la zone Footer', () => {
    // Test du bouton "Ouvrir mon compte" dans le footer
    cy.get('footer a[href="#openaccount"]').click();
    cy.url().should('include', '#openaccount');

    // Retour à la page principale
    cy.visit('http://151.80.32.16:8965/');

    // Test du bouton "Me connecter" dans le footer
    cy.get('footer a[href="#connecttoaccount"]').click();
    cy.url().should('include', '#connecttoaccount');

    // Retour à la page principale
    cy.visit('http://151.80.32.16:8965/');

    // Test du bouton "Accès interne" dans le footer
    cy.get('footer a[href="#banker"]').click();
    cy.url().should('include', '#banker');
  });

  it('Test du bouton "Condition Générale de vente" dans le footer', () => {
    // Cliquer sur le bouton "Condition Générale de vente"
    cy.get('footer a[href="cgv.php"]').click();

    // Vérifier que la page des CGV est affichée (ajuster l'URL attendue selon votre application)
    cy.url().should('include', 'cgv.php');
  });

  it('Test du bouton "Condition tarifaire" dans le footer', () => {
    // Cliquer sur le bouton "Condition tarifaire"
    cy.get('footer a:contains("Condition tarifaire")').click();

    // Vérifier que la page des conditions tarifaires est affichée (ajuster l'URL attendue selon votre application)
    cy.url().should('include', 'expected-condition-tarifaire-page-url');
  });
});


describe('Test de connexion', () => {
  beforeEach(() => {
    cy.visit('http://151.80.32.16:8965/')
  })

  it("Test de connexion", () => {
    // Cliquez sur le lien de connexion dans la barre de navigation
    cy.get(".navbar-collapse ul li:last-child a").click();

    // Remplissez le champ email et vérifiez la valeur
    cy.get("#mailco").type("test@test.com");
    cy.get("#mailco").should("have.value", "test@test.com");

    // Remplissez le champ mot de passe et vérifiez la valeur
    cy.get("#connecttoaccount input[type=password]").type("test");
    cy.get("#connecttoaccount input[type=password]").should("have.value", "test");

    // Cliquez sur le bouton de soumission dans le formulaire de connexion
    cy.get("#connecttoaccount .submit-button").should('be.visible').click();

    // Vérifiez que l'URL inclut "/index.php" après la connexion
    cy.url().should("include", "/index.php");
  })
})

describe('Test du formulaire "Ouvrir mon compte"', () => {
  beforeEach(() => {
    cy.visit('http://151.80.32.16:8965/')
  })
  it('Test du formulaire "Ouvrir mon compte"', () => {
    cy.get('.navbar-collapse ul li:nth-child(2) a').click();
    cy.url().should('include', '#openaccount');

    // Remplir le formulaire
    cy.get('#openaccount input[name="lastname"]').type('Doe');
    cy.get('#openaccount input[name="firstname"]').type('John');
    cy.get('#openaccount input[name="born"]').type('1980-01-01');
    cy.get('#openaccount input[name="adre"]').type('123 Main St');
    cy.get('#openaccount input[name="pcode"]').type('75001');
    cy.get('#openaccount input[name="pi"]').attachFile('../assets/imageTest.png'); // Chemin vers votre fichier d'image
    cy.get('#openaccount input[name="mail"]').type('ben@intraneos-synergy.com'); // Utilisation de l'email souhaité
    cy.get('#openaccount input[name="pass"]').type('password123');
    cy.get('#openaccount input[name="passverif"]').type('password123');
    cy.get('#openaccount input[name="cguvalid"]').check();

    // Soumettre le formulaire
    cy.get('button[type="submit"]').click();

    // Vérifier que la redirection ou la réponse attendue est correcte
    cy.url().should('include', '/expected-redirect-url');
    cy.contains('Merci pour votre inscription').should('be.visible'); // Adjustez selon le message de confirmation attendu
  });
});

describe('Test inscription/connexion d\'un compte', () => {
  beforeEach(() => {
    cy.visit('http://151.80.32.16:8965/')
  })
  it('Test inscription/connexion d\'un compte', () => {
    cy.get('.navbar-collapse ul li:nth-child(2) a').click();
    cy.url().should('include', '#openaccount');

    // Remplir le formulaire
    cy.get('#openaccount input[name="lastname"]').type('Doe');
    cy.get('#openaccount input[name="firstname"]').type('John');
    cy.get('#openaccount input[name="born"]').type('1980-01-01');
    cy.get('#openaccount input[name="adre"]').type('123 Main St');
    cy.get('#openaccount input[name="pcode"]').type('75001');
    cy.get('#openaccount input[name="pi"]').attachFile('../assets/imageTest.png'); // Chemin vers votre fichier d'image
    cy.get('#openaccount input[name="mail"]').type('ben@intraneos-synergy.com'); // Utilisation de l'email souhaité
    cy.get('#openaccount input[name="pass"]').type('password123');
    cy.get('#openaccount input[name="passverif"]').type('password123');
    cy.get('#openaccount input[name="cguvalid"]').check();

    // Soumettre le formulaire
    cy.get('button[type="submit"]').click();

    // Vérifier que la redirection ou la réponse attendue est correcte
    cy.url().should('include', '/expected-redirect-url');
    cy.contains('Merci pour votre inscription').should('be.visible'); // Adjustez selon le message de confirmation attendu

    // Cliquez sur le lien de connexion dans la barre de navigation
    cy.get(".navbar-collapse ul li:last-child a").click();

    // Remplissez le champ email et vérifiez la valeur
    cy.get("#mailco").type("test@test.com");
    cy.get("#mailco").should("have.value", "test@test.com");

    // Remplissez le champ mot de passe et vérifiez la valeur
    cy.get("#connecttoaccount input[type=password]").type("test");
    cy.get("#connecttoaccount input[type=password]").should("have.value", "test");

    // Cliquez sur le bouton de soumission dans le formulaire de connexion
    cy.get("#connecttoaccount .submit-button").should('be.visible').click();

    // Vérifiez que l'URL inclut "/index.php" après la connexion
    cy.url().should("include", "/index.php");
  });
})

