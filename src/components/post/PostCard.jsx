import { Card, CardHeader, CardFooter, CardContent } from '../ui/card';
import { Badge } from '../ui/badge/badge';
import { Button } from '../ui/button/button';
import {
  HeartIcon,
  MessageCircleIcon,
  HeartOff,
  ShareIcon,
} from 'lucide-react';
import PropTypes from 'prop-types';
import { timeAgo } from '@/lib/timeAgo';
import { useSelector } from 'react-redux';
import { Avatar, AvatarImage } from '../ui/avatar';

export default function PostCard({ post }) {
  const detailThread = useSelector((state) => state.threads.detail[post.id]);
  const authUser = useSelector((state) => state.authUser);
  const authUserId = authUser.id;

  const hasUpvoted = post.upVotesBy.includes(authUserId);
  const hasDownvoted = post.downVotesBy.includes(authUserId);

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center gap-4 p-4">
        <Avatar>
          <AvatarImage src={detailThread?.owner?.avatar} alt={detailThread?.owner?.name} />
        </Avatar>
        <div>
          <div className="font-semibold">{detailThread?.owner?.name}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {timeAgo(post.createdAt)}
          </div>
        </div>
        <Badge className="ml-auto" variant="outline">
          #{post.category}
        </Badge>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <h3 className="text-xl font-bold mb-2">{post.title}</h3>
        <p className="text-gray-600 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: `${post.body.substring(0, 269)  }...` }}></p>
      </CardContent>
      <CardFooter className="p-4 flex items-center justify-between border-t bg-gray-50 dark:bg-gray-900 dark:border-gray-800">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className={`gap-1 text-gray-600 dark:text-gray-300 hover:text-red-500 ${hasUpvoted ? 'text-red-500' : ''}`}
          >
            <HeartIcon className="w-4 h-4" />
            <span>{post.upVotesBy.length}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className={`gap-1 text-gray-600 dark:text-gray-300 hover:text-red-500 ${hasDownvoted ? 'text-pink-500' : ''}`}
          >
            <HeartOff className="w-4 h-4" />
            <span>{post.downVotesBy.length}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-gray-600 dark:text-gray-300"
          >
            <MessageCircleIcon className="w-4 h-4" />
            <span>{post.totalComments}</span>
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-600 dark:text-gray-300"
        >
          <ShareIcon className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    ownerId: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    totalComments: PropTypes.number.isRequired,
  }).isRequired,
};
