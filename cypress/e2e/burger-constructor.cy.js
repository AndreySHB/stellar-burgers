describe('Burger Constructor', () => {
  beforeEach(() => {
    // Перехватываем API запросы
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );
    cy.intercept('POST', '**/api/auth/login', { fixture: 'user.json' }).as(
      'login'
    );

    // Устанавливаем токены авторизации
    cy.setCookie('accessToken', 'mock-access-token');
    window.localStorage.setItem('refreshToken', 'mock-refresh-token');

    // Переходим на главную страницу
    cy.visit('/');

    // Ждем загрузки ингредиентов
    cy.wait('@getIngredients');
  });

  it('should load ingredients and display them', () => {
    // Проверяем, что ингредиенты загрузились
    cy.contains('Краторная булка N-200i').should('exist');
    cy.contains('Биокотлета из марсианской Магнолии').should('exist');
    cy.contains('Соус Spicy-X').should('exist');
  });

  it('should add bun to constructor by click', () => {
    // Находим карточку булки и кликаем на кнопку "Добавить"
    cy.contains('Краторная булка N-200i')
      .parents('li') // Переходим к родительскому элементу li
      .within(() => {
        // Кликаем на кнопку "Добавить"
        cy.contains('button', 'Добавить').click();
      });

    // Проверяем, что булка добавилась в конструктор
    cy.contains('Краторная булка N-200i (верх)').should('exist');
    cy.contains('Краторная булка N-200i (низ)').should('exist');
  });

  it('should add main ingredient to constructor', () => {
    // Добавляем начинку
    cy.contains('Биокотлета из марсианской Магнолии')
      .parents('li')
      .within(() => {
        cy.contains('button', 'Добавить').click();
      });

    // Проверяем, что начинка добавилась
    cy.contains('Биокотлета из марсианской Магнолии').should('exist');
  });

  it('should open and close ingredient modal', () => {
    // Кликаем на ингредиент
    cy.contains('Краторная булка N-200i').click();

    // Проверяем что модальное открылось по наличию контента
    cy.contains('Детали ингредиента').should('be.visible');
    cy.contains('Калории, ккал').should('be.visible');

    // Закрываем через ESC (работает всегда)
    cy.get('body').type('{esc}');

    // Проверяем что модальное закрылось
    cy.contains('Детали ингредиента').should('not.exist');
    cy.contains('Калории, ккал').should('not.exist');
  });

  it('should able to create order', () => {
    // Добавляем булку
    cy.contains('Краторная булка N-200i')
      .parents('li')
      .within(() => {
        cy.contains('button', 'Добавить').click();
      });

    // Добавляем начинку
    cy.contains('Биокотлета из марсианской Магнолии')
      .parents('li')
      .within(() => {
        cy.contains('button', 'Добавить').click();
      });

    // Проверяем, что кнопка стала активной
    cy.contains('Оформить заказ').should('not.be.disabled');
  });
});
