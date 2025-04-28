import { type } from 'os';
import { func } from 'prop-types';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const ActionType = {
  ADD_TEST_STATE: 'ADD_TEST_STATE',
  REMOVE_TEST_STATE: 'REMOVE_TET_STAE',
};

function addTestActionCreator(tes) {
  return {
    type: ActionType.ADD_TEST_STATE,
    payload: {
      text,
    },
  };
}

function removeTestActionCreator(id) {
  return {
    type: ActionType.REMOVE_TEST_STATE,
    payload: {
      id,
    },
  };
}

export { ActionType, addTestActionCreator, removeTestActionCreator };
