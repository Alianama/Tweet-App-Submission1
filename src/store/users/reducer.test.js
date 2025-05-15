import { describe, it, expect } from 'vitest';
import userReducer from './reducer';
import { ActionType } from './action';

describe('userReducer', () => {
  it('should return initial state when given unknown action type', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };
    const nextState = userReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it('should return users when given RECEIVE_USERS action', () => {
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_USERS,
      payload: {
        users: [
          {
            id: 'user-123',
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://generated-image-url.jpg',
          },
        ],
      },
    };

    const nextState = userReducer(initialState, action);
    expect(nextState).toEqual(action.payload.users);
  });
});
