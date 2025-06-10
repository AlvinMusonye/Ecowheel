import { TrendingUp } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const StatCard = ({ icon: Icon, title, value, change, color }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`rounded-xl shadow-sm p-6 transition-all duration-200 ${
      isDarkMode
        ? 'bg-gray-800 border border-gray-700 hover:shadow-lg hover:shadow-gray-900/50'
        : 'bg-white border border-gray-100 hover:shadow-md'
    }`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium transition-colors ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {title}
          </p>
          <p className={`text-2xl font-bold mt-2 transition-colors ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {typeof change === 'number' && (
            <p className={`text-sm mt-2 flex items-center ${
              change > 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              <TrendingUp className="w-4 h-4 mr-1" />
              {change > 0 ? '+' : ''}{change}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;