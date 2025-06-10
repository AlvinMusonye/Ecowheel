import React, { useState, useEffect } from 'react';
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
  Play,
  LogOut 
} from 'lucide-react';
import { Link } from 'react-router-dom';


const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDestination, setActiveDestination] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto-slide hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const heroImages = [
    'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1920&h=1080&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=1920&h=1080&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&h=1080&fit=crop&crop=center'
  ];

  const tours = [
    {
      name: 'Maasai Mara Safari Adventure',
      price: '$1,299',
      duration: '7 days',
      rating: 4.9,
      category: 'Wildlife Safari',
      image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&h=600&fit=crop&crop=center',
      group: '12 people max',
      location: 'Maasai Mara',
      description: 'Experience the Great Migration and witness the Big Five in their natural habitat.',
      highlights: ['Game drives', 'Cultural visits', 'Hot air balloon']
    },
    {
      name: 'Mount Kenya Expedition',
      price: '$899',
      duration: '5 days',
      rating: 4.8,
      category: 'Mountain Trek',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop&crop=center',
      group: '8 people max',
      location: 'Central Kenya',
      description: 'Conquer Africa\'s second-highest peak with breathtaking alpine scenery.',
      highlights: ['Summit attempt', 'Alpine lakes', 'Mountain lodges']
    },
    {
      name: 'Diani Beach Paradise',
      price: '$699',
      duration: '4 days',
      rating: 4.7,
      category: 'Beach & Culture',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop&crop=center',
      group: '15 people max',
      location: 'Mombasa Coast',
      description: 'Pristine white sand beaches with crystal clear waters and Swahili culture.',
      highlights: ['Beach relaxation', 'Snorkeling', 'Swahili cuisine']
    },
    {
      name: 'Lake Nakuru Flamingo Tour',
      price: '$559',
      duration: '3 days',
      rating: 4.6,
      category: 'Bird Watching',
      image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop&crop=center',
      group: '10 people max',
      location: 'Rift Valley',
      description: 'Witness millions of flamingos painting the lake pink in this UNESCO site.',
      highlights: ['Flamingo viewing', 'Rhino sanctuary', 'Scenic drives']
    },
    {
      name: 'Samburu Wildlife Encounter',
      price: '$1,099',
      duration: '6 days',
      rating: 4.8,
      category: 'Wildlife Safari',
      image: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&h=600&fit=crop&crop=center',
      group: '12 people max',
      location: 'Northern Kenya',
      description: 'Discover unique wildlife species found nowhere else in Kenya.',
      highlights: ['Grevy\'s zebra', 'Reticulated giraffe', 'Cultural interactions']
    },
    {
      name: 'Amboseli Elephant Kingdom',
      price: '$799',
      duration: '4 days',
      rating: 4.9,
      category: 'Wildlife Safari',
      image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&h=600&fit=crop&crop=center',
      group: '10 people max',
      location: 'Amboseli',
      description: 'Get up close with majestic elephants against the backdrop of Mount Kilimanjaro.',
      highlights: ['Elephant herds', 'Kilimanjaro views', 'Maasai culture']
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Enhanced floating orbs */}
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
        <div
          className="absolute w-72 h-72 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * -0.01}px)`,
            bottom: '20%',
            left: '50%'
          }}
        />
      </div>

      {/* Enhanced Navigation */}
      <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur-2xl border-b border-emerald-100/50 shadow-xl shadow-emerald-500/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Enhanced Logo */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-400 to-teal-400 flex items-center justify-center shadow-xl shadow-emerald-500/25 transform hover:scale-105 transition-all duration-300">
                 <img src="/Logo 1-Picsart-BackgroundRemover.jpeg" alt="" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                  Ecowheel
                </span>
                <p className="text-xs text-gray-500 font-semibold">Eco Adventures</p>
              </div>
            </div>

            {/* Enhanced Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['Tours', 'Explore', 'Contact'].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`} // assumes your routes are like /tours, /safari, etc.
                  className="relative text-gray-700 hover:text-emerald-600 font-semibold transition-all duration-300 hover:scale-105 group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </div>

            {/* Enhanced Right Side */}
            <div className="flex items-center space-x-4">
              {/* Responsive Log Out Button */}
              <Link to="/login" className="bg-gradient-to-r from-green-500 via-green-400 to-green-400 cursor-pointer text-white px-4 py-2 md:px-6 md:py-2.5 rounded-2xl font-bold text-sm md:text-base hover:shadow-xl hover:shadow-emerald-500/25 transition-all hover:scale-105 transform duration-300 flex items-center space-x-2">
                <span className="hidden sm:inline">Log Out</span> {/* Hide text on very small screens, show from sm up */}
                <LogOut className="w-4 h-4" />
              </Link>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-gray-600 hover:bg-emerald-50 rounded-xl transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Enhanced Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-emerald-100/50 py-6 bg-white/95 backdrop-blur-2xl rounded-b-3xl shadow-2xl">
              <div className="flex flex-col space-y-2">
                {['Tours', 'Explore', 'Contact'].map((item) => ( // Standardized capitalization
                  <Link
                    key={item}
                    to={`/${item.toLowerCase()}`} // Use Link and actual paths
                    className="text-gray-700 hover:text-emerald-600 font-semibold px-6 py-3 hover:bg-emerald-50 rounded-2xl transition-all transform hover:translate-x-2"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section with Carousel */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* Background Image Carousel */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
            >
              <img
                src={image}
                alt={`Kenya landscape ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight animate-fadeInUp" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            Discover Kenya's Wild Heart
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200/95 mb-10 max-w-3xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.3s', textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}>
            Unforgettable eco-adventures. Sustainable journeys. Breathtaking landscapes. Your adventure starts here.
          </p>
          <div className="animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <Link 
              to="/tours" 
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-base sm:text-lg border-2 border-transparent hover:bg-opacity-0 hover:border-white hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/30"
            >
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Explore Our Tours</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
          {/* The empty div below the original badge can be removed or repurposed if needed */}
          {/* <div className="border-t border-gray-700/50 pt-12 flex flex-col md:flex-row justify-between items-center"> */}
          {/* </div> */}
        </div>
      </section>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="group bg-gradient-to-r from-emerald-500 to-teal-400 text-white p-4 rounded-full shadow-2xl hover:shadow-emerald-500/25 transition-all transform hover:scale-110 animate-bounce">
          <div className="flex items-center space-x-2">
            <Link to="/tours">
            <span className="hidden group-hover:inline-block font-semibold transition-all duration-300">Book Now</span>
            </Link>
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
        </button>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </div>
  );
};
export default Home;