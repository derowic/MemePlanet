describe('template spec', () => {
    it('passes', () => {
        cy.visit('http://127.0.0.1:8000/');
        cy.get('.border-r-2').click();

        cy.get('#email').type("admin@localhost");
        cy.get('#password').type("12345678");
        cy.get('.inline-flex').click();

        // Asercja, że zalogowano pomyślnie
        cy.contains('English').should('exist').click();
        
        
        cy.get(':nth-child(1) > :nth-child(1) > .flex-wrap > div.mt-2 > .mb-2').click();
        
        cy.get('.grid > :nth-child(1) > :nth-child(1) > :nth-child(2)').invoke('text').then((text) => {
            cy.log(text);
            let userName = text;
            cy.wrap(userName).as('userName')
        });
        cy.get('.grid > :nth-child(1) > :nth-child(1) > :nth-child(2)').then(($btn) => {
           // userName = $btn.text()
            // $btn is the object that the previous command yielded
          })
          /*
        cy.get('.grid > :nth-child(1) > :nth-child(1) > :nth-child(2)').invoke('text').then((text) => {
            cy.log(text);
            userName = text.trim();
            // Tutaj możesz wykorzystać zmienną "text" do dalszych działań lub asercji
        });
        */


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

        // Asercja, że Toastify__toast-body został wyświetlony
        cy.get('.Toastify__toast-body > :nth-child(2)').should('exist').then(element => {
            if (element.text().includes('User banned')) {
                cy.contains('User banned').should('exist').should('be.visible');
            } else if (element.text().includes('This user is already banned')) {
                cy.contains('This user is already banned').should('exist').should('be.visible');
            } else {
                // Dodaj odpowiednią logikę w przypadku, gdy tekst nie jest zgodny z oczekiwaniami
            }
        });

        cy.get('.text-white-500').click();

        // Asercja, że przycisk "text-white-500" jest dostępny
        cy.get(':nth-child(1) > .inline-flex > .text-white-500').should('exist').click();

        // Asercja, że userName jest dostępny
        //cy.get('.flex > .text-base').contains(userName)

        cy.get('@userName').then(userName => {
            //expect(wags).to.contain("Portsmouth")
            cy.get('.flex > .text-base').contains(userName)
         });
    });
});
