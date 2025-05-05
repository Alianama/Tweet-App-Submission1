import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { asyncGetDetailThreads } from '@/store/threadDetail/action';
import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge/badge';
import { Button } from '@/components/ui/button/button';
import {
  HeartIcon,
  MessageCircleIcon,
  HeartOff,
  ShareIcon,
} from 'lucide-react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import CommentCard from '@/components/post/CommentCard';
import CommentFrom from '../components/post/CommentForm';
import { asyncAddThreadComment } from '@/store/threads/action';
import { toast } from 'sonner';

export default function DetailPost() {
  const { id } = useParams();
  const post = useSelector((state) => state.threads.detail[id]);
  const authUser = useSelector((state) => state.authUser);
  const authUserId = authUser.id;
  const hasUpvoted = post?.upVotesBy?.includes(authUserId);
  const hasDownvoted = post?.downVotesBy?.includes(authUserId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetDetailThreads(id));
  }, [dispatch, id]);
  console.log(post);
  if (!post) return null;
  const handleComment = async (comment) => {
    try {
      await dispatch(asyncAddThreadComment({ content: comment, threadId: id }));
      toast.success('Post Comment Berhasil');
    } catch (error) {
      toast.error('Gagal menambahkan komentar:', error);
    }
  };

  return (
    <div>
      <title>{post.title}</title>
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center gap-4 p-4">
          <Avatar>
            <AvatarImage src={post?.owner?.avatar} alt={post?.owner?.name} />
          </Avatar>
          <div>
            <div className="font-semibold">{post?.owner?.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(post.createdAt).toLocaleString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </div>
          </div>
          <Badge className="ml-auto" variant="outline"></Badge>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <h3 className="text-xl font-bold mb-2">{post.title}</h3>
          <p
            className="text-gray-600 dark:text-gray-300"
            dangerouslySetInnerHTML={{
              __html: post.body,
            }}
          ></p>
        </CardContent>
        <CommentFrom onComment={handleComment} />
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
              <span>{post.comments.length}</span>
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
      {post.comments.map((comment) => (
        <CommentCard key={comment.id} comments={comment} />
      ))}
    </div>
  );
}
