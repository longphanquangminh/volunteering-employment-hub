import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, LayoutDashboard, Settings, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

export function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) {
  const pathname = usePathname();

  // Close sidebar on path change on mobile
  useEffect(() => {
    setIsOpen(false);
  }, [pathname, setIsOpen]);

  const links = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Employees', href: '/employees', icon: Users },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "w-64 bg-slate-900 text-white flex flex-col h-screen fixed z-50 transition-transform duration-300 top-0 left-0",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-6 font-bold text-2xl tracking-tighter text-blue-400 flex items-center justify-between">
          <span>EmpManage</span>
          <button 
            className="lg:hidden text-slate-400 hover:text-white transition-colors" 
            onClick={() => setIsOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {links.map((link) => {
            const isActive = pathname.startsWith(link.href);
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                  isActive ? "bg-blue-600 text-white" : "hover:bg-slate-800 text-slate-400 hover:text-white"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{link.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-6 text-sm text-slate-500 hover:text-slate-300 cursor-pointer flex items-center gap-2 transition-colors">
          <Settings className="w-4 h-4" /> Settings
        </div>
      </aside>
    </>
  );
}
