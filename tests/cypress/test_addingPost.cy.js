describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:8000/');
    cy.get('.border-r-2').click();
    cy.wait(2500);
    cy.get('#email').type("admin@localhost");
    cy.get('#password').type("12345678");
    cy.get('.inline-flex').click();
    cy.wait(2500);
   	cy.contains('English').click();
   	cy.get('#yourImage260').click();
   	cy.get('.flex-col > :nth-child(2) > .bg-meme_black > .ml-5').type("12345678");
   	cy.contains('Add comment').click();
   	cy.wait(100);
   	cy.get('.Toastify__toast-body > :nth-child(2)').should('exist');
	cy.contains('Comment added').should('be.visible');
  });
});
