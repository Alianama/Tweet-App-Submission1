import api from '@/utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'sonner';

const ActionType = {
  RECEIVE_DETAIL_THREADS: 'RECEIVE_DETAIL_THREADS',
  TOGGLE_UPVOTE_THREAD_DETAIL: 'TOGGLE_UPVOTE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
};

function receiveDetailThreadsActionCreator(detailThreads) {
  return {
    type: ActionType.RECEIVE_DETAIL_THREADS,
    payload: {
      detailThreads,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function toggleUpVoteThreadDetail(userId) {
  return {
    type: ActionType.TOGGLE_UPVOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function asyncGetDetailThreads(id) {
  return async (dispatch) => {
    dispatch(clearThreadDetailActionCreator());
    try {
      const response = await api.getDetailThread(id);
      dispatch(receiveDetailThreadsActionCreator(response));
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || 'Terjadi Kesalahan';
      toast.error(message);
    }
  };
}

function asyncToggleUpVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, detailThreads } = getState();

    dispatch(showLoading());
    dispatch(toggleUpVoteThreadDetail(authUser.id));
    try {
      await api.vote({ threadId: detailThreads.id, voteType: 'up-vote' });
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  receiveDetailThreadsActionCreator,
  asyncGetDetailThreads,
  asyncToggleUpVoteThreadDetail,
};
