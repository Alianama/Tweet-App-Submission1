/**
 * test scenarios for threadsReducer
 *
 * - threadsReducer
 *   - should return the initial state when given unknown action
 *   - should handle RECEIVE_ALL_THREADS by replacing the state with threads payload
 *   - should handle ADD_THREADS by adding a new thread at the beginning of the state
 *   - should handle TOGGLE_UPVOTE_THREAD by adding userId to upVotesBy and removing from downVotesBy
 *   - should handle TOGGLE_UPVOTE_THREAD by removing userId from upVotesBy if already present
 *   - should handle TOGGLE_DOWNVOTE_THREAD by adding userId to downVotesBy and removing from upVotesBy
 *   - should handle TOGGLE_DOWNVOTE_THREAD by removing userId from downVotesBy if already present
 */

import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';
import { ActionType } from './action';

describe('threadsReducer', () => {
  it('should return the initial state when given unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };
    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it('should handle RECEIVE_ALL_THREADS', () => {
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_ALL_THREADS,
      payload: {
        threads: [
          {
            id: '1',
            title: 'Thread 1',
            body: 'Thread body',
            category: 'thread',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        ],
      },
    };
    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual(action.payload.threads);
  });

  it('should handle ADD_THREADS', () => {
    const initialState = [
      { id: '1', title: 'Thread 1', upVotesBy: [], downVotesBy: [] },
    ];
    const newThread = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-1',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    };
    const action = {
      type: ActionType.ADD_THREADS,
      payload: {
        thread: newThread,
      },
    };
    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual([newThread, ...initialState]);
  });

  it('should handle TOGGLE_UPVOTE_THREAD (add upvote)', () => {
    const initialState = [
      { id: '1', title: 'Thread 1', upVotesBy: [], downVotesBy: [] },
    ];
    const action = {
      type: ActionType.TOGGLE_UPVOTE_THREAD,
      payload: {
        threadId: '1',
        userId: 'user1',
      },
    };
    const nextState = threadsReducer(initialState, action);
    expect(nextState[0].upVotesBy).toContain('user1');
    expect(nextState[0].downVotesBy).not.toContain('user1');
  });

  it('should handle TOGGLE_UPVOTE_THREAD (remove upvote)', () => {
    const initialState = [
      { id: '1', title: 'Thread 1', upVotesBy: ['user1'], downVotesBy: [] },
    ];
    const action = {
      type: ActionType.TOGGLE_UPVOTE_THREAD,
      payload: {
        threadId: '1',
        userId: 'user1',
      },
    };
    const nextState = threadsReducer(initialState, action);
    expect(nextState[0].upVotesBy).not.toContain('user1');
  });

  it('should handle TOGGLE_DOWNVOTE_THREAD (add downvote)', () => {
    const initialState = [
      { id: '1', title: 'Thread 1', upVotesBy: [], downVotesBy: [] },
    ];
    const action = {
      type: ActionType.TOGGLE_DOWNVOTE_THREAD,
      payload: {
        threadId: '1',
        userId: 'user1',
      },
    };
    const nextState = threadsReducer(initialState, action);
    expect(nextState[0].downVotesBy).toContain('user1');
    expect(nextState[0].upVotesBy).not.toContain('user1');
  });

  it('should handle TOGGLE_DOWNVOTE_THREAD (remove downvote)', () => {
    const initialState = [
      { id: '1', title: 'Thread 1', upVotesBy: [], downVotesBy: ['user1'] },
    ];
    const action = {
      type: ActionType.TOGGLE_DOWNVOTE_THREAD,
      payload: {
        threadId: '1',
        userId: 'user1',
      },
    };
    const nextState = threadsReducer(initialState, action);
    expect(nextState[0].downVotesBy).not.toContain('user1');
  });
});
