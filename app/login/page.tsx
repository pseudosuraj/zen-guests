'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function OwnerLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    const result = await signIn('credentials', {
      email,
      password,
      callbackUrl: '/owner/dashboard',
      redirect: true
    });
    if (result?.error) {
      setMessage('Invalid credentials! Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="rounded-xl shadow-lg bg-white px-12 py-10 max-w-md w-full flex flex-col space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Hotelier Portal</h1>
          <p className="text-sm text-gray-500 mb-2">Sign in to manage your hotel</p>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col space-y-4">
          <input
            className="rounded border px-4 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
            type="email"
            placeholder="Email address"
            value={email}
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
          <input
            className="rounded border px-4 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
            type="password"
            placeholder="Password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded py-2 transition"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        {message && <div className="text-red-500 text-center">{message}</div>}
        <div className="text-xs text-gray-400 text-center mt-3">
          Forgot password? Contact admin support.
        </div>
      </div>
    </div>
  );
}
