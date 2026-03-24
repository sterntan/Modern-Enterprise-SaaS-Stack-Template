import { useState } from 'react';

export default function UserSettings() {
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState('Demo User');
  const [email, setEmail] = useState('user@example.com');
  const [notifications, setNotifications] = useState(true);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">My Settings</h1>
        <p className="text-slate-500 mt-2">Manage your personal account preferences.</p>
      </div>

      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg text-sm font-medium">
          ✓ Settings saved successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-xl border border-slate-200 shadow-sm divide-y divide-slate-100">
        <div className="px-6 py-5">
          <h2 className="text-sm font-semibold text-slate-900 mb-4">Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5">Display Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="px-6 py-5">
          <h2 className="text-sm font-semibold text-slate-900 mb-4">Preferences</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-800">Email Notifications</p>
              <p className="text-xs text-slate-500 mt-0.5">Receive updates about your account</p>
            </div>
            <button
              type="button"
              onClick={() => setNotifications(!notifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${notifications ? 'bg-indigo-600' : 'bg-slate-200'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${notifications ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>

        <div className="px-6 py-5 bg-slate-50 rounded-b-xl flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>

      <div className="bg-white rounded-xl border border-red-100 shadow-sm">
        <div className="px-6 py-5 flex justify-between items-center">
          <div>
            <p className="text-sm font-semibold text-red-600">Delete Account</p>
            <p className="text-xs text-slate-500 mt-0.5">Permanently remove your account and data</p>
          </div>
          <button className="text-sm text-red-600 font-semibold border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
