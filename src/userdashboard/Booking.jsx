import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Users, MapPin, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';

const Booking = () => {
  const { state } = useLocation();
  const tour = state?.tour;
  const tourPrice = parseFloat(tour?.price || 0);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    tour_name: tour?.title || tour?.name || '',
    tour_date: '',
    num_guests: 1,
    amount: tour ? tourPrice * 1 : 0,
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    if (tour) {
      setFormData(prev => ({
        ...prev,
        tour_name: tour.title || tour.name,
        amount: tourPrice * (prev.num_guests || 1),
      }));
    }
  }, [tour, formData.num_guests, tourPrice]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = {
      ...formData,
      [name]: name === 'num_guests' ? parseInt(value) : value,
    };

    if (tour && name === 'num_guests') {
      updatedData.amount = tourPrice * parseInt(value || 1);
    }

    setFormData(updatedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!token) {
      setError('Please log in to make a booking.');
      return;
    }

    try {
      const response = await axios.post(
        'https://ecowheel-backend-5p47.onrender.com/bookings/api/bookings/',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setMessage('Booking successful! Redirecting to payment...');

      setFormData({
        tour_name: tour.title || tour.name,
        tour_date: '',
        num_guests: 1,
        amount: tourPrice * 1
      });

      // ✅ Redirect to payment after a short delay
      setTimeout(() => {
        navigate('/payment', {
          state: {
            amount: tourPrice * formData.num_guests,
            tour: tour
          }
        });
      }, 1500);

    } catch (err) {
      console.error('Booking error:', err.response?.data || err.message);
      setError('Booking failed: ' + JSON.stringify(err.response?.data || err.message));
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-emerald-700 mb-2">
          Book: {tour?.title || tour?.name}
        </h2>
        <p className="text-gray-600">Complete your booking details below</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="lg:w-1/2 w-full">
          {tour?.image && (
            <img
              src={tour.image}
              alt={tour.title || 'Tour image'}
              className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
            />
          )}
        </div>

        <div className="lg:w-1/2 w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 h-fit">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tour Name:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="tour_name"
                    value={formData.tour_name}
                    readOnly
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl bg-gray-50 text-gray-700 focus:outline-none"
                  />
                  <MapPin className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tour Date:
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="tour_date"
                    value={formData.tour_date}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Number of Guests:
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="num_guests"
                    value={formData.num_guests}
                    onChange={handleChange}
                    min={1}
                    required
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Total Amount (USD):
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.amount}
                    readOnly
                    className="w-full border-2 border-emerald-200 px-4 py-3 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-lg focus:outline-none"
                  />
                  <CreditCard className="absolute right-3 top-3.5 w-5 h-5 text-emerald-500" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg"
              >
                <div className="flex items-center justify-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Book Now
                </div>
              </button>

              {message && (
                <div className="flex items-center p-4 bg-green-50 border border-green-200 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <p className="text-green-700 font-medium">{message}</p>
                </div>
              )}

              {error && (
                <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-xl">
                  <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
