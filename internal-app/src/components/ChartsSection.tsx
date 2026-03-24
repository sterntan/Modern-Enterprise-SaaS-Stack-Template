import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';

// Simulated time-series data (replace with real API data)
const userGrowth = [
  { month: 'Oct', users: 0, revenue: 0 },
  { month: 'Nov', users: 1, revenue: 1599 },
  { month: 'Dec', users: 3, revenue: 4797 },
  { month: 'Jan', users: 8, revenue: 12792 },
  { month: 'Feb', users: 15, revenue: 23985 },
  { month: 'Mar', users: 24, revenue: 38376 },
];

const planBreakdown = [
  { plan: 'Free', count: 8 },
  { plan: 'Starter', count: 7 },
  { plan: 'Pro', count: 6 },
  { plan: 'Enterprise', count: 3 },
];

const tooltipStyle = {
  backgroundColor: '#fff',
  border: '1px solid #e2e8f0',
  borderRadius: 8,
  fontSize: 12,
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
};

export default function ChartsSection() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-2">
      {/* Area chart — Growth */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900 mb-0.5">User & Revenue Growth</h2>
        <p className="text-xs text-slate-400 mb-5">Cumulative totals over the last 6 months</p>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={userGrowth} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
            <Area type="monotone" dataKey="users" name="Users" stroke="#6366f1" strokeWidth={2} fill="url(#userGrad)" dot={false} />
            <Area type="monotone" dataKey="revenue" name="Revenue ($)" stroke="#38bdf8" strokeWidth={2} fill="url(#revGrad)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bar chart — Plan breakdown */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900 mb-0.5">Plan Distribution</h2>
        <p className="text-xs text-slate-400 mb-5">Number of accounts per subscription tier</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={planBreakdown} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="plan" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="count" name="Accounts" fill="#6366f1" radius={[6, 6, 0, 0]} maxBarSize={48} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
