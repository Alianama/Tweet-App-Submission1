import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { toast } from 'sonner';
import api from '@/utils/api';

const ActionType = {
  RECEIVE_ALL_USERS : 'RECEIVE_ALL_USERS'
};

function receiveAllUsersActionCreator(allUsers){{
  return {
    type: ActionType.RECEIVE_ALL_USERS,
    payload : {
      allUsers
    }
  };
}}

function asyncGetAllUsers(){
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const allUsers = await api.getAllUsers();
      console.log(allUsers);
      dispatch(receiveAllUsersActionCreator(allUsers));
    } catch (error) {
      const message = error?.response?.data?.message || error.message || 'Terjadi kesalahan.';
      console.error('Fetch data error:', message);
      toast.error(message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export { ActionType, receiveAllUsersActionCreator, asyncGetAllUsers };