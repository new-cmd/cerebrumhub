describe('Time estimation/tracking functionality', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task').click();
    });
});

    const getTimeTrackingModal = () => cy.get('[data-testid="icon:stopwatch"').click();
    const getTimeSpentInput = () => cy.contains('div', 'Time spent (hours)').next('div').find('input');
    const changeValueOnTimeSpent = spentHours => getTimeSpentInput().should('exist').clear().type(spentHours);
    const clearValueOnTimeSpent = () => getTimeSpentInput().clear();
    const assertRightValueOnTimeSpent = spentHours => getTimeSpentInput().should('exist').should('have.value', spentHours);
    const assertEmptyTimeSpent = () => getTimeSpentInput().should('exist').should('have.value', '');

    it('Should add, edit and clear time', () => {

    cy.get('input[placeholder="Number"]').clear()
    cy.get('input[placeholder="Number"]').type('22');
    cy.get('input[value="22"]').should('be.visible');
    cy.get('input[placeholder="Number"]').clear().type('55');
    cy.get('input[value="55"]').should('be.visible');
    cy.get('input[placeholder="Number"]').clear()
    cy.get('input[placeholder="Number"]').should('be.empty')
});

    it('Should add, edit and delete time', () => {

        const originalValue = 4;
        const timeChange1 =1;
        const timeChange2 = 55;
        
        getTimeTrackingModal();
        assertRightValueOnTimeSpent(originalValue);

        changeValueOnTimeSpent(timeChange1);
        assertRightValueOnTimeSpent(timeChange1);

        changeValueOnTimeSpent(timeChange2);
        assertRightValueOnTimeSpent(timeChange2);

        clearValueOnTimeSpent();
        assertEmptyTimeSpent();
    });
});