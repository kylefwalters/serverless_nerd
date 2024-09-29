import { LoginPage } from "./login_page";

export class RegisterPage extends LoginPage {
    usernameSelector = ':nth-child(1) > .form-control';

    submitUsername(username){
        cy.get(this.usernameSelector).type(username);
    }

    getSignupButton() {
        return cy.get('form').contains('Sign up');
    }
}