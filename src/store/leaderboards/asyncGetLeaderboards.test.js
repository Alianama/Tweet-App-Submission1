import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { asyncGetLeaderboards } from './action';
import api from '@/utils/api';
import { toast } from 'sonner';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { receiveLeaderboardsActionCreator } from './action';

vi.mock('@/utils/api');
vi.mock('sonner', () => ({
  toast: { error: vi.fn() },
}));

const fakeLeaderboardsResponse = [
  {
    user: {
      id: 'users-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    },
    score: 10,
  },
];

describe('asyncGetLeaderboards thunk', () => {
  beforeEach(() => {
    api._getLeaderboard = api.getLeaderboard;
  });

  afterEach(() => {
    api.getLeaderboard = api._getLeaderboard;
    delete api._getLeaderboard;
    vi.clearAllMocks();
  });

  it('should dispatch receiveLeaderboardsActionCreator on success', async () => {
    api.getLeaderboard.mockResolvedValue(fakeLeaderboardsResponse);
    const dispatch = vi.fn();

    await asyncGetLeaderboards()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      receiveLeaderboardsActionCreator(fakeLeaderboardsResponse)
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should show toast error on failure', async () => {
    const errorMessage = 'Network Error';
    api.getLeaderboard.mockRejectedValue(new Error(errorMessage));
    const dispatch = vi.fn();

    await asyncGetLeaderboards()(dispatch);

    expect(toast.error).toHaveBeenCalledWith(errorMessage);
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
