import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter, Download, Plus, X, Printer } from 'lucide-react';

const BookingsTab = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const API_URL = 'https://ecowheel-backend-5p47.onrender.com/bookings/api/bookings/admin/all/';
  const token = localStorage.getItem('access_token');

  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    if (token) {
      fetchBookings();
    } else {
      setError('Authentication token missing.');
      setLoading(false);
    }
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(API_URL, authHeaders);
      setBookings(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch bookings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.user?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.tour_date?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateBookingStatus = async (bookingId, newStatus) => {
    setUpdatingStatus(true);
    setUpdateError(null);
    try {
      await axios.patch(
        `http://localhost:8000/bookings/api/bookings/${bookingId}/`,
        { status: newStatus },
        authHeaders
      );

      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
      );

      setSelectedBooking((prev) =>
        prev && prev.id === bookingId ? { ...prev, status: newStatus } : prev
      );
    } catch (err) {
      setUpdateError('Failed to update booking status.');
      console.error(err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-lime-700 outline-none"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => window.print()}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print</span>
          </button>
       
          <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-700 to-yellow-500 text-white rounded-lg transition-colors">
            <Plus className="w-4 h-4" />
            <span>New Booking</span>
          </button>
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {/* Bookings Table */}
      <div id="printable-section" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-50">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Booking ID</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Customer</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Tour</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Date</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Guests</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Amount</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-6 text-gray-500">
                    Loading bookings...
                  </td>
                </tr>
              ) : filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-6 text-gray-500">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-b">
                    <td className="py-4 px-6">{booking.id}</td>
                    <td className="py-4 px-6">{booking.user}</td>
                    <td className="py-4 px-6">{booking.tour_name || 'N/A'}</td>
                    <td className="py-4 px-6">{new Date(booking.tour_date).toLocaleDateString()}</td>
                    <td className="py-4 px-6">{booking.num_guests}</td>
                    <td className="py-4 px-6">{booking.amount ? `$${booking.amount}` : 'N/A'}</td>
                    <td className="py-4 px-6 capitalize">{booking.status}</td>
                    <td className="py-4 px-6">
                      <button
                        className="text-sm text-blue-600 hover:underline"
                        onClick={() => setSelectedBooking(booking)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedBooking && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          onClick={() => setSelectedBooking(null)}
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedBooking(null)}
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
            <p><strong>ID:</strong> {selectedBooking.id}</p>
            <p><strong>Customer:</strong> {selectedBooking.user}</p>
            <p><strong>Tour:</strong> {selectedBooking.tour_name || 'N/A'}</p>
            <p><strong>Date:</strong> {new Date(selectedBooking.tour_date).toLocaleDateString()}</p>
            <p><strong>Guests:</strong> {selectedBooking.num_guests}</p>
            <p><strong>Amount:</strong> {selectedBooking.amount ? `$${selectedBooking.amount}` : 'N/A'}</p>
            <p><strong>Status:</strong> <span className="capitalize">{selectedBooking.status}</span></p>

            {updateError && <p className="text-red-500 mt-2">{updateError}</p>}

            <div className="mt-6 flex space-x-4">
              <button
                disabled={updatingStatus || selectedBooking.status === 'Confirmed'}
                className={`px-4 py-2 rounded-md text-white ${
                  selectedBooking.status === 'Confirmed'
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
                onClick={() => updateBookingStatus(selectedBooking.id, 'Confirmed')}
              >
                {updatingStatus && selectedBooking.status !== 'Confirmed' ? 'Updating...' : 'Confirm'}
              </button>
              <button
                disabled={updatingStatus || selectedBooking.status === 'Cancelled'}
                className={`px-4 py-2 rounded-md text-white ${
                  selectedBooking.status === 'Cancelled'
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
                onClick={() => updateBookingStatus(selectedBooking.id, 'Cancelled')}
              >
                {updatingStatus && selectedBooking.status !== 'Cancelled' ? 'Updating...' : 'Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsTab;
