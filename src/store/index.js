import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import userReducer from './users/reducer';
import isPreloadReducer from './isPreload/reducer';
import authUserReducer from './authUser/reducer';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    loadingBar: loadingBarReducer,
    users: userReducer,
    isPreload: isPreloadReducer,
  },
});

export default store;
