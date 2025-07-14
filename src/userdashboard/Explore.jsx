import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Repeat2, Send, Plus, Image, X, Upload, Home, Search, Bell, User, Camera } from 'lucide-react';

const API_BASE = 'http://127.0.0.1:9000/gallery/api/photos/';

const Navbar = ({ onNewPostClick }) => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex items-center flex-shrink-0">
            <img
              src="/Logo 1-Picsart-BackgroundRemover.jpeg"
              alt="Logo"
              className="h-10 w-10 rounded-full bg-green-400"
            />
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-green-700 to-yellow-500 bg-clip-text text-transparent">
              Ecowheel
            </span>
          </div>

          {/* Center: Navigation */}
          <div className="hidden md:flex flex-1 justify-center space-x-8">
            <a href="/tours" className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors">
              <Home size={20} />
              <span>Tour</span>
            </a>
            <a href="#" className="flex items-center gap-2 text-green-600 font-medium">
              <Search size={20} />
              <span>Explore</span>
            </a>
          </div>

          {/* Right: New Post Button */}
          <div className="hidden md:flex items-center">
            <button
              onClick={onNewPostClick}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 cursor-pointer text-white rounded-full hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
            >
              <Plus size={20} />
              <span className="font-medium">New Post</span>
            </button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-green-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Explore = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPost, setNewPost] = useState({ description: '', image: null });
  const [commentInputs, setCommentInputs] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  const token = localStorage.getItem('access_token');

  useEffect(() => {
    if (!token) {
      setError('You must be logged in to view posts.');
      setLoading(false);
      return;
    }
    fetchPosts();
  }, [token]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_BASE, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPosts(data);
      setLoading(false);
    } catch (err) {
      setError(`Failed to load posts: ${err.message}`);
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPost({ ...newPost, image: file });
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPost.description.trim()) return;

    try {
      const formData = new FormData();
      formData.append('description', newPost.description);
      if (newPost.image) {
        formData.append('image', newPost.image);
      }

      const response = await fetch(API_BASE, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const createdPost = await response.json();
      setPosts([createdPost, ...posts]);
      setNewPost({ description: '', image: null });
      setImagePreview(null);
      setShowCreateModal(false);
    } catch (err) {
      setError(`Failed to create post: ${err.message}`);
    }
  };

  const handleLike = async (postId) => {
    try {
      await fetch(`${API_BASE}${postId}/like/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      await fetchPosts();
    } catch (err) {
      setError(`Failed to like post: ${err.message}`);
    }
  };

  const handleRepost = async (postId) => {
    try {
      await fetch(`${API_BASE}${postId}/repost/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      await fetchPosts();
    } catch (err) {
      setError(`Failed to repost: ${err.message}`);
    }
  };

  const handleComment = async (postId) => {
    const commentText = commentInputs[postId];
    if (!commentText?.trim()) return;

    try {
      await fetch(`${API_BASE}${postId}/comment/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: commentText }),
      });

      setCommentInputs({ ...commentInputs, [postId]: '' });
      await fetchPosts();
    } catch (err) {
      setError(`Failed to comment: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar onNewPostClick={() => setShowCreateModal(true)} />
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading posts...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar onNewPostClick={() => setShowCreateModal(true)} />
        <div className="max-w-2xl mx-auto p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onNewPostClick={() => setShowCreateModal(true)} />

      <div className="max-w-2xl mx-auto py-6 px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Explore</h1>
            <p className="text-gray-600 mt-1">Discover amazing photos from the community</p>
          </div>
        </div>

        {/* Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Create New Post</h2>
                  <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleCreatePost} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={newPost.description}
                      onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3"
                      placeholder="What's on your mind?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        {imagePreview ? (
                          <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto object-contain rounded-lg" />
                        ) : (
                          <>
                            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                            <p className="text-gray-600">Click to upload an image</p>
                          </>
                        )}
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowCreateModal(false)}
                      className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg"
                    >
                      Post
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Posts */}
        <div className="space-y-6">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl p-4 shadow-md">
              {post.image_url && (
                <img src={post.image_url} alt="" className="rounded-md mb-4 w-full h-64 object-cover" />
              )}
              <p className="text-gray-800">{post.description}</p>
              <div className="flex gap-4 mt-4">
                <button onClick={() => handleLike(post.id)} className="text-gray-500 hover:text-red-500">
                  <Heart size={20} /> {post.likes_count}
                </button>
                <button onClick={() => handleRepost(post.id)} className="text-gray-500 hover:text-green-500">
                  <Repeat2 size={20} /> {post.reposts_count || 0}
                </button>
              </div>
              {/* Comments and input */}
              <div className="mt-4">
                {post.comments?.map((comment, i) => (
                  <p key={i} className="text-sm text-gray-600">
                    <strong>{comment.user}</strong>: {comment.text}
                  </p>
                ))}
                {/* <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    value={commentInputs[post.id] || ''}
                    onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                    className="flex-1 border rounded px-2 py-1"
                    placeholder="Add a comment..."
                  />
                  <button onClick={() => handleComment(post.id)} className="text-green-600">
                    <Send size={18} />
                  </button>
                </div> */}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
