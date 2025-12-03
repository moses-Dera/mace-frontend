import { useState, useEffect } from 'react';
import api from '../../services/api';

const Calendar = () => {
  const [posts, setPosts] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, [currentDate]);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts/scheduled');
      setPosts(response.data.posts || []);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getPostsForDate = (date) => {
    if (!date) return [];
    return posts.filter(post => {
      const postDate = new Date(post.scheduledTime);
      return postDate.toDateString() === date.toDateString();
    });
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
        <h1 className="text-2xl font-bold text-gray-900">Content Calendar</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 hover:bg-gray-100 rounded-md"
          >
            ←
          </button>
          <h2 className="text-lg font-medium">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 hover:bg-gray-100 rounded-md"
          >
            →
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Calendar Header */}
        <div className="grid grid-cols-7 bg-gray-50">
          {dayNames.map(day => (
            <div key={day} className="px-4 py-3 text-center text-sm font-medium text-gray-700">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7">
          {days.map((date, index) => {
            const dayPosts = date ? getPostsForDate(date) : [];
            const isToday = date && date.toDateString() === new Date().toDateString();
            const isSelected = selectedDate && date && date.toDateString() === selectedDate.toDateString();

            return (
              <div
                key={index}
                className={`min-h-[120px] border-b border-r border-gray-200 p-2 ${
                  date ? 'cursor-pointer hover:bg-gray-50' : ''
                } ${isSelected ? 'bg-blue-50' : ''}`}
                onClick={() => date && setSelectedDate(date)}
              >
                {date && (
                  <>
                    <div className={`text-sm font-medium mb-1 ${
                      isToday ? 'text-blue-600 font-bold' : 'text-gray-900'
                    }`}>
                      {date.getDate()}
                    </div>
                    <div className="space-y-1">
                      {dayPosts.slice(0, 3).map((post, postIndex) => (
                        <div
                          key={postIndex}
                          className={`text-xs p-1 rounded truncate ${
                            post.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            post.status === 'published' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}
                          title={post.caption}
                        >
                          {post.caption.substring(0, 20)}...
                        </div>
                      ))}
                      {dayPosts.length > 3 && (
                        <div className="text-xs text-gray-500">
                          +{dayPosts.length - 3} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Date Details */}
      {selectedDate && (
        <div className="mt-6 bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Posts for {selectedDate.toLocaleDateString()}
          </h3>
          {getPostsForDate(selectedDate).length > 0 ? (
            <div className="space-y-3">
              {getPostsForDate(selectedDate).map((post) => (
                <div key={post._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {post.caption.substring(0, 60)}...
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(post.scheduledTime).toLocaleTimeString()} • {post.platforms.join(', ')}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    post.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    post.status === 'published' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {post.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No posts scheduled for this date.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Calendar;