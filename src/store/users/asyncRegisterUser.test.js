/**
 * test scenarios for asyncRegisterUser thunk
 *
 * - asyncRegisterUser thunk
 *   - should dispatch showLoading and hideLoading
 *   - should call api.register with correct user data
 *   - should show success toast when registration succeeds
 *   - should show error toast when registration fails with error message from response
 *   - should show error toast when registration fails with generic error message
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { toast } from 'sonner';
import api from '@/utils/api';
import { asyncRegisterUser } from './action';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('asyncRegisterUser thunk', () => {
  const dispatch = vi.fn();

  beforeEach(() => {
    api._register = api.register;
  });

  afterEach(() => {
    api.register = api._register;
    delete api._register;
    vi.clearAllMocks();
  });

  it('should dispatch showLoading and hideLoading', async () => {
    api.register = vi.fn(() => Promise.resolve());

    await asyncRegisterUser({
      name: 'John',
      email: 'john@example.com',
      password: '1234',
    })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should call api.register with correct user data', async () => {
    api.register = vi.fn(() => Promise.resolve());

    const userData = {
      name: 'John',
      email: 'john@example.com',
      password: '1234',
    };
    await asyncRegisterUser(userData)(dispatch);

    expect(api.register).toHaveBeenCalledWith(userData);
  });

  it('should show success toast when registration succees', async () => {
    api.register = vi.fn(() => Promise.resolve());

    await asyncRegisterUser({
      name: 'John',
      email: 'john@example.com',
      password: '1234',
    })(dispatch);

    expect(toast.success).toHaveBeenCalledWith('Registrasi berhasil! 🎉');
  });

  it('should show error toast when registration fails with error message from response', async () => {
    const errorResponse = {
      response: { data: { message: 'Email sudah digunakan' } },
    };
    api.register = vi.fn(() => Promise.reject(errorResponse));

    await asyncRegisterUser({
      name: 'John',
      email: 'john@example.com',
      password: '1234',
    })(dispatch);

    expect(toast.error).toHaveBeenCalledWith(
      'Gagal registrasi: Email sudah digunakan'
    );
  });

  it('should show error toast when registration fails with generic error message', async () => {
    const error = new Error('Network error');
    api.register = vi.fn(() => Promise.reject(error));

    await asyncRegisterUser({
      name: 'John',
      email: 'john@example.com',
      password: '1234',
    })(dispatch);

    expect(toast.error).toHaveBeenCalledWith('Gagal registrasi: Network error');
  });
});
