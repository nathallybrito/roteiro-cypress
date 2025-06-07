describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  })

  it('Insere uma tarefa', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });
  it('Edita uma tarefa existente', () => {
  cy.visit('');
  
  // Adiciona uma tarefa
  cy.get('[data-cy=todo-input]')
    .type('Tarefa para editar{enter}');
  
  // Verifica se a tarefa foi adicionada
  cy.get('[data-cy=todos-list]')
    .children()
    .should('have.length', 1)
    .first()
    .should('have.text', 'Tarefa para editar');
  
  // Edita a tarefa com duplo clique
  cy.get('[data-cy=todos-list] > li label')
    .first()
    .dblclick();
  
  // Apaga o texto atual e digita o novo texto
  cy.get('[data-cy=todos-list] > li .edit')
    .clear()
    .type('Tarefa editada{enter}');
  
  // Verifica se a tarefa foi editada
  cy.get('[data-cy=todos-list]')
    .children()
    .first()
    .should('have.text', 'Tarefa editada');
});
  it('Verifica o contador de itens restantes', () => {
  cy.visit('');
  
  // Adiciona três tarefas
  cy.get('[data-cy=todo-input]')
    .type('Tarefa 1{enter}')
    .type('Tarefa 2{enter}')
    .type('Tarefa 3{enter}');
  
  // Verifica se o contador mostra 3 itens
  cy.get('.todo-count')
    .should('contain', '3 items left');
  
  // Marca uma tarefa como concluída
  cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
    .first()
    .click();
  
  // Verifica se o contador agora mostra 2 itens
  cy.get('.todo-count')
    .should('contain', '2 items left');
  
  // Marca outra tarefa como concluída
  cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
    .eq(1)
    .click();
  
  // Verifica se o contador agora mostra 1 item (singular)
  cy.get('.todo-count')
    .should('contain', '1 item left');
});
  it('Limpa todas as tarefas concluídas', () => {
  cy.visit('');
  
  // Adiciona três tarefas
  cy.get('[data-cy=todo-input]')
    .type('Tarefa 1{enter}')
    .type('Tarefa 2{enter}')
    .type('Tarefa 3{enter}');
  
  // Marca duas tarefas como concluídas
  cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
    .first()
    .click();
  
  cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
    .eq(1)
    .click();
  
  // Verifica se existem 3 tarefas no total
  cy.get('[data-cy=todos-list]')
    .children()
    .should('have.length', 3);
  
  // Clica no botão "Clear completed"
  cy.get('.clear-completed')
    .click();
  
  // Verifica se apenas a tarefa não concluída permanece
  cy.get('[data-cy=todos-list]')
    .children()
    .should('have.length', 1);
  
  // Verifica se o contador mostra 1 item
  cy.get('.todo-count')
    .should('contain', '1 item left');
});

});