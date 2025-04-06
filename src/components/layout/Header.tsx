'use client';

import AuthStatus from '@/components/common/AuthStatus';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import ThemeSwitcher from '@/components/common/ThemeSwitcher';
import Image from 'next/image';

export default function Header() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === 'ADMIN';

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-black/40 border-b border-muted px-4 sm:px-8 py-3">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        {/* Logo / App Name */}
        <div className="w-full flex justify-between items-center">
          {/* Using next/image for the logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="GitStarStrucks Logo"
              width={40}
              height={40}
              className="object-contain filter dark:invert"
            />
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              GitStarStruck
            </span>
          </Link>
          {/* Show theme switcher inline on small screens */}
          <div className="sm:hidden">
            <ThemeSwitcher />
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
          {/* Theme switcher on larger screens */}
          <div className="hidden sm:block">
            <ThemeSwitcher />
          </div>

          {isAdmin && (
            <Link
              href="/admin"
              className="bg-black text-white px-3 py-1.5 rounded-md text-sm hover:bg-gray-800 dark:hover:bg-gray-700 transition w-full sm:w-auto text-center"
            >
              Admin Panel
            </Link>
          )}
          <AuthStatus />
        </div>
      </div>
    </header>
  );
}
