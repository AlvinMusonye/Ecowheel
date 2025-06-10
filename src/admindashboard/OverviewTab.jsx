import React, { useEffect, useState } from 'react';
import {
  BookOpen,
  Calendar,
  DollarSign,
  Users
} from 'lucide-react';
import axios from 'axios';
import StatCard from './StatCard';
import { useTheme } from '../contexts/ThemeContext';

const getStatusColor = (status, isDarkMode) => {
  switch (status) {
    case 'Completed':
      return isDarkMode 
        ? 'bg-green-900/50 text-green-400 border border-green-800'
        : 'bg-green-100 text-green-700';
    case 'Pending':
      return isDarkMode
        ? 'bg-yellow-900/50 text-yellow-400 border border-yellow-800'
        : 'bg-yellow-100 text-yellow-700';
    case 'Cancelled':
      return isDarkMode
        ? 'bg-red-900/50 text-red-400 border border-red-800'
        : 'bg-red-100 text-red-700';
    default:
      return isDarkMode
        ? 'bg-gray-700 text-gray-300 border border-gray-600'
        : 'bg-gray-100 text-gray-700';
  }
};

const OverviewTab = ({ stats = {}, recentBookings = [], tours = [] }) => {
  const { isDarkMode } = useTheme();

  const [totalBookings, setTotalBookings] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('No access token found');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch total bookings
        const bookingsResponse = await axios.get(
          'http://localhost:8000/bookings/api/bookings/admin/all/',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTotalBookings(bookingsResponse.data.length);

        // Fetch customers
        const customersResponse = await axios.get(
          'http://127.0.0.1:8000/accounts/api/admin/users/',
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Access the 'users' array in the response to get count
        setCustomerCount(customersResponse.data.users.length);

      } catch (err) {
        console.error(err);
        setError('Failed to fetch data from server.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={BookOpen}
          title="Total Bookings"
          value={loading ? '...' : totalBookings}
          change={12}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <StatCard
          icon={Calendar}
          title="Active Bookings"
          value={stats.activeBookings ?? 0}
          change={8}
          color="bg-gradient-to-br from-green-500 to-green-600"
        />
        <StatCard
          icon={DollarSign}
          title="Total Revenue"
          value={`$${(stats.totalRevenue ?? 0).toLocaleString()}`}
          change={15}
          color="bg-gradient-to-br from-orange-500 to-orange-600"
        />
        <StatCard
          icon={Users}
          title="Customers"
          value={loading ? '...' : customerCount}
          change={5}
          color="bg-gradient-to-br from-purple-500 to-purple-600"
        />
      </div>

      {/* Error message */}
      {error && (
        <p className="text-red-500 font-medium">{error}</p>
      )}

      {/* Recent Bookings & Popular Tours */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className={`rounded-xl shadow-sm border p-6 transition-colors ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>Recent Bookings</h3>
            <button className={`text-sm font-medium ${
              isDarkMode ? 'text-green-400 hover:text-green-300' : 'text-green-700 hover:text-amber-700'
            }`}>
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentBookings?.length > 0 ? recentBookings.slice(0, 4).map((booking) => (
              <div key={booking.id} className={`flex items-center justify-between p-4 rounded-lg ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <div>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {booking.customer}
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {booking.tour}
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {new Date(booking.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    ${booking.amount}
                  </p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    getStatusColor(booking.status, isDarkMode)
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            )) : (
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                No recent bookings.
              </p>
            )}
          </div>
        </div>

        {/* Popular Tours */}
        <div className={`rounded-xl shadow-sm border p-6 transition-colors ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Popular Tours
            </h3>
            <button className={`text-sm font-medium ${
              isDarkMode ? 'text-green-400 hover:text-green-300' : 'text-green-700 hover:text-amber-700'
            }`}>
              Manage
            </button>
          </div>
          <div className="space-y-4">
            {tours?.length > 0 ? tours.map((tour) => (
              <div key={tour.id} className={`flex items-center justify-between p-4 rounded-lg ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <div>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {tour.name}
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {tour.duration} • ${tour.price} per person
                  </p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {tour.bookings} bookings
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Max {tour.capacity} guests
                  </p>
                </div>
              </div>
            )) : (
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                No popular tours listed.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
