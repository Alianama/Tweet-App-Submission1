import { describe, it, expect } from 'vitest';
import allUserReducer from './reducer';
import { ActionType } from './action';

describe('allUserReducer', () => {
  it('should return initial state when given unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };
    const nextState = allUserReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it('should handle RECEIVE_ALL_USERS', () => {
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_ALL_USERS,
      payload: {
        allUsers: [
          {
            id: 'john_doe',
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://generated-image-url.jpg',
          },
          {
            id: 'jane_doe',
            name: 'Jane Doe',
            email: 'jane@example.com',
            avatar: 'https://generated-image-url.jpg',
          },
          {
            id: 'fulan',
            name: 'Si Fulan',
            email: 'fulan@example.com',
            avatar: 'https://generated-image-url.jpg',
          },
        ],
      },
    };
    const nextState = allUserReducer(initialState, action);
    expect(nextState).toEqual(action.payload.allUsers);
  });
});
