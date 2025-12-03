import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Create Post', href: '/create', icon: '✏️' },
    { name: 'Scheduled Posts', href: '/scheduled', icon: '📅' },
    { name: 'Calendar', href: '/calendar', icon: '🗓️' },
    { name: 'Connect Accounts', href: '/connect', icon: '🔗' },
    { name: 'AI Tools', href: '/ai-tools', icon: '🤖' },
    { name: 'Automations', href: '/automations', icon: '⚡' },
    { name: 'Settings', href: '/settings', icon: '⚙️' },
  ];

  const adminNavigation = [
    { name: 'Admin Dashboard', href: '/admin/dashboard', icon: '👑' },
    { name: 'Users', href: '/admin/users', icon: '👥' },
    { name: 'Logs', href: '/admin/logs', icon: '📋' },
    { name: 'Automations', href: '/admin/automations', icon: '🔧' },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-2 left-2 z-50 bg-gray-800 text-white p-2 rounded-md shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 fixed inset-y-0 left-0 transform transition duration-200 ease-in-out z-40 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } md:relative md:translate-x-0`}>
        <div className="text-white flex items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-extrabold">🚀</span>
            <span className="text-xl font-bold">SocialAI</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

      <nav>
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 ${
              location.pathname === item.href ? 'bg-gray-700' : ''
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </Link>
        ))}

        {user?.role === 'admin' && (
          <>
            <div className="border-t border-gray-700 my-4"></div>
            <div className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Admin
            </div>
            {adminNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 ${
                  location.pathname === item.href ? 'bg-gray-700' : ''
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </>
        )}
      </nav>
      </div>
    </>
  );
};

export default Sidebar;