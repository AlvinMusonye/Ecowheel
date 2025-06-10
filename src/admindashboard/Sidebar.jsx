import { Link, useLocation } from 'react-router-dom';
import { Camera, Home, BookOpen, MapPin, Users, BarChart3, Moon, Sun, LogOut } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Sidebar = () => {
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();

  const items = [
    { id: 'overview', label: 'Overview', icon: Home, path: '/admin-dashboard' },
    { id: 'bookings', label: 'Bookings', icon: BookOpen, path: '/admin-dashboard/bookings' },
    { id: 'tours', label: 'Tours', icon: MapPin, path: '/admin-dashboard/tours' },
    { id: 'customers', label: 'Customers', icon: Users, path: '/admin-dashboard/customers' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  return (
    <div className={`w-64 shadow-lg border-r h-full flex flex-col justify-between transition-colors ${
      isDarkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div>
        {/* Header */}
        <div className={`p-6 border-b transition-colors ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center space-x-3">
           <div>
            <img src="/Logo 1-Picsart-BackgroundRemover.jpeg" alt="" srcset="" className='w-10 h-10 rounded-full' />
           </div>
            <div>
              <h1 className={`text-xl font-bold transition-colors ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
               Ecowheel 
              </h1>
              <p className={`text-sm transition-colors ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Tours & Bookings
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6">
          {items.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors ${
                location.pathname === item.path
                  ? isDarkMode
                    ? 'bg-green-900/50 border-r-2 border-green-500 text-green-400'
                    : 'bg-lime-50 border-r-2 border-green-500 text-green-700'
                  : isDarkMode
                    ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom Buttons */}
      <div className="px-6 pb-6 space-y-3">
        <button
          onClick={toggleTheme}
          className={`w-full flex items-center space-x-3 px-4 py-2 border rounded-lg transition-colors ${
            isDarkMode
              ? 'border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          <span className="text-sm font-medium">
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </span>
        </button>

        <button
          onClick={handleLogout}
          className={`w-full flex items-center space-x-3 px-4 py-2 border border-red-200 rounded-lg transition-colors ${
            isDarkMode
              ? 'bg-red-900/50 text-red-400 hover:bg-red-900/70 border-red-800'
              : 'bg-red-50 text-red-700 hover:bg-red-100'
          }`}
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;