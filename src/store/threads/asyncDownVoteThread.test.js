/**
 * test scenarios for asyncThreadDownVote
 *
 * - asyncThreadDownVote thunk
 *   - should dispatch toggleDownVote and vote API call successfully when user has not downvoted yet
 *   - should call API with 'down-vote' voteType when user downvotes a thread
 *   - should dispatch toggleDownVote, revert vote, and show toast error when API call fails and user has already downvoted
 *   - should call API with 'neutral-vote' voteType when user cancels their downvote
 *   - should dispatch showLoading before and hideLoading after the process
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { toast } from 'sonner';
import { asyncThreadDownVote } from './action';
import api from '@/utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { toggleDownVoteActionCreator } from './action';

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

describe('asyncThreadDownVote thunk', () => {
  beforeEach(() => {
    api._vote = api.vote;
  });

  afterEach(() => {
    api.vote = api._vote;
    delete api._vote;
    vi.clearAllMocks();
  });

  it('should dispatch toggle and vote success when not downvoted yet', async () => {
    api.vote = vi.fn(() => Promise.resolve());
    const dispatch = vi.fn();
    const getState = () => fakeGetState();

    await asyncThreadDownVote(fakeVotePayload)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      toggleDownVoteActionCreator({ threadId: 'thread-1', userId: 'user-1' })
    );
    expect(api.vote).toHaveBeenCalledWith({
      threadId: 'thread-1',
      voteType: 'down-vote',
      commentId: null,
    });
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should revert vote and show toast on error when already downvoted', async () => {
    api.vote = vi.fn(() => Promise.reject(new Error('Vote error')));
    const dispatch = vi.fn();
    const getState = () =>
      fakeGetState({ ...fakeThread, downVotesBy: ['user-1'] });

    await asyncThreadDownVote(fakeVotePayload)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      toggleDownVoteActionCreator({ threadId: 'thread-1', userId: 'user-1' })
    );
    expect(api.vote).toHaveBeenCalledWith({
      threadId: 'thread-1',
      voteType: 'neutral-vote',
      commentId: null,
    });
    expect(toast.error).toHaveBeenCalledWith('Vote error');
    expect(dispatch).toHaveBeenCalledWith(
      toggleDownVoteActionCreator({ threadId: 'thread-1', userId: 'user-1' })
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
