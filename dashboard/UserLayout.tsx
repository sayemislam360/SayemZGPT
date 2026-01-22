
import React from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const UserLayout: React.FC = () => {
  const { logout, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )},
    { name: 'My Orders', path: '/dashboard/orders', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 118 0m-4 7v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm5 7a2 2 0 100-4 2 2 0 000 4z" />
      </svg>
    )},
    { name: 'Account Settings', path: '/dashboard/settings', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )},
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 fixed h-full hidden lg:flex flex-col">
        <div className="p-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 118 0m-4 7v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm5 7a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-slate-900">My Account</span>
          </Link>
        </div>

        <div className="px-6 mb-8 text-center">
            <div className="w-16 h-16 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3">
                {user?.name.charAt(0)}
            </div>
            <p className="font-bold text-slate-800">{user?.name}</p>
            <p className="text-xs text-slate-500">{user?.email}</p>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                location.pathname === item.path ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <button 
            onClick={() => { logout(); navigate('/login'); }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-4 sm:p-8">
        <Outlet />
      </main>
    </div>
  );
};
