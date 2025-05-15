import { describe, it, expect } from 'vitest';
import authUserReducer from './reducer';
import { ActionType } from './action';

describe('authUserReducer', () => {
  it('should return initial state when given unknown action', () => {
    const initialState = null;
    const action = { type: 'UNKNOWN' };
    const nextState = authUserReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it('should handle SET_AUTH_USER', () => {
    const initialState = null;
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: {
        authUser: {
          id: 'john_doe',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
      },
    };
    const nextState = authUserReducer(initialState, action);
    expect(nextState).toEqual(action.payload.authUser);
  });

  it('should handle UNSET_AUTH_USER', () => {
    const initialState = {
      id: 'john_doe',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    };
    const action = {
      type: ActionType.UNSET_AUTH_USER,
    };
    const nextState = authUserReducer(initialState, action);
    expect(nextState).toBe(null);
  });
});
