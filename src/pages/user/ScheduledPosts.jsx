import { useState, useEffect } from 'react';
import api from '../../services/api';

const ScheduledPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchPosts();
  }, [filter]);

  const fetchPosts = async () => {
    try {
      const params = filter !== 'all' ? { status: filter } : {};
      const response = await api.get('/posts/scheduled', { params });
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (postId) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      await api.delete(`/posts/${postId}`);
      setPosts(posts.filter(post => post._id !== postId));
    } catch (error) {
      alert('Failed to delete post');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'published': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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
        <h1 className="text-2xl font-bold text-gray-900">Scheduled Posts</h1>
        
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="all">All Posts</option>
          <option value="pending">Pending</option>
          <option value="published">Published</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No posts found</p>
          <a href="/create" className="text-indigo-600 hover:text-indigo-500 mt-2 inline-block">
            Create your first post
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post._id} className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <p className="text-gray-900 font-medium mb-2">
                    {post.caption.length > 100 
                      ? `${post.caption.substring(0, 100)}...` 
                      : post.caption
                    }
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>📅 {new Date(post.scheduledTime).toLocaleString()}</span>
                    <span>🌐 {post.platforms.join(', ')}</span>
                  </div>
                  {post.hashtags.length > 0 && (
                    <div className="mt-2">
                      <span className="text-sm text-blue-600">
                        {post.hashtags.join(' ')}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(post.status)}`}>
                    {post.status}
                  </span>
                  
                  {post.status === 'pending' && (
                    <button
                      onClick={() => deletePost(post._id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>

              {post.publishResults && post.publishResults.length > 0 && (
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Publish Results:</h4>
                  <div className="space-y-1">
                    {post.publishResults.map((result, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <span className="capitalize font-medium mr-2">{result.platform}:</span>
                        <span className={result.success ? 'text-green-600' : 'text-red-600'}>
                          {result.success ? '✅ Published' : `❌ ${result.error}`}
                        </span>
                        {result.postUrl && (
                          <a 
                            href={result.postUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="ml-2 text-blue-600 hover:text-blue-800"
                          >
                            View Post
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScheduledPosts;