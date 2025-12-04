import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-classic-navy/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className="hidden md:block text-2xl font-bold font-serif text-classic-navy">
              Social Media Automation
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="text-sm text-right">
                <p className="text-classic-navy font-medium">{user?.name}</p>
                <p className="text-classic-slate capitalize text-xs">{user?.plan} Plan</p>
              </div>
              {user?.avatar && (
                <img
                  className="h-8 w-8 rounded-full border border-classic-navy/10"
                  src={user.avatar}
                  alt={user.name}
                />
              )}
            </div>

            <button
              onClick={logout}
              className="bg-classic-navy text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-classic-navy/90 focus:outline-none focus:ring-2 focus:ring-classic-gold transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;