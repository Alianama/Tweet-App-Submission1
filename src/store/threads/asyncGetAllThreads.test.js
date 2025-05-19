/**
 * test scenarios for asyncGetAllThreads
 *
 * - asyncGetAllThreads thunk
 *   - should dispatch showLoading before fetching threads
 *   - should call API getAllThreads and dispatch receiveAllThreadsActionCreator on success
 *   - should dispatch hideLoading after successful data fetch
 *   - should call toast.error and dispatch hideLoading when API call fails
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import api from '@/utils/api';
import { asyncGetAllThreads, receiveAllThreadsActionCreator } from './action';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { toast } from 'sonner';

vi.mock('sonner', () => ({
  toast: { error: vi.fn() },
}));

const fakeThreadsResponse = [
  {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2024-01-01T00:00:00Z',
    ownerId: 'user-1',
    upVotesBy: ['user-2', 'user-3'],
    downVotesBy: ['user-4'],
    comments: [
      {
        id: 'comment-1',
        content: 'Komentar pertama',
        createdAt: '2024-01-01T01:00:00Z',
        owner: {
          id: 'user-2',
          name: 'John Doe',
          avatar: 'https://ui-avatars.com/api/?name=John+Doe',
        },
      },
    ],
  },
  {
    id: 'thread-2',
    title: 'Thread Kedua',
    body: 'Ini adalah thread kedua',
    category: 'Technology',
    createdAt: '2024-01-02T00:00:00Z',
    ownerId: 'user-2',
    upVotesBy: ['user-1'],
    downVotesBy: [],
    comments: [],
  },
];

describe('asyncGetAllThreads thunk', () => {
  beforeEach(() => {
    api._getAllThreads = api.getAllThreads;
  });

  afterEach(() => {
    api.getAllThreads = api._getAllThreads;
    delete api._getAllThreads;
    vi.clearAllMocks();
  });

  it('should dispatch action correctly when getAllThreads success', async () => {
    api.getAllThreads = () => Promise.resolve(fakeThreadsResponse);
    const dispatch = vi.fn();

    await asyncGetAllThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      receiveAllThreadsActionCreator(fakeThreadsResponse)
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should show error toast when getAllThreads fails', async () => {
    api.getAllThreads = () => Promise.reject(new Error('Failed to fetch'));
    const dispatch = vi.fn();

    await asyncGetAllThreads()(dispatch);

    expect(toast.error).toHaveBeenCalledWith('Failed to fetch');
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
