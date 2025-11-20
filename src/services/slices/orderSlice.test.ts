import orderReducer, { createOrder, clearOrder } from './orderSlice';
import { TOrder } from '@utils-types';

const mockOrder: TOrder = {
  _id: 'order-1',
  status: 'created',
  name: 'Test Order',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  number: 12345,
  ingredients: ['ingredient-1', 'ingredient-2']
};

describe('order reducer', () => {
  const initialState = {
    order: null,
    loading: false,
    error: null
  };

  it('should return initial state', () => {
    expect(orderReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle createOrder.pending', () => {
    const action = { type: createOrder.pending.type };
    const state = orderReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle createOrder.fulfilled', () => {
    const action = {
      type: createOrder.fulfilled.type,
      payload: mockOrder
    };
    const state = orderReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.order).toEqual(mockOrder);
    expect(state.error).toBe(null);
  });

  it('should handle createOrder.rejected', () => {
    const errorMessage = 'Failed to create order';
    const action = {
      type: createOrder.rejected.type,
      error: { message: errorMessage }
    };
    const state = orderReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.order).toBe(null);
  });

  it('should handle clearOrder', () => {
    const fulfilledAction = {
      type: createOrder.fulfilled.type,
      payload: mockOrder
    };
    let state = orderReducer(initialState, fulfilledAction);

    expect(state.order).toEqual(mockOrder);

    const clearAction = clearOrder();
    state = orderReducer(state, clearAction);

    expect(state.order).toBe(null);
    expect(state.error).toBe(null);
  });
});
