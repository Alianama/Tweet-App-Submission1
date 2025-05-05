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
  TOGGLE_UPVOTE_COMMENT: 'TOGGLE_UPVOTE_COMMENT',
  TOGGLE_DOWNVOTE_COMMENT: 'TOGGLE_DOWNVOTE_COMMENT',
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

function toggleDownVoteComment({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWNVOTE_COMMENT,
    payload: { commentId, userId },
  };
}

function toggleUpVoteComment({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_UPVOTE_COMMENT,
    payload: { commentId, userId },
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

function asyncUpVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    const comment = threadDetail.comments.find((c) => c.id === commentId);
    console.log(commentId);
    const hasUpvoted = comment.upVotesBy.includes(authUser.id);

    dispatch(toggleUpVoteComment({ commentId, userId: authUser.id }));

    try {
      if (hasUpvoted) {
        await api.vote({
          threadId: threadDetail.id,
          voteType: 'neutral-vote',
          commentId,
        });
      } else {
        await api.vote({
          threadId: threadDetail.id,
          voteType: 'up-vote',
          commentId,
        });
      }
    } catch (error) {
      dispatch(toggleUpVoteComment({ commentId, userId: authUser.id }));
      toast.error('Gagal vote komentar');
    }
  };
}

function asyncDownVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    const comment = threadDetail.comments.find((c) => c.id === commentId);
    const hasDownvoted = comment.downVotesBy.includes(authUser.id);

    dispatch(toggleDownVoteComment({ commentId, userId: authUser.id }));

    try {
      if (hasDownvoted) {
        await api.vote({
          threadId: threadDetail.id,
          voteType: 'neutral-vote',
          commentId,
        });
      } else {
        await api.vote({
          threadId: threadDetail.id,
          voteType: 'down-vote',
          commentId,
        });
      }
    } catch (error) {
      dispatch(toggleDownVoteComment({ commentId, userId: authUser.id }));
      toast.error('Gagal vote komentar');
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
  toggleDownVoteComment,
  toggleUpVoteComment,
  asyncUpVoteComment,
  asyncDownVoteComment,
};
