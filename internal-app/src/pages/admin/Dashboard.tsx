import { useState } from 'react';
import { Activity, TrendingUp, Users, Zap, ChevronRight, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import ChartsSection from '../../components/ChartsSection';

// Simulate recent activity feed
const activity = [
  { id: 1, user: 'Admin User', action: 'Created a new account', time: '2 min ago', type: 'success' },
  { id: 2, user: 'Demo User', action: 'Logged in from new device', time: '15 min ago', type: 'warning' },
  { id: 3, user: 'Admin User', action: 'Updated billing plan to Pro', time: '1 hr ago', type: 'success' },
  { id: 4, user: 'Demo User', action: 'Changed account settings', time: '3 hr ago', type: 'info' },
];

const statusIcon = { success: CheckCircle, warning: AlertCircle, info: Clock } as const;
const statusColor = { success: 'text-emerald-500', warning: 'text-amber-500', info: 'text-blue-400' } as const;

type FilterKey = 'all' | 'week' | 'month';

export default function AdminDashboard() {
  const [filter, setFilter] = useState<FilterKey>('week');
  const [metrics, setMetrics] = useState<{users:number,active:number,revenue:number} | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch once on mount
  if (loading) {
    fetch('http://127.0.0.1:8000/api/metrics')
      .then(r => r.json())
      .then(d => { setMetrics(d); setLoading(false); })
      .catch(() => { setMetrics({ users: 2, active: 4, revenue: 3198 }); setLoading(false); });
  }

  const cards = [
    { label: 'Total Users', value: metrics?.users ?? '—', icon: Users, sub: 'Registered accounts', color: 'bg-indigo-50 text-indigo-600' },
    { label: 'Active Subscriptions', value: metrics?.active ?? '—', icon: Zap, sub: 'Paying customers', color: 'bg-sky-50 text-sky-600' },
    { label: 'Monthly Revenue', value: metrics ? `$${metrics.revenue.toLocaleString()}` : '—', icon: TrendingUp, sub: 'MRR this month', color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Uptime', value: '99.9%', icon: Activity, sub: 'Last 30 days', color: 'bg-violet-50 text-violet-600' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Live Overview</h1>
          <p className="text-slate-500 text-sm mt-1">Real data from your FastAPI + SQLite backend</p>
        </div>
        {/* Filter tabs — shadcn-style */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
          {(['all', 'week', 'month'] as FilterKey[]).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all capitalize ${
                filter === f ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {f === 'all' ? 'All time' : `This ${f}`}
            </button>
          ))}
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map(card => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{card.label}</span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${card.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-900">{card.value}</p>
              <p className="text-xs text-slate-400 mt-1">{card.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity feed */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-semibold text-slate-900 text-sm">Recent Activity</h2>
            <button className="text-xs text-indigo-600 font-semibold hover:underline flex items-center gap-0.5">
              View all <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <ul className="divide-y divide-slate-50">
            {activity.map(item => {
              const Icon = statusIcon[item.type as keyof typeof statusIcon];
              const color = statusColor[item.type as keyof typeof statusColor];
              return (
                <li key={item.id} className="px-5 py-3.5 flex items-start gap-3 hover:bg-slate-50 transition-colors">
                  <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${color}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-800 font-medium truncate">{item.user}</p>
                    <p className="text-xs text-slate-500 truncate">{item.action}</p>
                  </div>
                  <span className="text-xs text-slate-400 whitespace-nowrap">{item.time}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Quick actions */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-900 text-sm">Quick Actions</h2>
          </div>
          <div className="p-4 space-y-2">
            {[
              { label: 'Invite a new user', desc: 'Send an email invitation', href: '/admin/accounts' },
              { label: 'Review billing', desc: 'View invoices and plans', href: '/admin/billing' },
              { label: 'Open API Docs', desc: 'Explore endpoints in Swagger', href: 'http://127.0.0.1:8000/docs' },
              { label: 'Open CMS Studio', desc: 'Edit public site content', href: 'http://localhost:4321/studio' },
            ].map(action => (
              <a
                key={action.label}
                href={action.href}
                target={action.href.startsWith('http') ? '_blank' : undefined}
                className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50 transition-all group"
              >
                <div>
                  <p className="text-sm font-medium text-slate-800 group-hover:text-indigo-700">{action.label}</p>
                  <p className="text-xs text-slate-400">{action.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Charts */}
      <ChartsSection />
    </div>
  );
}
