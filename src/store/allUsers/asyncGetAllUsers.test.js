/**
 * test scenarios for asyncGetAllUsers thunk
 *
 * - asyncGetAllUsers thunk
 *   - should dispatch showLoading and hideLoading
 *   - should dispatch receiveAllUsersActionCreator when data fetch is successful
 *   - should call toast.error when fetch data fails
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { toast } from 'sonner';
import api from '@/utils/api';
import { asyncGetAllUsers, receiveAllUsersActionCreator } from './action';

// Mock toast.error dari sonner
vi.mock('sonner', () => ({
  toast: { error: vi.fn() },
}));

describe('asyncGetAllUsers thunk', () => {
  let dispatch;

  beforeEach(() => {
    // Backup fungsi asli api.getAllUsers
    api._getAllUsers = api.getAllUsers;
    dispatch = vi.fn();
  });

  afterEach(() => {
    // Restore fungsi asli api.getAllUsers
    api.getAllUsers = api._getAllUsers;
    delete api._getAllUsers;

    vi.clearAllMocks();
  });

  it('should dispatch showLoading and hideLoading', async () => {
    api.getAllUsers = vi.fn(() => Promise.resolve([]));

    await asyncGetAllUsers()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch receiveAllUsersActionCreator when data fetch is successful', async () => {
    const fakeUsers = [{ id: 'user-1', name: 'John' }];
    api.getAllUsers = vi.fn(() => Promise.resolve(fakeUsers));

    await asyncGetAllUsers()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(
      receiveAllUsersActionCreator(fakeUsers)
    );
  });

  it('should call toast.error when fetch data fails', async () => {
    const errorMessage = 'Failed to fetch';
    api.getAllUsers = vi.fn(() => Promise.reject(new Error(errorMessage)));
    vi.spyOn(console, 'error').mockImplementation(() => {});

    await asyncGetAllUsers()(dispatch);

    expect(toast.error).toHaveBeenCalledWith(errorMessage);
    console.error.mockRestore();
  });
});
