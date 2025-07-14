import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PasswordResetRequest = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      await axios.post('http://127.0.0.1:9000/accounts/api/password-reset/', {
        email: email,
      });
      setMessage('Password reset link sent! Check your email.');
    } catch (err) {
      setError('Something went wrong. Please check the email and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="lg:w-1/2 relative min-h-[300px] lg:min-h-[600px]">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1564760055775-d63b17a55c44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2089&q=80')",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 via-transparent to-yellow-900/50"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8 text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-yellow-300 drop-shadow-lg">
                    Forgot Your Password?
                  </h2>
                  <p className="text-lg opacity-90 mb-4">
                    Don’t worry — we’ll help you reset it
                  </p>
                  <div className="flex justify-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-green-600 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-700 to-yellow-600 bg-clip-text text-transparent mb-2">
                  Reset Your Password
                </h1>
                <p className="text-gray-600">We'll send a reset link to your email</p>
              </div>

              {/* Alerts */}
              {message && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
                  {message}
                </div>
              )}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative group">
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-300 group-hover:border-green-300 pl-12"
                  />
                  <svg
                    className="w-5 h-5 text-gray-400 absolute left-4 top-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 4a2 2 0 012-2h12a2 2 0 012 2v1l-8 5-8-5V4zm0 3.236l7.447 4.67a1 1 0 001.106 0L18 7.236V16a2 2 0 01-2 2H4a2 2 0 01-2-2V7.236z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-semibold transform transition-all duration-300 shadow-lg bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 hover:scale-[1.02]"
                >
                  Send Reset Link
                </button>

                <p className="text-center text-gray-600">
                  Remember your password?{' '}
                  <Link to="/login" className="text-green-600 hover:text-yellow-600 font-semibold underline transition-colors duration-300">
                    Back to Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetRequest;
