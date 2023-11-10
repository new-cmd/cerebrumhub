beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

/*
BONUS TASK: add visual tests for registration form 3
Task list:
* Test suite for visual tests for registration form 3 is already created
* Create tests to verify visual parts of the page:
    * radio buttons and its content
    * dropdown and dependencies between 2 dropdowns
    * checkboxes, their content and links
    * email format
 */

describe('Section 1: Visual tests for registration form 3', () => {

    it('Cerebrum Hub logo test', () => {
        cy.log('Will check logo source and size')
        cy.get('[data-testid="picture"]').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        cy.get('[data-testid="picture"]').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    })

    it('Check that radio button list is correct', () => {
        cy.get('input[type="radio"]').should('have.length', 4)

        cy.get('input[type="radio"]').next().eq(0).should('have.text', 'Daily')
        cy.get('input[type="radio"]').next().eq(1).should('have.text', 'Weekly')
        cy.get('input[type="radio"]').next().eq(2).should('have.text', 'Monthly')
        cy.get('input[type="radio"]').next().eq(3).should('have.text', 'Never')

        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(2).check().should('be.checked')
        cy.get('input[type="radio"]').eq(3).check().should('be.checked')
    })

    it('Country dropdown is correct', () => {
        cy.get('#country').select(1).screenshot('Country drop-down')
        cy.screenshot('Full page screenshot')

        cy.get('#country').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['', 'object:3', 'object:4', 'object:5'])
    })

    it('City dropdown is correct', () => {
        cy.get('#country').select('Spain')
        cy.screenshot('Full page screenshot')
        cy.get('#city').find('option').eq(0).should('have.text', '')
        cy.get('#city').find('option').eq(1).should('have.text', 'Malaga')
        cy.get('#city').find('option').eq(2).should('have.text', 'Madrid')
        cy.get('#city').find('option').eq(3).should('have.text', 'Valencia')

        cy.get('#country').select('Estonia')
        cy.screenshot('Full page screenshot')
        cy.get('#city').find('option').eq(0).should('have.text', '')
        cy.get('#city').find('option').eq(1).should('have.text', 'Tallinn')
        cy.get('#city').find('option').eq(2).should('have.text', 'Haapsalu')
        cy.get('#city').find('option').eq(3).should('have.text', 'Tartu')

        cy.get('#country').select('Austria')
        cy.screenshot('Full page screenshot')
        cy.get('#city').find('option').eq(0).should('have.text', '')
        cy.get('#city').find('option').eq(1).should('have.text', 'Vienna')
        cy.get('#city').find('option').eq(2).should('have.text', 'Salzburg')
        cy.get('#city').find('option').eq(3).should('have.text', 'Innsbruck')
    })

    it('Check that check boxes working', () => {
        cy.get('input[type="checkbox"]').should('have.length', 2).should('not.be.checked')

        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')

        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')

        cy.get('button').should('have.text', 'Accept our cookie policy')
        cy.get('button').children().should('be.visible').and('have.attr', 'href', 'cookiePolicy.html').click()

        cy.url().should('contain', '/cookiePolicy.html')

        cy.go('back')
        cy.log('Back again in registration form 3')
    })

    it('Check email format', () => {
        cy.get('input[type="email"]').type('invalid')
        cy.get('[ng-show="myForm.email.$error.email"]').should('be.visible').should('contain', 'Invalid email address.')
        cy.get('input[type="email"]').clear().type(' ')
        cy.get('[ng-show="myForm.email.$error.required"]').should('be.visible').should('contain', 'Email is required.')
    })

    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img[data-testid="picture"]').should('have.attr', 'src').should('include', 'cerebrum_hub_logo.png')

        cy.get('img[data-testid="picture"]').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    })
})

/*
BONUS TASK: add functional tests for registration form 3
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + validation
    * only mandatory fields are filled in + validations
    * mandatory fields are absent + validations (try using function)
    * If city is already chosen and country is updated, then city choice should be removed
    * add file (google yourself for solution)
 */

describe('Section 2: Functional tests for registration form 3', () => {
        it('All fields are filled in + validation', () => {
            cy.get('#name').clear().type('Andre')
            cy.get('[name="email"]').type('andre@cerebrumhub.com')
            cy.get('#country').select('Estonia')
            cy.get('#city').select('Tallinn')
            cy.get('[type="date"]').first().click().type('2003-09-09')
            cy.get('input[type="radio"]').eq(3).check().should('be.checked')
            cy.get('#birthday').click().type('2003-09-09')
            cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
            cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
            cy.get('input[type="submit"]').last().should('be.visible')
        })

        it('Only mandatory fields are filled in + validations', () => {
            cy.get('[name="email"]').type('andre@cerebrumhub.com')
            cy.get('#country').select('Estonia')
            cy.get('#city').select('Tallinn')
            cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
            cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
            cy.get('input[type="submit"]').last().should('be.visible')
            cy.get('[ng-disabled="myForm.$invalid"]').should('not.have.attr', 'disabled')
        })

        it('Mandatory fields are absent + validations', () => {
            cy.get('#name').clear().type('Andre')
            cy.get('[type="date"]').first().click().type('2003-09-09')
            cy.get('input[type="radio"]').eq(3).check().should('be.checked')
            cy.get('#birthday').click().type('2003-09-09')
            cy.get('[ng-disabled="myForm.$invalid"]').should('have.attr', 'disabled')
        })

        it('If city is already chosen and country is updated, then city choice should be removed', () => {
            cy.get('#country').select('Estonia')
            cy.get('#city').select('Tallinn')
            cy.get('#country').select('Spain')
            cy.get('#city').should('not.be.selected')
        })

        it('User can attach file and submit data', () => {
            cy.get('#myFile').selectFile('load_this_file_reg_form_3.txt')
            cy.get('input[type="submit"]').first().click()
            cy.go('back')
            cy.log('Back again in registration form 3')
        })
    })
})