import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Activity, User } from 'lucide-react';

const Layout = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'Blueprints', path: '/blueprints', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-slate-900 text-slate-100 flex-shrink-0 shadow-2xl z-20">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-10 bg-indigo-500 rounded-xl flex items-center justify-center font-bold text-white text-xl">
              CF
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">
                ContractFlow
              </h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                Contarct Managemant System
              </p>
            </div>
          </div>
        </div>

        <nav className="mt-4 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3.5 text-sm font-semibold rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/40 translate-x-1'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={20} className={isActive ? 'opacity-100' : 'opacity-60'} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-auto">
        {/* 🔥 DARK HEADER ONLY */}
        <header className="h-20 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-10 sticky top-0 z-10">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
            {location.pathname === '/'
              ? 'Dashboard'
              : location.pathname.includes('/blueprints')
              ? 'Templates'
              : location.pathname.includes('/contracts')
              ? 'Document View'
              : 'Workspace'}
          </h2>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-bold text-white">Sidhant</span>
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">
                Admin
              </span>
            </div>

            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
              <User size={26} />
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <div className="flex-1 overflow-auto p-10 scroll-smooth">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
