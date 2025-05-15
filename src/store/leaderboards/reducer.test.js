import { describe, it, expect } from 'vitest';
import leaderboardsReducer from './reducer';
import { ActionType } from './action';

describe('leaderboardsReducer', () => {
  it('should return initial state when given unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN_ACTION' };
    const nextState = leaderboardsReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it('should handle RECEIVE_LEADERBOARDS', () => {
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_LEADERBOARDS,
      payload: {
        leaderboards: [
          {
            user: {
              id: 'users-1',
              name: 'John Doe',
              email: 'john@example.com',
              avatar: 'https://generated-image-url.jpg',
            },
            score: 10,
          },
          {
            user: {
              id: 'users-2',
              name: 'Jane Doe',
              email: 'jane@example.com',
              avatar: 'https://generated-image-url.jpg',
            },
            score: 5,
          },
        ],
      },
    };

    const nextState = leaderboardsReducer(initialState, action);
    expect(nextState).toEqual(action.payload.leaderboards);
  });
});
