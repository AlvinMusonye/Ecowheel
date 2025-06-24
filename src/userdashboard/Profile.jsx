import { useEffect, useState } from 'react';
import axios from 'axios';

const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/<your_cloud_name>/upload';
const CLOUDINARY_UPLOAD_PRESET = '<your_upload_preset>';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({ phone_number: '', bio: '' });
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('access_token'); // adjust if you use a different token storage

  useEffect(() => {
    axios.get('https://ecowheel-backend-5p47.onrender.com/accounts/api/myprofile/', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setProfile(res.data.profile);
        setFormData({
          phone_number: res.data.profile.phone_number || '',
          bio: res.data.profile.bio || ''
        });
      })
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);

    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await axios.post(CLOUDINARY_UPLOAD_URL, uploadData);
      const imageUrl = res.data.secure_url;

      await axios.patch('http://127.0.0.1:8000/accounts/api/my-profile/', {
        profile_picture: imageUrl
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setProfile(prev => ({ ...prev, profile_picture: imageUrl }));
    } catch (err) {
      console.error("Image upload failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.patch('http://127.0.0.1:8000/accounts/api/my-profile/', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(res.data.profile);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!profile) return <div className="p-4 text-gray-600">Loading profile...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      <div className="flex flex-col items-center">
        <img
          src={profile.profile_picture}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover mb-2 border"
        />
        <input type="file" accept="image/*" onChange={handleFileUpload} className="mb-4" />
        {loading && <p className="text-sm text-gray-500">Uploading...</p>}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Phone Number</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>

        <div>
          <label className="block font-medium">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>

        <button
          type="submit"
          className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;
