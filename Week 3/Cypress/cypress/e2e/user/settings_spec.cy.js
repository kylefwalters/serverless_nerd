import { registerNewUser } from "../../support/utility";

describe('/settings', () => {
    let newUser;
    beforeEach(() => {
        newUser = registerNewUser();
        cy.get(".container > .nav > :nth-child(3) > .nav-link").click();
    });

    it('Greeted by settings page', () => {
        cy.get(".text-xs-center").contains("Your Settings");
    });

    it('Update username after changing it in settings', () => {
        const newUsername = Date.now();
        cy.get(":nth-child(2) > .form-control").type(newUsername);
        cy.get("form.ng-untouched > :nth-child(1) > .btn").click();
        cy.url().should('eq', `https://conduit.realworld.how/profile/${newUsername}`);
        cy.get("h4").contains(newUsername);
    });

    it('Returns to homepage on logout', () => {
        cy.get(".btn-outline-danger").click();
        cy.url().should("eq", "https://conduit.realworld.how/");
    });

    it('Profile image should change after profile URL is updated', () => {
        const newImage = "https://i5.walmartimages.com/seo/Fresh-Slicing-Tomato-Each_9f8b7456-81d0-4dc2-b422-97cf63077762.0ddba51bbf14a5029ce82f5fce878dee.jpeg";
        cy.get(":nth-child(1) > .form-control").type(newImage);
        cy.get("form.ng-untouched > :nth-child(1) > .btn").click();
        cy.url().should('include', `https://conduit.realworld.how/profile/`);
        cy.get(".user-img");
    });
});