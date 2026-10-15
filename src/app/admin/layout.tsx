"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  QrCode, 
  ShoppingBag, 
  Settings, 
  LogOut, 
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthed, setIsAuthed] = useState<boolean | null>(null);

  // Skip auth check on /admin/login
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setIsAuthed(true);
      return;
    }

    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          setIsAuthed(true);
        } else {
          setIsAuthed(false);
          router.push("/admin/login");
        }
      } catch {
        setIsAuthed(false);
        router.push("/admin/login");
      }
    }

    checkAuth();
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (isAuthed === null) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-3 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-stone-600">Verifying Owner Session...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Dishes & Menu", href: "/admin/menu", icon: UtensilsCrossed },
    { name: "Table QR Codes", href: "/admin/tables", icon: QrCode },
    { name: "Live Orders", href: "/admin/orders", icon: ShoppingBag },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col text-stone-900">
      {/* Top Admin Bar */}
      <header className="bg-stone-900 text-white sticky top-0 z-40 border-b border-stone-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo & Title */}
            <div className="flex items-center gap-3">
              <Link href="/admin" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-stone-950 font-black flex items-center justify-center text-sm shadow">
                  H
                </div>
                <div>
                  <h1 className="font-serif text-sm sm:text-base font-bold leading-tight text-white">
                    Hanuman Admin
                  </h1>
                  <span className="text-[10px] text-stone-400 block -mt-0.5">
                    Sion Circle, Mumbai
                  </span>
                </div>
              </Link>

              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 ml-2">
                <ShieldCheck className="w-3 h-3" />
                Owner Portal
              </span>
            </div>

            {/* External Links & Logout */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/menu"
                target="_blank"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors"
              >
                <span>View QR Menu</span>
                <ExternalLink className="w-3 h-3 text-stone-400" />
              </Link>

              <Link
                href="/"
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors"
              >
                <span>View Website</span>
                <ExternalLink className="w-3 h-3 text-stone-400" />
              </Link>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-800/50 transition-colors ml-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs Bar */}
          <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar -mb-px">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold whitespace-nowrap border-b-2 transition-all ${
                    isActive
                      ? "border-amber-500 text-amber-400 bg-stone-800/50"
                      : "border-transparent text-stone-400 hover:text-stone-200 hover:border-stone-700"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
