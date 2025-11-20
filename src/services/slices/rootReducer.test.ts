import rootReducer from './rootReducer';

describe('rootReducer', () => {
  it('should have correct initial state structure', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });

    expect(initialState.ingredients).toHaveProperty('ingredients', []);
    expect(initialState.ingredients).toHaveProperty('loading', false);
    expect(initialState.ingredients).toHaveProperty('error', null);

    expect(initialState.burgerConstructor).toHaveProperty('bun', null);
    expect(initialState.burgerConstructor).toHaveProperty('ingredients', []);

    expect(initialState.order).toHaveProperty('order', null);
    expect(initialState.order).toHaveProperty('loading', false);
    expect(initialState.order).toHaveProperty('error', null);

    expect(initialState.auth).toHaveProperty('user', null);
    expect(initialState.auth).toHaveProperty('loading', false);
    expect(initialState.auth).toHaveProperty('error', null);

    expect(initialState.feed).toHaveProperty('total', 0);
    expect(initialState.feed).toHaveProperty('totalToday', 0);
    expect(initialState.feed).toHaveProperty('loading', false);
    expect(initialState.feed).toHaveProperty('error', null);
    expect(initialState.feed).toHaveProperty('wsConnected', false);

    expect(initialState.profileOrders).toHaveProperty('orders', []);
    expect(initialState.profileOrders).toHaveProperty('loading', false);
    expect(initialState.profileOrders).toHaveProperty('error', null);
    expect(initialState.profileOrders).toHaveProperty('wsConnected', false);
  });
});
