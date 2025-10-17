// app/owner/layout.tsx
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
};

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/owner/dashboard",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    label: "Reservations",
    href: "/owner/reservations",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
  },
  {
    label: "Deal Manager",
    href: "/owner/deals",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 7.5L12 15l-3.5-3.5" />
        <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    label: "Deal Requests",
    href: "/owner/deal-requests",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 2L3 6v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V6l-3-4H6z" />
        <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
    badge: "dynamic", // Will be replaced with count
  },
  {
    label: "Task Manager",
    href: "/owner/tasks",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 11l3 3L22 4" />
        <rect x="2" y="7" width="8" height="13" rx="2" />
      </svg>
    ),
  },
  {
    label: "Minibar Manager",
    href: "/owner/minibar",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 2v7c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V2" />
        <path d="M7 11v11M12 11v11M17 11v11" />
        <path d="M5 22h14" />
      </svg>
    ),
  },
  {
    label: "Reports",
    href: "/owner/reports",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 3v18h18" />
        <path d="M7 13h3v5H7zM12 9h3v9h-3zM17 5h3v13h-3z" />
      </svg>
    ),
  },
  {
    label: "Settings",
    href: "/owner/settings",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 8 4.6c.21.43.33.9.33 1.4V6a2 2 0 1 1 4 0v-.09c0-.5.12-.97.33-1.4a1.65 1.65 0 0 0 1-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82c.09.36.25.7.46 1 .21.3.48.55.79.73.31.18.66.28 1.01.29h.09a2 2 0 1 1 0 4h-.09c-.35.01-.7.11-1.01.29-.31.18-.58.43-.79.73-.21.3-.37.64-.46 1z" />
      </svg>
    ),
  },
];

function Sidebar() {
  const pathname = usePathname();
  const [pendingCount, setPendingCount] = React.useState(0);

  React.useEffect(() => {
    // Fetch pending deal requests count
    async function fetchCount() {
      try {
        const res = await fetch('/api/owner/deal-requests/count', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setPendingCount(data.count || 0);
        }
      } catch (error) {
        console.error('Failed to fetch pending count:', error);
      }
    }

    fetchCount();
    
    // Refresh count every 30 seconds
    const interval = setInterval(fetchCount, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r bg-white p-4 lg:block">
      {/* Brand */}
      <div className="mb-6 flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-purple-600" />
        <span className="text-sm font-semibold text-gray-800 tracking-wide">Zen-Guests</span>
      </div>

      {/* Nav */}
      <nav className="space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          const showBadge = item.badge === "dynamic" && pendingCount > 0;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "group flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-purple-50 text-purple-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
              ].join(" ")}
            >
              <div className="flex items-center gap-3">
                <span className={active ? "text-purple-700" : "text-gray-500 group-hover:text-gray-700"}>
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
              </div>
              {showBadge && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {pendingCount > 9 ? '9+' : pendingCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <div className="rounded-lg bg-gray-50 p-3 text-[11px] text-gray-500">
          Owner Portal • v2.1
        </div>
      </div>
    </aside>
  );
}

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <Sidebar key="sidebar-with-badge" />
      <div className="flex-1">
        <div className="lg:hidden border-b bg-white p-4">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-purple-600" />
            <span className="text-sm font-semibold text-gray-800 tracking-wide">Zen-Guests Owner</span>
          </div>
        </div>
        <main className="mx-auto max-w-6xl p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
