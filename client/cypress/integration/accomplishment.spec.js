/// <reference types="cypress" />

describe("Accomplishment Dashboard", () => {
    beforeEach(() => {
        cy.visit('/accomplishments')
    })


    it("it should display an error of inappropriate message when text is giraffe", () => {
        cy.get("[data-cy=accomplishment-title-input]").type("This is my accomplishment");
        cy.get("[placeholder='My accomplishment...']").type("I have a giraffe");
        cy.get("[type='checkbox']").click();
        cy.get("[class='Accomplishment-btn']").click();
        cy.contains("Your content is not appropriate").should("be.visible");
    })


    it("it should display an error of inappropriate message when text is giraffe with mock", () => {

        //mock a handler instead of using fixture
        cy.intercept("POST", "http://localhost:4000/", (req) => {
            req.reply((res) => {
                res.send({
                    msg: "Your content is not appropriate"
                })
            })


        })
        cy.get("[data-cy=accomplishment-title-input]").type("This is my accomplishment");
        cy.get("[placeholder='My accomplishment...']").type("I have a giraffe");
        cy.get("[type='checkbox']").click();
        cy.get("[class='Accomplishment-btn']").click();
        cy.contains("Your content is not appropriate").should("be.visible");
    })

})