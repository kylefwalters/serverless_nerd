export class CreateArticlePage {
    titleSelector = ":nth-child(1) > .form-control";
    subjectSelector = ":nth-child(2) > .form-control";
    articleTextSelector = ":nth-child(3) > .form-control";
    tagSelector = ":nth-child(4) > .form-control";
    publishArticleSelector = ".btn";

    submitTitle(title) {
        cy.get(this.titleSelector).type(title);
    }

    submitSubject(subject) {
        cy.get(this.subjectSelector).type(subject);
    }

    submitArticleText(text) {
        cy.get(this.articleTextSelector).type(text);
    }

    submitTag(tag) {
        cy.get(this.tagSelector).type(tag + "{enter}");
    }

    publishArticle() {
        cy.get(this.publishArticleSelector).click();
    }
}