import { RegisterPage } from "../e2e/pages/register_page";

const registerPage = new RegisterPage();

export function registerNewUser() {
    const now = Date.now();
    const email = `${now}@email.com`;

    cy.visit("https://conduit.realworld.how/register");
    registerPage.submitUsername(now);
    registerPage.submitEmail(email);
    registerPage.submitPassword(now);
    registerPage.clickSubmit();
    cy.url().should('eq', 'https://conduit.realworld.how/');
    return { username: now, email: email, password: now };
}