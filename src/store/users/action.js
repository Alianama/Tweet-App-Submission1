import { toast } from 'sonner';
import api from '@/utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS',
};

function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

function asyncRegisterUser({ name, email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.register({ name, email, password });
      toast.success('Registrasi berhasil! 🎉');
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || 'Terjadi kesalahan.';
      console.error('Register error:', message);
      toast.error(`Gagal registrasi: ${message}`);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export { ActionType, receiveUsersActionCreator, asyncRegisterUser };
