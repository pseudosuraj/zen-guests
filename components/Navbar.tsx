"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="w-full flex items-center justify-between px-6 py-3 bg-white border-b border-border-soft">
      <div className="text-2xl font-bold text-primary-violet">Zen-Guests</div>
      <div>
        {!session ? (
          <button
            onClick={() => signIn()}
            className="rounded-md px-4 py-2 bg-primary-violet text-white hover:bg-accent-teal font-semibold"
          >
            Login
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="font-medium text-text-secondary">
              {session.user?.email}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="ml-3 rounded-md px-4 py-2 border border-primary-violet bg-white text-primary-violet hover:bg-primary-violet-light font-semibold"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
