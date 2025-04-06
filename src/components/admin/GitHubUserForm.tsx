'use client';
import { useState } from 'react';

type Props = {
  onSubmit: () => void;
};

export default function GitHubUserForm({ onSubmit }: Props) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    token: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/admin/github-users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    setFormData({ username: '', email: '', token: '' });
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded mb-6">
      <input
        className="w-full p-2 border rounded"
        placeholder="Username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        required
      />
      <input
        className="w-full p-2 border rounded"
        placeholder="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        className="w-full p-2 border rounded"
        placeholder="Personal Access Token"
        value={formData.token}
        onChange={(e) => setFormData({ ...formData, token: e.target.value })}
        required
      />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">
        Add GitHub User
      </button>
    </form>
  );
}
