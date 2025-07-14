import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter, Download, Plus, Pencil, Trash } from 'lucide-react';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'http://127.0.0.1:9000/accounts/api/admin/users/';
  const token = localStorage.getItem('access_token');

  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    if (token) {
      fetchCustomers();
    } else {
      setError('Authentication token missing.');
      setLoading(false);
    }
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(API_URL, authHeaders);
      setCustomers(response.data.users); // ✅ Use "users" from API response
      setError(null);
    } catch (err) {
      setError('Failed to fetch customers');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        API_URL,
        {
          username: newUser.name,
          email: newUser.email,
          role: 'tourist', // default role (you can adjust as needed)
        },
        authHeaders
      );
      setCustomers([...customers, response.data]);
      setNewUser({ name: '', email: '' });
      setError(null);
    } catch (err) {
      setError('Failed to add user');
      console.error(err);
    }
  };

  const handleDeleteUser = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this customer?');
    if (!confirmed) return;
  
    try {
      const response = await axios.delete(
        `http://127.0.0.1:9000/accounts/api/userprofiles/${id}/delete/`,
        authHeaders
      );
  
      if (response.status === 204 || response.status === 200) {
        setCustomers((prevCustomers) => prevCustomers.filter(user => user.id !== id));
        setError(null);
      } else {
        setError('Failed to delete user: Unexpected response');
        console.warn('Unexpected response:', response);
      }
    } catch (err) {
      setError('Failed to delete user');
      console.error('Delete user error:', err);
    }
  };
  
  const filteredCustomers = customers.filter((customer) =>
    customer.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers..."
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
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            <span>View All</span>
          </button>
          <button
            onClick={handleAddUser}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-700 to-yellow-500 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Customer</span>
          </button>
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {/* Add customer form */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm space-y-4">
        <h3 className="text-lg font-semibold">New Customer</h3>
        <form onSubmit={handleAddUser} className="flex space-x-4">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="border border-gray-300 p-2 rounded w-1/3"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="border border-gray-300 p-2 rounded w-1/3"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-green-700 to-yellow-500 text-white rounded cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-50">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">ID</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Name</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Email</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Role</th>

              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    Loading customers...
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b">
                    <td className="py-4 px-6">{customer.id}</td>
                    <td className="py-4 px-6">{customer.username}</td>
                    <td className="py-4 px-6">{customer.email}</td>
                    <td className="py-4 px-6 capitalize">{customer.role}</td>
                    <td className="py-4 px-6 space-x-3">
                     
                      <button
                        onClick={() => handleDeleteUser(customer.id)}
                        className="text-red-600 hover:underline text-sm flex items-center space-x-1"
                      >


                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customers;
