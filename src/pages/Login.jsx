import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/Authprovider';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { saveAuth } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const loginRes = await axios.post(
        'http://127.0.0.1:8000/accounts/api/login/',
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      const { access, refresh, user } = loginRes.data; // include refresh token if returned
      const { username, email, role } = user;
      // console.log('Login response:', loginRes.data);
      
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh); // store refresh token
      localStorage.setItem('username', username);

      
      const is_admin = role === 'admin';
      const is_operator = role === 'operator';
      
      saveAuth({ access, refresh, username, email, is_admin, is_operator });
      
      // Now log the token with the correct key:
      

      // Role-based navigation
      if (is_admin) {
        navigate('/admin-dashboard');
      } else if (is_operator) {
        navigate('/operator-dashboard');
      } else {
        navigate('/user-dashboard');
      }

    } catch (err) {
      setError('Invalid username or password');
    } finally {
      setIsLoading(false);
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
                  "url('https://images.unsplash.com/photo-1564760055775-d63b17a55c44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2089&q=80')",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 via-transparent to-yellow-900/50"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8 text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-yellow-300 drop-shadow-lg">
                    Welcome Back
                  </h2>
                  <p className="text-lg opacity-90 mb-4">
                    Continue your safari adventure
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
              {/* Title */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-green-600 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-700 to-yellow-600 bg-clip-text text-transparent mb-2">
                  Ecowheel Safari Tours
                </h1>
                <p className="text-gray-600">Sign in to your account</p>
              </div>

              {/* Error */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="relative group">
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-300 group-hover:border-green-300 pl-12"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                    <svg
                      className="w-5 h-5 text-gray-400 absolute left-4 top-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>

                  <div className="relative group">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-300 group-hover:border-green-300 pl-12"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <svg
                      className="w-5 h-5 text-gray-400 absolute left-4 top-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                <div className="text-right">
                  <Link
                    to={'/forgot-password'}
                    className="text-sm text-green-600 hover:text-yellow-600 font-medium transition-colors duration-300"
                  >
                    Forgot your password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 rounded-xl font-semibold transform transition-all duration-300 shadow-lg hover:shadow-xl ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 hover:scale-[1.02]'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing In...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <span>Sign In</span>
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              </form>

              <p className="mt-6 text-center text-gray-500 text-sm">
                Don&apos;t have an account?{' '}
                <Link
                  to={'/register'}
                  className="text-green-600 hover:text-yellow-600 font-medium transition-colors duration-300"
                >
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
