import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { toast } from 'sonner';
import api from '@/utils/api';

const ActionType = {
  RECEIVE_LEADERBOARDS: 'RECEIVE_LEADERBOARDS'
};

function receiveLeaderboardsActionCreator(leaderboards) {
  return {
    type: ActionType.RECEIVE_LEADERBOARDS,
    payload: {
      leaderboards
    }
  };
}

function asyncGetLeaderboards() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const response = await api.getLeaderboard();
      dispatch(receiveLeaderboardsActionCreator(response));
    } catch (error) {
      const message = error?.response?.data?.message || error.message || 'Terjadi Kesalahan';
      toast.error(message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  receiveLeaderboardsActionCreator,
  asyncGetLeaderboards
};
