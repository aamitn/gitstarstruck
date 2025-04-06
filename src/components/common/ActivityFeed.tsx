'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { formatDistanceToNow, parseISO } from 'date-fns';

interface ActivityItem {
  username: string;
  action: 'starred' | 'unstarred';
  repoUser: string;
  repoName: string;
  time: string;
}

interface ActivityResponse {
  activity: ActivityItem[];
  badgeCount: number;
}

export default function ActivityFeed() {
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [badgeCount, setBadgeCount] = useState<number>(0);

  useEffect(() => {
    const fetchActivity = async () => {
      const res = await fetch('/api/repo-activity');
      const data: ActivityResponse = await res.json();
      setActivity(data.activity);
      setBadgeCount(data.badgeCount);
    };

    fetchActivity();
    const interval = setInterval(fetchActivity, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-3xl mx-auto overflow-hidden border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 shadow">
      <h3 className="text-xl sm:text-2xl font-extrabold px-4 py-3 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-500 to-indigo-600 text-white dark:bg-gradient-to-r dark:from-blue-500 dark:to-indigo-800">
        <span className="flex items-center gap-2">
          <span role="img" aria-label="clock" className="text-lg animate-pulse">
            ⏰
          </span>
          Recent Activity
        </span>

        <motion.span
          className="flex items-center gap-2 text-lg rounded-full px-3 py-1 shadow-lg transform transition-transform hover:scale-110 cursor-pointer
          bg-gradient-to-r 
          from-orange-400 via-purple-500 to-indigo-600 
          dark:from-orange-600 dark:via-pink-500 dark:to-purple-700 
          text-white"
          initial={{ scale: 1 }}
          animate={{
            scale: [1, 1.2, 1], // Heartbeat effect: pulse in and out
          }}
          transition={{
            duration: 1, // Duration of each pulse cycle
            repeat: Infinity, // Keep pulsing indefinitely
            repeatType: 'loop', // Loop the animation
            ease: 'easeInOut', // Smooth in-out effect for pulsing
          }}
          style={{
            // Anti-aliasing styles for smoother text rendering
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            textRendering: 'optimizeLegibility',
          }}
        >
          <span className="font-bold">{badgeCount}</span>
          <span className="text-sm font-semibold">badges and counting</span>
        </motion.span>
      </h3>
      <div className="max-h-72 overflow-y-auto scroll-smooth space-y-2 p-4">
        {activity.map((item, idx) => {
          const isRecent = Date.now() - new Date(item.time).getTime() < 60000;
          const emoji =
            item.action === 'starred' ? (isRecent ? '🔥' : '⭐') : '❌';

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="flex items-start gap-2 px-3 py-2 bg-white dark:bg-gray-900 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 text-sm"
            >
              <div className="flex-1">
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {item.username}
                </span>{' '}
                {emoji} {item.action}{' '}
                <a
                  href={`https://github.com/${item.repoUser}/${item.repoName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-700 dark:text-purple-400 font-medium underline"
                >
                  {item.repoName}
                </a>{' '}
                as initiated by{' '}
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  {item.repoUser}
                </span>
              </div>
              <span className="text-gray-500 dark:text-gray-400 text-xs whitespace-nowrap ml-2">
                {formatDistanceToNow(parseISO(item.time), { addSuffix: true })}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
