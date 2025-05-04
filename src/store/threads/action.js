import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { toast } from 'sonner';
import api from '@/utils/api';

const ActionType = {
  RECEIVE_ALL_THREADS: 'RECEIVE_ALL_THREADS',
  RECEIVE_DETAIL_THREADS: 'RECEIVE_DETAIL_THREADS',
  ADD_THREADS: 'ADD_THREADS',
};

function receiveAllThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_ALL_THREADS,
    payload: {
      threads,
    },
  };
}

function receiveDetailThreadsActionCreator(detailThreads) {
  return {
    type: ActionType.RECEIVE_DETAIL_THREADS,
    payload: {
      detailThreads,
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


function asyncGetAllThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const response = await api.getAllThreads();
      dispatch(receiveAllThreadsActionCreator(response));
      for (const thread of response) {
        dispatch(asyncGetDetailThreads(thread.id));
      }
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || 'Terjadi Kesalahan';
      toast.error(message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncGetDetailThreads(id) {
  return async (dispatch) => {
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

function asyncAddThread({ title, body, category }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const tempId = `temp-${Date.now()}`;
    const authUser = getState().authUser;
    const optimisticThread = {
      id: tempId,
      title,
      body,
      category,
      createdAt: new Date().toISOString(),
      owner: authUser,
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    };
    dispatch(addThreadActionCreator(optimisticThread));

    try {
      const newThread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(newThread));
      dispatch(asyncGetAllThreads());
    } catch (error) {
      toast.error(error?.message || 'Gagal menambahkan thread');
    } finally {
      dispatch(hideLoading());
    }
  };
}


function asyncAddThreadComment({ content, threadId }){
  return  async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.createThreadComment({ content, threadId });
      dispatch(asyncGetDetailThreads(threadId));
    } catch (error) {
      toast.error(error);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncThreadVote({ threadId, voteType, commetId }){
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.vote({ threadId, voteType, commetId });
    } catch (error){
      toast.error(error);
    } finally {
      dispatch(hideLoading());
    }

  };
}



export {
  ActionType,
  receiveAllThreadsActionCreator,
  receiveDetailThreadsActionCreator,
  asyncGetAllThreads,
  asyncGetDetailThreads,
  asyncAddThread,
  addThreadActionCreator,
  asyncAddThreadComment,
  asyncThreadVote
};
