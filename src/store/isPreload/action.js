import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '@/utils/api';
import { setAuthUserActionCreator } from '../authUser/action';
import { toast } from 'sonner';

const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

function setIsPreloadActionCreator(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}

function asyncPreloadProcess() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(setIsPreloadActionCreator(false));
    }
    dispatch(hideLoading());
  };
}
export { ActionType, setIsPreloadActionCreator, asyncPreloadProcess };
