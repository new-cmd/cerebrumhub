beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', () => {
        // 1. Add test steps for filling in only mandatory fields
        cy.get('#username').type('Something')
        cy.get('#email').type('andre@cerebrumhub.com')
        cy.get("input[data-cy='name']").type('Andre')
        cy.get('#lastName').type('Trahhov')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('#password').type('@Andre_111')
        cy.get('#confirm').type('@Andre_222')

        // 2. Assert that submit button is not enabled
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('not.be.enabled')

        // 3. Assert that successful message is not visible
        cy.get('#success_message').should('not.be.visible')

        // 4. Assert that error message is visible
        cy.get('#password_error_message').should('be.visible')
    })

    it('User can submit form with all fields added', () => {
        // 1. Add test steps for filling in ALL fields
        cy.get('#username').type('Something')
        cy.get('#email').type('andre@cerebrumhub.com')
        cy.get('input[data-cy="name"]').type('Andre')
        cy.get('#lastName').type('Trahhov')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')

        // 2. Please select your favorite Web language:
        cy.get('#htmlFavLanguage').check()
        cy.get('#cssFavLanguage').check()
        cy.get('#javascriptFavLanguage').check()
        cy.get('#phpFavLanguage').check()

        // 3. Your favourite transport
        cy.get('#vehicle1').check()
        cy.get('#vehicle2').check()
        cy.get('#vehicle3').check()

        // 4. Select a car
        cy.get('#cars').select('volvo')
        cy.get('#cars').select('saab')
        cy.get('#cars').select('opel')
        cy.get('#cars').select('audi')

        // 5. Select your favourite animal
        cy.get('#animal').select('dog')
        cy.get('#animal').select('cat')
        cy.get('#animal').select('snake')
        cy.get('#animal').select('hippo')
        cy.get('#animal').select('cow')
        cy.get('#animal').select('mouse') // Wrong script <option value="mouse">Horse</option> !!

        // 6. Password section
        cy.get('#password').type('@Andre_111')
        cy.get('#confirm').type('@Andre_111')

        // 7. Assert that submit button is enabled
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').click()

        // 8. Assert that after submitting the form system show successful message
        cy.get('#success_message').should('be.visible')
        cy.get('#success_message').should('have.css', 'display', 'block')
    })

    it('User can submit form with valid data and only mandatory fields added', () => {
        // 1. Add test steps for filling in ONLY!! mandatory fields
        cy.get('#username').type('Something')
        cy.get('#email').type('andre@cerebrumhub.com')
        cy.get('input[data-cy="name"').type('Andre')
        cy.get('#lastName').type('Trahhov')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')

        // 2. Assert that submit button is enabled
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').click()

        // 3. Assert that after submitting the form system shows successful message
        cy.get('#success_message').should('be.visible').should('have.css', 'display', 'block')
    })

    // Example, how to use function
    it('Extra text case', () => {
        inputValidData('Something')
        // 1. Empty email
        cy.get('#email').clear()
        // 2. Assert that submit button is disabled
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')

        // 3. Assert that system show error message
        cy.get('#success_message').should('not.be.visible')
        cy.get('#input_error_message').should('be.visible')
    })
})

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')

        // get element and check its parameter height, to less than 178 and greater than 100
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    })

    it('My test for second picture', () => {
        // Create similar test for checking the second picture
        cy.log('Will check for the second picture')
        cy.get('img[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo.png')
        cy.get('img[data-cy="cypress_logo"]').invoke('height').should('be.lessThan', 89)
            .and('be.greaterThan', 86)
        cy.get('img[data-cy="cypress_logo"]').invoke('width').should('be.lessThan', 120)
            .and('be.greaterThan', 100)
    });

    it('Check navigation part 1', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')

        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()

        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_1.html')

        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    // Create similar test for checking the second link 

    it('Check navigation part 2', () => {
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()
        cy.url().should('contain', '/registration_form_3.html')
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)

        // Verify labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text', 'HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text', 'CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text', 'JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text', 'PHP')

        // Verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    // Create test similar to previous one verifying check boxes
    it('Check that list of checkboxes is correct', () => {
        // Array of found elements with given selector has 3 elements in total
        cy.get('input[type="checkbox"]').should('have.length', 3)

        // Verify labels of the radio buttons
        cy.get('input[type="checkbox"]').next().eq(0).should('have.text', 'I have a bike')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text', 'I have a car')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text', 'I have a boat')

        // Verify default state of radio buttons
        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')

        // Check that it is possible to select multiple checkboxes
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(2).check().should('be.checked')
    })

    it('Car dropdown is correct', () => {
        // Here is an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area, and full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)

        //Check that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')

        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    // Create test similar to previous one

    it('Animals dropdown is correct', () => {
        // Create screenshot from the code
        cy.get('#animal').select(1).screenshot('Animal drop-down')
        cy.screenshot('Full page screenshot')

        // Check length of array of elements in Animal dropdown
        cy.get('#animal').children().should('have.length', 6)
        cy.get('#animal').find('option').should('have.length', 6)

        //Check that first element in the dropdown has text Cat
        cy.get('#animal').find('option').eq(1).should('have.text', 'Cat')

        // Advanced level how to check the content of the Animals dropdown
        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo', 'cow', 'mouse'])
        })
    })
})

function inputValidData(username) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(username)
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    // If element has multiple classes, then one of them can be used
    cy.get('#password').type('MyPass')
    cy.get('#confirm').type('MyPass')
    cy.get('h2').contains('Password').click()
}