'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export default function AuthStatus() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="text-sm text-gray-500 dark:text-gray-400">Loading...</div>
    );
  }

  if (!session) {
    return (
      <Button
        variant="outline"
        onClick={() => signIn()}
        className="w-full sm:w-auto text-sm"
      >
        Sign In
      </Button>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-sm w-full sm:w-auto">
      <div className="text-gray-700 dark:text-gray-300">
        Logged in as{' '}
        <strong className="text-gray-900 dark:text-gray-100">
          {session.user?.email}
        </strong>
        {session.user?.role && (
          <span className="text-gray-600 dark:text-gray-400">
            {' '}
            ({session.user.role})
          </span>
        )}
      </div>
      <Button
        variant="destructive"
        onClick={() => signOut()}
        className="w-full sm:w-auto"
      >
        Logout
      </Button>
    </div>
  );
}
