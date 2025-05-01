// import { ActionType } from './action';

// function threadsReducer(threads = [], action = {}) {
//   switch (action.type) {
//   case ActionType.GET_ALL_THREADS:
//     return action.payload?.threads || [];
//   case ActionType.RECEIVE_DETAIL_THREADS:
//     return {};
//   default:
//     return threads;
//   }
// }

// export default threadsReducer;
import { ActionType } from './action';

const initialState = {
  list: [],
  detail: {}, // pakai objek dan key-nya adalah threadId
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
        [action.payload.detailThreads.id]: action.payload.detailThreads, // simpan berdasarkan ID
      },
    };

  default:
    return state;
  }
}

export default threadsReducer;
