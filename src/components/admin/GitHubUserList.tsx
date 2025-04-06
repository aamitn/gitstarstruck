'use client';
import { useEffect, useState } from 'react';
import GitHubUserItem from './GitHubUserItem';

type GitHubUser = {
  id: number;
  username: string;
  email: string;
  token: string;
};

export default function GitHubUserList() {
  const [users, setUsers] = useState<GitHubUser[]>([]);

  const fetchUsers = async () => {
    const res = await fetch('/api/admin/github-users');
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Existing Users</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <GitHubUserItem key={user.id} user={user} onUpdate={fetchUsers} />
        ))}
      </ul>
    </div>
  );
}
