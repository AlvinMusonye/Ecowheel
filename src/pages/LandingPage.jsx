import { useState, useEffect } from 'react';
import { MapPin, Users, Star, Calendar, ArrowRight, Shield, Award, Heart, User, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EcowheelLandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const destinations = [
    {
      name: "Maasai Mara",
      image: "/Luxury Safari in Masai Mara, Kenya.jpeg",
      rating: 4.9,
      description: "The Great Migration"
    },
    {
      name: "Amboseli National Park",
      image: "/Amboseli National Park Kenya 🇰🇪 Photo by @thejunglechic.jpeg",
      rating: 4.8,
      description: "Elephants & Mt. Kilimanjaro Views"
    },
    {
      name: "Tsavo East & West",
      image: "/Kenya Safari - Tsavo National Park elephants.jpeg",
      rating: 4.7,
      description: "Red Elephants Paradise"
    },
    {
      name: "Lake Nakuru",
      image: "/Explore the beautiful lake Nakuru national park in….jpeg",
      rating: 4.9,
      description: "Pink Flamingo Spectacle"
    }
  ];
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % destinations.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12  rounded-full flex items-center justify-center shadow-md">
               <img src="/Logo 1-Picsart-BackgroundRemover.jpeg" alt="" srcset="" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Ecowheel Safari Tours
                </h1>
                <p className="text-sm block bg-gradient-to-r from-green-500 to-yellow-500 text-transparent bg-clip-text font-medium animate-pulse">Your Adventure Awaits</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <Link to="/login" className="px-6 py-2 border-2 border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition-colors font-semibold">
                Sign In
              </Link>
              <Link to="/register"   className="px-6 py-2   rounded-lg font-semibold bg-gradient-to-r from-green-500 to-green-500 cursor-pointer text-white hover:bg-gradient-to-br transition-colors shadow-md">
                Register
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Experience Kenya's
              <span className="block bg-gradient-to-r from-green-500 to-yellow-500 text-transparent bg-clip-text">
               Wildlife Adventure
             </span>

            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Join us for unforgettable safari experiences across Kenya's most spectacular national parks. 
              Expert guides, comfortable accommodations, and wildlife encounters await you.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
              <Link to="/login" className="px-8 py-4  text-white rounded-lg font-semibold text-lg hover:bg-green-600 bg-green-500
               transition-colors shadow-lg flex items-center space-x-2">
                <span>Book Your Safari</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/login" className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-green-500 hover:text-green-600 transition-colors">
                View Our Tours
              </Link>
            </div>

            {/* Welcome Card */}
            <div className="max-w-sm mx-auto mb-16">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border border-green-200">
                <h3 className="text-xl font-bold text-green-800 mb-2">Welcome Back Adventurers!</h3>
                <p className="text-green-700 mb-4">Ready to continue your safari journey?</p>
                <div className="flex justify-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Users, number: "5,000+", label: "Happy Travelers", color: "text-blue-500" },
                { icon: MapPin, number: "25+", label: "Safari Destinations", color: "text-green-500" },
                { icon: Star, number: "4.9", label: "Customer Rating", color: "text-yellow-500" },
                { icon: Calendar, number: "8+", label: "Years Experience", color: "text-purple-500" }
              ].map((stat, index) => (
                <div key={index} className="text-center bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${stat.color.replace('text-', 'bg-').replace('500', '100')}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">{stat.number}</div>
                  <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-green-500 mb-4">
        Popular Safari Destinations
      </h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Explore Kenya's most iconic wildlife destinations with our expert guides
      </p>
    </div>
    
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 transition-transform duration-800 ease-in-out">
      {destinations.map((dest, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100"
        >
          <div className="bg-gradient-to-br from-green-100 to-green-200 h-48 flex items-center justify-center overflow-hidden">
            <img
              src={dest.image}
              alt={dest.name}
              className="h-full w-full object-cover cursor-pointer transition-transform duration-800 ease-in-out hover:scale-115"
            />
          </div>

          {/* Name below the image */}
          <h3 className="text-xl font-bold text-gray-800 mt-4 px-6">{dest.name}</h3>

          <div className="p-6 pt-2">
            <p className="text-gray-700 mb-3">{dest.description}</p>
            {dest.rating && (
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-gray-800 font-semibold">{dest.rating}</span>
                <span className="text-gray-500 text-sm">rating</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose Ecowheel Safari Tours?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to providing exceptional safari experiences while supporting conservation efforts
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Safety First",
                description: "Our experienced guides and well-maintained vehicles ensure your safety throughout your safari adventure.",
                color: "text-blue-500"
              },
              {
                icon: Award,
                title: "Expert Guides",
                description: "Local certified guides with extensive knowledge of wildlife behavior and conservation efforts.",
                color: "text-green-500"
              },
              {
                icon: Heart,
                title: "Conservation Focus",
                description: "We support local communities and wildlife conservation through responsible tourism practices.",
                color: "text-red-500"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${feature.color.replace('text-', 'bg-').replace('500', '100')}`}>
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Ready to Start Your Safari Adventure?
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Book your unforgettable Kenya wildlife experience today. Our team is ready to help you plan the perfect safari.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
            <Link to='/login' className="px-10 py-4 bg-green-500 text-white rounded-lg font-bold text-lg hover:bg-green-600 transition-colors shadow-lg flex items-center space-x-2 cursor-pointer">
              <span>Book Now</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link to='/login' className="px-10 py-4 border-2 border-green-500 text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-colors">
              Get Free Quote
            </Link>
          </div>
          
          <div className="flex items-center justify-center space-x-8 text-gray-600">
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-green-500" />
              <span>+254 700 123 456</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-green-500" />
              <span>info@ecowheel.co.ke</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-800">
              Ecowheel Safari Tours
            </span>
          </div>
          <p className="text-gray-600 mb-4">
            Licensed Safari Tour Operator • Conservation Partners • Est. 2016
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <span>© 2025 Ecowheel Safari Tours</span>
            <span>•</span>
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
}