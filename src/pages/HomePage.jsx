import { PostList } from '@/components/post/PostList';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useEffect, useMemo } from 'react';
import { asyncPopulateUsersAndThreads } from '@/store/shared/action';
import { asyncThreadDownVote, asyncThreadUpVote } from '@/store/threads/action';
import { useSearchParams } from 'react-router-dom';

export default function Home() {
  const dispatch = useDispatch();
  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);
  const authUser = useSelector((state) => state.authUser);
  const [searchParams,] = useSearchParams();
  const category = searchParams.get('category');
  const keyword = searchParams.get('keyword');

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const threadList = useMemo(() => {
    return threads
      .filter((thread) => !category || thread.category === category)
      .filter((thread) => {
        if (!keyword) return true;
        const lowerKeyword = keyword.toLowerCase();
        return (
          thread.title.toLowerCase().includes(lowerKeyword) ||
          thread.body.toLowerCase().includes(lowerKeyword)
        );
      })
      .map((thread) => ({
        ...thread,
        user: users.find((user) => user.id === thread.ownerId),
        authUser: authUser.id,
      }));
  }, [threads, users, authUser, category, keyword]);


  const onUpVote = useCallback((threadId) => {
    dispatch(asyncThreadUpVote(threadId));
  }, [dispatch]);

  const onDownVote = useCallback((threadId) => {
    dispatch(asyncThreadDownVote(threadId));
  }, [dispatch]);

  return (
    <>
      <title>Home</title>
      <PostList threads={threadList} upVote={onUpVote} downVote={onDownVote} />
    </>
  );
}
