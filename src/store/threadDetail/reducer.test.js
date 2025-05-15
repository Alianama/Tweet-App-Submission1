import { describe, it, expect } from 'vitest';
import detailThreadsReducer from './reducer';
import { ActionType } from './action';

const initialThreadDetail = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  owner: {
    id: 'users-1',
    name: 'John Doe',
    avatar: 'https://generated-image-url.jpg',
  },
  upVotesBy: [],
  downVotesBy: [],
  comments: [
    {
      id: 'comment-1',
      content: 'Ini adalah komentar pertama',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
    },
  ],
};

describe('detailThreadsReducer', () => {
  it('should return initial state when given unknown action', () => {
    const initialState = null;
    const action = { type: 'UNKNOWN' };
    const nextState = detailThreadsReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it('should handle RECEIVE_DETAIL_THREADS', () => {
    const action = {
      type: ActionType.RECEIVE_DETAIL_THREADS,
      payload: { detailThreads: initialThreadDetail },
    };
    const nextState = detailThreadsReducer(null, action);
    expect(nextState).toEqual(initialThreadDetail);
  });

  it('should handle CLEAR_THREAD_DETAIL', () => {
    const action = { type: ActionType.CLEAR_THREAD_DETAIL };
    const nextState = detailThreadsReducer(initialThreadDetail, action);
    expect(nextState).toBe(null);
  });

  it('should handle TOGGLE_UPVOTE_THREAD_DETAIL (upvote)', () => {
    const action = {
      type: ActionType.TOGGLE_UPVOTE_THREAD_DETAIL,
      payload: { userId: 'user-1' },
    };
    const nextState = detailThreadsReducer(initialThreadDetail, action);
    expect(nextState.upVotesBy).toContain('user-1');
    expect(nextState.downVotesBy).not.toContain('user-1');
  });

  it('should handle TOGGLE_UPVOTE_THREAD_DETAIL (remove upvote)', () => {
    const votedState = {
      ...initialThreadDetail,
      upVotesBy: ['user-1'],
    };
    const action = {
      type: ActionType.TOGGLE_UPVOTE_THREAD_DETAIL,
      payload: { userId: 'user-1' },
    };
    const nextState = detailThreadsReducer(votedState, action);
    expect(nextState.upVotesBy).not.toContain('user-1');
  });

  it('should handle TOGGLE_DOWNVOTE_THREAD_DETAIL (downvote)', () => {
    const action = {
      type: ActionType.TOGGLE_DOWNVOTE_THREAD_DETAIL,
      payload: { userId: 'user-2' },
    };
    const nextState = detailThreadsReducer(initialThreadDetail, action);
    expect(nextState.downVotesBy).toContain('user-2');
    expect(nextState.upVotesBy).not.toContain('user-2');
  });

  it('should handle TOGGLE_DOWNVOTE_THREAD_DETAIL (remove downvote)', () => {
    const votedState = {
      ...initialThreadDetail,
      downVotesBy: ['user-2'],
    };
    const action = {
      type: ActionType.TOGGLE_DOWNVOTE_THREAD_DETAIL,
      payload: { userId: 'user-2' },
    };
    const nextState = detailThreadsReducer(votedState, action);
    expect(nextState.downVotesBy).not.toContain('user-2');
  });

  it('should handle TOGGLE_UPVOTE_COMMENT', () => {
    const action = {
      type: ActionType.TOGGLE_UPVOTE_COMMENT,
      payload: { commentId: 'comment-1', userId: 'user-3' },
    };
    const nextState = detailThreadsReducer(initialThreadDetail, action);
    const comment = nextState.comments.find((c) => c.id === 'comment-1');
    expect(comment.upVotesBy).toContain('user-3');
    expect(comment.downVotesBy).not.toContain('user-3');
  });

  it('should handle TOGGLE_DOWNVOTE_COMMENT', () => {
    const action = {
      type: ActionType.TOGGLE_DOWNVOTE_COMMENT,
      payload: { commentId: 'comment-1', userId: 'user-4' },
    };
    const nextState = detailThreadsReducer(initialThreadDetail, action);
    const comment = nextState.comments.find((c) => c.id === 'comment-1');
    expect(comment.downVotesBy).toContain('user-4');
    expect(comment.upVotesBy).not.toContain('user-4');
  });
});
