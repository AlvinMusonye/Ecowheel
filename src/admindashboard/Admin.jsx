import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const AdminLayout = () => {
  const location = useLocation();
  const { isDarkMode } = useTheme();
  
  // Optional: Derive tab name from route
  const activeTab = location.pathname.split('/').pop();

  return (
    <div className={`flex h-screen transition-colors ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-auto">
        <Header activeTab={activeTab} />
        <main className={`p-6 overflow-y-auto flex-1 transition-colors ${
          isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;