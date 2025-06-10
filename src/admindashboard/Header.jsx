import { Bell, Settings, User } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Header = ({ activeTab }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`shadow-sm border-b px-6 py-4 transition-colors ${
      isDarkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold capitalize transition-colors ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {activeTab || 'Ecowheel'}
          </h2>
          <p className={`transition-colors ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Manage your safari tours and bookings
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className={`p-2 transition-colors ${
            isDarkMode
              ? 'text-gray-400 hover:text-gray-200'
              : 'text-gray-400 hover:text-gray-600'
          }`}>
            <Bell className="w-6 h-6" />
          </button>
          
          <button className={`p-2 transition-colors ${
            isDarkMode
              ? 'text-gray-400 hover:text-gray-200'
              : 'text-gray-400 hover:text-gray-600'
          }`}>
            <Settings className="w-6 h-6" />
          </button>
          
          <div className={`flex items-center space-x-3 pl-4 border-l transition-colors ${
            isDarkMode ? 'border-gray-600' : 'border-gray-200'
          }`}>
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-yellow-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="text-sm">
              <p className={`font-medium transition-colors ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Welcome Alvin
              </p>
              <p className={`transition-colors ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                alvin@ecowheel.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;