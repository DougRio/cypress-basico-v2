describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  it('verifica o titulo da aplicacao', () => {
    cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
  })

  it('Preenche os campos  obrigatorios e envia o formulario', () => {
    cy.get('#firstName').type('Douglas')
    cy.get('#lastName').type('Lima')
    cy.get('#email').type('douglas.lima@test.com')
    cy.get('#open-text-area').type('Obrigado!')
    cy.get('.button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })


})
