'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const res = await fetch('/api/user/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    setLoading(false);
    setMessage(data.message || data.error);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Current Password
        </label>
        <input
          type="password"
          className="w-full border p-2 rounded"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          New Password
        </label>
        <input
          type="password"
          className="w-full border p-2 rounded"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? 'Updating...' : 'Change Password'}
      </Button>

      {message && <p className="text-sm mt-2 text-gray-600">{message}</p>}
    </form>
  );
}
