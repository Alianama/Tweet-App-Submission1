// import { useParams } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { useEffect } from 'react';
// import { asyncGetDetailThreads } from '@/store/threadDetail/action';
// import {
//   Card,
//   CardHeader,
//   CardFooter,
//   CardContent,
// } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge/badge';
// import { Button } from '@/components/ui/button/button';
// import {
//   HeartIcon,
//   MessageCircleIcon,
//   HeartOff,
//   ShareIcon,
// } from 'lucide-react';
// import { Avatar, AvatarImage } from '@/components/ui/avatar';
// import CommentCard from '@/components/post/CommentCard';
// import CommentFrom from '../components/post/CommentForm';
// import { asyncAddThreadComment } from '@/store/threads/action';
// import { toast } from 'sonner';

// export default function DetailPost() {
//   const { id } = useParams();
//   const threadDetail = useSelector((state) => state.threadDetail);
//   const authUser = useSelector((state) => state.authUser);
//   const authUserId = authUser.id;
//   const hasUpvoted = threadDetail?.upVotesBy?.includes(authUserId);
//   const hasDownvoted = threadDetail?.downVotesBy?.includes(authUserId);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(asyncGetDetailThreads(id));
//   }, [dispatch, id]);
//   console.log(threadDetail);
//   if (!threadDetail) return null;
//   const handleComment = async (comment) => {
//     try {
//       await dispatch(asyncAddThreadComment({ content: comment, threadId: id }));
//       toast.success('Post Comment Berhasil');
//     } catch (error) {
//       toast.error('Gagal menambahkan komentar:', error);
//     }
//   };

//   return (
//     <div>
//       <title>{threadDetail.title}</title>
//       <Card className="overflow-hidden">
//         <CardHeader className="flex flex-row items-center gap-4 p-4">
//           <Avatar>
//             <AvatarImage
//               src={threadDetail?.owner?.avatar}
//               alt={threadDetail?.owner?.name}
//             />
//           </Avatar>
//           <div>
//             <div className="font-semibold">{threadDetail?.owner?.name}</div>
//             <div className="text-sm text-gray-500 dark:text-gray-400">
//               {new Date(threadDetail.createdAt).toLocaleString('id-ID', {
//                 weekday: 'long',
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric',
//                 hour: '2-digit',
//                 minute: '2-digit',
//                 second: '2-digit',
//               })}
//             </div>
//           </div>
//           <Badge className="ml-auto" variant="outline"></Badge>
//         </CardHeader>
//         <CardContent className="p-4 pt-0">
//           <h3 className="text-xl font-bold mb-2">{threadDetail.title}</h3>
//           <p
//             className="text-gray-600 dark:text-gray-300"
//             dangerouslySetInnerHTML={{
//               __html: threadDetail.body,
//             }}
//           ></p>
//         </CardContent>
//         <CommentFrom onComment={handleComment} />
//         <CardFooter className="p-4 flex items-center justify-between border-t bg-gray-50 dark:bg-gray-900 dark:border-gray-800">
//           <div className="flex items-center gap-4">
//             <Button
//               variant="ghost"
//               size="sm"
//               className={`gap-1 text-gray-600 dark:text-gray-300 hover:text-red-500 ${hasUpvoted ? 'text-red-500' : ''}`}
//             >
//               <HeartIcon className="w-4 h-4" />
//               <span>{threadDetail.upVotesBy.length}</span>
//             </Button>

//             <Button
//               variant="ghost"
//               size="sm"
//               className={`gap-1 text-gray-600 dark:text-gray-300 hover:text-red-500 ${hasDownvoted ? 'text-pink-500' : ''}`}
//             >
//               <HeartOff className="w-4 h-4" />
//               <span>{threadDetail.downVotesBy.length}</span>
//             </Button>

//             <Button
//               variant="ghost"
//               size="sm"
//               className="gap-1 text-gray-600 dark:text-gray-300"
//             >
//               <MessageCircleIcon className="w-4 h-4" />
//               <span>{threadDetail.comments.length}</span>
//             </Button>
//           </div>
//           <Button
//             variant="ghost"
//             size="sm"
//             className="text-gray-600 dark:text-gray-300"
//           >
//             <ShareIcon className="w-4 h-4" />
//           </Button>
//         </CardFooter>
//       </Card>
//       {threadDetail.comments.map((comment) => (
//         <CommentCard key={comment.id} comments={comment} />
//       ))}
//     </div>
//   );
// }

import PostCard from '@/components/post/PostCard';
import {
  asyncDownVoteThreadDetail,
  asyncGetDetailThreads,
  asyncUpVoteThreadDetail,
} from '@/store/threadDetail/action';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import CommentCard from '@/components/post/CommentCard';
import CommentForm from '@/components/post/CommentForm';
import { asyncAddThreadComment } from '@/store/threads/action';

function DetailPage() {
  const threadDetail = useSelector((state) => state.threadDetail);
  const authUser = useSelector((state) => state.authUser);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(asyncGetDetailThreads(id));
    }
  }, [id, dispatch]);

  const onUpVote = () => {
    dispatch(asyncUpVoteThreadDetail());
  };

  const onDownVote = () => {
    dispatch(asyncDownVoteThreadDetail());
  };

  const handleComment = async (comment) => {
    try {
      await dispatch(asyncAddThreadComment({ content: comment, threadId: id }));
      toast.success('Post Comment Berhasil');
    } catch (error) {
      toast.error('Gagal menambahkan komentar:', error);
    }
  };

  if (!threadDetail) {
    return <p className="text-center mt-10">Loading thread...</p>;
  }

  return (
    <section className="detail-page space-y-6">
      <title>{threadDetail.title}</title>
      {threadDetail.parent && (
        <div className="detail-page__parent border p-4 rounded-md bg-muted">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">
            Replying To
          </h3>
          <PostCard {...threadDetail.parent} authUser={authUser.id} isParent />
        </div>
      )}

      <PostCard
        {...threadDetail}
        authUser={authUser?.id}
        user={threadDetail.owner}
        upVote={onUpVote}
        downVote={onDownVote}
      />
      <CommentForm onComment={handleComment} />
      <h2 className="font-semibold">{`Komentar (${threadDetail.comments.length})`}</h2>
      {threadDetail.comments.map((comment) => (
        <CommentCard key={comment.id} comments={comment} />
      ))}
    </section>
  );
}

export default DetailPage;
