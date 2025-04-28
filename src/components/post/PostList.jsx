import { useState, useEffect } from 'react';
import PostCard from '@/components/post/PostCard';
const fetchPosts = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          username: 'John Doe',
          avatar: '/placeholder.svg?height=40&width=40',
          timeAgo: '2 hours ago',
          category: 'pemrograman',
          title: 'How was your experience learning React?',
          description:
            'Share your thoughts about learning React. What challenges did you face and how did you overcome them?',
          likes: 24,
          comments: 12,
          shares: 3,
        },
        {
          id: 2,
          username: 'Andi Saputra',
          avatar: '/placeholder.svg?height=40&width=40',
          timeAgo: '5 hours ago',
          category: 'desain',
          title: 'UI Design Tips for Beginners',
          description:
            'Here are some UI design tips I learned over the past 2 years. Hopefully helpful for those just starting!',
          likes: 42,
          comments: 8,
          shares: 5,
        },
        {
          id: 3,
          username: 'Budi Pratama',
          avatar: '/placeholder.svg?height=40&width=40',
          timeAgo: 'Yesterday',
          category: 'nextjs',
          title: 'Next.js 15 Released!',
          description:
            'Next.js 15 has just been released with amazing new features. What do you think about the new partial rendering and server actions?',
          likes: 36,
          comments: 15,
          shares: 7,
        },
      ]);
    }, 1500); // Simulating 1.5s delay for data fetching
  });
};

export function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
      setLoading(false);
    };

    loadPosts();
  }, []);

  if (loading) {
    return <div>Loading posts...</div>;
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
