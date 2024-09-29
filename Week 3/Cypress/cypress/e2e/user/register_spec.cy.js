import { RegisterPage } from "../pages/register_page";

const registerPage = new RegisterPage();

describe('/register', () => {
    beforeEach(() => {
        cy.visit("https://conduit.realworld.how/register");
    });

    it('Greets with Sign up', () => {
        cy.contains('h1', 'Sign up');
    });

    it('Links to /login', () => {
        cy
            .contains('Have an account?')
            .should('have.attr', 'href', '/login');
    });

    it('Prevents us from clicking Sign up until all three fields are filled', () => {
        registerPage.getSignupButton().should('be.disabled');

        registerPage.submitUsername("oihgwoi");
        registerPage.getSignupButton().should('be.disabled');

        registerPage.submitEmail("nabvo@gmail.com");
        registerPage.getSignupButton().should('be.disabled');

        registerPage.submitPassword("rehahjj64");
        registerPage.getSignupButton().should('not.be.disabled');
    });

    it('Cannot use user email that has already been taken', () => {
        cy.fixture('users').then((users) => {
            registerPage.submitUsername("hgowreowh");
            registerPage.submitEmail(users.email);
            registerPage.submitPassword(users.password);
            registerPage.clickSubmit();
            cy.get('.error-messages > li')
                .contains('email has already been taken');
        });
    });
    
    it('Navigates to homepage on successful register', () => {
        cy.fixture('users').then((users) => {
            const now = Date.now();

            registerPage.submitUsername(now);
            registerPage.submitEmail(now);
            registerPage.submitPassword(users.password);
            registerPage.clickSubmit();
            cy.url().should('eq', 'https://conduit.realworld.how/');
        });
    });
});