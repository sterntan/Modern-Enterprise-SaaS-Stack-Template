import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, CreditCard, Settings, LogOut, UserCircle } from 'lucide-react'

const adminLinks = [
  { name: 'Overview', href: '/admin', icon: LayoutDashboard },
  { name: 'Accounts', href: '/admin/accounts', icon: Users },
  { name: 'Billing', href: '/admin/billing', icon: CreditCard },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

const userLinks = [
  { name: 'My Portal', href: '/user', icon: LayoutDashboard },
  { name: 'Settings', href: '/user/settings', icon: Settings },
];

export function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const isAdmin = path.startsWith('/admin');
  const links = isAdmin ? adminLinks : userLinks;
  const roleStr = isAdmin ? 'Administrator' : 'User';
  const avatarLetter = isAdmin ? 'A' : 'U';

  function handleSwitchRole() {
    if (isAdmin) {
      navigate('/user');
    } else {
      navigate('/admin');
    }
  }

  const pageTitle = links.find(l => path === l.href || path.startsWith(l.href + '/'))?.name ?? roleStr;

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-56 bg-slate-900 text-white flex flex-col flex-shrink-0">
        <div className="px-5 py-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-indigo-500 flex items-center justify-center text-xs font-black text-white">S</div>
            <span className="text-sm font-bold tracking-tight text-white">SaaS Template</span>
          </div>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mt-2">{roleStr}</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {links.map((item) => {
            const isActive = path === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 pb-4 space-y-0.5 border-t border-slate-800 pt-3">
          <button
            onClick={handleSwitchRole}
            className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <UserCircle className="w-4 h-4 flex-shrink-0" />
            Switch to {isAdmin ? 'User' : 'Admin'}
          </button>
          <button className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
            <LogOut className="w-4 h-4 flex-shrink-0" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 h-14 flex items-center px-8 justify-between sticky top-0 z-10">
          <h2 className="text-base font-semibold text-slate-800">{pageTitle}</h2>
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-sm font-bold">
            {avatarLetter}
          </div>
        </header>
        <div className="p-8 max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
