import { cy, it } from 'local-cypress'

describe('test logout', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000')
	})

	it('should be logged out', () => {

		cy.get('#floatingInput')
			.type('a@a.com', {delay: 100}).should('have.value', 'a@a.com')
		cy.get('#floatingPassword')
			.type('a', {delay: 100}).should('have.value', 'a')

		cy.get('[data-cy="checkbox"]').not('[disabled]')
			.check().should('be.checked')

		cy.get('[data-cy="submit"]').click()

		cy.get('[data-cy="logout"]').click()

		cy.contains('Sign in')
	});
})