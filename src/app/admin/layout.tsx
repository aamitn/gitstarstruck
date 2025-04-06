'use client';

import { ReactNode, useState } from 'react';
import AuthStatus from '@/components/common/AuthStatus';
import Link from 'next/link';
import { Menu } from 'lucide-react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100">
      {/* Mobile menu toggle */}
      <div className="flex items-center justify-between p-4 md:hidden border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-semibold">Admin Panel</h2>
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="text-gray-700 dark:text-gray-300"
          aria-label="Toggle Sidebar"
        >
          <Menu />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'block' : 'hidden'
        } md:block w-full md:w-64 bg-gray-100 dark:bg-gray-900 p-6 border-r border-gray-200 dark:border-gray-800 shadow-sm`}
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white hidden md:block">
          Admin Panel
        </h2>
        <nav className="space-y-3">
          <Link
            href="/admin"
            className="block px-3 py-2 rounded-md text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-800 dark:hover:text-blue-300 transition"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/github-users"
            className="block px-3 py-2 rounded-md text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-800 dark:hover:text-blue-300 transition"
          >
            GitHub Users
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-6">
        <div className="flex justify-end mb-6">
          <AuthStatus />
        </div>
        <div className="bg-gray-50 dark:bg-gray-900 p-4 md:p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-800">
          {children}
        </div>
      </main>
    </div>
  );
}
