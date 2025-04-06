'use client';

import { motion } from 'motion/react';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';

export default function Home() {
  return (
    <motion.div
      className="min-h-screen bg-background text-foreground font-sans px-6 py-12 sm:px-16 lg:px-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <HeroSection />
      <FeaturesSection />
    </motion.div>
  );
}
