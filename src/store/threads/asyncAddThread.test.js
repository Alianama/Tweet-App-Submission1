/**
 * test scenarios for asyncAddThread
 *
 * - asyncAddThread thunk
 *   - should dispatch showLoading and hideLoading properly
 *   - should optimistically dispatch addThreadActionCreator on success
 *   - should call api.createThread and api.getAllThreads when successful
 *   - should show toast error when api.createThread fails
 *   - should not crash and still call hideLoading when error occurs
 */

import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import api from '@/utils/api';
import { asyncAddThread } from './action';
import { toast } from 'sonner';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { addThreadActionCreator } from './action';

vi.mock('sonner', () => ({
  toast: { error: vi.fn() },
}));

describe('asyncAddThread thunk', () => {
  beforeEach(() => {
    api._createThread = api.createThread;
    api._getAllThreads = api.getAllThreads;
  });

  afterEach(() => {
    api.createThread = api._createThread;
    api.getAllThreads = api._getAllThreads;
    delete api._createThread;
    delete api._getAllThreads;
    vi.clearAllMocks();
  });

  const fakeThreadPayload = {
    title: 'New Thread',
    body: 'Thread body',
    category: 'General',
  };

  const fakeAuthUser = {
    id: 'user-1',
    name: 'Ali Purnama',
  };

  it('should dispatch optimistic add and refresh threads on success', async () => {
    api.createThread = () => Promise.resolve({});
    api.getAllThreads = () => Promise.resolve(fakeThreadsResponse);

    const dispatch = vi.fn();
    const getState = () => ({ authUser: fakeAuthUser });

    await asyncAddThread(fakeThreadPayload)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());

    const optimisticAdd = dispatch.mock.calls.find(
      ([action]) => action.type === addThreadActionCreator({}).type
    );
    expect(optimisticAdd).toBeDefined();

    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should show error toast when createThread fails', async () => {
    api.createThread = () => Promise.reject(new Error('Create failed'));
    const dispatch = vi.fn();
    const getState = () => ({ authUser: fakeAuthUser });

    await asyncAddThread(fakeThreadPayload)(dispatch, getState);

    expect(toast.error).toHaveBeenCalledWith('Create failed');
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
