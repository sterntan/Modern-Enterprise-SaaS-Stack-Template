import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { DashboardLayout } from './layouts/DashboardLayout'
import AdminDashboard from './pages/admin/Dashboard'
import AccountsPage from './pages/admin/Accounts'
import BillingPage from './pages/admin/Billing'
import SettingsPage from './pages/admin/Settings'
import UserDashboard from './pages/user/Dashboard'
import UserSettings from './pages/user/Settings'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />

        <Route element={<DashboardLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/accounts" element={<AccountsPage />} />
          <Route path="/admin/billing" element={<BillingPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/user/settings" element={<UserSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
