import { useState } from 'react';
import api from '../../services/api';

const AITools = () => {
  const [activeTab, setActiveTab] = useState('caption');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  // Caption Generator
  const [captionForm, setCaptionForm] = useState({
    prompt: '',
    tone: 'professional',
    platform: 'instagram'
  });

  // Hashtag Generator
  const [hashtagForm, setHashtagForm] = useState({
    content: '',
    platform: 'instagram',
    count: 10
  });

  const generateCaption = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult('');

    try {
      const response = await api.post('/ai/generate-caption', captionForm);
      setResult(response.data.caption);
    } catch (error) {
      setResult('Error: ' + (error.response?.data?.message || 'Failed to generate caption'));
    } finally {
      setLoading(false);
    }
  };

  const generateHashtags = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult('');

    try {
      const response = await api.post('/ai/generate-hashtags', hashtagForm);
      setResult(response.data.hashtags.join(' '));
    } catch (error) {
      setResult('Error: ' + (error.response?.data?.message || 'Failed to generate hashtags'));
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    alert('Copied to clipboard!');
  };

  const tabs = [
    { id: 'caption', name: 'Caption Generator', icon: '✏️' },
    { id: 'hashtags', name: 'Hashtag Generator', icon: '#️⃣' }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">AI Tools</h1>
        <p className="text-gray-600">
          Use AI to generate engaging captions and relevant hashtags for your social media posts.
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {activeTab === 'caption' ? 'Generate Caption' : 'Generate Hashtags'}
          </h3>

          {activeTab === 'caption' ? (
            <form onSubmit={generateCaption} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What's your post about?
                </label>
                <textarea
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Describe your post content..."
                  value={captionForm.prompt}
                  onChange={(e) => setCaptionForm({ ...captionForm, prompt: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tone
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={captionForm.tone}
                  onChange={(e) => setCaptionForm({ ...captionForm, tone: e.target.value })}
                >
                  <option value="professional">Professional</option>
                  <option value="casual">Casual</option>
                  <option value="funny">Funny</option>
                  <option value="inspiring">Inspiring</option>
                  <option value="educational">Educational</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Platform
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={captionForm.platform}
                  onChange={(e) => setCaptionForm({ ...captionForm, platform: e.target.value })}
                >
                  <option value="instagram">Instagram</option>
                  <option value="twitter">Twitter</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="facebook">Facebook</option>
                  <option value="tiktok">TikTok</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? 'Generating...' : 'Generate Caption'}
              </button>
            </form>
          ) : (
            <form onSubmit={generateHashtags} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Post Content
                </label>
                <textarea
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Describe your post content..."
                  value={hashtagForm.content}
                  onChange={(e) => setHashtagForm({ ...hashtagForm, content: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Platform
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={hashtagForm.platform}
                  onChange={(e) => setHashtagForm({ ...hashtagForm, platform: e.target.value })}
                >
                  <option value="instagram">Instagram</option>
                  <option value="twitter">Twitter</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="facebook">Facebook</option>
                  <option value="tiktok">TikTok</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Hashtags
                </label>
                <input
                  type="number"
                  min="5"
                  max="30"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={hashtagForm.count}
                  onChange={(e) => setHashtagForm({ ...hashtagForm, count: parseInt(e.target.value) })}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? 'Generating...' : 'Generate Hashtags'}
              </button>
            </form>
          )}
        </div>

        {/* Result */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Result</h3>
            {result && (
              <button
                onClick={copyToClipboard}
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                📋 Copy
              </button>
            )}
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : result ? (
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-900 whitespace-pre-wrap">{result}</p>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <p>🤖 AI-generated content will appear here</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-yellow-900 mb-2">💡 Pro Tips</h3>
        <ul className="text-yellow-800 space-y-1">
          <li>• Be specific in your descriptions for better AI results</li>
          <li>• Try different tones to match your brand voice</li>
          <li>• Always review and customize AI-generated content</li>
          <li>• Use hashtags strategically - quality over quantity</li>
        </ul>
      </div>
    </div>
  );
};

export default AITools;