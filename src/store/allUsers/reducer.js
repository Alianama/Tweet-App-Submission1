import { ActionType } from './action';

function allUserReducer(allUsers = [], action = {}) {
  switch (action.type) {

  case ActionType.RECEIVE_ALL_USERS:
    return action.payload.allUsers;
  default:
    return allUsers;
  }
}

export default allUserReducer;
