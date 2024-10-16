describe("template spec", () => {
    it("passes", () => {
        cy.visit("http://127.0.0.1:8000/");
        cy.get(".border-r-2").click();
        cy.wait(2500);
        cy.get("#email").type("admin@localhost");
        cy.get("#password").type("12345678");
        cy.get(".inline-flex").click();
        cy.wait(2500);
        cy.contains("English").click();

        cy.get(
            ":nth-child(1) > :nth-child(1) > .flex-wrap > div.mt-2 > .mb-2",
        ).click();

        for (let i = 0; i < 2; i++) {
            cy.get(
                ":nth-child(1) > :nth-child(1) > .flex-wrap > :nth-child(2) > .mt-2",
            ).click();
            cy.wait(100);
            cy.get(".Toastify__toast-body > :nth-child(2)").then((element) => {
                if (element.text().includes("Post added to favourite")) {
                    cy.contains("Post added to favourite")
                        .should("exist")
                        .should("be.visible");
                } else if (
                    element.text().includes("Post removed from favourites")
                ) {
                    cy.contains("Post removed from favourites")
                        .should("exist")
                        .should("be.visible");
                } else {
                }
            });
        }
    });
});
