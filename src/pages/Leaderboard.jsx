import { motion } from 'framer-motion';
import { Trophy, Medal } from 'lucide-react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncGetLeaderboards } from '@/store/leaderboards/action';

export default function Leaderboard() {
  const dispatch = useDispatch();
  const leaderboards = useSelector((state) => state.leaderboards);
  useEffect(() => {
    dispatch(asyncGetLeaderboards());
  }, [dispatch]);

  const sortedLeaderboard = [...leaderboards]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-3xl rounded-xl bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Leaderboard</h1>
            <p className="text-sm text-gray-500">{currentDate}</p>
          </div>
          <div className="rounded-lg bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
            Top {sortedLeaderboard.length}
          </div>
        </div>

        <div className="mb-6 grid grid-cols-3 gap-4">
          {sortedLeaderboard.slice(0, 3).map((entry, index) => (
            <motion.div
              key={entry.user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`flex flex-col items-center rounded-lg p-4 ${
                index === 0
                  ? 'bg-gradient-to-b from-amber-50 to-amber-100 shadow-sm'
                  : index === 1
                    ? 'bg-gradient-to-b from-gray-50 to-gray-100'
                    : 'bg-gradient-to-b from-orange-50 to-orange-100'
              }`}
            >
              <div className="relative mb-2">
                <div className="absolute -right-1 -top-1">
                  {index === 0 ? (
                    <Trophy className="h-5 w-5 text-amber-500" />
                  ) : (
                    <Medal
                      className={`h-5 w-5 ${
                        index === 1 ? 'text-gray-400' : 'text-orange-500'
                      }`}
                    />
                  )}
                </div>
                <img
                  src={entry.user.avatar || '/placeholder.svg'}
                  onError={(e) => {
                    e.target.src = '/placeholder.svg';
                  }}
                  alt={entry.user.name}
                  className="h-16 w-16 rounded-full border-2 border-white object-cover shadow-sm"
                />
              </div>
              <h3 className="text-center font-medium text-gray-900">
                {entry.user.name}
              </h3>
              <div className="mt-1 flex items-center gap-1">
                <span className="text-lg font-bold text-gray-900">{entry.score}</span>
                <span className="text-xs text-gray-500">pts</span>
              </div>
              <div className="mt-1 rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-700">
                #{index + 1}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="space-y-2">
          {sortedLeaderboard.slice(3).map((entry, index) => (
            <motion.div
              key={entry.user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: (index + 3) * 0.05 }}
              className="flex items-center rounded-lg border border-gray-100 p-3 transition-colors hover:bg-gray-50"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-700">
                {index + 4}
              </div>
              <img
                src={entry.user.avatar || '/placeholder.svg'}
                onError={(e) => {
                  e.target.src = '/placeholder.svg';
                }}
                alt={entry.user.name}
                className="ml-3 h-10 w-10 rounded-full object-cover"
              />
              <div className="ml-3 flex-1">
                <h3 className="font-medium text-gray-900">{entry.user.name}</h3>
                <p className="text-xs text-gray-500">{entry.user.email}</p>
              </div>
              <div className="flex items-center rounded-full bg-gray-100 px-3 py-1">
                <span className="font-medium text-gray-900">{entry.score}</span>
                <span className="ml-1 text-xs text-gray-500">pts</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
