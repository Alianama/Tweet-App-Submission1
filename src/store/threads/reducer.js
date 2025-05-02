import { ActionType } from './action';

const initialState = {
  list: [],
  detail: {},
};

function threadsReducer(state = initialState, action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_ALL_THREADS:
    return {
      ...state,
      list: action.payload.threads || [],
    };

  case ActionType.RECEIVE_DETAIL_THREADS:
    return {
      ...state,
      detail: {
        ...state.detail,
        [action.payload.detailThreads.id]: action.payload.detailThreads,
      },
    };

  default:
    return state;
  }
}

export default threadsReducer;
