import { useState, useEffect } from 'react';
import api from '../../services/api';

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    userId: ''
  });

  const logTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'post', label: 'Posts' },
    { value: 'automation', label: 'Automations' },
    { value: 'auth', label: 'Authentication' },
    { value: 'social_connect', label: 'Social Connect' },
    { value: 'ai', label: 'AI Requests' },
    { value: 'error', label: 'Errors' },
    { value: 'system', label: 'System' }
  ];

  const statusTypes = [
    { value: 'all', label: 'All Status' },
    { value: 'success', label: 'Success' },
    { value: 'failure', label: 'Failure' },
    { value: 'warning', label: 'Warning' },
    { value: 'info', label: 'Info' }
  ];

  useEffect(() => {
    fetchLogs();
  }, [filters]);

  const fetchLogs = async () => {
    try {
      const params = {};
      if (filters.type !== 'all') params.type = filters.type;
      if (filters.status !== 'all') params.status = filters.status;
      if (filters.userId) params.userId = filters.userId;

      const response = await api.get('/admin/logs', { params });
      setLogs(response.data.logs);
    } catch (error) {
      console.error('Failed to fetch logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'failure': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'post': return '📝';
      case 'automation': return '⚡';
      case 'auth': return '🔐';
      case 'social_connect': return '🔗';
      case 'ai': return '🤖';
      case 'error': return '❌';
      case 'system': return '⚙️';
      default: return '📋';
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
        <h1 className="text-2xl font-bold text-gray-900">System Logs</h1>
        
        <div className="flex space-x-4">
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            {logTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
          
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            {statusTypes.map(status => (
              <option key={status.value} value={status.value}>{status.label}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="User ID..."
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={filters.userId}
            onChange={(e) => setFilters({ ...filters, userId: e.target.value })}
          />
        </div>
      </div>

      {logs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No logs found</p>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="divide-y divide-gray-200">
            {logs.map((log) => (
              <div key={log._id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{getTypeIcon(log.type)}</span>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-sm font-medium text-gray-900">
                          {log.action || log.type}
                        </h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(log.status)}`}>
                          {log.status}
                        </span>
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Type:</span> {log.type}
                        {log.platform && (
                          <>
                            <span className="mx-2">•</span>
                            <span className="font-medium">Platform:</span> {log.platform}
                          </>
                        )}
                      </div>

                      {log.userId && (
                        <div className="text-sm text-gray-600 mb-2">
                          <span className="font-medium">User:</span> {log.userId.name || 'Unknown'} ({log.userId.email || log.userId})
                        </div>
                      )}

                      {log.errorMessage && (
                        <div className="text-sm text-red-600 mb-2">
                          <span className="font-medium">Error:</span> {log.errorMessage}
                        </div>
                      )}

                      {log.details && (
                        <div className="text-sm text-gray-500 mb-2">
                          <span className="font-medium">Details:</span> {JSON.stringify(log.details)}
                        </div>
                      )}

                      <div className="text-xs text-gray-400">
                        {new Date(log.createdAt).toLocaleString()}
                        {log.ipAddress && (
                          <>
                            <span className="mx-2">•</span>
                            IP: {log.ipAddress}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-yellow-900 mb-2">📋 System Monitoring</h3>
        <p className="text-sm text-yellow-800">
          Monitor all system activities including user actions, post scheduling, automation runs, and errors. 
          Logs are automatically cleaned up after 90 days.
        </p>
      </div>
    </div>
  );
};

export default Logs;