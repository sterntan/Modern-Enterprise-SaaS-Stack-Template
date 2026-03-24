import { useEffect, useState } from 'react';
import { CreditCard, Package, Bell, ChevronRight } from 'lucide-react';

export default function UserDashboard() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">{greeting}, Demo 👋</h1>
        <p className="text-slate-500 text-sm mt-1">Here's an overview of your account.</p>
      </div>

      {/* Plan card */}
      <div className="relative bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl p-6 text-white overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 -translate-y-10 translate-x-10" />
        <div className="absolute bottom-0 left-0 w-28 h-28 rounded-full bg-white/5 translate-y-10 -translate-x-10" />
        <p className="text-indigo-200 text-xs font-semibold uppercase tracking-widest mb-1">Current Plan</p>
        <p className="text-3xl font-black mb-1">Pro Plan</p>
        <p className="text-indigo-200 text-sm">$49 / month · Renews April 24, 2026</p>
        <button className="mt-4 bg-white text-indigo-700 text-xs font-bold px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors">
          Manage Subscription
        </button>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: Package, label: 'API Calls', value: '12,450', sub: 'this month' },
          { icon: CreditCard, label: 'Next Invoice', value: '$49.00', sub: 'Apr 24, 2026' },
          { icon: Bell, label: 'Notifications', value: '3 new', sub: 'unread alerts' },
        ].map(item => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-indigo-500" />
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{item.label}</span>
              </div>
              <p className="text-xl font-bold text-slate-900">{item.value}</p>
              <p className="text-xs text-slate-400">{item.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Shortcuts */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-900">Quick Links</h2>
        </div>
        <div className="divide-y divide-slate-50">
          {[
            { label: 'Update my settings', href: '/user/settings' },
            { label: 'View Public Site', href: 'http://localhost:4321', external: true },
            { label: 'API Documentation', href: 'http://127.0.0.1:8000/docs', external: true },
          ].map(link => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 transition-colors group"
            >
              <span className="text-sm text-slate-700 group-hover:text-indigo-600 font-medium">{link.label}</span>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-400 transition-colors" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
