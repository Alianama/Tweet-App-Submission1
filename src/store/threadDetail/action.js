import api from '@/utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'sonner';
import {
  toggleUpVoteActionCreator,
  toggleDownVoteActionCreator,
} from '../threads/action';

const ActionType = {
  RECEIVE_DETAIL_THREADS: 'RECEIVE_DETAIL_THREADS',
  TOGGLE_UPVOTE_THREAD_DETAIL: 'TOGGLE_UPVOTE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  TOGGLE_DOWNVOTE_THREAD_DETAIL: 'TOGGLE_DOWNVOTE_THREAD_DETAIL',
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
    payload: { userId },
  };
}

function toggleDownVoteThreadDetail(userId) {
  return {
    type: ActionType.TOGGLE_DOWNVOTE_THREAD_DETAIL,
    payload: { userId },
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

function asyncUpVoteThreadDetail() {
  return async (dispatch, getState) => {
    dispatch(showLoading);
    const authUser = getState().authUser;
    const thread = getState().threadDetail;
    const hasUpvoted = thread.upVotesBy.includes(authUser.id);

    dispatch(toggleUpVoteThreadDetail(authUser.id));
    dispatch(
      toggleUpVoteActionCreator({ threadId: thread.id, userId: authUser.id })
    );

    try {
      if (hasUpvoted) {
        await api.vote({
          threadId: thread.id,
          voteType: 'neutral-vote',
        });
      } else {
        await api.vote({ threadId: thread.id, voteType: 'up-vote' });
      }
    } catch (error) {
      toast.error(error?.message || 'Gagal Melakukan Vote');
      dispatch(toggleUpVoteThreadDetail(authUser.id));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncDownVoteThreadDetail() {
  return async (dispatch, getState) => {
    dispatch(showLoading);
    const authUser = getState().authUser;
    const thread = getState().threadDetail;
    const hasUpvoted = thread.upVotesBy.includes(authUser.id);

    dispatch(toggleDownVoteThreadDetail(authUser.id));
    dispatch(
      toggleDownVoteActionCreator({ threadId: thread.id, userId: authUser.id })
    );

    try {
      if (hasUpvoted) {
        await api.vote({
          threadId: thread.id,
          voteType: 'neutral-vote',
        });
      } else {
        await api.vote({ threadId: thread.id, voteType: 'down-vote' });
      }
    } catch (error) {
      toast.error(error?.message || 'Gagal Melakukan Vote');
      dispatch(toggleDownVoteThreadDetail(authUser.id));
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  receiveDetailThreadsActionCreator,
  asyncGetDetailThreads,
  asyncUpVoteThreadDetail,
  asyncDownVoteThreadDetail,
  toggleDownVoteThreadDetail,
  toggleUpVoteThreadDetail,
};
