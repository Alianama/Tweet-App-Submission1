import { ActionType } from './action';

function detailThreadsReducer(threadDetail = null, action) {
  switch (action.type) {
  case ActionType.RECEIVE_DETAIL_THREADS:
    return action.payload.detailThreads;
  default:
    return threadDetail;
  }
}

export default detailThreadsReducer;
