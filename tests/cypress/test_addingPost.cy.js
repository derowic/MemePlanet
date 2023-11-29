describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:8000/');
    cy.get('.border-r-2').click();
    cy.wait(2500);
    //cy.pause(); // Add this line to pause the test
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

	//cy.contains('Add new post').click();
	// Przygotuj plik, który chcesz przesłać
	//cy.fixture('sample-image.jpg').as('imageFile');

	// Zlokalizuj pole input typu file i przesył plik
	//cy.get('#attr2').attachFile('@imageFile');
	//cy.get('.bg-black3.hover:bg-black3-h.text-white.font-bold.py-2.px-2.border.border-meme_violet.focus:border-[#666].w-full').attachFile('@imageFile');
	//cy.get('.p-4.w-3/4 > :nth-child(1) > .m-2.border').find('button').click();
	//cy.get('.p-4.w-3/4 > :nth-child(1) > .m-2.border button:first-child').find('button').click();
	// W folderze "fixtures" utwórz plik "sample-image.jpg"
	// Przykładowa ścieżka: cypress/fixtures/sample-image.jpg
	//cy.fixture('sample-image.jpg').as('imageFile');
	//cy.get(':nth-child(1) > :nth-child(1) > .flex-wrap > div.mt-2 > .mb-2').click();
	//cy.get(':nth-child(1) > :nth-child(1) > :nth-child(6) > a > .h-\[50vh\] > #yourImageId')

	

  });
});
