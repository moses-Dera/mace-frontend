import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import DataDeletion from './pages/DataDeletion';
import Dashboard from './pages/user/Dashboard';
import CreatePost from './pages/user/CreatePost';
import ScheduledPosts from './pages/user/ScheduledPosts';
import ConnectAccounts from './pages/user/ConnectAccounts';
import AITools from './pages/user/AITools';
import Calendar from './pages/user/Calendar';
import Automations from './pages/user/Automations';
import Settings from './pages/user/Settings';
import AdminDashboard from './pages/admin/AdminDashboard';
import Users from './pages/admin/Users';
import Logs from './pages/admin/Logs';
import AdminAutomations from './pages/admin/Automations';
import Layout from './components/layout/Layout';
import PrivateRoute from './components/auth/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/data-deletion" element={<DataDeletion />} />

          {/* Protected routes */}
          <Route path="/" element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route index element={<Navigate to="/dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="create" element={<CreatePost />} />
              <Route path="scheduled" element={<ScheduledPosts />} />
              <Route path="connect" element={<ConnectAccounts />} />
              <Route path="ai-tools" element={<AITools />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="automations" element={<Automations />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>

          {/* Admin routes */}
          <Route path="/admin" element={<PrivateRoute admin />}>
            <Route element={<Layout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="logs" element={<Logs />} />
              <Route path="automations" element={<AdminAutomations />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;