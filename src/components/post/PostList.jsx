import { useEffect } from 'react';
import PostCard from '@/components/post/PostCard';
import { useSelector, useDispatch } from 'react-redux';
import { asyncGetAllThreads } from '@/store/threads/action';

export function PostList() {
  const dispatch = useDispatch();
  const threads = useSelector((state) => state.threads.list);

  useEffect(() => {
    dispatch(asyncGetAllThreads());
  }, [dispatch]);

  return (
    <div className="space-y-4">
      {threads.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
