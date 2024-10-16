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
            ":nth-child(1) > :nth-child(1) > .flex-wrap > :nth-child(3) > .mt-2",
        ).click();
        cy.get(".mt-4 > :nth-child(2) > .mt-2").click();
        cy.get(".border-2.border-red-500.px-4.py-2.rounded-lg").click();
        cy.wait(100);

        cy.get(".Toastify__toast-body > :nth-child(2)").then((element) => {
            if (element.text().includes("Thanks")) {
                cy.contains("Thanks").should("exist").should("be.visible");
            } else if (
                element.text().includes("You have already reported this post")
            ) {
                cy.contains("You have already reported this post")
                    .should("exist")
                    .should("be.visible");
            } else {
            }
        });
    });
});
