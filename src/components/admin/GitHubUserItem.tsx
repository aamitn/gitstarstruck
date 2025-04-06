'use client';
import { useState } from 'react';

type GitHubUser = {
  id: number;
  username: string;
  email: string;
  token: string;
};

type Props = {
  user: GitHubUser;
  onUpdate: () => void;
};

export default function GitHubUserItem({ user, onUpdate }: Props) {
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState(user);
  const [showToken, setShowToken] = useState(false);

  const handleDelete = async () => {
    await fetch(`/api/admin/github-users/${user.id}`, {
      method: 'DELETE',
    });
    onUpdate();
  };

  const handleUpdate = async () => {
    await fetch(`/api/admin/github-users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editData),
    });
    setEditing(false);
    onUpdate();
  };

  return (
    <li className="border p-2 rounded">
      {editing ? (
        <div className="space-y-1">
          <div className="space-y-2">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                className="w-full p-1 border rounded"
                value={editData.username}
                onChange={(e) =>
                  setEditData({ ...editData, username: e.target.value })
                }
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full p-1 border rounded"
                value={editData.email}
                onChange={(e) =>
                  setEditData({ ...editData, email: e.target.value })
                }
              />
            </div>

            <div>
              <label
                htmlFor="token"
                className="block text-sm font-medium text-gray-700"
              >
                GitHub Token
              </label>
              <input
                id="token"
                className="w-full p-1 border rounded"
                value={editData.token}
                onChange={(e) =>
                  setEditData({ ...editData, token: e.target.value })
                }
              />
            </div>
          </div>
          <div className="space-x-2 mt-2">
            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white p-1 px-2 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="bg-gray-500 text-white p-1 px-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div>
            <strong>{user.username}</strong> ({user.email})
          </div>
          <div className="text-xs text-gray-500 flex items-center gap-2">
            Token:
            <span>
              {showToken ? user.token : '*'.repeat(user.token.length)}
            </span>
            <button
              className="text-blue-600 underline text-sm"
              onClick={() => setShowToken((prev) => !prev)}
            >
              {showToken ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className="space-x-2 mt-1">
            <button
              onClick={() => setEditing(true)}
              className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-2 py-1 rounded text-sm"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}
