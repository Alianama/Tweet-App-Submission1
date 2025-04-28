import { Card, CardHeader, CardFooter, CardContent } from '../ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge/badge';
import { Button } from '../ui/button/button';
import {
  HeartIcon,
  MessageCircleIcon,
  RepeatIcon,
  ShareIcon,
} from 'lucide-react';
import PropTypes from 'prop-types';

export default function PostCard({ post }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center gap-4 p-4">
        <Avatar>
          <AvatarImage src={post.avatar} alt="Pengguna" />
          <AvatarFallback>{post.username[0]}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-semibold">{post.username}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {post.timeAgo}
          </div>
        </div>
        <Badge className="ml-auto" variant="outline">
          #{post.category}
        </Badge>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <h3 className="text-xl font-bold mb-2">{post.title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{post.description}</p>
      </CardContent>
      <CardFooter className="p-4 flex items-center justify-between border-t bg-gray-50 dark:bg-gray-900 dark:border-gray-800">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-gray-600 dark:text-gray-300 hover:text-red-500"
          >
            <HeartIcon className="w-4 h-4" />
            <span>{post.likes}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-gray-600 dark:text-gray-300"
          >
            <MessageCircleIcon className="w-4 h-4" />
            <span>{post.shares}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-gray-600 dark:text-gray-300"
          >
            <RepeatIcon className="w-4 h-4" />
            <span>3</span>
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
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    timeAgo: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    shares: PropTypes.number.isRequired,
  }).isRequired,
};
