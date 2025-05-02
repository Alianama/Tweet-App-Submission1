import { Button } from '../ui/button/button';
import { useSelector } from 'react-redux';
import { HeartIcon, HeartOff } from 'lucide-react';
import PropTypes from 'prop-types';

export default function CommentCard({ comments }) {
  const authUser = useSelector((state) => state.authUser);
  const authUserId = authUser.id;
  const hasUpvoted = comments.upVotesBy.includes(authUserId);
  const hasDownvoted = comments.downVotesBy.includes(authUserId);

  return (
    <div className=" shadow-lg p-5 mt-5 rounded-2xl">
      <div className="flex  justify-between ">
        <div className="flex items-center gap-2">
          <img
            src={comments.owner.avatar}
            alt={comments.owner.name}
            className="h-7 w-7 rounded-full"
          />
          <p className="font-medium text-sm">{comments.owner.name}</p>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {new Date(comments.createdAt).toLocaleString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
      <div className="break-words">
        <div
          className="mt-2 text-sm whitespace-pre-wrap leading-relaxed break-words max-w-full overflow-hidden"
          style={{ wordBreak: 'break-word', lineHeight: '1.6' }}
          dangerouslySetInnerHTML={{ __html: comments.content }}
        />
      </div>
      <div className="flex pt-5 items-start ">
        <Button
          variant="ghost"
          size="sm"
          className={`gap-1 text-gray-600 dark:text-gray-300 hover:text-red-500 ${hasUpvoted ? 'text-red-500' : ''}`}
        >
          <HeartIcon className="w-4 h-4" />
          <span>{comments.upVotesBy.length}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`gap-1 text-gray-600 dark:text-gray-300 hover:text-red-500 ${hasDownvoted ? 'text-pink-500' : ''}`}
        >
          <HeartOff className="w-4 h-4" />
          <span>{comments.downVotesBy.length}</span>
        </Button>
      </div>
    </div>
  );
}

CommentCard.propTypes = {
  comments: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
