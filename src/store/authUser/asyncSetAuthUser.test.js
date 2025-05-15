/**
 * test scenarios for asyncSetAuthUser thunk
 *
 * - asyncSetAuthUser thunk
 *   - should dispatch showLoading at the beginning
 *   - should call api.login with the provided email & password
 *   - should call api.putAccessToken with the token from login
 *   - should call api.getOwnProfile and dispatch setAuthUserActionCreator with user data when successful
 *   - should call toast.success when login is successful
 *   - should catch error and call toast.error when login fails
 *   - should always dispatch hideLoading at the end (whether success or failure)
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { asyncSetAuthUser, setAuthUserActionCreator } from './action';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '@/utils/api';
import { toast } from 'sonner';

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('asyncSetAuthUser thunk', () => {
  const fakeToken = 'fake-token';
  const fakeUser = { id: 'user-1', name: 'Jane Doe' };

  beforeEach(() => {
    api._login = api.login;
    api._putAccessToken = api.putAccessToken;
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.login = api._login;
    api.putAccessToken = api._putAccessToken;
    api.getOwnProfile = api._getOwnProfile;
    delete api._login;
    delete api._putAccessToken;
    delete api._getOwnProfile;
    vi.clearAllMocks();
  });

  it('should dispatch showLoading, call api, setAuthUserActionCreator, and hideLoading on success', async () => {
    const dispatch = vi.fn();
    const email = 'test@example.com';
    const password = 'password';

    api.login = vi.fn(() => Promise.resolve(fakeToken));
    api.putAccessToken = vi.fn();
    api.getOwnProfile = vi.fn(() => Promise.resolve(fakeUser));

    await asyncSetAuthUser({ email, password })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.login).toHaveBeenCalledWith({ email, password });
    expect(api.putAccessToken).toHaveBeenCalledWith(fakeToken);
    expect(api.getOwnProfile).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeUser));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(toast.success).toHaveBeenCalledWith('Login Successfull');
  });

  it('should dispatch showLoading, toast error, and hideLoading on failure', async () => {
    const dispatch = vi.fn();
    const email = 'test@example.com';
    const password = 'password';
    const error = new Error('Login gagal');

    api.login = vi.fn(() => Promise.reject(error));

    await asyncSetAuthUser({ email, password })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(toast.error).toHaveBeenCalledWith(error.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
