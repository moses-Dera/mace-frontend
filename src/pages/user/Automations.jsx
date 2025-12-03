import { useState, useEffect } from 'react';
import api from '../../services/api';

const Automations = () => {
  const [automations, setAutomations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'scheduled_series',
    schedule: '',
    platforms: [],
    template: '',
    aiGenerate: false
  });

  const automationTypes = [
    { id: 'scheduled_series', name: 'Scheduled Series', description: 'Post content on a recurring schedule' },
    { id: 'cross_post', name: 'Cross Post', description: 'Automatically post to multiple platforms' },
    { id: 'repost', name: 'Repost', description: 'Repost popular content automatically' },
    { id: 'auto_reply', name: 'Auto Reply', description: 'Automatically reply to comments/mentions' }
  ];

  const platforms = ['instagram', 'twitter', 'linkedin', 'facebook', 'tiktok'];

  useEffect(() => {
    fetchAutomations();
  }, []);

  const fetchAutomations = async () => {
    try {
      // This would be implemented when the backend route is ready
      setAutomations([
        {
          _id: '1',
          name: 'Daily Motivation Posts',
          type: 'scheduled_series',
          isActive: true,
          lastRun: new Date(),
          runCount: 15,
          triggers: { schedule: '0 9 * * *', platforms: ['instagram', 'twitter'] }
        },
        {
          _id: '2',
          name: 'Weekly Tips',
          type: 'cross_post',
          isActive: false,
          lastRun: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          runCount: 4,
          triggers: { schedule: '0 10 * * 1', platforms: ['linkedin', 'facebook'] }
        }
      ]);
    } catch (error) {
      console.error('Failed to fetch automations:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAutomation = async (id, isActive) => {
    try {
      // API call would go here
      setAutomations(automations.map(auto => 
        auto._id === id ? { ...auto, isActive: !isActive } : auto
      ));
    } catch (error) {
      console.error('Failed to toggle automation:', error);
    }
  };

  const deleteAutomation = async (id) => {
    if (!confirm('Are you sure you want to delete this automation?')) return;
    
    try {
      // API call would go here
      setAutomations(automations.filter(auto => auto._id !== id));
    } catch (error) {
      console.error('Failed to delete automation:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call would go here
      const newAutomation = {
        _id: Date.now().toString(),
        ...formData,
        isActive: true,
        lastRun: null,
        runCount: 0,
        triggers: { schedule: formData.schedule, platforms: formData.platforms }
      };
      
      setAutomations([...automations, newAutomation]);
      setShowCreateForm(false);
      setFormData({
        name: '',
        type: 'scheduled_series',
        schedule: '',
        platforms: [],
        template: '',
        aiGenerate: false
      });
    } catch (error) {
      console.error('Failed to create automation:', error);
    }
  };

  const togglePlatform = (platform) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
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
        <h1 className="text-2xl font-bold text-gray-900">Automations</h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Create Automation
        </button>
      </div>

      {/* Create Form Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Create New Automation</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Automation Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  {automationTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Schedule (Cron Format)
                </label>
                <input
                  type="text"
                  placeholder="0 9 * * * (Daily at 9 AM)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.schedule}
                  onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Platforms
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {platforms.map(platform => (
                    <button
                      key={platform}
                      type="button"
                      onClick={() => togglePlatform(platform)}
                      className={`p-2 text-sm rounded border ${
                        formData.platforms.includes(platform)
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content Template
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Your post template..."
                  value={formData.template}
                  onChange={(e) => setFormData({ ...formData, template: e.target.value })}
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="aiGenerate"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={formData.aiGenerate}
                  onChange={(e) => setFormData({ ...formData, aiGenerate: e.target.checked })}
                />
                <label htmlFor="aiGenerate" className="ml-2 block text-sm text-gray-900">
                  Use AI to generate content variations
                </label>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Automations List */}
      {automations.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No automations created yet</p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="text-indigo-600 hover:text-indigo-500 mt-2"
          >
            Create your first automation
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {automations.map((automation) => (
            <div key={automation._id} className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {automation.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Type: {automationTypes.find(t => t.id === automation.type)?.name}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>🌐 {automation.triggers.platforms.join(', ')}</span>
                    <span>📊 {automation.runCount} runs</span>
                    {automation.lastRun && (
                      <span>🕒 Last: {new Date(automation.lastRun).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => toggleAutomation(automation._id, automation.isActive)}
                    className={`px-3 py-1 text-sm rounded-full ${
                      automation.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {automation.isActive ? 'Active' : 'Inactive'}
                  </button>
                  
                  <button
                    onClick={() => deleteAutomation(automation._id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-blue-900 mb-2">⚡ Automation Tips</h3>
        <ul className="text-blue-800 space-y-1">
          <li>• Use cron format for scheduling (e.g., "0 9 * * *" = daily at 9 AM)</li>
          <li>• Test automations with inactive status first</li>
          <li>• Monitor performance and adjust schedules as needed</li>
          <li>• Use AI generation for content variety</li>
        </ul>
      </div>
    </div>
  );
};

export default Automations;