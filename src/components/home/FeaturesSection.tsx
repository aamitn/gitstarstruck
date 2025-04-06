'use client';

import { motion } from 'motion/react';

export default function FeaturesSection() {
  return (
    <motion.section
      className="mt-24 max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <h2 className="text-2xl font-bold mb-10 text-center">
        Why GitStarStruck?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
        <motion.div
          className="p-6 rounded-xl bg-blue-50 dark:bg-blue-950/20"
          whileHover={{ y: -5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="text-2xl mb-3">🌟</div>
          <h3 className="font-semibold text-lg mb-2">
            Get Your First 16 Stars
          </h3>
          <p className="text-muted-foreground">
            Jumpstart your open-source project and unlock its first 16 stars.
            Get recognized and show off your first GitHub flex!
          </p>
        </motion.div>

        <motion.div
          className="p-6 rounded-xl bg-purple-50 dark:bg-purple-950/20"
          whileHover={{ y: -5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="text-2xl mb-3">🚀</div>
          <h3 className="font-semibold text-lg mb-2">
            Kickstart Project Growth
          </h3>
          <p className="text-muted-foreground">
            Watch your open-source project grow as it gains traction. Reach
            developers who care, and start building your community.
          </p>
        </motion.div>

        <motion.div
          className="p-6 rounded-xl bg-green-50 dark:bg-green-950/20"
          whileHover={{ y: -5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="text-2xl mb-3">📈</div>
          <h3 className="font-semibold text-lg mb-2">Track Your Star Growth</h3>
          <p className="text-muted-foreground">
            Keep an eye on your project's progress and see how your stars are
            multiplying with insightful performance metrics.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
