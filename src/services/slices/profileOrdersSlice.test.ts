import profileOrdersReducer, { getProfileOrders } from './profileOrdersSlice';
import { TOrder } from '@utils-types';

const mockOrders: TOrder[] = [
  {
    _id: 'order-1',
    status: 'done',
    name: 'Profile Order 1',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    number: 1,
    ingredients: ['ingredient-1', 'ingredient-2']
  }
];

describe('profileOrders reducer', () => {
  const initialState = {
    orders: [],
    loading: false,
    error: null,
    wsConnected: false
  };

  it('should return initial state', () => {
    expect(profileOrdersReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('should handle getProfileOrders.pending', () => {
    const action = { type: getProfileOrders.pending.type };
    const state = profileOrdersReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle getProfileOrders.fulfilled', () => {
    const action = {
      type: getProfileOrders.fulfilled.type,
      payload: mockOrders
    };
    const state = profileOrdersReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
    expect(state.error).toBe(null);
  });

  it('should handle getProfileOrders.rejected', () => {
    const errorMessage = 'Failed to fetch profile orders';
    const action = {
      type: getProfileOrders.rejected.type,
      error: { message: errorMessage }
    };
    const state = profileOrdersReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.orders).toEqual([]);
  });
});
