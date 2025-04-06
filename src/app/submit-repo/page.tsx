'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function SubmitRepoPage() {
  const [repoUrl, setRepoUrl] = useState('');
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/repo-submission', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ repoUrl }),
    });
    setRepoUrl('');
  };

  if (!session) return <p>Please log in</p>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-bold">Submit Repository for Stars</h1>
      <form onSubmit={handleSubmit} className="space-y-2 mt-4">
        <input
          type="url"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          placeholder="https://github.com/your/repo"
          required
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
