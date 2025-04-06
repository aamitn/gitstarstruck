'use client';

import { useSession } from 'next-auth/react';
import Unauthorized from '@/components/common/Unauthorized';
import RepoSubmissionForm from '@/components/common/RepoSubmissionForm';
import ChangePasswordForm from '@/components/user/ChangeCredentialsForm';

export default function AdminDashboardPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <p className="text-center mt-10 text-gray-700 dark:text-gray-300">
        Loading...
      </p>
    );
  }

  if (!session || session.user.role !== 'ADMIN') {
    return <Unauthorized />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-800">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
        Welcome, Admin!
      </h1>

      <div className="text-gray-700 dark:text-gray-300 space-y-2 mb-6">
        <p className="text-base sm:text-lg">
          Email:{' '}
          <strong className="text-gray-900 dark:text-gray-100 break-all">
            {session.user.email}
          </strong>
        </p>
        <p className="text-base sm:text-lg">
          Role:{' '}
          <strong className="text-gray-900 dark:text-gray-100">
            {session.user.role}
          </strong>
        </p>
      </div>

      <div className="mt-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
          What do you want to do today?
        </h2>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-6 pl-4 sm:pl-6">
          <li>View and manage GitHub users</li>
          <li>Monitor user submissions</li>
          <li>Customize GitHub star campaigns</li>
        </ul>
      </div>

      <div className="mt-10">
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Change Your Password
        </h2>
        <ChangePasswordForm />
      </div>

      <div className="mt-10">
        <RepoSubmissionForm />
      </div>
    </div>
  );
}
