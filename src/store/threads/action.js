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
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
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
};
