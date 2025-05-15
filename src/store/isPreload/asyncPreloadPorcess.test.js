/**
 * test scenarios for asyncPreloadProcess thunk
 *
 * - asyncPreloadProcess thunk
 *   - should dispatch showLoading at the beginning
 *   - should call api.getOwnProfile and dispatch setAuthUserActionCreator with user data when success
 *   - should catch error and log error.message when api.getOwnProfile fails
 *   - should dispatch setIsPreloadActionCreator(false) in finally block
 *   - should dispatch hideLoading at the end
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { asyncPreloadProcess, setIsPreloadActionCreator } from './action';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '@/utils/api';
import { setAuthUserActionCreator } from '../authUser/action';

describe('asyncPreloadProcess thunk', () => {
  beforeEach(() => {
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.getOwnProfile = api._getOwnProfile;
    delete api._getOwnProfile;
    vi.clearAllMocks();
  });

  it('should dispatch showLoading at the beginning and hideLoading at the end', async () => {
    const dispatch = vi.fn();
    api.getOwnProfile = vi.fn(() => Promise.resolve({ id: 'user-1' }));

    await asyncPreloadProcess()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenLastCalledWith(hideLoading());
  });

  it('should call api.getOwnProfile and dispatch setAuthUserActionCreator with user data when success', async () => {
    const dispatch = vi.fn();
    const fakeUser = { id: 'user-1', name: 'Jane Doe' };

    api.getOwnProfile = vi.fn(() => Promise.resolve(fakeUser));

    await asyncPreloadProcess()(dispatch);

    expect(api.getOwnProfile).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeUser));
  });

  it('should catch error and log error.message when api.getOwnProfile fails', async () => {
    const dispatch = vi.fn();
    const error = new Error('Failed to fetch profile');

    api.getOwnProfile = vi.fn(() => Promise.reject(error));

    const consoleErrorBackup = console.error;
    const consoleErrorMock = vi.fn();
    console.error = consoleErrorMock;

    await asyncPreloadProcess()(dispatch);

    expect(consoleErrorMock).toHaveBeenCalledWith('Failed to fetch profile');
    console.error = consoleErrorBackup;
  });

  it('should dispatch setIsPreloadActionCreator(false) in finally block', async () => {
    const dispatch = vi.fn();

    api.getOwnProfile = vi.fn(() => Promise.resolve({ id: 'user-1' }));

    await asyncPreloadProcess()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
  });
});
