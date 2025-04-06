'use client';

import { useSession } from 'next-auth/react';
import GitHubUserForm from '@/components/admin/GitHubUserForm';
import GitHubUserList from '@/components/admin/GitHubUserList';
import Unauthorized from '@/components/common/Unauthorized';

export default function AdminGitHubUsersPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!session || session.user.role !== 'ADMIN') {
    return <Unauthorized />;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard: GitHub Users</h1>
      <GitHubUserForm onSubmit={() => {}} />
      <GitHubUserList />
    </div>
  );
}
