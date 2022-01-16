import { cy, it } from 'local-cypress'

describe('test profile', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000')
	})

	it('should be in profile', () => {

		cy.get('#floatingInput')
			.type('a@a.com', {delay: 100}).should('have.value', 'a@a.com')
		cy.get('#floatingPassword')
			.type('a', {delay: 100}).should('have.value', 'a')

		cy.get('[data-cy="checkbox"]').not('[disabled]')
			.check().should('be.checked')

		cy.get('[data-cy="submit"]').click()

		cy.get(':nth-child(3) > a').click()
		cy.contains('Trang')

		cy.get('img').click()

		cy.get('.rounded-lg > ul > :nth-child(2) > a').click()
		cy.contains('Hendriks')

		cy.get('img').click()

		cy.get('.max-w-md.pl-10 > .rounded-lg > .border-gray-500')
			.type('t', {delay: 100}).should('have.value', 't')

		cy.get('.border > a').click()
		cy.contains('de Moor')
	});

})



