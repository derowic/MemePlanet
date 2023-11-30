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
       
        cy.get(':nth-child(1) > :nth-child(1) > .flex-wrap > div.mt-2 > .mb-2').click();
        cy.get('.grid > :nth-child(1) > :nth-child(1) > :nth-child(2)')
        cy.wait(50);

        const selector = ':nth-child(1) > :nth-child(1) > .flex-wrap > div.mt-2 > .mb-2';
        cy.get(selector).then(($element) => {
        const currentStyles = $element.attr('class');
        cy.get(selector).click();

        cy.get(selector).should(($changedElement) => {
            const changedClasses = $changedElement.attr('class');
            expect(changedClasses).to.include('mb-2', 'mr-2', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded-lg', 'border', 'border-meme_violet');
        });
        });
    });
});
  