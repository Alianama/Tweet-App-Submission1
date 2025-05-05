import { configureStore } from '@reduxjs/toolkit';
import {
  loadingBarReducer,
  loadingBarMiddleware,
} from 'react-redux-loading-bar';
import userReducer from './users/reducer';
import isPreloadReducer from './isPreload/reducer';
import authUserReducer from './authUser/reducer';
import threadsReducer from './threads/reducer';
import allUserReducer from './allUsers/reducer';
import leaderboardsReducer from './leaderboards/reducer';
import detailThreadsReducer from './threadDetail/reducer';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    loadingBar: loadingBarReducer,
    users: userReducer,
    isPreload: isPreloadReducer,
    threads: threadsReducer,
    threadDetail: detailThreadsReducer,
    allUsers: allUserReducer,
    leaderboards: leaderboardsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loadingBarMiddleware()),
});

export default store;
