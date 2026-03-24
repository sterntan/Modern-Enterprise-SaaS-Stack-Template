export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Billing</h1>
        <p className="text-slate-500 mt-2">Manage your subscription, invoices, and payment methods.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Current Plan</p>
          <p className="text-2xl font-bold text-slate-900">Pro Plan</p>
          <p className="text-slate-500 text-sm mt-1">$49 / month — renews April 24, 2026</p>
          <button className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
            Upgrade Plan →
          </button>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Payment Method</p>
          <p className="text-slate-900 font-medium">Visa ending in 4242</p>
          <p className="text-slate-500 text-sm mt-1">Expires 12/2028</p>
          <button className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
            Update Card →
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">Recent Invoices</h2>
        </div>
        {[
          { date: 'Mar 1, 2026', amount: '$49.00', status: 'Paid' },
          { date: 'Feb 1, 2026', amount: '$49.00', status: 'Paid' },
          { date: 'Jan 1, 2026', amount: '$49.00', status: 'Paid' },
        ].map((inv) => (
          <div key={inv.date} className="px-6 py-4 flex justify-between items-center border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
            <span className="text-sm text-slate-600">{inv.date}</span>
            <span className="text-sm font-medium text-slate-900">{inv.amount}</span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">{inv.status}</span>
            <button className="text-xs text-indigo-600 hover:underline">Download PDF</button>
          </div>
        ))}
      </div>
    </div>
  )
}
