import PostCard from '@/components/post/PostCard';
import PropTypes from 'prop-types';

export function PostList({ threads, upVote, downVote }) {
  console.log(threads);
  return (
    <div className="space-y-4">
      {threads.map((thread) => (
        <PostCard
          key={thread.id}
          post={thread}
          upVote={upVote}
          downVote={downVote}
        />
      ))}
    </div>
  );
}

PostList.propTypes = {
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string,
      body: PropTypes.string,
      category: PropTypes.string,
      createdAt: PropTypes.string,
      owner: PropTypes.string,
      user: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        avatar: PropTypes.string,
      }),
      upVotesBy: PropTypes.arrayOf(PropTypes.string),
      downVotesBy: PropTypes.arrayOf(PropTypes.string),
      totalComments: PropTypes.number,
    })
  ).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
};
