'use client';

import { ReactNode, useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function DashboardLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 lg:ml-64 flex flex-col items-stretch min-w-0 transition-all duration-300">
        <Header onMenuClickAction={() => setIsSidebarOpen(true)} />
        <main className="p-4 lg:p-8 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
