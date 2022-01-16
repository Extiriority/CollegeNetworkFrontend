import { cy, it } from 'local-cypress'

describe('test chat', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000')
	})

	it('should send message in chat', () => {

		cy.get('#floatingInput')
			.type('a@a.com', {delay: 100}).should('have.value', 'a@a.com')
		cy.get('#floatingPassword')
			.type('a', {delay: 100}).should('have.value', 'a')

		cy.get('[data-cy="checkbox"]').not('[disabled]')
			.check().should('be.checked')

		cy.get('[data-cy="submit"]').click()

		cy.get('.justify-between > .border')
			.type('Helloo World!', {delay: 100}).should('have.value', 'Helloo World!')

		cy.get('.justify-between > .py-2').click()

		cy.contains('Giang: Helloo World!')

		cy.get('.justify-between > .border')
			.type('This is a nice space 🎨', {delay: 100}).should('have.value', 'This is a nice space 🎨')

		cy.get('.justify-between > .py-2').click()

		cy.contains('Giang: This is a nice space 🎨')
	});
})

