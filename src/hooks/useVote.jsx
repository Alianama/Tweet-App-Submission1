import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { asyncThreadVote } from '@/store/threads/action';

function useVote() {
  const [voteStatus, setVoteStatus] = useState(null);
  const [voteError, setVoteError] = useState(null);
  const dispatch = useDispatch();

  const handleUpvote = async ({ threadId, commentId = null }) => {
    setVoteStatus('loading');
    setVoteError(null);
    try {
      await dispatch(asyncThreadVote({ threadId, voteType: 'up-vote', commentId }));
      setVoteStatus('success');
    } catch (error) {
      setVoteStatus('error');
      setVoteError(error.message || 'Terjadi kesalahan saat upvote.');
    }
  };

  const handleDownvote = async ({ threadId, commentId = null }) => {
    setVoteStatus('loading');
    setVoteError(null);
    try {
      await dispatch(asyncThreadVote({ threadId, voteType: 'down-vote', commentId }));
      setVoteStatus('success');
    } catch (error) {
      setVoteStatus('error');
      setVoteError(error.message || 'Terjadi kesalahan saat downvote.');
    }
  };

  const handleNeutralVote = async ({ threadId, commentId = null }) => {
    setVoteStatus('loading');
    setVoteError(null);
    try {
      await dispatch(asyncThreadVote({ threadId, voteType: 'neutral-vote', commentId }));
      setVoteStatus('success');
    } catch (error) {
      setVoteStatus('error');
      setVoteError(error.message || 'Terjadi kesalahan saat memberikan suara netral.');
    }
  };

  return { voteStatus, voteError, handleUpvote, handleDownvote, handleNeutralVote };
}

export default useVote;
