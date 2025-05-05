// import { Card, CardHeader, CardFooter, CardContent } from '../ui/card';
// import { Badge } from '../ui/badge/badge';
// import { Button } from '../ui/button/button';
// import {
//   HeartIcon,
//   MessageCircleIcon,
//   HeartOff,
//   ShareIcon,
// } from 'lucide-react';
// import PropTypes from 'prop-types';
// import { Avatar, AvatarImage } from '../ui/avatar';
// import { useNavigate } from 'react-router-dom';

// export default function PostCard({ post, upVote }) {
//   const hasUpvoted = post.upVotesBy.includes(post.authUser);
//   const hasDownvoted = post.downVotesBy.includes(post.authUser);
//   const navigate = useNavigate();

//   const onUpVoteClick = (event) => {
//     event.stopPropagation();
//     upVote({ threadId: post.id });
//   };

//   return (
//     <Card className="overflow-hidden hover:scale-[1.01] transition-all duration-300 ease-in-out hover:shadow-md cursor-pointer">
//       <CardHeader
//         onClick={() => navigate(`/post/${post.id}`)}
//         className="flex flex-row items-center gap-4 p-4"
//       >
//         <Avatar>
//           <AvatarImage src={post.user.avatar} alt={post.user.name} />
//         </Avatar>
//         <div>
//           <div className="font-semibold">{post.user.name}</div>
//           <div className="text-sm text-gray-500 dark:text-gray-400">
//             {new Date(post.createdAt).toLocaleString('id-ID', {
//               weekday: 'long',
//               year: 'numeric',
//               month: 'long',
//               day: 'numeric',
//               hour: '2-digit',
//               minute: '2-digit',
//             })}
//           </div>
//         </div>
//         <Badge className="ml-auto" variant="outline">
//           #{post.category}
//         </Badge>
//       </CardHeader>
//       <CardContent
//         onClick={() => navigate(`/post/${post.id}`)}
//         className="p-4 pt-0"
//       >
//         <h3 className="text-xl hover:text-purple-600 transition-all duration-300 ease-in-out font-bold mb-2">
//           {post.title}
//         </h3>
//         <p
//           className="text-gray-600  dark:text-gray-300"
//           dangerouslySetInnerHTML={{
//             __html: `${post.body.substring(0, 269)}...`,
//           }}
//         ></p>
//       </CardContent>
//       <CardFooter className="p-4 flex items-center justify-between border-t bg-gray-50 dark:bg-gray-900 dark:border-gray-800">
//         <div className="flex items-center gap-4">
//           <Button
//             onClick={onUpVoteClick}
//             variant="ghost"
//             size="sm"
//             className={`gap-1 text-gray-600 dark:text-gray-300 hover:text-red-500 ${hasUpvoted ? 'text-red-500' : ''}`}
//           >
//             <HeartIcon className="w-4 h-4" />
//             <span>{post.upVotesBy.length}</span>
//           </Button>

//           <Button
//             variant="ghost"
//             size="sm"
//             className={`gap-1 text-gray-600 dark:text-gray-300 hover:text-red-500 ${hasDownvoted ? 'text-pink-500' : ''}`}
//           >
//             <HeartOff className="w-4 h-4" />
//             <span>{post.downVotesBy.length}</span>
//           </Button>

//           <Button
//             variant="ghost"
//             size="sm"
//             className="gap-1 text-gray-600 dark:text-gray-300"
//           >
//             <MessageCircleIcon className="w-4 h-4" />
//             <span>{post.totalComments}</span>
//           </Button>
//         </div>
//         <Button
//           variant="ghost"
//           size="sm"
//           className="text-gray-600 dark:text-gray-300"
//         >
//           <ShareIcon className="w-4 h-4" />
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }

// PostCard.propTypes = {
//   post: PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     ownerId: PropTypes.string.isRequired,
//     createdAt: PropTypes.string.isRequired,
//     category: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     body: PropTypes.string.isRequired,
//     upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
//     downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
//     totalComments: PropTypes.number.isRequired,
//   }).isRequired,
// };

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
import { Avatar, AvatarImage } from '../ui/avatar';
import { useNavigate } from 'react-router-dom';

export default function PostCard({ post, upVote, downVote }) {
  const navigate = useNavigate();

  const hasUpvoted = post.upVotesBy.includes(post.authUser);
  console.log(hasUpvoted);
  const hasDownvoted = post.downVotesBy.includes(post.authUser);

  const onUpVoteClick = (event) => {
    event.stopPropagation();
    upVote({ threadId: post.id });
  };

  const onDownVoteClick = (event) => {
    event.stopPropagation();
    downVote({ threadId: post.id });
  };

  return (
    <Card className="overflow-hidden hover:scale-[1.01] transition-all duration-300 ease-in-out hover:shadow-md cursor-pointer">
      <CardHeader
        onClick={() => navigate(`/post/${post.id}`)}
        className="flex flex-row items-center gap-4 p-4"
      >
        <Avatar>
          <AvatarImage src={post.user.avatar} alt={post.user.name} />
        </Avatar>
        <div>
          <div className="font-semibold">{post.user.name}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(post.createdAt).toLocaleString('id-ID', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
        <Badge className="ml-auto" variant="outline">
          #{post.category}
        </Badge>
      </CardHeader>
      <CardContent
        onClick={() => navigate(`/post/${post.id}`)}
        className="p-4 pt-0"
      >
        <h3 className="text-xl hover:text-purple-600 transition-all duration-300 ease-in-out font-bold mb-2">
          {post.title}
        </h3>
        <p
          className="text-gray-600 dark:text-gray-300"
          dangerouslySetInnerHTML={{
            __html: `${post.body.substring(0, 269)}...`,
          }}
        ></p>
      </CardContent>
      <CardFooter className="p-4 flex items-center justify-between border-t bg-gray-50 dark:bg-gray-900 dark:border-gray-800">
        <div className="flex items-center gap-4">
          <Button
            onClick={onUpVoteClick}
            variant="ghost"
            size="sm"
            className={`gap-1 text-gray-600 dark:text-gray-300 hover:text-red-500 ${hasUpvoted ? 'text-red-500' : ''}`}
          >
            <HeartIcon className="w-4 h-4" />
            <span>{post.upVotesBy.length}</span>
          </Button>

          <Button
            onClick={onDownVoteClick}
            variant="ghost"
            size="sm"
            className={`gap-1 text-gray-600 dark:text-gray-300 hover:text-pink-500 ${hasDownvoted ? 'text-pink-500' : ''}`}
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
    authUser: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    ownerId: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    totalComments: PropTypes.number.isRequired,
    user: PropTypes.shape({
      avatar: PropTypes.string,
      name: PropTypes.string,
    }),
  }).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
};
