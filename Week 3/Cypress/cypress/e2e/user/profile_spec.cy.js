import { LoginPage } from "../pages/login_page";
import { registerNewUser } from "../../support/utility";

const loginPage = new LoginPage();

describe('/profile', () => {
    let newUser;
    beforeEach(() => {
        newUser = registerNewUser();
        cy.url().should("eq", "https://conduit.realworld.how/");
        cy.get(":nth-child(4) > .nav-link").click();
    });

    it('Greets with user profile', () => {
        cy.get("h4").contains(newUser.username);
        cy.get(".btn").contains("Edit Profile Settings");
    });

    it('Links to settings', () => {
        cy.get(".btn").contains("Edit Profile Settings").should("have.attr", "href", "/settings");
    });

    it('My Posts is empty', () => {
        cy.get(".article-preview").contains("No articles are here... yet.");
    });
});