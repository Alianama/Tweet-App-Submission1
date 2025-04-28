import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import testReducer from './tes/reducer';

const store = configureStore({
  reducer: {
    loadingBar: loadingBarReducer,
    testReducer: testReducer,
  },
});

export default store;
