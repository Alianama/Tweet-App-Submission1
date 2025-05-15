/**
 * test scenarios for asyncAddThreadComment
 *
 * - asyncAddThreadComment thunk
 *   - should dispatch showLoading and hideLoading properly
 *   - should call api.createThreadComment successfully
 *   - should call toast.error when api.createThreadComment fails
 */

import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import api from '@/utils/api';
import { toast } from 'sonner';
import { asyncAddThreadComment } from './action';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
vi.mock('sonner', () => ({
  toast: { error: vi.fn() },
}));

const fakeCreateCommentPayload = {
  content: 'Comment test',
  threadId: '1',
};

describe('asyncAddThreadComment', () => {
  beforeEach(() => {
    api._createThreadComment = api.createThreadComment;
  });

  afterEach(() => {
    api.createThreadComment = api._createThreadComment;
    delete api._createThreadComment;
    vi.clearAllMocks();
  });

  it('should dispatch optimistic thread comment on success', async () => {
    api.createThreadComment = () => Promise.resolve({});
    const dispatch = vi.fn();

    await asyncAddThreadComment(fakeCreateCommentPayload)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.createThreadComment).toBeDefined();
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should call toast.error when API fails', async () => {
    api.createThreadComment = () => Promise.reject(fakeError);
    const fakeError = new Error('Something went wrong');
    const dispatch = vi.fn();

    await asyncAddThreadComment(fakeCreateCommentPayload)(dispatch);

    expect(toast.error).toHaveBeenCalledWith('Something went wrong');
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
