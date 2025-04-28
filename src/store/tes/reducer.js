import { ActionType } from './action';

function testReducer(state = null, action = {}) {
  switch (action.type) {
    case ActionType.ADD_TEST_STATE:
      return action.payload.tes;
    case ActionType.REMOVE_TEST_STATE:
      return action.payload.id;
    default:
      return state;
  }
}

export default testReducer;
