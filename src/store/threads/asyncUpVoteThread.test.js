/**
 * test scenarios for asyncThreadUpVote
 *
 * - asyncThreadUpVote thunk
 *   - should dispatch toggleUpVote and vote API call successfully when user has not upvoted yet
 *   - should call API with 'up-vote' voteType when user upvotes a thread
 *   - should dispatch toggleUpVote, revert vote, and show toast error when API call fails and user has already upvoted
 *   - should call API with 'neutral-vote' voteType when user cancels their upvote
 *   - should dispatch showLoading before and hideLoading after the process
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { toast } from 'sonner';
import { asyncThreadUpVote } from './action';
import api from '@/utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { toggleUpVoteActionCreator } from './action';

vi.mock('sonner', () => ({
  toast: { error: vi.fn() },
}));

const fakeAuthUser = { id: 'user-1', name: 'Jane Doe' };

const fakeThread = {
  id: 'thread-1',
  title: 'Sample Thread',
  upVotesBy: [],
  downVotesBy: [],
};

const fakeGetState = (customThread = fakeThread) => ({
  authUser: fakeAuthUser,
  threads: [customThread],
});

const fakeVotePayload = {
  threadId: 'thread-1',
  commentId: null,
};

describe('asyncThreadUpVote thunk', () => {
  beforeEach(() => {
    api._vote = api.vote;
  });

  afterEach(() => {
    api.vote = api._vote;
    delete api._vote;
    vi.clearAllMocks();
  });

  it('should dispatch toggle and vote success when not upvoted yet', async () => {
    api.vote = vi.fn(() => Promise.resolve());
    const dispatch = vi.fn();
    const getState = () => fakeGetState(); // upVotesBy kosong

    await asyncThreadUpVote(fakeVotePayload)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      toggleUpVoteActionCreator({ threadId: 'thread-1', userId: 'user-1' })
    );
    expect(api.vote).toHaveBeenCalledWith({
      threadId: 'thread-1',
      voteType: 'up-vote',
      commentId: null,
    });
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should send neutral-vote and revert on error', async () => {
    api.vote = vi.fn(() => Promise.reject(new Error('API Error')));
    const dispatch = vi.fn();
    const getState = () =>
      fakeGetState({ ...fakeThread, upVotesBy: ['user-1'] }); // Sudah upvote

    await asyncThreadUpVote(fakeVotePayload)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      toggleUpVoteActionCreator({ threadId: 'thread-1', userId: 'user-1' })
    );
    expect(api.vote).toHaveBeenCalledWith({
      threadId: 'thread-1',
      voteType: 'neutral-vote',
      commentId: null,
    });
    expect(toast.error).toHaveBeenCalledWith('API Error');
    expect(dispatch).toHaveBeenCalledWith(
      toggleUpVoteActionCreator({ threadId: 'thread-1', userId: 'user-1' }) // Undo vote
    );
  });
});
