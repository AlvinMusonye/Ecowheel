import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (formData.password !== formData.password2) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/accounts/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormData({
          username: '',
          email: '',
          password: '',
          password2: '',
        });
        navigate('/login'); // ✅ Redirect after successful registration
      } else {
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat();
          setError(errorMessages.join(' '));
        } else if (data.error) {
          setError(data.error);
        } else {
          const errorMsg = Object.values(data).flat().join(' ');
          setError(errorMsg || 'Registration failed. Please try again.');
        }
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 relative min-h-[300px] lg:min-h-[600px]">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80')"
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-900/60 via-transparent to-yellow-900/40"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8 text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-yellow-300 drop-shadow-lg">
                    Welcome to Ecowheel Safari Tours
                  </h2>
                  <p className="text-lg opacity-90 mb-4">
                    Discover the wild beauty of nature
                  </p>
                  <div className="flex justify-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-green-600 to-yellow-500 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-700 to-yellow-600 bg-clip-text text-transparent mb-2">
                  Ecowheel Safari Tours
                </h1>
                <p className="text-gray-600">Create your Ecowheel account</p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm animate-pulse">
                  {error}
                </div>
              )}

              <div className="space-y-5">
                <div className="space-y-4">
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-300"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-300"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-300"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="password"
                    name="password2"
                    placeholder="Confirm Password"
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-300"
                    value={formData.password2}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`w-full py-3 rounded-xl font-semibold transform transition-all duration-300 shadow-lg hover:shadow-xl ${
                    isLoading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-green-700 to-green-800 text-white hover:from-green-800 hover:to-green-700 hover:scale-[1.02]'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </button>

                <p className="text-center text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="text-lime-700 hover:text-yellow-600 font-semibold underline transition-colors duration-300">
                    Sign In
                  </Link>
                </p>

                {/* <div className="flex items-center my-6">
                  <div className="flex-1 border-t border-gray-300"></div>
                  <span className="px-4 text-gray-500 text-sm font-medium">OR</span>
                  <div className="flex-1 border-t border-gray-300"></div>
                </div> */}

                {/* <button
                  type="button"
                  className="w-full bg-white border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 flex items-center justify-center space-x-3 transform hover:scale-[1.02] transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Continue with Google</span>
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
