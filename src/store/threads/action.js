import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { toast } from 'sonner';
import api from '@/utils/api';
import { asyncGetDetailThreads } from '../threadDetail/action';

const ActionType = {
  RECEIVE_ALL_THREADS: 'RECEIVE_ALL_THREADS',
  ADD_THREADS: 'ADD_THREADS',
  TOGGLE_UPVOTE_THREAD: 'TOGGLE_UPVOTE_THREAD',
  TOGGLE_DOWNVOTE_THREAD: 'TOGGLE_DOWNVOTE_THREAD',
};

function receiveAllThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_ALL_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREADS,
    payload: {
      thread,
    },
  };
}

function toggleUpVoteActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_UPVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleDownVoteActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWNVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncGetAllThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const response = await api.getAllThreads();
      dispatch(receiveAllThreadsActionCreator(response));
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        'Terjadi kesalahan saat memuat threads';
      toast.error(message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncAddThread({ title, body, category }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const authUser = getState().authUser;
    const userId = authUser.id;
    const tempId = `temp-${Date.now()}`;
    const optimisticThread = {
      id: tempId,
      title,
      body,
      category,
      createdAt: new Date().toISOString(),
      ownerId: userId,
      upVotesBy: [],
      downVotesBy: [],
      user: authUser,
    };

    dispatch(addThreadActionCreator(optimisticThread));

    try {
      await api.createThread({ title, body, category });
      dispatch(asyncGetAllThreads());
    } catch (error) {
      console.error(error);
      toast.error(error?.message || 'Gagal menambahkan thread');
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncAddThreadComment({ content, threadId }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.createThreadComment({ content, threadId });
      dispatch(asyncGetDetailThreads(threadId));
    } catch (error) {
      toast.error(error?.message || 'Gagal menambahkan komentar');
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncThreadUpVote({ threadId, commentId }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const authUser = getState().authUser;
    const threads = getState().threads;
    const thread = threads.find((t) => t.id === threadId);
    const hasUpvoted = thread.upVotesBy.includes(authUser.id);

    dispatch(toggleUpVoteActionCreator({ threadId, userId: authUser.id }));
    try {
      if (hasUpvoted) {
        await api.vote({ threadId, voteType: 'neutral-vote', commentId });
      } else {
        await api.vote({ threadId, voteType: 'up-vote', commentId });
      }
    } catch (error) {
      toast.error(error?.message || 'Gagal melakukan vote');
      dispatch(toggleUpVoteActionCreator({ threadId, userId: authUser.id }));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncThreadDownVote({ threadId, commentId }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const authUser = getState().authUser;
    const threads = getState().threads;
    const thread = threads.find((t) => t.id === threadId);

    const hasDownvoted = thread.downVotesBy.includes(authUser.id);
    dispatch(toggleDownVoteActionCreator({ threadId, userId: authUser.id }));

    try {
      if (hasDownvoted) {
        await api.vote({ threadId, voteType: 'neutral-vote', commentId });
      } else {
        await api.vote({ threadId, voteType: 'down-vote', commentId });
      }
    } catch (error) {
      toast.error(error?.message || 'Gagal melakukan vote');
      dispatch(toggleDownVoteActionCreator({ threadId, userId: authUser.id }));
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  receiveAllThreadsActionCreator,
  asyncGetAllThreads,
  asyncAddThread,
  addThreadActionCreator,
  asyncAddThreadComment,
  asyncThreadUpVote,
  toggleUpVoteActionCreator,
  toggleDownVoteActionCreator,
  asyncThreadDownVote,
};
