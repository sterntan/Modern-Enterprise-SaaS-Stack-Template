export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-2">Manage your account preferences and platform configuration.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm divide-y divide-slate-100">
        <div className="px-6 py-5 flex justify-between items-center">
          <div>
            <p className="font-semibold text-slate-900 text-sm">Organization Name</p>
            <p className="text-slate-500 text-sm">SaaS Template Inc.</p>
          </div>
          <button className="text-sm text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">Edit</button>
        </div>
        <div className="px-6 py-5 flex justify-between items-center">
          <div>
            <p className="font-semibold text-slate-900 text-sm">Admin Email</p>
            <p className="text-slate-500 text-sm">admin@example.com</p>
          </div>
          <button className="text-sm text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">Edit</button>
        </div>
        <div className="px-6 py-5 flex justify-between items-center">
          <div>
            <p className="font-semibold text-slate-900 text-sm">API Base URL</p>
            <p className="text-slate-500 text-sm font-mono">http://127.0.0.1:8000</p>
          </div>
          <a href="http://127.0.0.1:8000/docs" target="_blank" className="text-sm text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">Open Docs →</a>
        </div>
        <div className="px-6 py-5 flex justify-between items-center">
          <div>
            <p className="font-semibold text-slate-900 text-sm">CMS Studio</p>
            <p className="text-slate-500 text-sm">Manage public site content via Sanity Studio</p>
          </div>
          <a href="http://localhost:4321/studio" target="_blank" className="text-sm text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">Open Studio →</a>
        </div>
        <div className="px-6 py-5 flex justify-between items-center">
          <div>
            <p className="font-semibold text-red-600 text-sm">Danger Zone</p>
            <p className="text-slate-500 text-sm">Delete all data and reset the database</p>
          </div>
          <button className="text-sm text-red-600 font-semibold border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">Reset DB</button>
        </div>
      </div>
    </div>
  )
}
