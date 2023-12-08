describe('Issue comments creating, editing and deleting', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
        });
    });

    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
    it('Create a comment', () => {
         const comment = 'TEST_COMMENT';
        getIssueDetailsModal().within(() => {
            cy.contains('Add a comment...')
                .click();
            cy.get('textarea[placeholder="Add a comment..."]').type(comment);
            cy.contains('button', 'Save')
                .click()
                .should('not.exist');
            cy.contains('Add a comment...').should('exist');
            cy.get('[data-testid="issue-comment"]').should('contain', comment);
        });
    });

    it('Edit a comment', () => {
        const editedComment = 'An old silent pond...';
        const comment = 'TEST_COMMENT_EDITED';
        getIssueDetailsModal().within(() => {
            cy.get('[data-testid="issue-comment"]')
                .first()
                .contains('Edit')
                .click()
                .should('not.exist');
            cy.get('textarea[placeholder="Add a comment..."]')
                .should('contain', editedComment)
                .clear()
                .type(comment);
            cy.contains('button', 'Save')
                .click()
                .should('not.exist');
            cy.get('[data-testid="issue-comment"]')
                .should('contain', 'Edit')
                .and('contain', comment);
        });
    });

    it('Delete a comment', () => {
        getIssueDetailsModal()
            .find('[data-testid="issue-comment"]')
            .contains('Delete')
            .click();
        cy.get('[data-testid="modal:confirm"]')
            .contains('button', 'Delete comment')
            .click()
            .should('not.exist');
        getIssueDetailsModal()
            .find('[data-testid="issue-comment"]')
            .should('not.exist');
    });

    it('Create, edit and delete a comment', ()=> {
        const comment = 'TEST_COMMENT';
        const editedComment = 'NEW_TEST_COMMENT'
        getIssueDetailsModal().within(() => {
            cy.contains('Add a comment...')
                .click();
            cy.get('textarea[placeholder="Add a comment..."]').type(comment);
            cy.contains('button', 'Save')
                .click()
                .should('not.exist');
            cy.contains('Add a comment...').should('exist');
            cy.get('[data-testid="issue-comment"]')
                .should('contain', comment)
                .contains('Edit')
                .click()
                .should('not.exist');
            cy.get('textarea[placeholder="Add a comment..."]')
                .should('contain', comment)
                .clear()
                .type(editedComment);
            cy.contains('button', 'Save')
                .click()
                .should('not.exist');
            cy.get('[data-testid="issue-comment"]')
                .should('contain', 'Edit')
                .and('contain', editedComment)
                .contains('Delete')
                .click();
    });

        cy.get('[data-testid="modal:confirm"]')
            .contains('button', 'Delete comment')
            .click()
            .should('not.exist');
        getIssueDetailsModal()
            cy.get('[data-testid="issue-comment"]')
                .contains(editedComment)
                .should('not.exist');
    });
});