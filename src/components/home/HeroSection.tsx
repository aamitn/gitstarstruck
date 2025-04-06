'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import RotatingStars from './RotatingStars';
import RepoSubmissionForm from '@/components/common/RepoSubmissionForm';
import ActivityFeed from '@/components/common/ActivityFeed';

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
      duration: 0.6,
    },
  },
};

const itemVariants = {
  initial: { y: 20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.6, 0.05, 0.01, 0.99] },
  },
};

export default function HeroSection() {
  return (
    <motion.section
      className="flex flex-col items-center text-center gap-6 max-w-4xl mx-auto"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <motion.div variants={itemVariants} className="mb-2">
        <RotatingStars />
      </motion.div>

      <motion.h1
        className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500"
        variants={itemVariants}
      >
        StarStruck Your GitHub Profile
      </motion.h1>

      <motion.p
        className="text-lg sm:text-xl text-muted-foreground max-w-2xl"
        variants={itemVariants}
      >
        Helping fresh open-source projects hit{' '}
        <motion.strong
          className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-600 inline-block text-3xl sm:text-4xl"
          whileHover={{
            scale: 1.1,
            textShadow:
              '0 0 10px rgba(255, 193, 7, 0.7), 0 0 20px rgba(255, 193, 7, 0.5)',
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          16 stars
        </motion.strong>{' '}
        and unlock their first GitHub flex.
      </motion.p>

      <motion.p
        className="text-lg sm:text-xl text-muted-foreground max-w-2xl"
        variants={itemVariants}
      >
        We don’t just wish on stars — we drop them. 🌠✨
      </motion.p>

      <motion.div className="w-full mt-8" variants={itemVariants}>
        <RepoSubmissionForm />
      </motion.div>

      <motion.div className="w-full mt-12" variants={itemVariants}>
        <ActivityFeed />
      </motion.div>
    </motion.section>
  );
}
