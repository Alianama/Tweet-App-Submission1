// import { ActionType } from './action';

// function detailThreadsReducer(threadDetail = null, action) {
//   switch (action.type) {
//   case ActionType.RECEIVE_DETAIL_THREADS:
//     return action.payload.detailThreads;

//   case ActionType.CLEAR_THREAD_DETAIL:
//     return null;

//   case ActionType.TOGGLE_UPVOTE_THREAD_DETAIL: {
//     const { userId } = action.payload;
//     const hasUpvoted = threadDetail.upVotesBy.includes(userId);
//     const hasDownvoted = threadDetail.downVotesBy.includes(userId);

//     let upVotesBy = [...threadDetail.upVotesBy];
//     let downVotesBy = [...threadDetail.downVotesBy];

//     if (hasUpvoted) {
//       upVotesBy = upVotesBy.filter((id) => id !== userId);
//     } else {
//       upVotesBy.push(userId);
//       if (hasDownvoted) {
//         downVotesBy = downVotesBy.filter((id) => id !== userId);
//       }
//     }

//     return {
//       ...threadDetail,
//       upVotesBy,
//       downVotesBy,
//     };
//   }
//   case ActionType.TOGGLE_DOWNVOTE_THREAD_DETAIL: {
//     const { userId } = action.payload;
//     const hasUpvoted = threadDetail.upVotesBy.includes(userId);
//     const hasDownvoted = threadDetail.downVotesBy.includes(userId);

//     let upVotesBy = [...threadDetail.upVotesBy];
//     let downVotesBy = [...threadDetail.downVotesBy];

//     if (hasDownvoted) {
//       downVotesBy = downVotesBy.filter((id) => id !== userId);
//     } else {
//       downVotesBy.push(userId);
//       if (hasUpvoted) {
//         upVotesBy = upVotesBy.filter((id) => id !== userId);
//       }
//     }

//     return {
//       ...threadDetail,
//       upVotesBy,
//       downVotesBy,
//     };
//   }

//   default:
//     return threadDetail;
//   }
// }

// export default detailThreadsReducer;

import { ActionType } from './action';

function detailThreadsReducer(threadDetail = null, action) {
  switch (action.type) {
    case ActionType.RECEIVE_DETAIL_THREADS:
      return action.payload.detailThreads;

    case ActionType.CLEAR_THREAD_DETAIL:
      return null;

    case ActionType.TOGGLE_UPVOTE_THREAD_DETAIL: {
      const { userId } = action.payload;
      const hasUpvoted = threadDetail.upVotesBy.includes(userId);
      const hasDownvoted = threadDetail.downVotesBy.includes(userId);

      let upVotesBy = [...threadDetail.upVotesBy];
      let downVotesBy = [...threadDetail.downVotesBy];

      if (hasUpvoted) {
        upVotesBy = upVotesBy.filter((id) => id !== userId);
      } else {
        upVotesBy.push(userId);
        if (hasDownvoted) {
          downVotesBy = downVotesBy.filter((id) => id !== userId);
        }
      }

      return {
        ...threadDetail,
        upVotesBy,
        downVotesBy,
      };
    }

    case ActionType.TOGGLE_DOWNVOTE_THREAD_DETAIL: {
      const { userId } = action.payload;
      const hasUpvoted = threadDetail.upVotesBy.includes(userId);
      const hasDownvoted = threadDetail.downVotesBy.includes(userId);

      let upVotesBy = [...threadDetail.upVotesBy];
      let downVotesBy = [...threadDetail.downVotesBy];

      if (hasDownvoted) {
        downVotesBy = downVotesBy.filter((id) => id !== userId);
      } else {
        downVotesBy.push(userId);
        if (hasUpvoted) {
          upVotesBy = upVotesBy.filter((id) => id !== userId);
        }
      }

      return {
        ...threadDetail,
        upVotesBy,
        downVotesBy,
      };
    }

    case ActionType.TOGGLE_UPVOTE_COMMENT: {
      const { commentId, userId } = action.payload;
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id !== commentId) return comment;

          const hasUpvoted = comment.upVotesBy.includes(userId);
          let upVotesBy = comment.upVotesBy.filter((id) => id !== userId);
          if (!hasUpvoted) upVotesBy.push(userId);

          return { ...comment, upVotesBy };
        }),
      };
    }

    case ActionType.TOGGLE_DOWNVOTE_COMMENT: {
      const { commentId, userId } = action.payload;
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id !== commentId) return comment;

          const hasDownvoted = comment.downVotesBy.includes(userId);
          let downVotesBy = comment.downVotesBy.filter((id) => id !== userId);
          if (!hasDownvoted) downVotesBy.push(userId);

          return { ...comment, downVotesBy };
        }),
      };
    }

    default:
      return threadDetail;
  }
}

export default detailThreadsReducer;
