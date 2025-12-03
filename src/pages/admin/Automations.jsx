import { useState, useEffect } from 'react';
import api from '../../services/api';

const AdminAutomations = () => {
  const [automations, setAutomations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0
  });

  useEffect(() => {
    fetchAutomations();
  }, []);

  const fetchAutomations = async () => {
    try {
      // Mock data for now - replace with actual API call when backend route is ready
      const mockAutomations = [
        {
          _id: '1',
          userId: { name: 'John Doe', email: 'john@example.com' },
          name: 'Daily Motivation Posts',
          type: 'scheduled_series',
          isActive: true,
          lastRun: new Date(),
          runCount: 25,
          triggers: { schedule: '0 9 * * *', platforms: ['instagram', 'twitter'] },
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        },
        {
          _id: '2',
          userId: { name: 'Jane Smith', email: 'jane@example.com' },
          name: 'Weekly Business Tips',
          type: 'cross_post',
          isActive: false,
          lastRun: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          runCount: 8,
          triggers: { schedule: '0 10 * * 1', platforms: ['linkedin', 'facebook'] },
          createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
        },
        {
          _id: '3',
          userId: { name: 'Mike Johnson', email: 'mike@example.com' },
          name: 'Fitness Content Repost',
          type: 'repost',
          isActive: true,
          lastRun: new Date(Date.now() - 1 * 60 * 60 * 1000),
          runCount: 42,
          triggers: { schedule: '0 */6 * * *', platforms: ['instagram', 'tiktok'] },
          createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000)
        }
      ];

      setAutomations(mockAutomations);
      
      // Calculate stats
      const total = mockAutomations.length;
      const active = mockAutomations.filter(a => a.isActive).length;
      const inactive = total - active;
      
      setStats({ total, active, inactive });
    } catch (error) {
      console.error('Failed to fetch automations:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAutomation = async (id, currentStatus) => {
    try {
      // API call would go here
      setAutomations(automations.map(auto => 
        auto._id === id ? { ...auto, isActive: !currentStatus } : auto
      ));
      
      // Update stats
      const newActive = currentStatus ? stats.active - 1 : stats.active + 1;
      setStats({ ...stats, active: newActive, inactive: stats.total - newActive });
    } catch (error) {
      console.error('Failed to toggle automation:', error);
    }
  };

  const deleteAutomation = async (id) => {
    if (!confirm('Are you sure you want to delete this automation?')) return;
    
    try {
      // API call would go here
      const updatedAutomations = automations.filter(auto => auto._id !== id);
      setAutomations(updatedAutomations);
      
      // Update stats
      const total = updatedAutomations.length;
      const active = updatedAutomations.filter(a => a.isActive).length;
      setStats({ total, active, inactive: total - active });
    } catch (error) {
      console.error('Failed to delete automation:', error);
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'scheduled_series': return '📅';
      case 'cross_post': return '🔄';
      case 'repost': return '🔁';
      case 'auto_reply': return '💬';
      default: return '⚡';
    }
  };

  const getTypeName = (type) => {
    switch (type) {
      case 'scheduled_series': return 'Scheduled Series';
      case 'cross_post': return 'Cross Post';
      case 'repost': return 'Repost';
      case 'auto_reply': return 'Auto Reply';
      default: return type;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">System Automations</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl">⚡</span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Automations</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.total}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl">✅</span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active</dt>
                  <dd className="text-lg font-medium text-green-600">{stats.active}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl">⏸️</span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Inactive</dt>
                  <dd className="text-lg font-medium text-gray-600">{stats.inactive}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Automations List */}
      {automations.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No automations found</p>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Automation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {automations.map((automation) => (
                <tr key={automation._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{getTypeIcon(automation.type)}</span>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {automation.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {getTypeName(automation.type)} • {automation.triggers.platforms.join(', ')}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {automation.userId.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {automation.userId.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      automation.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {automation.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>{automation.runCount} runs</div>
                    <div className="text-xs text-gray-500">
                      Last: {automation.lastRun ? new Date(automation.lastRun).toLocaleDateString() : 'Never'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => toggleAutomation(automation._id, automation.isActive)}
                        className={`${
                          automation.isActive 
                            ? 'text-yellow-600 hover:text-yellow-900' 
                            : 'text-green-600 hover:text-green-900'
                        }`}
                      >
                        {automation.isActive ? 'Pause' : 'Activate'}
                      </button>
                      <button
                        onClick={() => deleteAutomation(automation._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">⚡ Automation Management</h3>
        <p className="text-sm text-blue-800">
          Monitor and manage all user automations across the platform. You can pause problematic automations or delete inactive ones to optimize system performance.
        </p>
      </div>
    </div>
  );
};

export default AdminAutomations;