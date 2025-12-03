import { useState, useEffect } from 'react';
import api from '../../services/api';

const ConnectAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: '📷', color: 'bg-pink-500' },
    { id: 'twitter', name: 'Twitter', icon: '🐦', color: 'bg-blue-400' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼', color: 'bg-blue-600' },
    { id: 'facebook', name: 'Facebook', icon: '📘', color: 'bg-blue-700' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵', color: 'bg-black' }
  ];

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await api.get('/social/accounts');
      setAccounts(response.data.accounts);
    } catch (error) {
      console.error('Failed to fetch accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const connectAccount = (platform) => {
    // This would redirect to OAuth flow
    alert(`Connect ${platform} - OAuth integration coming soon!`);
  };

  const isConnected = (platformId) => {
    return accounts.some(account => account.platform === platformId && account.isActive);
  };

  const getConnectedAccount = (platformId) => {
    return accounts.find(account => account.platform === platformId && account.isActive);
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Connect Social Accounts</h1>
        <p className="text-gray-600">
          Connect your social media accounts to start scheduling and automating posts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms.map((platform) => {
          const connected = isConnected(platform.id);
          const account = getConnectedAccount(platform.id);

          return (
            <div key={platform.id} className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 ${platform.color} rounded-lg flex items-center justify-center text-white text-xl mr-4`}>
                  {platform.icon}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{platform.name}</h3>
                  <p className="text-sm text-gray-500">
                    {connected ? 'Connected' : 'Not connected'}
                  </p>
                </div>
              </div>

              {connected && account ? (
                <div className="mb-4">
                  <div className="flex items-center space-x-3">
                    {account.profilePicture && (
                      <img 
                        src={account.profilePicture} 
                        alt={account.displayName}
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{account.displayName}</p>
                      <p className="text-sm text-gray-500">@{account.username}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    Connect your {platform.name} account to start posting automatically.
                  </p>
                </div>
              )}

              <button
                onClick={() => connectAccount(platform.name)}
                className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                  connected
                    ? 'bg-green-100 text-green-800 cursor-default'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
                disabled={connected}
              >
                {connected ? '✅ Connected' : `Connect ${platform.name}`}
              </button>

              {connected && (
                <button
                  onClick={() => alert('Disconnect feature coming soon!')}
                  className="w-full mt-2 py-2 px-4 border border-red-300 text-red-700 rounded-md hover:bg-red-50 transition-colors"
                >
                  Disconnect
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-blue-900 mb-2">🔒 Your Data is Secure</h3>
        <p className="text-blue-800">
          We use industry-standard OAuth 2.0 authentication to connect your accounts. 
          We never store your passwords and only request the minimum permissions needed 
          to post on your behalf.
        </p>
      </div>
    </div>
  );
};

export default ConnectAccounts;