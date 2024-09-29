import { registerNewUser } from "../../support/utility";
import { CreateArticlePage } from "../pages/createArticlePage";

const createArticlePage = new CreateArticlePage();

describe('/editor', () => {
    let newUser;
    beforeEach(() => {
        newUser = registerNewUser();
        cy.url().should("eq", "https://conduit.realworld.how/");
        cy.get(".container > .nav > :nth-child(2) > .nav-link").click();
    });

    it('Greets with fields for creating article', () => {
        cy.get(":nth-child(1) > .form-control");
    });

    it('Cannot publish article if entry is blank', () => {
        createArticlePage.submitTitle("Title");
        createArticlePage.publishArticle();
        cy.get(".error-messages > li").contains("description can't be blank");
    });

    it('Entering tag creates tag element', () => {
        const tagName = "Tag";
        createArticlePage.submitTag(tagName);
        cy.get(".tag-list > :nth-child(1)").contains(tagName);
    });

    it('Pressing x on tag removes tag', () => {
        const tagName = "Tag";
        createArticlePage.submitTag(tagName);
        cy.get(".tag-list > :nth-child(1) > .ion-close-round").click();
        cy.get(".tag-list > :nth-child(1)").should("not.exist");
    });

    it('Navigates to new article on successful publish', () => {
        const title = "Title";
        createArticlePage.submitTitle(title);
        createArticlePage.submitSubject("Subject");
        createArticlePage.submitArticleText("Article text here");
        createArticlePage.publishArticle();
        cy.url().should('include', `https://conduit.realworld.how/article/${title}`);
    });
});