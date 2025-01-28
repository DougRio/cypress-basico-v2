/// reference types="Cypress' />
describe('Central de Atendimento ao cliente TAT', () => {
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
    cy.contains('button' , 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('Preenche o campo  telefone e envia o formulario', () => {
    cy.get('#firstName').type('Douglas')
    cy.get('#lastName').type('Lima')
    cy.get('#email').type('douglas.lima@test.com')
    cy.get('#phone').type('5521993261754')
    cy.get('#open-text-area').type('Obrigado!')
    cy.contains('button' , 'Enviar').click()

    cy.get('.success').should('be.visible')
  })


  it('Preenche os campos obrigatorios e envia o formulario com texto longo', () => {
    const longText = Cypress._.repeat('abcdefghijklmnopqrstvuwyxz',10)

    cy.get('#firstName').type('Douglas')
    cy.get('#lastName').type('Lima')
    cy.get('#email').type('douglas.lima@test.com')
    cy.get('#open-text-area').type(longText, {delay:0})
    cy.contains('button' , 'Enviar').click()

    cy.get('.success').should('be.visible')
  })  

  it('Exibe msg de erro ao submeter o formulario com um email com formato invalido', () => {

    cy.get('#firstName').type('Douglas')
    cy.get('#lastName').type('Lima')
    cy.get('#email').type('douglas.lima&test.com')
    cy.get('#open-text-area').type('text')
    cy.contains('button' , 'Enviar').click()

    cy.get('.error').should('be.visible')
  })  

  it('Exibe msg de erro quando telefone se torna obrigatorio e numero nao foi preenchido', () => {

    cy.get('#firstName').type('Douglas')
    cy.get('#lastName').type('Lima')
    cy.get('#email').type('douglas.lima@test.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('text')
    cy.contains('button' , 'Enviar').click()

    cy.get('.error').should('be.visible')
  })  

  it('Exibe msg de erro quando telefone se torna obrigatorio e campo preenchido com valor nao numerico', () => {
    cy.get('#firstName').type('Douglas')
    cy.get('#lastName').type('Lima')
    cy.get('#email').type('douglas.lima@test.com')
    cy.get('#phone')
      .type('abcde')
      .should('have.value', '') 
})
it('Exibe msg de erro ao enviar formulario sem campos obrigatorio preenchidos', () => {
  cy.get('.button[type="submit"]').click()

  cy.get('.error').should('be.visible')
})

it('Envia o form com sucesso usando um commmand customizado', () => {
  const data = {
    firstName: 'Ana',
    lastName: 'Lima',
    email: 'ana.lima@test.com',
    text: 'testing.'
  }
  cy.fillMandatoryFieldsandSubmit(data)

  cy.get('.success').should('be.visible')
})

it('Selecion um produto (YouTube) por seu texto', () => {

  cy.get('#product')
    .select('YouTube')
    .should('have.value', 'youtube')
  cy.get('#firstName').type('Douglas')
  cy.get('#lastName').type('Lima')
  cy.get('#email').type('douglas.lima@test.com')
  cy.get('#open-text-area').type('Obrigado!')
  cy.contains('button' , 'Enviar').click()

  cy.get('.success').should('be.visible')
})

it('Selecion um produto (Mentoria) por seu valor (value)', () => {

  cy.get('#product')
    .select('mentoria')
    .should('have.value', 'mentoria')
  cy.get('#firstName').type('Douglas')
  cy.get('#lastName').type('Lima')
  cy.get('#email').type('douglas.lima@test.com')
  cy.get('#open-text-area').type('Obrigado!')
  cy.contains('button' , 'Enviar').click()

  cy.get('.success').should('be.visible')
})

it('Selecion um produto (blog) pelo seu indice  (1)', () => {

  cy.get('#product')
    .select(1)
    .should('have.value', 'blog')
  cy.get('#firstName').type('Douglas')
  cy.get('#lastName').type('Lima')
  cy.get('#email').type('douglas.lima@test.com')
  cy.get('#open-text-area').type('Obrigado!')
  cy.contains('button' , 'Enviar').click()

  cy.get('.success').should('be.visible')
})

it('Marca o tipo de atendimento feedback (radio button)', () => {
 
  cy.get('#firstName').type('Douglas')
  cy.get('#lastName').type('Lima')
  cy.get('#email').type('douglas.lima@test.com')

  cy.get('#product')
    .select(1)
    .should('have.value', 'blog')

    cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('be.checked')

  cy.get('#open-text-area').type('Obrigado!')
  cy.contains('button' , 'Enviar').click()

  cy.get('.success').should('be.visible')
})


it('Marca cada tipo de atendimento feedback (radio button)', () => {
 
  cy.get('#firstName').type('Douglas')
  cy.get('#lastName').type('Lima')
  cy.get('#email').type('douglas.lima@test.com')

  cy.get('#product')
    .select(1)
    .should('have.value', 'blog')

    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
        .check()
    .should('be.checked')
      })
      
  cy.get('#open-text-area').type('Obrigado!')
  cy.contains('button' , 'Enviar').click()

  cy.get('.success').should('be.visible')
})


it('Marca ambos checkboxes e depois desmarca o ultimo)', () => {

  cy.get('input[Type="checkbox"]')
    .check()
    .should('be.checked')
    .last()
    .uncheck()
    .should('not.be.checked')
 })

 it('Seleciona um arquivo da pasta fixtures', () => {

  cy.get('#firstName').type('Douglas')
  cy.get('#lastName').type('Lima')
  cy.get('#email').type('douglas.lima@test.com')

  cy.get('#product')
    .select(1)
    .should('have.value', 'blog')

    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
        .check()
    .should('be.checked')
      })
      
  cy.get('#open-text-area').type('Obrigado!')
  cy.get('input[Type="checkbox"]')
    .check()
    .should('be.checked')
    .last()
    .uncheck()
    .should('not.be.checked')

  cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
 
      cy.contains('button' , 'Enviar').click()
      cy.get('.success').should('be.visible')
    })


    it('Seleciona um arquivo simulando drag-and-drop', () => {

      cy.get('#firstName').type('Douglas')
      cy.get('#lastName').type('Lima')
      cy.get('#email').type('douglas.lima@test.com')
    
      cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    
        cy.get('input[type="radio"]')
          .each(typeOfService => {
            cy.wrap(typeOfService)
            .check()
        .should('be.checked')
          })
          
      cy.get('#open-text-area').type('Obrigado!')
      cy.get('input[Type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    
      cy.get('#file-upload')
          .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
          .should(input => {
            expect(input[0].files[0].name).to.equal('example.json') 
          })
     
          cy.contains('button' , 'Enviar').click()
          cy.get('.success').should('be.visible')
        })


  
        it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
          cy.get('#firstName').type('Douglas')
          cy.get('#lastName').type('Lima')
          cy.get('#email').type('douglas.lima@test.com')
        
          cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
        
            cy.get('input[type="radio"]')
              .each(typeOfService => {
                cy.wrap(typeOfService)
                .check()
            .should('be.checked')
              })
              
          cy.get('#open-text-area').type('Obrigado!')
          cy.get('input[Type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
        
          cy.fixture('example.json').as('sampleFile')
          cy.get('#file-upload')
              .selectFile('@sampleFile')
              .should(input => {
                expect(input[0].files[0].name).to.equal('example.json') 
              })
         
              cy.contains('button' , 'Enviar').click()
              cy.get('.success').should('be.visible')
            })


it('Verifica que a política de privaciade abre em outra aba', () => {
  cy.contains('a','Política de Privacidade')
    .should('have.attr','href', 'privacy.html')
    .and('have.attr','target','_blank')
  })


  it.only('Acessa a pagina da política de privaciade removendo o target e entao clicando na pagina', () => {
    cy.contains('a','Política de Privacidade')
      .invoke('removeAttr','target')
      .click()

      cy.contains('h1','CAC TAT - Política de privacidade').should('be.visible')
    })

})