'use client';

import { useAuth } from '@/hooks/useAuth';
import { LogOut, User, Menu } from 'lucide-react';

export function Header({ onMenuClickAction }: { onMenuClickAction: () => void }) {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 lg:h-20 border-b bg-white flex items-center justify-between px-4 lg:px-8 shadow-sm relative z-10 w-full">
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuClickAction}
          className="lg:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5 flex-shrink-0" />
        </button>
        <h2 className="text-lg lg:text-xl font-semibold text-slate-800 line-clamp-1">
          Demo Company Portal
        </h2>
      </div>
      
      <div className="flex items-center space-x-3 lg:space-x-6">
        <div className="flex items-center space-x-3 text-sm text-slate-600 font-medium">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
            <User className="w-4 h-4 lg:w-5 lg:h-5" />
          </div>
          <span className="hidden lg:inline-block max-w-[150px] truncate">{user?.email || 'Admin'}</span>
        </div>
        <button
          onClick={logout}
          className="flex items-center space-x-2 px-3 py-2 lg:px-4 lg:py-2 rounded-lg text-sm bg-slate-50 text-slate-600 hover:bg-red-50 hover:text-red-600 transition border border-slate-200"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <span className="hidden sm:inline-block">Logout</span>
        </button>
      </div>
    </header>
  );
}
