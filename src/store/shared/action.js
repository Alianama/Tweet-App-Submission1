import api from '@/utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { receiveAllThreadsActionCreator } from '../threads/action';
import { receiveAllUsersActionCreator } from '../allUsers/action';
import { toast } from 'sonner';

function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();
      dispatch(receiveAllThreadsActionCreator(threads));
      dispatch(receiveAllUsersActionCreator(users));
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export { asyncPopulateUsersAndThreads };
