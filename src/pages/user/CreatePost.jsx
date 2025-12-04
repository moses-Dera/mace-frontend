import { useState } from 'react';
import api from '../../services/api';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    caption: '',
    hashtags: '',
    platforms: [],
    scheduledTime: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: '📷' },
    { id: 'twitter', name: 'Twitter', icon: '🐦' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼' },
    { id: 'facebook', name: 'Facebook', icon: '📘' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const hashtags = formData.hashtags.split(' ').filter(tag => tag.trim());

      console.log('🕒 Debug Timezone:');
      console.log('   Input:', formData.scheduledTime);
      console.log('   Sending:', new Date(formData.scheduledTime).toISOString());

      await api.post('/posts/schedule', {
        caption: formData.caption,
        hashtags,
        platforms: formData.platforms,
        scheduledTime: new Date(formData.scheduledTime).toISOString()
      });

      setSuccess('Post scheduled successfully!');
      setFormData({ caption: '', hashtags: '', platforms: [], scheduledTime: '' });
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to schedule post');
    } finally {
      setLoading(false);
    }
  };

  const togglePlatform = (platformId) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platformId)
        ? prev.platforms.filter(p => p !== platformId)
        : [...prev.platforms, platformId]
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Post</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {success}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Caption
          </label>
          <textarea
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Write your post caption..."
            value={formData.caption}
            onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hashtags
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="#hashtag1 #hashtag2 #hashtag3"
            value={formData.hashtags}
            onChange={(e) => setFormData({ ...formData, hashtags: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Platforms
          </label>
          <div className="grid grid-cols-2 gap-3">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                type="button"
                onClick={() => togglePlatform(platform.id)}
                className={`flex items-center p-3 border rounded-lg transition-colors ${formData.platforms.includes(platform.id)
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-gray-300 hover:border-gray-400'
                  }`}
              >
                <span className="text-xl mr-2">{platform.icon}</span>
                {platform.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Schedule Time
          </label>
          <input
            type="datetime-local"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={formData.scheduledTime}
            onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={loading || formData.platforms.length === 0}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? 'Scheduling...' : 'Schedule Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;