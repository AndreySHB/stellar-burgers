import authReducer, {
  loginUser,
  registerUser,
  logoutUser,
  getUser,
  updateUser
} from './authSlice';
import { TUser } from '@utils-types';

const mockUser: TUser = {
  email: 'test@example.com',
  name: 'Test User'
};

describe('auth reducer', () => {
  const initialState = {
    user: null,
    loading: false,
    error: null
  };

  it('should return initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle loginUser.pending', () => {
    const action = { type: loginUser.pending.type };
    const state = authReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle loginUser.fulfilled', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: mockUser
    };
    const state = authReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.error).toBe(null);
  });

  it('should handle loginUser.rejected', () => {
    const errorMessage = 'Login failed';
    const action = {
      type: loginUser.rejected.type,
      error: { message: errorMessage }
    };
    const state = authReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.user).toBe(null);
  });

  it('should handle registerUser.fulfilled', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: mockUser
    };
    const state = authReducer(initialState, action);

    expect(state.user).toEqual(mockUser);
    expect(state.loading).toBe(false);
  });

  it('should handle logoutUser.fulfilled', () => {
    const loginAction = {
      type: loginUser.fulfilled.type,
      payload: mockUser
    };
    let state = authReducer(initialState, loginAction);

    expect(state.user).toEqual(mockUser);

    const logoutAction = { type: logoutUser.fulfilled.type };
    state = authReducer(state, logoutAction);

    expect(state.user).toBe(null);
  });

  it('should handle getUser.fulfilled', () => {
    const action = {
      type: getUser.fulfilled.type,
      payload: mockUser
    };
    const state = authReducer(initialState, action);

    expect(state.user).toEqual(mockUser);
  });

  it('should handle updateUser.fulfilled', () => {
    const updatedUser: TUser = {
      email: 'updated@example.com',
      name: 'Updated User'
    };

    const action = {
      type: updateUser.fulfilled.type,
      payload: updatedUser
    };
    const state = authReducer(initialState, action);

    expect(state.user).toEqual(updatedUser);
  });

  it('should handle updateUser.rejected', () => {
    const errorMessage = 'Update failed';
    const action = {
      type: updateUser.rejected.type,
      error: { message: errorMessage }
    };
    const state = authReducer(initialState, action);

    expect(state.error).toBe(errorMessage);
  });
});
