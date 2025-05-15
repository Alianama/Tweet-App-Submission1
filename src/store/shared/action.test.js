/**
 * test scenarios for asyncPopulateUsersAndThreads thunk
 *
 * - asyncPopulateUsersAndThreads
 *   - should dispatch showLoading, receiveAllThreads, receiveAllUsers, and hideLoading when API calls succeed
 *   - should dispatch showLoading, call toast.error, and dispatch hideLoading when API calls fail
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import api from '@/utils/api';
import { asyncPopulateUsersAndThreads } from './action';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { receiveAllThreadsActionCreator } from '../threads/action';
import { receiveAllUsersActionCreator } from '../allUsers/action';
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
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];

const fakeUserResponse = [
  {
    id: 'john_doe',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
];

const fakeErrorResponse = new Error('Something went wrong');

describe('asyncPopulateUsersAndThreads Thunk', () => {
  beforeEach(() => {
    api._getAllUsers = api.getAllUsers;
    api._getAllThreads = api.getAllThreads;
  });

  afterEach(() => {
    api.getAllUsers = api._getAllUsers;
    api.getAllThreads = api._getAllThreads;

    delete api._getAllThreads;
    delete api._getAllUsers;
    vi.clearAllMocks();
  });

  it('should dispatch actions correctly when data fetching succeeds', async () => {
    api.getAllUsers = () => Promise.resolve(fakeUserResponse);
    api.getAllThreads = () => Promise.resolve(fakeThreadsResponse);

    const dispatch = vi.fn();

    await asyncPopulateUsersAndThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      receiveAllThreadsActionCreator(fakeThreadsResponse)
    );
    expect(dispatch).toHaveBeenCalledWith(
      receiveAllUsersActionCreator(fakeUserResponse)
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should call toast.error and still hide loading when data fetching fails', async () => {
    api.getAllUsers = () => Promise.reject(fakeErrorResponse);
    api.getAllThreads = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();

    await asyncPopulateUsersAndThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(toast.error).toHaveBeenCalledWith('Something went wrong');
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
