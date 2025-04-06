'use client';

import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <div className="relative w-8 h-8"></div>
      <span className="text-xl font-bold tracking-tight text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        Git<span className="text-blue-600 dark:text-blue-400">Star</span>Struck
      </span>
    </Link>
  );
}
