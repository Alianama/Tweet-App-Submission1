import { ActionType } from './action';

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_ALL_THREADS:
      return action.payload.threads;

    case ActionType.ADD_THREADS:
      return [action.payload.thread, ...threads];

    case ActionType.TOGGLE_UPVOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id !== action.payload.threadId) return thread;

        const { userId } = action.payload;
        const hasUpvoted = thread.upVotesBy.includes(userId);
        const hasDownvoted = thread.downVotesBy.includes(userId);

        let upVotesBy = [...thread.upVotesBy];
        let downVotesBy = [...thread.downVotesBy];

        if (hasUpvoted) {
          upVotesBy = upVotesBy.filter((id) => id !== userId);
        } else {
          upVotesBy.push(userId);
          if (hasDownvoted) {
            downVotesBy = downVotesBy.filter((id) => id !== userId);
          }
        }

        return {
          ...thread,
          upVotesBy,
          downVotesBy,
        };
      });

    case ActionType.TOGGLE_DOWNVOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id !== action.payload.threadId) return thread;

        const { userId } = action.payload;
        const hasDownvoted = thread.downVotesBy.includes(userId);
        const hasUpvoted = thread.upVotesBy.includes(userId);

        let downVotesBy = [...thread.downVotesBy];
        let upVotesBy = [...thread.upVotesBy];

        if (hasDownvoted) {
          downVotesBy = downVotesBy.filter((id) => id !== userId);
        } else {
          downVotesBy.push(userId);
          if (hasUpvoted) {
            upVotesBy = upVotesBy.filter((id) => id !== userId);
          }
        }

        return {
          ...thread,
          upVotesBy,
          downVotesBy,
        };
      });

    default:
      return threads;
  }
}

export default threadsReducer;
