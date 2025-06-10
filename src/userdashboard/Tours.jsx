import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {
  User,
  Search,
  MapPin,
  Star,
  Globe,
  Camera,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  Calendar,
  Users,
  Award,
  Heart,
  Clock,
  SortAsc,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';



const Tours = () => {
  const [fetchedTours, setFetchedTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI states
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular'); // popular, priceLow, priceHigh, rating
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [likedTours, setLikedTours] = useState(new Set());

  // Categories for filtering
  const categories = ['All', 'Wildlife Safari', 'Mountain Trek', 'Beach & Culture', 'Bird Watching', 'Photography'];

  // Static local tours data (keep as fallback or enhancement)
  const localTours = [
    {
      id: 1,
      name: 'Maasai Mara Safari Adventure',
      price: 1299,
      originalPrice: 1599,
      duration: '7 days',
      rating: 4.9,
      reviews: 245,
      category: 'Wildlife Safari',
      image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&h=600&fit=crop&crop=center',
      description: "Experience the Great Migration and witness the Big Five...",
      // ...other fields omitted for brevity
    },
    {
      id: 2,
      name: 'Mount Kenya Summit Expedition',
      price: 899,
      originalPrice: 1099,
      duration: '5 days',
      rating: 4.8,
      reviews: 189,
      category: 'Mountain Trek',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop&crop=center',
      description: "Conquer Africa's second-highest peak...",
    },
    // ...more local tours
  ];

  // Fetch tours from backend
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get('http://127.0.0.1:8000/tours/api/tours/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFetchedTours(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch tours:', err);
        setError('Failed to load tours.');
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  // Mouse move for animated background elements
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Combine fetched tours and local tours (avoid duplicates by ID)
  const combinedTours = useMemo(() => {
    const fetchedIds = new Set(fetchedTours.map((t) => t.id));
    // Include local tours only if not in fetchedTours
    const uniqueLocalTours = localTours.filter((t) => !fetchedIds.has(t.id));
    return [...fetchedTours, ...uniqueLocalTours];
  }, [fetchedTours]);

  // Filter tours by category
  const filteredTours = useMemo(() => {
    if (selectedCategory === 'All') return combinedTours;
    return combinedTours.filter((tour) => tour.category === selectedCategory);
  }, [combinedTours, selectedCategory]);

  // Sort tours by selected criteria
  const sortedTours = useMemo(() => {
    const sorted = [...filteredTours];
    switch (sortBy) {
      case 'priceLow':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
      default:
        sorted.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
        break;
    }
    return sorted;
  }, [filteredTours, sortBy]);

  // Toggle like/unlike tour
  const toggleLike = (id) => {
    setLikedTours((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) updated.delete(id);
      else updated.add(id);
      return updated;
    });
  };

  if (loading) return <p>Loading tours...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Floating orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-emerald-300/15 to-teal-300/15 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            top: '10%',
            left: '10%'
          }}
        />
        <div
          className="absolute w-80 h-80 bg-gradient-to-l from-amber-400/15 to-orange-400/15 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * 0.015}px)`,
            top: '60%',
            right: '10%'
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur-2xl border-b border-emerald-100/50 shadow-xl shadow-emerald-500/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-400 to-teal-400 flex items-center justify-center shadow-xl shadow-emerald-500/25 transform hover:scale-105 transition-all duration-300">
                  <img src="/Logo 1-Picsart-BackgroundRemover.jpeg" alt="" srcset="" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-2xl font-black bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                  Ecowheel
                </span>
                <p className="text-xs text-gray-500 font-semibold">Eco Adventures</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="/user-dashboard#" className="text-gray-700 hover:text-emerald-600 font-semibold transition-all duration-300 hover:scale-105">
                Home
              </a>
              <a href="/tours" className="relative text-emerald-600 font-semibold">
                Tours
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500"></span>
              </a>
              <a href="/explore" className="text-gray-700 hover:text-emerald-600 font-semibold transition-all duration-300 hover:scale-105">
                Explore
              </a>

            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <button className="p-3 text-gray-600 hover:text-emerald-600 transition-all hover:bg-emerald-50 rounded-2xl hover:scale-105 transform duration-300">
                <Search className="w-5 h-5" />
              </button>

              <button a href="/tours" className="cursor-pointer bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 text-white px-8 py-3 rounded-2xl font-bold hover:shadow-xl hover:shadow-emerald-500/25 transition-all hover:scale-105 transform duration-300 flex items-center space-x-2">
                <span>Book Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-gray-600 hover:bg-emerald-50 rounded-xl transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Filters and Sort */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Categories */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all transform hover:scale-105 ${selectedCategory === category
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-white shadow-lg'
                      : 'bg-gray-100 cursor-pointer text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <SortAsc className="w-5 h-5" />
                <span className="font-semibold">Sort by:</span>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-300 rounded-xl px-4 py-2 font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="duration">Duration</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedTours.map((tour) => (
              <div
                key={tour.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={tour.image}
                      alt={tour.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  {/* Overlay elements */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-emerald-700 px-4 py-2 rounded-full text-sm font-bold">
                      {tour.category}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4">
                    <button
                      onClick={() => toggleLike(tour.id)}
                      className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all"
                    >
                      <Heart
                        className={`w-5 h-5 transition-colors ${likedTours.has(tour.id)
                            ? 'text-red-500 fill-current'
                            : 'text-gray-600 hover:text-red-500'
                          }`}
                      />
                    </button>
                  </div>

                  {tour.originalPrice > tour.price && (
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        Save ${tour.originalPrice - tour.price}
                      </span>
                    </div>
                  )}

                  <div className="absolute bottom-4 right-4">
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-bold ${tour.difficulty === 'Easy'
                          ? 'bg-green-100 text-green-700'
                          : tour.difficulty === 'Challenging'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                    >
                      {tour.difficulty}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-2 text-gray-500 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">{tour.location}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900">{tour.name}</h3>
                  <div className="flex items-center space-x-2 mt-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-semibold">
                      {tour.rating} ({tour.reviews} reviews)
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 mt-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium">{tour.duration}</span>
                  </div>

                  <div className="flex items-center space-x-2 mt-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium">{tour.group}</span>
                  </div>

                  <div className="flex items-center space-x-2 mt-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium">Starts from ${tour.price}</span>
                  </div>
                  <div className="mt-4">
                    <span className="text-lg font-bold text-emerald-600">${tour.price}</span>
                    {tour.originalPrice && tour.originalPrice > tour.price && <span className="text-sm line-through text-gray-500 ml-2">${tour.originalPrice}</span>}
                  </div>
                  <Link
                    to="/booking"
                    state={{
                      tour: tour, // Pass the entire tour object
                    }}
                    className="bg-emerald-600 text-white px-4 py-2  rounded hover:bg-emerald-700 inline-block mt-4"
                  >
                    Book Now
                  </Link>
                  <button>
                  
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tours;
