import rootReducer from './rootReducer';

describe('rootReducer', () => {
  it('should properly initialize with all reducers', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });

    expect(initialState).toEqual({
      ingredients: expect.any(Object),
      burgerConstructor: expect.any(Object),
      order: expect.any(Object),
      auth: expect.any(Object),
      feed: expect.any(Object),
      profileOrders: expect.any(Object)
    });
  });

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
  });
});
