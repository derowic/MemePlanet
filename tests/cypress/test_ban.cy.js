describe('template spec', () => {
    it('passes', () => {
        cy.visit('http://127.0.0.1:8000/');
        cy.get('.border-r-2').click();
        cy.get('#email').type("admin@localhost");
        cy.get('#password').type("12345678");
        cy.get('.inline-flex').click();
        cy.contains('English').should('exist').click();
        cy.get(':nth-child(1) > :nth-child(1) > .flex-wrap > div.mt-2 > .mb-2').click();
        cy.get('.grid > :nth-child(1) > :nth-child(1) > :nth-child(2)').invoke('text').then((text) => {
            cy.log(text);
            let userName = text;
            cy.wrap(userName).as('userName')
        });
        cy.get(':nth-child(1) > :nth-child(1) > .justify-center > :nth-child(2) > .mt-2').click();
        cy.get('.mt-4 > :nth-child(1) > :nth-child(1) > .mt-2').click();
        cy.get('.mt-4 > :nth-child(2) > :nth-child(1) > .mt-2').click();

        cy.get('#headlessui-dialog-panel-\\:r7s\\:')
            .find('button:contains("Ban")')
            .should('exist')
            .click();
        
        cy.get('#headlessui-dialog-panel-\\:r7s\\:')
            .find('button:contains("Close")')
            .should('exist')
            .click();

        cy.get('.Toastify__toast-body > :nth-child(2)').should('exist').then(element => {
            if (element.text().includes('User banned')) {
                cy.contains('User banned').should('exist').should('be.visible');
            } else if (element.text().includes('This user is already banned')) {
                cy.contains('This user is already banned').should('exist').should('be.visible');
            }
        });

        cy.get('.text-white-500').click();
        cy.get(':nth-child(1) > .inline-flex > .text-white-500').should('exist').click();
        cy.get('@userName').then(userName => {
            cy.get('.flex > .text-base').contains(userName)
         });
    });
});
