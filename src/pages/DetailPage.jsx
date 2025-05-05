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
import { toast } from 'sonner';

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
