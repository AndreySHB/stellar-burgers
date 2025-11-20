import feedReducer, { getFeeds, wsGetMessage } from './feedSlice';
import { TOrder, TOrdersData } from '@utils-types';

const mockOrders: TOrder[] = [
  {
    _id: 'order-1',
    status: 'done',
    name: 'Test Order 1',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    number: 1,
    ingredients: ['ingredient-1', 'ingredient-2']
  },
  {
    _id: 'order-2',
    status: 'pending',
    name: 'Test Order 2',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    number: 2,
    ingredients: ['ingredient-3', 'ingredient-4']
  }
];

const mockFeedData: TOrdersData = {
  orders: mockOrders,
  total: 100,
  totalToday: 10
};

describe('feed reducer', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false,
    error: null,
    wsConnected: false
  };

  it('should return initial state', () => {
    expect(feedReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle getFeeds.pending', () => {
    const action = { type: getFeeds.pending.type };
    const state = feedReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle getFeeds.fulfilled', () => {
    const action = {
      type: getFeeds.fulfilled.type,
      payload: mockFeedData
    };
    const state = feedReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
    expect(state.total).toBe(100);
    expect(state.totalToday).toBe(10);
    expect(state.error).toBe(null);
  });

  it('should handle getFeeds.rejected', () => {
    const errorMessage = 'Failed to fetch feeds';
    const action = {
      type: getFeeds.rejected.type,
      error: { message: errorMessage }
    };
    const state = feedReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.orders).toEqual([]);
  });

  it('should handle wsGetMessage', () => {
    const action = wsGetMessage(mockFeedData);
    const state = feedReducer(initialState, action);

    expect(state.orders).toEqual(mockOrders);
    expect(state.total).toBe(100);
    expect(state.totalToday).toBe(10);
  });
});
