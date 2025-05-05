import { PostList } from '@/components/post/PostList';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { asyncPopulateUsersAndThreads } from '@/store/shared/action';
import { asyncThreadDownVote, asyncThreadUpVote } from '@/store/threads/action';

export default function Home() {
  const dispatch = useDispatch();
  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);
  const authUser = useSelector((state) => state.authUser);

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  }));

  const onUpVote = (threadId) => {
    dispatch(asyncThreadUpVote(threadId));
  };

  const onDownVote = (threadId) => {
    dispatch(asyncThreadDownVote(threadId));
  };

  return (
    <>
      <title>Home</title>
      <PostList threads={threadList} upVote={onUpVote} downVote={onDownVote} />
    </>
  );
}
