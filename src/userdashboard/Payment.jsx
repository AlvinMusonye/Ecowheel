import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { CreditCard, Users, MapPin, Phone, Shield, CheckCircle, AlertCircle } from 'lucide-react';

const Payment = () => {
  const { state } = useLocation();
  const amountFromBooking = state?.amount || '';
  const tourFromBooking = state?.tour || {};
  const guestsFromBooking = state?.num_guests || 1;

  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState(amountFromBooking);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // If amount changes in state, update local amount
  useEffect(() => {
    setAmount(amountFromBooking);
  }, [amountFromBooking]);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('User not authenticated.');
        setLoading(false);
        return;
      }

      const payload = {
        phone_number: phoneNumber,
        amount: amount,
        account_reference: `Ecowheel Safari's Tour - ${tourFromBooking.title || tourFromBooking.name || ''}`,
        transaction_desc: `Payment for ${tourFromBooking.title || tourFromBooking.name || ''} - Guests: ${guestsFromBooking}`,
      };

      const response = await axios.post(
        'https://ecowheel-backend-5p47.onrender.com/mpesa/api/stk-push/',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.response_code === "0") {
        setMessage(response.data.customer_message);
      } else {
        setError(response.data.response_description || 'Payment failed');
      }
    } catch (err) {
      setError('An error occurred while processing payment.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4 flex items-center justify-center">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full mb-4 shadow-lg">
            <CreditCard className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Secure Payment
          </h1>
          <p className="text-gray-600 mt-2">Complete your safari booking</p>
        </div>

        {/* Payment Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Booking Summary */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Booking Summary
            </h2>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-emerald-100">Tour:</span>
                <span className="font-medium">{tourFromBooking.title || tourFromBooking.name || 'N/A'}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-emerald-100 flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  Guests:
                </span>
                <span className="font-medium">{guestsFromBooking}</span>
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t border-emerald-400">
                <span className="text-emerald-100">Total Amount:</span>
                <span className="text-2xl font-bold">${amount}</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="p-6">
            <div className="space-y-6">
              {/* Phone Number Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center" htmlFor="phoneNumber">
                  <Phone className="w-4 h-4 mr-2 text-emerald-600" />
                  M-Pesa Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="2547XXXXXXXX"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-gray-50 focus:bg-white text-lg"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-emerald-600">KE</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Enter your Safaricom M-Pesa number to receive payment prompt
                </p>
              </div>

              {/* Security Notice */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800">Secure Payment</h3>
                    <p className="text-xs text-gray-600 mt-1">
                      Your payment is processed securely through M-Pesa. You'll receive an SMS prompt to complete the transaction.
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Button */}
              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 " />
                    <span className='cursor-pointer'>Pay ${amount} Now</span>
                  </>
                )}
              </button>
            </div>

            {/* Success/Error Messages */}
            {message && (
              <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-semibold text-emerald-800">Payment Initiated</h3>
                  <p className="text-sm text-emerald-700 mt-1">{message}</p>
                </div>
              </div>
            )}

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-semibold text-red-800">Payment Error</h3>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              Powered by <span className="font-semibold text-emerald-600">Ecowheel Safaris</span> • 
              Secure M-Pesa Integration
            </p>
          </div>
        </div>

        {/* Help Text */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Need help? Contact our support team at{' '}
            <a href="mailto:support@ecowheel.com" className="text-emerald-600 hover:text-emerald-700 font-medium">
              support@ecowheel.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;